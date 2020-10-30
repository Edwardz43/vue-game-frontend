<template>
    <div class="pocker">
        <img alt="Card" class="static" :class="{ selected: isSelected }"
         @click="click()" :src='`${ require("../assets/pocker/" + num + ".jpg")}`'>
    </div>
</template>

<script>
import store from "../store"
export default {
    name: 'PlayerCard',
    store,
    props: ['index', 'num', 'isSelected'],   
    methods: {
        click() {            
            this.$store.commit('selected', this.index);
            this.$emit("add", { index: this.index });
        }
    },
}
</script>

<style>
.pocker {
    width: 56px;
    height: 70px;
    display: inline-block;
}
.selected {
    position: relative;
    top: -30%;
}
</style>