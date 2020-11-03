<template>
    <div :class="dType">
        <img
            alt="Card"
            :class="type"
            :src="`https://raw.githubusercontent.com/makotohsu/MyTestGameAssetPicture/main/pocker/${num}.jpg`"
        />
    </div>
</template>

<script>
export default {
	name: 'NormalCard',
	props: ['num', 'dType', 'type'],
};
</script>

<style>
.div_card {
    display: inline-block;
    margin: 0 -1% 0 -2%;
    width: 75px;
}
.card_img {
    width: 80px;
    height: 100px;
}

.div_back {
    display: inline-block;
    margin: 0 -2% 0 -2%;
    width: 60px;
}

.back {
    width: 60px;
    height: 90px;
}
</style>