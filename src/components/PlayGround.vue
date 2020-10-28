<template>
    <div class="pg" :style="{ backgroundImage: `url(${backgroundImage})` }">
        <div class="current_cards">
            <Card v-for="card in this.$store.state.selectedList" :key=card.index :num=card.num />
        </div>
    </div>
</template>

<script>
import Card from "./NormalCard.vue";
import store from "../store"

export default {
    name: 'PlayGround',
    store,
    components: {
        Card
    },
    data() {
        return {
            backgroundImage: require('../assets/table.png')
        }
    }
}
</script>

<style>
.pg {
    margin: 0 2%;
    height: 70%;
    width: 96%;
    top: 2%;
    position: relative;
    text-align: center;
    vertical-align: middle;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
}

.current_cards {
    display: inline-block;
    position: relative;
    top: 40%;
}

</style>