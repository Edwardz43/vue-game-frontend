<template>
    <div class="table" :style="{ backgroundImage: `url(${backgroundImage})` }">
        <PlayGround/>
        <Seat :cardList="cardList[0]" />
    </div>
</template>

<script>
import PlayGround from "./PlayGround.vue";
import Seat from "./Seat.vue";
import { mapState } from "vuex";

export default {
    name: 'Table',
    computed: mapState(['cardList']),
    components : {
        PlayGround,
        Seat,
    },
    mounted() {
        let tmpList = [];
        for (let i = 0; i < 51; i++) {
            tmpList[i] = i;
        }
        tmpList = this.shuffle(tmpList);
        for (let i = 0; i < 4; i++) {
            if (!this.cardList[i]) {
                this.$store.commit('add', i);
            }
            let cards = tmpList.splice(0, 13);
            cards.sort(this.sort);
            let stack = cards.map((card, index) => {
                return {index: index, num: card, isSelected: false};
            });
            this.$store.commit('push', {index: i, list:stack});
        }        
    },
    data () {
        return {
            backgroundImage: require('../assets/table.png')
        }
    },
    methods: {
        sort (a, b) {
            let symbolA = a % 13;
            let suitA = Math.floor(a / 13);
            let symbolB = b % 13;
            let suitB = Math.floor(b / 13);            
            let suitRank = [0, 3, 2, 1];
            let symbolRank = [11, 12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            if (symbolA === symbolB) {
                return suitRank[suitA] - suitRank[suitB] < 0 ? -1 : 1;
            }
            return symbolRank[symbolA] - symbolRank[symbolB] < 0 ? -1 : 1;
        },
        shuffle (cards) {
            for (var i = 0; i < cards.length; i++) {
                let index = Math.floor(Math.random() *51);
                [cards[i], cards[index]] = [cards[index], cards[i]];
            }
            return cards
        }
    }
}
</script>

<style>
.table {
    position:relative;
    height: 100%;
    background-color: rgb(223, 142, 142);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
}
</style>