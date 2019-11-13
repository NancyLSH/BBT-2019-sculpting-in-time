<template>
  <div class="questions">
    <div class="swiper">
        <div class="smoke">
            <img :src="smoke"/>
        </div>
      <swiper :options="swiperOption">
        <swiper-slide v-for="n in 5" :key="n">
          <div class="title">{{n}}/5</div>
          <div class="main">
            <div class="head">《狗十三》中女主养的小狗叫 什么名字？</div>
            <div class="options">
              <div
                class="item"
                v-for="i in 4"
                :key="i"
                @click="check(n,i)"
                v-bind:class="{active:choose[n-1] === i}"
              >
                <div class="circle">
                  <div class="small" v-show="choose[n-1]===i"></div>
                </div>
                <div class="tip">A.伽利略</div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
      </swiper>
    </div>
    <div class="submit" @click="submit">提交</div>
    <div class="bg">
      <img :src="bg" />
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
import bg from "../assets/bg.png";
import smoke from "../assets/smoke.png";

export default {
  name: "index",
  data() {
    return {
      bg,
      smoke,
      choose: [],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet(index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom"></span>`;
          }
        }
      }
    };
  },
  mounted() {
    // $.ajax({
    //     url:"",
    // })
  },
  methods: {
    submit() {},
    check(n, i) {
      this.$set(this.choose, n - 1, i);
    }
  }
};
</script>

<style>
.questions {
  height: 100%;
}
.questions .title {
  font-size: 7vw;
  color: #d8d4c4;
  width: fit-content;
  padding: 10%;
}
.swiper-wrapper {
  margin-bottom: 25vw;
}
.swiper .main {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.swiper .main .head {
  color: #d8d4c4;
  font-size: 6vw;
  width: 83%;
  margin: auto;
  margin-bottom: 7%;
}
.swiper .main .options {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.swiper .main .options .item {
  height: 10vw;
  color: #d8d4c4;
  font-size: 4vw;
  line-height: 10vw;
  box-sizing: border-box;
  padding-left: 11%;
  background-color: transparent;
  display: flex;
  align-items: center;
}
.swiper .main .options .item .circle {
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  border: #ffffff solid 1px;
  margin-right: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.swiper .main .options .item .circle .small {
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 1);
}
.swiper-pagination-bullet-custom {
  width: 3vw;
  height: 3vw;
  outline: none;
  margin-right: 15vw;
  opacity: 1;
  background: #767676;
}
.swiper-container-horizontal
  > .swiper-pagination-bullets
  .swiper-pagination-bullet {
  margin: 0 5vw;
}
.swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
  background: #104075;
}
.submit {
  width: 34%;
  height: 9vw;
  border-radius: 2vw;
  border: #a59f59 solid 1px;
  font-size: 4vw;
  text-indent: 1.5vw;
  letter-spacing: 3vw;
  line-height: 9vw;
  color: #ffffff;
  margin: 10vw auto 20vw auto;
  text-align: center;
  position: relative;
  z-index: 2;
}
.questions .bg {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 0;
  display: flex;
}
.questions .bg img {
  width: 100%;
}
.swiper .main .options .active {
  background-color: rgba(216, 212, 196, 0.06);
}
</style>