<template>
  <div>
    <div>
      <button v-if="!inGame" :disabled="connecting" @click="conn()">
        Connect
      </button>
    </div>
    <div
        class="table"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
        v-if="inGame"
    >
      <RoundInfo :rid="rid"/>
      <PlayGround v-if="Object.keys(playerStackMap).length > 0"/>
      <Seat :cardList="cardList" @play="play" @pass="pass"/>
    </div>
  </div>
</template>

<script>
import RoundInfo from './RoundInfo.vue';
import PlayGround from './PlayGround.vue';
import Seat from './Seat.vue';
import {mapState} from 'vuex';

export default {
	name: 'Table',
	computed: mapState([
		'ws',
		'seatMap',
		'cardList',
		'currentCard',
		'playerStackMap',
		'seatMap',
	]),
	components: {
		RoundInfo,
		PlayGround,
		Seat,
	},
	data() {
		return {
			pid: 0,
			rid: 0,
			mySeat: 0,
			//   seatMap: {},
			// inGame: true,
			// connecting: true,
			inGame: false,
			connecting: false,
			cardsMap: {},
			usedCards: [],
			backgroundImage:
          'https://raw.githubusercontent.com/makotohsu/MyTestGameAssetPicture/main/pocker/table.png',
		};
	},
	methods: {
		conn() {
			this.connecting = true;
			// fetch('http://localhost:55660/conn')
			fetch('/conn')
				.then((resp) => resp.json())
				.catch((error) => {
					console.log(error);
					alert('Connect failed, pls try again later !');
					this.connecting = false;
				})
				.then((myJson) => {
					//   console.log(myJson);
					if (!myJson) {
						console.log('parse failed');
						return;
					}
					this.pid = myJson.pid;
					this.$store.commit(
						'conn',
						new WebSocket('ws://localhost:55660/')
					);

					this.ws.onopen = () => {
						console.log('open connection');
						this.start();
					};

					this.ws.onclose = () => {
						this.connecting = false;
						this.inGame = false;
						console.log('close connection');
					};
				});
		},
		start() {
			let msg = {action: 1, pid: this.pid};
			this.ws.send(JSON.stringify(msg));
			this.ws.onmessage = (event) => {
				if (!event.data) {
					return;
				}

				let info = JSON.parse(event.data);
				let action = info.action;
				let data = info.data;
				console.log(info);

				switch (action) {
				case 1: // 玩家進房
					this.enterGame(data);
					break;
				case 2: // 更新玩家資訊
					this.updateInfo(data);
					break;
				case 3: // 發牌
					// deal(data);
					this.deal(data);
					break;
				case 4: // 出牌
					this.processPlay(data);
					break;
				case 5: // 過牌
					this.processPass(data);
					break;
				case 6: // 出牌回合資訊
					this.turn(data);
					break;
				case 7: // 結算
					this.settle(data);
					break;
				case 10: // 出牌無效
					this.playFail();
					break;
					// case 8: // 壓牌獎勵資訊
					// case 9: // 重連訊息
				default:
            // TODO
				}
			};
		},
		enterGame(data) {
			this.init();
			this.inGame = true;
			this.mySeat = data.s;
			this.rid = data.r;
			console.log('mySeat', this.mySeat);
		},
		updateInfo(data) {
			this.playersHandCardCount = {};
			let players = data.p;
			this.setSeatMap(
				Object.keys(players)
					.filter((i) => +i !== this.mySeat)
					.map((i) => +i)
			);
			let tmpStack = {};
			for (let seat in players) {
				if (seat.toString() === this.mySeat.toString()) {
					console.log('mySeat', this.mySeat);
					continue;
				}
				console.log('this.seatMap', this.seatMap);
				let pos = this.seatMap[seat.toString()];
				console.log('pos', pos);
				tmpStack[pos] = [];
				for (let index = 0; index < 13; index++) {
					tmpStack[pos][index] = {
						index: 0,
						num: 'pocker-back',
					};
				}
			}
			this.$store.commit('initPlayerStackMap', tmpStack);
			// console.table(this.playerStackMap);
		},
		deal(data) {
			let handCards = data.handCards;
			this.cardsMap = data.cardIndexMap;
			if (!handCards || handCards.length === 0) {
				return;
			}
			this.$store.commit(
				'initCardList',
				handCards.map((card, index) => {
					return {
						index: index,
						num: this.parseCard(card),
						isSelected: false,
					};
				})
			);
		},
		testProcessPlay() {
			this.$store.commit('updatePlayerStackMap', {
				key: 1,
				count: 1,
			});
			console.table(this.playerStackMap[1]);
		},
		processPlay(data) {
			if (data.err) {
				console.log(data.err);
				this.playFail();
				return;
			}
			let seat = data.s;
			let playCards = data.c;
			let current = playCards.map((card, index) => {
				return {
					index: index,
					num: this.parseCard(card),
					isSelected: false,
				};
			});
			this.$store.commit('replace', current);
			if (seat === this.mySeat && playCards) {
				playCards.forEach((card) => {
					let c = this.cardsMap[`${card.suit}-${card.point}`];
					this.usedCards[c] = true;
				});
				this.$store.commit('delete', this.currentCard);
				this.selectedList = [];
				this.disabled = true;
				this.$store.commit('setLeader', false);
				this.$store.commit('setMyTurn', false);
			} else {
				this.$store.commit('updatePlayerStackMap', {
					key: this.seatMap[seat.toString()],
					count: playCards.length,
				});
			}
		},
		play(selectedCard) {
			// console.table(selectedCard);
			selectedCard.sort((a, b) => a - b);
			this.ws.send(
				JSON.stringify({
					action: 2,
					pid: this.pid,
					cards: selectedCard,
				})
			);
			this.$store.commit('setMyTurn', false);
		},
		processPass(data) {
			if (data.s === this.mySeat) {
				this.$store.commit('setMyTurn', false);
			}
		},
		pass() {
			this.ws.send(JSON.stringify({action: 3, pid: this.pid}));
			this.$store.commit('setMyTurn', false);
		},
		turn(data) {
			this.$store.commit('setTurnSeat', data.ts);
			if (data.ts === this.mySeat) {
				this.$store.commit('setMyTurn', true);
				if (data.l) {
					this.$store.commit('replace', []);
				}
				this.$store.commit('setLeader', data.l);
			}
		},
		settle(data) {
			console.log('SETTLE');
			this.$store.commit('setTurnSeat', 0);
			let remainList = {};
			let source = data.rl;
			for (let seat in source) {
				if (seat.toString() === this.mySeat.toString()) {
					continue;
				}
				let remain = source[seat].remainCards.map((card) => {
					return {
						index: 0,
						num: this.parseCard(card),
						isSelected: false,
					};
				});
				remainList[this.seatMap[seat.toString()]] = remain;
			}
			this.$store.commit('showPlayerStackMap', {});
			setTimeout(() => {
				this.$store.commit('showPlayerStackMap', remainList);
			}, 200);
		},
		setSeatMap(players) {
			let map = {};
			switch (players.length) {
			case 1:
				map[players[0]] = 'N';
				break;
			case 2:
				if (this.compareArray(players, ['1', '2'])) {
					map['1'] = 'W';
					map['2'] = 'E';
				}
				if (this.compareArray(players, ['2', '3'])) {
					map['2'] = 'W';
					map['3'] = 'E';
				}
				if (this.compareArray(players, ['1', '3'])) {
					map['3'] = 'W';
					map['1'] = 'E';
				}
				break;
			case 3:
				if (this.compareArray(players, ['1', '2', '3'])) {
					map['1'] = 'W';
					map['2'] = 'N';
					map['3'] = 'E';
				}
				if (this.compareArray(players, ['1', '2', '4'])) {
					map['4'] = 'W';
					map['1'] = 'N';
					map['2'] = 'E';
				}
				if (this.compareArray(players, ['1', '3', '4'])) {
					map['3'] = 'W';
					map['4'] = 'N';
					map['1'] = 'E';
				}
				if (this.compareArray(players, ['2', '3', '4'])) {
					map['2'] = 'W';
					map['3'] = 'N';
					map['4'] = 'E';
				}
				break;
			default:
			}
			this.$store.commit('setSeatMap', map);
		},
		playFail() {
			this.$store.commit('clear');
			this.$store.commit('setMyTurn', true);
		},
		init() {
			this.rid = 0;
			this.mySeat = 0;
			this.cardsMap = {};
			this.usedCards = [];
			this.$store.commit('init');
		},
		parseCard(card) {
			return card.point - 1 + (card.suit - 1) * 13;
		},
		compareArray(a, b) {
			if (!a) return false;

			for (var i = 0, l = a.length; i < l; i++) {
				if (a[i] instanceof Array && b[i] instanceof Array) {
					if (!this.compareArray(a, b)) return false;
				} else if (a[i] != b[i]) {
					return false;
				}
			}
			return true;
		},
	},
};
</script>

<style>
.table {
  position: relative;
  height: 98%;
  background-color: rgb(223, 142, 142);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>