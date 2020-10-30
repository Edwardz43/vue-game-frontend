<template>
    <div class="n_card">
        <img alt="Card" class="card_img" :src='`${ require("../assets/pocker/" + num + ".jpg")}`'>
    </div>
</template>

<script>
export default {
    name: 'NormalCard',
    props: ['num']
}
</script>

<style>
.n_card {
    display: inline-block;
    margin: 0 -2% 0 -2%;
}
.card_img {
    width: 100px;
    height: 130px;
}
</style>