<template>
    <div class="pg">
        <div class="current_cards">
            <Card v-for="card in selectedList" :key=card.index :num=card.num />
        </div>
    </div>
</template>

<script>
import Card from "./NormalCard.vue";
import { mapState } from "vuex";

export default {
    name: 'PlayGround',
    computed: mapState(['selectedList']),
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

</style>