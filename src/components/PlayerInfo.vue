<template>
    <div class="player" :class="type">
        <div class="title" v-if="remain_cards.length > 0">
            {{ title }}
        </div>
        <div class="player_cards">
            <NormalCard
                v-for="card in remain_cards"
                :key="card.index"
                :num="card.num"
                :dType="'div_back'"
                :type="'back'"
            />
        </div>
    </div>
</template>

<script>
import NormalCard from "./NormalCard.vue";

export default {
    name: "PlayerInfo",
    props: ["title", "type"],
    components: {
        NormalCard,
    },
    data() {
        return {
            remain_cards: [
                // { index: 0, num: "pocker-back" },
                // { index: 1, num: "pocker-back" },
                // { index: 2, num: "pocker-back" },
                // { index: 3, num: "pocker-back" },
                // { index: 4, num: "pocker-back" },
                // { index: 5, num: "pocker-back" },
                // { index: 6, num: "pocker-back" },
                // { index: 7, num: "pocker-back" },
                // { index: 8, num: "pocker-back" },
                // { index: 9, num: "pocker-back" },
                // { index: 10, num: "pocker-back" },
                // { index: 11, num: "pocker-back" },
                // { index: 12, num: "pocker-back" },
            ],
        };
    },
};
</script>

<style>
.player {
    position: relative;
    color: azure;
    font-size: 2em;
    overflow-x: hidden;
}

.title {
    height: 50%;
}

.player_cards {
    /* overflow-x: hidden; */
}

.top {
    position: relative;
    display: inline-block;
    top: 1%;
    padding-bottom: 3%;
    /* left: 7%; */
    /* width: 40%; */
}

.right {
    position: relative;
    padding-bottom: 10%;
}

.left {
    position: relative;
    padding-bottom: 10%;
}
</style>