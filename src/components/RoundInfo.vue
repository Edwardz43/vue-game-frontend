<template>
    <div
        class="round_info"
        @click="copy"
        data-toggle="tooltip"
        data-placement="top"
        title="Click to copy round ID"
    >
        Round {{ rid }}
        <div class="arrow">👈</div>
        <textarea id="h_rid" cols="30" rows="10" :value="rid"></textarea>
    </div>
</template>

<script>
export default {
    name: "RoundInfo",
    props: ["rid"],
    methods: {
        copy() {
            let copyText = document.getElementById("h_rid");
            copyText.select();
            copyText.setSelectionRange(0, 99999); /*For mobile devices*/
            document.execCommand("copy");
            alert(`Round ID ${this.rid} copied`);
        },
    },
};
</script>

<style>
.round_info {
    background: rgba(22, 96, 233, 0.5);
    font-family: "Courier New", Courier, monospace;
    color: white;
}

#h_rid {
    position: fixed;
    top: -1000%;
}

.arrow {
    position: relative;
    display: inline-block;
    animation-name: floating;
    animation-duration: 1s;
    animation-iteration-count: infinite;
}

@keyframes floating {
    0% {
        left: 0px;
    }
    100% {
        left: 3px;
    }
}
</style>
