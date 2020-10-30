<template>
    <div class="pg">
        <div class="player top">北</div>
        <div class="player right">東</div>
        <div class="player left">西</div>
        <div class="current_cards">
            <Card v-for="card in currentCard" :key=card.index :num=card.num />
        </div>
    </div>
</template>

<script>
import Card from "./NormalCard.vue";
import { mapState } from "vuex";

export default {
    name: 'PlayGround',
    computed: mapState(['currentCard']),
    components: {
        Card
    },
    data() {
        //
    }
}
</script>

<style>
.pg {
    margin: 0 1%;
    height: 65%;
    width: 98%;
    top: 2%;
    position: relative;
    text-align: center;
    vertical-align: middle;
}

.current_cards {
    display: inline-block;
    position: relative;
    top: 40%;
}

.player {
    position: relative;
    color: azure;
    font-size: 3em;
    
}

.top {

}

.right {
    left: 45%;
    top: 30%;
}

.left {
    right: 45%;
    top: 20%;
}
</style>