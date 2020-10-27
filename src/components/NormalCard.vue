<template>
    <div class="n_card">
        <img alt="Card" :src='`${ require("../assets/pocker/" + num + ".jpg")}`'>
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
</style>