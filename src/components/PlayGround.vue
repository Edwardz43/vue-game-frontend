<template>
    <div class="pg">
        <div class="row p_info">
            <div class="col-md-8 offset-md-2">
                <PlayerInfo
                    :title="'N'"
                    :type="'top'"
                    :class="{ myTurn: turnSeat === 'n' }"
                />
            </div>
        </div>
        <div class="row p_info">
            <div class="col-md-4">
                <PlayerInfo
                    :title="'W'"
                    :type="'left'"
                    :class="{ myTurn: turnSeat === 'e' }"
                />
            </div>
            <div class="col-md-4 offset-md-4">
                <PlayerInfo
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
    computed: mapState(["turnSeat", "currentCard", ""]),
    components: {
        Card,
        PlayerInfo,
    },
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