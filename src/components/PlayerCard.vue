<template>
    <div class="card">
        <img alt="Card" class="static" :class="{ selected: isSelected }"
         @click="click()" :src='`${ require("../assets/pocker/" + num + ".jpg")}`'>
    </div>
</template>

<script>
export default {
    name: 'PlayerCard',
    props: ['index', 'num'],   
    data() {
        return {
            isSelected: false,
        }
    },
    methods: {
        click() {            
            this.isSelected = !this.isSelected;
            // console.log(this.index);
            this.$emit("add", { index: this.index });
        }
    },
}
</script>

<style>
.card {
    /* margin:0px auto; */
    width: 20px;
    height: 65px;
    display: inline-block;
}
.selected {
    position: relative;
    /* border: 1px solid rgb(14, 201, 14); */
    top: 20%;
}
</style>