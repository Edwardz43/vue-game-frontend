<template>
    <div class="pg">
        <div class="row p_info">
            <div
                class="col-md-4 offset-md-4"
                :class="{ myTurn: turnSeat === +this.flipSeatMap['N'] }"
            >
                <PlayerInfo
                    :info="this.playerStackMap['N']"
                    :title="+this.flipSeatMap['N'] || ''"
                    :type="'top'"
                />
            </div>
        </div>
        <div class="row p_info sec_row">
            <div
                class="col-md-4"
                :class="{ myTurn: turnSeat === +this.flipSeatMap['W'] }"
            >
                <PlayerInfo
                    :info="this.playerStackMap['W']"
                    :title="+this.flipSeatMap['W'] || ''"
                    :type="'left'"
                />
            </div>
            <div
                class="col-md-4 offset-md-4"
                :class="{ myTurn: turnSeat === +this.flipSeatMap['E'] }"
            >
                <PlayerInfo
                    :info="this.playerStackMap['E']"
                    :title="+this.flipSeatMap['E'] || ''"
                    :type="'right'"
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
import Card from './NormalCard.vue';
import PlayerInfo from './PlayerInfo.vue';
import { mapState } from 'vuex';

export default {
	name: 'PlayGround',
	computed: mapState([
		'turnSeat',
		'currentCard',
		'playerStackMap',
		'seatMap',
		'flipSeatMap',
	]),
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

.sec_row {
    position: relative;
    top: 10%;
}
</style>