<template>
    <div class="table" :style="{ backgroundImage: `url(${backgroundImage})` }">
        <div>
            <button v-if="!inGame" @click="conn()" >Connect</button>
        </div>
        <PlayGround v-if="inGame"/>
        <Seat v-if="inGame" :cardList="cardList" @play="play" @pass="pass"/>
    </div>
</template>

<script>
import PlayGround from "./PlayGround.vue";
import Seat from "./Seat.vue";
import { mapState } from "vuex";

export default {
    name: 'Table',
    computed: mapState(['cardList', 'currentCard']),
    components : {
        PlayGround,
        Seat,
    },
    data () {
        return {
            pid: 0,
            mySeat: 0,
            inGame: false,
            playersHandCardCount: {},
            cardsMap: {},
            usedCards: [], 
            backgroundImage: require('../assets/table.png')
        }
    },
    methods: {
        conn() {
            fetch('http://localhost:55550/conn')
            .then(resp => resp.json())
            .then(myJson => {
                console.log(myJson);
                this.pid = myJson.pid;
                this.ws = new WebSocket('ws://localhost:55550');

                this.ws.onopen = () => {
                    console.log('open connection');
                    // connBtn.setAttribute('disabled', '');
                    this.start();
                }

                this.ws.onclose = () => {
                    console.log('close connection');
                }
            });
        },
        start() {
            let msg = {action: 1, pid: this.pid}
            this.ws.send(JSON.stringify(msg));
            this.ws.onmessage = event => {
                if (!event.data) {
                    return;
                }
                
                let info = JSON.parse(event.data);
                let action = info.action;
                let data = info.data;
                console.table(info);

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
                    // case 7: // 結算
                    //     settle(data);
                    //     break;
                    case 10: // 出牌無效
                        this.playFail();
                        break;
                    // case 8: // 壓牌獎勵資訊
                    // case 9: // 重連訊息
                    default:
                    // TODO
                }
            }
        },
        enterGame(data) {
            this.inGame = true;
            this.mySeat = data.s;
            
            // document.getElementById('mySeat').innerHTML = `My Seat : ${data.s}`;
            // let rid = document.getElementById('roundID');
            // rid.innerHTML = `局號 : [${data.r}]`;
            // document.getElementById('hidden_RID').value = data.r;
        },
        updateInfo(data) {
            this.playersHandCardCount = {};
            let players = data.p;
            for (let seat in players) {
                this.playersHandCardCount[seat] = 13;
            }            
        },
        deal(data) {
            let handCards = data.handCards;
            this.cardsMap = data.cardIndexMap
            if (!handCards || handCards.length === 0) {
                return;
            }            
            this.$store.commit('init', handCards.map((card, index) => { return {index: index, num: this.parseCard(card), isSelected: false}})); 
            // console.table(this.cardList);  
        },
        processPlay(data) {
            if (data.err) {
                console.log(data.err);
                // playFail();
                return;
            }
            let seat = data.s;            
            let playCards = data.c;
            // playersHandCardCount[seat] -= playCards.length;
            // console.log('playersHandCardCount', playersHandCardCount);
            // console.log('this.cardsMap', this.cardsMap);
            playCards.forEach(card => {
                let c = this.cardsMap[`${card.suit}-${card.point}`]
                this.usedCards[c] = true;
            });

            let current = playCards.map((card, index) => {return {index: index, num: this.parseCard(card), isSelected:false}});
            // let temp = this.cardList.filter(card => this.selectedList.indexOf(card.index) > -1);
            // console.table(temp);
            this.$store.commit('replace', current);
            if (seat === this.mySeat && playCards) {                                
                this.$store.commit('delete', this.currentCard);            
                this.selectedList = [];
                this.disabled = true;
                this.$store.commit('setLeader', false);
                this.$store.commit('setMyTurn', false);
            }
        },
        play(selectedCard) {
            // console.table(selectedCard);
            selectedCard.sort((a,b) => a - b);
            this.ws.send(JSON.stringify({action: 2, pid: this.pid, cards: selectedCard}));
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
        parseCard(card) {
            return (card.point - 1) + (card.suit - 1) * 13;
        },
        disable(disabled) {
            this.disabled = disabled;
        },
        turn(data) {
            if (data.ts === this.mySeat) {
                this.$store.commit('setMyTurn', true);
                if (data.l) {
                    this.$store.commit('replace', []);   
                }
                // this.$store.commit('clear');
                // this.$store.commit('clearIndexList');
                this.$store.commit('setLeader', data.l);
            }
        },
        playFail() {
            // alert('playFail');
            this.$store.commit('clear');
            this.$store.commit('setMyTurn', true);
        },
        // sort (a, b) {
        //     let symbolA = a % 13;
        //     let suitA = Math.floor(a / 13);
        //     let symbolB = b % 13;
        //     let suitB = Math.floor(b / 13);            
        //     let suitRank = [0, 3, 2, 1];
        //     let symbolRank = [11, 12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        //     if (symbolA === symbolB) {
        //         return suitRank[suitA] - suitRank[suitB] < 0 ? -1 : 1;
        //     }
        //     return symbolRank[symbolA] - symbolRank[symbolB] < 0 ? -1 : 1;
        // },
        // shuffle (cards) {
        //     for (var i = 0; i < cards.length; i++) {
        //         let index = Math.floor(Math.random() * 51);
        //         [cards[i], cards[index]] = [cards[index], cards[i]];
        //     }
        //     return cards
        // }
    }
}
</script>

<style>
.table {
    position:relative;
    height: 98%;
    background-color: rgb(223, 142, 142);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
}
</style>