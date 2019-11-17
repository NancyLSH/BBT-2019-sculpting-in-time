<template>
  <div class="result">
    <div class="left">
      <img :src="leftSmoke" />
    </div>
    <div class="right">
      <img :src="rightSmoke" />
    </div>
    <div class="content">
      <div class="title">个人战绩</div>
      <div class="main">
        <div class="tip">您共答对&nbsp;&nbsp;3&nbsp;&nbsp;题</div>
        <div class="tip">正确率为&nbsp;&nbsp;60&nbsp;&nbsp;%</div>
        <div class="res">恭喜你增加许愿值&nbsp;20&nbsp;%</div>
        <div class="yellow">收集许愿值可以用来兑换奖品</div>
      </div>
      <div class="btns">
        <div class="btn resBtn" style="margin-bottom:7%;" @click="again">再玩一局</div>
        <div class="btn resBtn">我的许愿瓶</div>
      </div>
    </div>
    <div class="bg">
      <img :src="bg" />
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import bg from "../assets/bg.png";
import leftSmoke from "../assets/left-smoke.png";
import rightSmoke from "../assets/smoke.png";
const baseUrl = "http://111.230.183.100:5000";

export default {
  name: "result",
  data() {
    return {
      bg,
      leftSmoke,
      rightSmoke
    };
  },
  mounted() {
    $.ajax({
      url: baseUrl + "/commit",
      method:"GET",
      success:res=>{
          console.log({res});
      }
    });
  },
  methods: {
    again() {
      this.$router.push("/index");
    }
  }
};
</script>

<style>
.result {
  height: 100%;
}
.result .left {
  width: 100%;
  position: absolute;
  top: 5%;
  left: 0;
}
.result .left img {
  width: 80%;
}
.result .right {
  position: fixed;
  width: 100%;
  top: 53%;
  text-align: right;
  right: 0;
}
.result .right img {
  width: 65%;
}
.result .content {
  width: 68%;
  height: 100%;
  padding: 25% 6%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  background-color: rgba(149, 135, 96, 0.03);
}
.result .title {
  color: #ffffff;
  font-size: 6vw;
  font-weight: 400;
  z-index: 2;
  padding-top: 10%;
}
.result .main {
  height: 53%;
  min-height: 50vw;
  z-index: 2;
  padding-top: 25%;
}
.result .main .tip {
  color: #ffffff;
  font-size: 4vw;
}
.result .main .res {
  font-size: 5vw;
  color: #ffffff;
  margin-top: 16%;
}
.result .main .yellow {
  margin-top: 10%;
  color: #958760;
  font-size: 3vw;
}
.result .resBtn {
  width: 45%;
  margin: auto;
}
</style>