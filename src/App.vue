<template>
  <Table/>
</template>

<script>
import Table from './components/Table.vue';

export default {
  name: 'App',
  components: {
    Table
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  height: 95%;
  width: 98%;
  display: flex;
  margin: 1% 1%;
}

#app {
  width: 100%;
}
</style>
