<template>
    <div class="poker">
        <img
            alt="Card"
            class="static"
            :class="{ selected: isSelected }"
            @click="click()"
            :src="`https://raw.githubusercontent.com/makotohsu/MyTestGameAssetPicture/main/pocker/${num}.jpg`"
        />
    </div>
</template>

<script>
import store from '../store';
export default {
	name: 'PlayerCard',
	store,
	props: ['index', 'num', 'isSelected'],
	methods: {
		click() {
			this.$store.commit('selected', this.index);
			this.$emit('add', { index: this.index });
		},
	},
};
</script>

<style>
.poker {
    width: 60px;
    height: 100px;
    display: inline-block;
}
.selected {
    position: relative;
    top: -30%;
}
</style>