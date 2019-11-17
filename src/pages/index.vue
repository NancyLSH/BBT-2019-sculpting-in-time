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
                @click="check(item.id,index)"
              >
                <div class="circle">
                  <div class="small" v-show="false"></div>
                </div>
                <div class="tip">{{choice}}</div>
                <img :src="correct" v-show="false" />
                <img :src="wrong" v-show="false" />
              </div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
      </swiper>
    </div>
    <div class="btn submit" @click="submit">提交</div>
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
  0: "A",
  1: "B",
  2: "C",
  3: "D"
};

export default {
  name: "index",
  data() {
    return {
      list: [],
      options: [],
      allow: [true, true, true, true, true],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet(index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom"></span>`;
          }
        }
      },
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
            index: i++
          };
        });
        console.log("list", this.list);
        this.options = this.list.map(item => {
          return [item.A, item.B, item.C, item.D];
        });
      }
    });
  },
  methods: {
    submit() {
      this.$router.push("/result");
    },
    check(question_id, index) {
      let option = optionSwitch[index];
      console.log({ option });
      $.ajax({
        url: baseUrl + "/check",
        type: "POST",
        data: {
          question_id,
          option
        },
        success: res => {
          console.log({ res });
        }
      });
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
  font-weight: 500;
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
  font-weight: 400;
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
.swiper .main .options .active {
  background-color: rgba(216, 212, 196, 0.06);
}
.submit {
  margin: 10vw auto 20vw auto;
}

.questions .options .item img {
  width: 7%;
  position: absolute;
  right: 7%;
}
</style>