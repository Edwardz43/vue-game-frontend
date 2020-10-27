<template>
    <div class="seat">
        <div>
            {{ "Seat" }}
            <button @click="play()" :disabled="disabled" >Play</button>
        </div>
        <div class="stack">
            <Card v-for="card in privateList" :key=card.index :index=card.index :num=card.num @add="add" card_prop.sync="card" />
        </div>
        
    </div>
</template>

<script>
import Card from "./PlayerCard.vue";

export default {
    name: 'Seat',
    props: ['cardList'],
    data() {
        return {
            selectedList: [],
            privateList: [],
            disabled: true,
        }
    },
    components: {
        Card
    },
    mounted() {
        this.privateList = this.cardList.slice();
    },
    methods: {
        play() {

            this.selectedList.forEach(index => {
                this.privateList.splice(index, 1);
            });
            this.$forceUpdate();
        },
        add({index}) {
            if (this.selectedList.indexOf(index) > -1) {
                this.selectedList.splice(this.selectedList.indexOf(index), 1);
            } else {
                this.selectedList.push(index);
            }
            console.log(this.selectedList);
            this.disabled = this.selectedList.length === 0;
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