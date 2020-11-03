<template>
    <div class="player" :class="type">
        <div class="title">
            {{ title }}
        </div>
        <div class="player_cards">
            <NormalCard
                v-for="card in info"
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
    props: ["info", "title", "type"],
    components: {
        NormalCard,
    },
    updated() {
        console.log("UPDATE", this.info);
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
    position: relative;
    top: 40%;
}

.top {
    position: relative;
    display: inline-block;
    top: 1%;
    padding-bottom: 3%;
}

.right {
    position: relative;
    padding-bottom: 10%;
    /* top: 40%; */
}

.left {
    position: relative;
    padding-bottom: 10%;
    /* top: 40%; */
}
</style>