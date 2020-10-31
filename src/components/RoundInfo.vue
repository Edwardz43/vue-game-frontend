<template>
    <div
        class="round_info"
        @click="copy"
        data-toggle="tooltip"
        data-placement="top"
        title="Click to copy round ID"
    >
        Round {{ rid }}
        <textarea id="h_rid" cols="30" rows="10" :value="rid"></textarea>
    </div>
</template>

<script>
export default {
    name: "RoundInfo",
    props: ["rid"],
    methods: {
        copy() {
            /* Get the text field */
            var copyText = document.getElementById("h_rid");
            /* Select the text field */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /*For mobile devices*/
            /* Copy the text inside the text field */
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
</style>
