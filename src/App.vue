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
  width: 95%;
  display: flex;
}

#app {
  width: 100%;
}
</style>
