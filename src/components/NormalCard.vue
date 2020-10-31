<template>
    <div :class="dType">
        <img alt="Card" :class="type" :src='`${ require("../assets/pocker/" + num + ".jpg")}`'>
    </div>
</template>

<script>
export default {
    name: 'NormalCard',
    props: ['num', 'dType', 'type']
}
</script>

<style>
.div_card {
    display: inline-block;
    margin: 0 -2% 0 -2%;
    width: 60px;
}
.card_img {
    width: 80px;
    height: 100px;
}

.div_back {
    display: inline-block;
    margin: 0 -2% 0 -2%;
    width: 30px;
}

.back {
    width: 60px;
    height: 90px;    
}
</style>