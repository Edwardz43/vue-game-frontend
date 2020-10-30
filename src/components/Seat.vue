<template>
    <div class="seat">
        <div class="seat-label" v-if="myTurn">
            <button class="player_btn" :class="{dis: disabled}" @click="play()" :disabled="disabled" >Play</button>
            <button class="player_btn" :class="{dis: myTurn && isLeader}" @click="pass()" :disabled="myTurn && isLeader" >Pass</button>
        </div>
        <div class="seat-label">
            <button class="player_btn" :class="{dis: disabled}" @click="clear()" :disabled="disabled" >Clear</button>
        </div>
        <div class="stack" :class="{myTurn: myTurn}">
            <Card v-for="card in cardList"
                :key=card.index 
                :index=card.index 
                :num=card.num
                :isSelected=card.isSelected
                @add="add" />
        </div>
    </div>
</template>

<script>
import Card from "./PlayerCard.vue";
import { mapState } from "vuex";

export default {
    name: 'Seat',
    computed: mapState(['cardList', 'myTurn', 'isLeader', 'selectedIndexList']),
    data() {
        return {
            disabled: true,
            selectedList: [],                        
        }
    },
    components: {
        Card
    },
    methods: {
        play() {
            console.log('this.selectedIndexList', this.selectedIndexList);
            this.$emit('play', this.selectedIndexList);
            this.$store.commit('clearIndexList');
            this.disabled = true;
        },
        pass() {
            this.$emit('pass');
            this.$store.commit('clearIndexList');
            this.disabled = true;
        },
        add({index}) {
            if (this.selectedIndexList.indexOf(index) > -1) {
                // this.selectedList.splice(this.selectedList.indexOf(index), 1);
                this.$store.commit('removeIndex', index);
            } else {
                this.$store.commit('add', index);
            }
            this.disabled = this.selectedIndexList.length === 0 || this.$store.state.cardList[0].length === 0;
            // this.$emit('disable', disabled);
        },
        clear() {
            this.$store.commit('clearIndexList');
            this.$store.commit('clear');
            // this.$emit('disable', true);
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
    height: 100%;
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
    height: 75%;
}

.myTurn {
    /* background: lightyellow; */
    animation-name: shine;
    animation-duration: 4s;
    animation-iteration-count: infinite;
}

@keyframes shine {
  0%   {background-color: red;}
  40%  {background-color: yellow;}
  60%  {background-color: blue;}
  80% {background-color: green;}
  100%   {background-color: red;}
}
</style>