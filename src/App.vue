<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/table">Table</router-link> |
    <router-link to="/history">History</router-link>
  </div>
  <router-view/>
</template>

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
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
html,body{
  height: 100%; padding: 0; margin: 0;
}

</style>
