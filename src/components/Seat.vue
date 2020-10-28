<template>
    <div class="seat">
        <div>
            {{ "Seat" }}
            <button @click="play()" :disabled="disabled" >Play</button>
        </div>
        <div class="stack">
            <Card v-for="card in this.$store.state.cardList[0]" :key=card.index :index=card.index :num=card.num @add="add" card_prop.sync="card" />
        </div>
        
    </div>
</template>

<script>
import Card from "./PlayerCard.vue";
import store from "../store"

export default {
    name: 'Seat',
    store,
    data() {
        return {
            selectedList: [],
            // privateList: [],
            disabled: true,
        }
    },
    components: {
        Card
    },
    methods: {
        play() {
            let temp = this.$store.state.cardList[0].filter(card => this.selectedList.indexOf(card.index) > -1);
            // console.log('temp', temp);
            this.$store.commit('delete', this.selectedList);
            // this.$forceUpdate();
            this.$store.commit('replace', temp);
            this.selectedList = [];
            this.disabled = true;
        },
        add({index}) {
            // console.log('add => index : ', index);
            if (this.selectedList.indexOf(index) > -1) {
                this.selectedList.splice(this.selectedList.indexOf(index), 1);
            } else {
                this.selectedList.push(index);
            }
            this.disabled = this.selectedList.length === 0 || this.$store.state.cardList[0].length === 0;
        }
    }
}
</script>

<style>
.seat {
    text-align:center;
    position: relative;
    height: 120px;
    top: 5%;
}
</style>