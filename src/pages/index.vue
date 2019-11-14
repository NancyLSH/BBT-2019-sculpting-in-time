<template>
  <div class="questions">
    <div class="swiper">
      <div class="smoke">
        <img :src="smoke" />
      </div>
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in list" :key="item.id">
          <div class="title">{{index+1}}/5</div>
          <div class="main">
            <div class="head">{{item.question}}</div>
            <div class="options">
              <div
                class="item"
                v-for="(choice,index) in options[index]"
                :key="index"
                @click="allow[item.index-1] && check(item.index,index,item.id)"
                v-bind:class="{active:choose[item.index-1] === index}"
              >
                <div class="circle">
                  <div class="small" v-show="choose[item.index-1]===index"></div>
                </div>
                <div class="tip">{{choice}}</div>
                <img
                  :src="correct"
                  v-show="index===optionSwitch[item.answer] && !allow[item.index-1] "
                />
                <img :src="wrong" v-show="!allow[item.index-1] &&answers[item.index-1]!==index && index===choose[item.index-1]" />
              </div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
      </swiper>
    </div>
    <div class="submit" @click="submit" v-show="choose.length===5">提交</div>
    <div class="bg">
      <img :src="bg" />
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import bg from "../assets/bg.png";
import smoke from "../assets/smoke.png";
import correct from "../assets/correct.png";
import wrong from "../assets/wrong.png";
const baseUrl = "http://111.230.183.100:5000";
const optionSwitch = {
  A: 0,
  B: 1,
  C: 2,
  D: 3
};

export default {
  name: "index",
  data() {
    return {
      list: [],
      options: [],
      allow: [true, true, true, true, true],
      choose: [],
      answers: [],
      correctList: [],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet(index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom"></span>`;
          }
        }
      },
      optionSwitch: optionSwitch,
      bg,
      smoke,
      correct,
      wrong
    };
  },
  mounted() {
    $.ajax({
      url: baseUrl + "/getList",
      type: "GET",
      success: res => {
        let i = 0;
        this.list = res.map(item => {
          return {
            ...item,
            index: ++i
          };
        });
        this.options = this.list.map(item => {
          return [item.A, item.B, item.C, item.D];
        });
        this.answers = this.list.map(item => optionSwitch[item.answer]);
      }
    });
  },
  methods: {
    submit() {
      $.ajax({
        url: baseUrl + "/check",
        type: "POST",
        data: {
          correctNum: this.correctList.length
        },
        success: res => {
          console.log({ res });
        }
      });
    },
    check(n, i, id) {
      this.$set(this.allow, n - 1, false);
      this.$set(this.choose, n - 1, i);
      if (this.choose[n - 1] === this.answers[n - 1]) {
        this.correctList.push(id);
      }
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
.questions .smoke {
  width: 100%;
  text-align: right;
  position: fixed;
  top: 70vw;
}
.questions .smoke img {
  width: 60%;
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
.questions .options .item img {
  width: 7%;
  position: absolute;
  right: 7%;
}
</style>