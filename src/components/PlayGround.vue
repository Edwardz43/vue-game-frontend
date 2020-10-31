<template>
    <div class="pg">
        <div class="row p_info">
            <div class="col-md-8 offset-md-2" v-if="this.seatN.length > 0">
                <PlayerInfo
                    :info="this.seatN"
                    :title="'N'"
                    :type="'top'"
                    :class="{ myTurn: turnSeat === 'n' }"
                />
            </div>
        </div>
        <div class="row p_info">
            <div class="col-md-4" v-if="this.seatW.length > 0">
                <PlayerInfo
                    :info="this.seatW"
                    :title="'W'"
                    :type="'left'"
                    :class="{ myTurn: turnSeat === 'e' }"
                />
            </div>
            <div class="col-md-4 offset-md-4" v-if="this.seatE.length > 0">
                <PlayerInfo
                    :info="this.seatE"
                    :title="'E'"
                    :type="'right'"
                    :class="{ myTurn: turnSeat === 'w' }"
                />
            </div>
        </div>
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <Card
                    v-for="card in currentCard"
                    :key="card.index"
                    :num="card.num"
                    :dType="'div_card'"
                    :type="'card_img'"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Card from "./NormalCard.vue";
import PlayerInfo from "./PlayerInfo.vue";
import { mapState } from "vuex";

export default {
    name: "PlayGround",
    computed: mapState(["turnSeat", "currentCard", "playerStackMap"]),
    components: {
        Card,
        PlayerInfo,
    },
    mounted() {        
        // let cardList1 = [
        //     { index: 0, num: "pocker-back" },
        //     { index: 1, num: "pocker-back" },
        //     { index: 2, num: "pocker-back" },
        //     { index: 3, num: "pocker-back" },
        //     { index: 4, num: "pocker-back" },
        //     { index: 5, num: "pocker-back" },
        //     { index: 6, num: "pocker-back" },
        //     { index: 7, num: "pocker-back" },
        //     { index: 8, num: "pocker-back" },
        //     { index: 9, num: "pocker-back" },
        //     { index: 10, num: "pocker-back" },
        //     { index: 11, num: "pocker-back" },
        //     { index: 12, num: "pocker-back" },
        // ];

        // let cardList2 = [
        //     { index: 0, num: "pocker-back" },
        //     { index: 1, num: "pocker-back" },
        //     { index: 2, num: "pocker-back" },
        //     { index: 3, num: "pocker-back" },
        //     { index: 4, num: "pocker-back" },
        //     { index: 5, num: "pocker-back" },
        //     { index: 6, num: "pocker-back" },
        //     { index: 7, num: "pocker-back" },
        //     { index: 8, num: "pocker-back" },
        //     { index: 9, num: "pocker-back" },
        //     { index: 10, num: "pocker-back" },
        //     { index: 11, num: "pocker-back" },
        //     { index: 12, num: "pocker-back" },
        // ];
        // let tmp = {};
        // tmp["1"] = cardList1;
        // tmp["2"] = cardList2;
        // this.$store.commit("initPlayerStackMap", tmp);
        // // tmp["4"] = cardList;
        // console.log(this.playerStackMap);
        this.processSeatInfo();
    },
    data() {
        return {
            seatN:[],
            seatW:[],
            seatE:[],
        }
    },
    methods: {
        processSeatInfo () {
            let players = Object.keys(this.playerStackMap);                        
            
            switch (players.length) {                
                case 1:
                    this.seatN = this.playerStackMap[players[0]];
                    break;
                case 2:
                    if(this.compareArray(players, ["1", "2"])) {
                        this.seatW = this.playerStackMap[1];
                        this.seatE = this.playerStackMap[2];
                    }
                    if(this.compareArray(players, ["2", "3"])) {
                        this.seatW = this.playerStackMap[2];
                        this.seatE = this.playerStackMap[3];
                    }
                    if(this.compareArray(players, ["1", "3"])) {
                        this.seatW = this.playerStackMap[1];
                        this.seatE = this.playerStackMap[3];
                    }
                    break;
                case 3:
                    if(this.compareArray(players, ["1", "2", "3"])) {
                        this.seatW = this.playerStackMap[1];
                        this.seatN = this.playerStackMap[2];
                        this.seatE = this.playerStackMap[3];
                    }
                    if(this.compareArray(players, ["1", "2", "4"])) {
                        this.seatW = this.playerStackMap[4];
                        this.seatN = this.playerStackMap[1];
                        this.seatE = this.playerStackMap[2];
                    }
                    if(this.compareArray(players, ["1", "3", "4"])) {
                        this.seatW = this.playerStackMap[3];
                        this.seatN = this.playerStackMap[4];
                        this.seatE = this.playerStackMap[1];
                    }
                    if(this.compareArray(players, ["2", "3", "4"])) {
                        this.seatW = this.playerStackMap[2];
                        this.seatN = this.playerStackMap[3];
                        this.seatE = this.playerStackMap[4];
                    }                    
                    break;
                default:                        
            }
        },
        compareArray (a, b) {            
            if (!a)
                return false;

            for (var i = 0, l = a.length; i < l; i++) {
                
                if (a[i] instanceof Array && b[i] instanceof Array) {                    
                    if (!this.compareArray(a, b))                    
                        return false;       
                }           
                else if (a[i] != b[i]) {                     
                    return false;   
                }           
            }       
            return true;
        }
    }
};
</script>

<style>
.pg {
    margin: 0 1%;
    height: 60%;
    width: 98%;
    /* top: -5%; */
    position: relative;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
}

.p_info {
    height: 30%;
}
</style>