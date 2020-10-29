<template>
    <div class="seat">
        <div class="seat-label">
            <button class="player_btn" :class="{dis: disabled}" @click="play()" :disabled="disabled" >Play</button>
            <button class="player_btn" :class="{dis: disabled}" @click="clear()" :disabled="disabled" >Clear</button>
        </div>
        <div class="stack">
            <Card v-for="card in cardList[0]" 
                :key=card.index 
                :index=card.index 
                :num=card.num
                :isSelected=card.isSelected
                @add="add" 
            />
        </div>
        
    </div>
</template>

<script>
import Card from "./PlayerCard.vue";
import { mapState } from "vuex";

export default {
    name: 'Seat',
    computed: mapState(['cardList']),
    data() {
        return {
            selectedList: [],            
            disabled: true,
        }
    },
    components: {
        Card
    },
    methods: {
        play() {
            let temp = this.cardList[0].filter(card => this.selectedList.indexOf(card.index) > -1);
            this.$store.commit('delete', this.selectedList);
            this.$store.commit('replace', temp);
            this.selectedList = [];
            this.disabled = true;
        },
        add({index}) {
            if (this.selectedList.indexOf(index) > -1) {
                this.selectedList.splice(this.selectedList.indexOf(index), 1);
            } else {
                this.selectedList.push(index);
            }
            this.disabled = this.selectedList.length === 0 || this.$store.state.cardList[0].length === 0;
        },
        clear() {
            this.selectedList = [];
            this.$store.commit('clear');
            this.disabled = true;
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

.seat-label{
    width: 20%;
    height: 20%;
    display: inline-block;
}

.player_btn {
    height: 90%;
    width: 45%;
    border-radius: 2rem;
    color: rgba(183, 58, 233, 0.788);
    background: chartreuse;
}

.dis {
    background: rgb(56, 55, 56);
    color: rgba(221, 211, 211, 0.788);
}

.stack {
    margin-top: 2%;
}
</style>