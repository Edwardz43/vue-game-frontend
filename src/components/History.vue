<template>
  <div class="hist">
    <div class="container">
      <div class="input-group">
        <input
            id="input_rid"
            aria-label="round_id"
            type="number"
            class="form-control"
            placeholder="請輸入局號"
        />
        <div class="input-group-append">
          <button
              @click="query()"
              class="btn btn-outline-secondary"
              type="button"
          >
            Button
          </button>
        </div>
      </div>
    </div>
    <div id="view">
      <div class="block">
        <div class="alert alert-primary text_c" role="alert">
          各家持有手牌
        </div>
        <div id="handCards"></div>
      </div>
      <div class="block">
        <div class="alert alert-primary text_c" role="alert">
          遊戲歷程
        </div>
        <pre id="history"></pre>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

const VBTCardSymbolString = {
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	10: 'T',
	11: 'J',
	12: 'Q',
	13: 'K',
	1: 'A',
	2: '2',
};

export default {
	name: 'History',
	computed: mapState(['ws']),
	mounted() {
		this.$store.commit('disconn');
	},
	methods: {
		getString(data) {
			return (
				['\u{2660}', '\u{2665}', '\u{2663}', '\u{2666}'][
					data.suit - 1
				] + VBTCardSymbolString[data.point]
			);
		},
		query() {
			let rid = document.getElementById('input_rid').value;
			console.log(rid);
			fetch('/queryHistory?rid=' + rid, { mode: 'cors' })
			// fetch('http://localhost:55660/queryHistory?rid=' + rid, {mode: 'cors'})
				.then((res) => res.json())
				.then((jsonData) => {
					console.log(jsonData);
					this.generate(JSON.parse(jsonData[0].Content));
				});
		},
		generate(obj) {
			let hist = document.getElementById('history');
			let handCards = document.getElementById('handCards');
			console.log(obj);
			hist.innerHTML = '';
			handCards.innerHTML = '';
			if (!obj) {
				return;
			}

			let hc = obj.handCardList;
			console.log(hc);
			for (let seat in hc) {
				let seatCards = hc[seat];
				let row = document.createElement('div');
				let cardString = seatCards.map((card) => this.getString(card));
				row.innerHTML = `Seat[${seat}]:${cardString}`;
				if (cardString.includes('♠3')) {
					row.classList.add('first');
				}
				handCards.appendChild(row);
			}
			let hists = obj.history;
			let tmp = [];
			hists.forEach((h) => {
				let str = h.map((element) => {
					let info = element.info;
					if (info && info.playCards) {
						let cards = info.playCards.cards;
						window.aa = cards;
						console.log('cards', cards);
						return `Seat[${element.seatID}]: ${cards
							.map((c) => this.getString(c))
							.join('')}`;
					} else {
						return `Seat[${element.seatID}]: pass`;
					}
				});
				tmp.push(str);
			});
			hist.innerHTML = JSON.stringify(tmp, undefined, 2);
		},
	},
};
</script>

<style>
.hist {
  height: 95%;
}

#handCards {
  background-color: azure;
  height: 100%;
  font-size: 1.5em;
  padding: 2%;
  letter-spacing: 2px;
  line-height: 60px;
}

.first {
  color: rgb(139, 64, 21);
}

#history {
  text-align: left;
  background-color: aliceblue;
  height: 100%;
  font-size: 1em;
  padding: 1%;
  line-height: 20px;
  letter-spacing: 2px;
  overflow-y: scroll;
}

.block {
  margin: 0 2% 0 5%;
  width: 40%;
  height: 100%;
  float: left;
}

.container {
  height: 80px;
}

#view {
  height: 70%;
}

.text_c {
  text-align: center;
}
</style>