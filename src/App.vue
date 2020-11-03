<template>
    <div class="card text-center">
        <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                    <router-link
                        :click="table"
                        class="nav-link"
                        :class="{ active: active === 1 }"
                        to="/table"
                        >Game Table</router-link
                    >
                </li>
                <li class="nav-item">
                    <router-link
                        :click="history"
                        class="nav-link"
                        :class="{ active: active === 2 }"
                        to="/history"
                        >History</router-link
                    >
                </li>
            </ul>
        </div>
        <div id="card_view" class="card-body">
            <router-view />
        </div>
    </div>
</template>
<script>
export default {
	name: 'App',
	data() {
		return {
			active: 0,
		};
	},
	methods: {
		table() {
			this.active = 1;
		},
		history() {
			this.active = 2;
		},
	},
};
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 98%;
    height: 90%;
    margin: 0 1%;
}

#nav {
    padding: 1%;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
html,
body {
    height: 100%;
    padding: 0;
    margin: 0;
}
#card_view {
    height: 850px;
}
</style>
