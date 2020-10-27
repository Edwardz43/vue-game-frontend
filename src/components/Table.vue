<template>
    <div class="table">
        <PlayGround/>
        <Seat :cardList=cardList[0] />
    </div>
</template>

<script>
import PlayGround from "./PlayGround.vue";
import Seat from "./Seat.vue";

export default {
    name: 'Table',
    components : {
        PlayGround,
        Seat,
    },
    beforeCreate() {
        this.cardList = [];
        this.selectedList = [];
        let tmpList = [];
        for (let i = 0; i < 51; i++) {
            tmpList[i] = {index: i, num: Math.floor(Math.random() * 51)};
        }
        for (let i = 0; i < 4; i++) {
            if (!this.cardList[i]) {
                this.cardList[i] = [];
            }
            this.cardList[i].push(...tmpList.splice(0, 13));
        }
    },
    data () {
        return {
            Title : "This is a table"
        }            
    }
}
</script>

<style>
.table {
    position:relative;
    top: 5%;
    left: 5%;
    height:90%;
    width: 90%;
    background-color: rgb(192, 182, 182);
}
</style>