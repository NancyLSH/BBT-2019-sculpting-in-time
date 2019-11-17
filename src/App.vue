<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    this.$router.push("index");
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
div{
  font-weight: 100;
}
html,
body,
#app {
  height: 100%;
  background-color: #273453;
}
.btn {
  width: 20%;
  height: 9vw;
  padding: 0 6%;
  border-radius: 2vw;
  border: #a59f59 solid 0.2vw;
  font-size: 4vw;
  line-height: 9vw;
  color: #ffffff;
  text-align: center;
  position: relative;
  z-index: 2;
  font-weight: 100;
}
.bg {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 0;
  display: flex;
}
.bg img {
  width: 100%;
  height: 54vw;
}
</style>
