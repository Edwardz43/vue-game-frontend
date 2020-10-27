<template>
    <div class="pg" :style="{ backgroundImage: `url(${backgroundImage})` }">
        <div class="current_cards">
            <Card v-for="card in privateList" :key=card :num=card />
        </div>
    </div>
</template>

<script>
import Card from "./NormalCard.vue";


export default {
    name: 'PlayGround',
    components: {
        Card
    },
    data() {
        return {
            privateList: this.rndList(),
            backgroundImage: require('../assets/table.png')
        }
    },
    methods: {
        rndList() {
            let num = Math.floor(Math.random() * 13 + 1);
            let res = [];
            while (res.length < num) {
                let r = Math.floor(Math.random() * 51 + 1);
                if (res.indexOf(r) < 0) {
                    res.push(r);
                    console.log(res)
                }
            }
            res.sort((a, b) => a - b ? -1 : 1);
            return res;
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