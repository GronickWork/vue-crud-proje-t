<template>
  <div class="container">
    <Stamp />
    <div id="app">
      <main-to-do />
    </div>
  </div>
</template>

<script>
import MainToDo from "./components/ToDos/MainToDo.vue";
import Stamp from "./components/Stamp.vue";

export default {
  name: "App",
  components: {
    Stamp,
    MainToDo,
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
  height: 100vh;
  position: relative;
  padding-top: 5px;
  text-align: center;
  background: #fffadb;
  color: blue;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* Required properties for the stamp*/
  width: 96%;
  height: calc(100vh - 47px);
  margin: auto;
  color: #000;
  background: #e9e9e9;
  overflow: auto;
  border: 1px solid #000;
  border-top: 1px solid #e9e9e9;
}
</style>
