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
        <div class="tip">您共答对&nbsp;&nbsp;{{result.correctNum}}&nbsp;&nbsp;题</div>
        <div class="tip">正确率为&nbsp;&nbsp;{{result.accuracy}}&nbsp;&nbsp;%</div>
        <div class="res">恭喜你增加许愿值&nbsp;{{result.wish}}&nbsp;%</div>
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
import bg from "../assets/bg.png";
import leftSmoke from "../assets/left-smoke.png";
import rightSmoke from "../assets/right-smoke.png";

export default {
  name: "result",
  data() {
    return {
      result:{},
      bg,
      leftSmoke,
      rightSmoke
    };
  },
  mounted() {
    this.result = this.$route.params.res;
    console.log(this.result);
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
  position: fixed;
  top: 5%;
  left: 0;
}
.result .left img {
  width: 80%;
}
.result .right {
  position: fixed;
  width: 100%;
  top: 45%;
  text-align: right;
  right: 0;
}
.result .right img {
  width: 50%;
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