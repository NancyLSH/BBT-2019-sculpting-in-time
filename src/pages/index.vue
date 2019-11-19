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
                v-for="(choice,index) in options[item.index]"
                :key="index"
                @click="allow[item.index]&&check(item.id,index,item.index)"
                v-bind:class="{active:chooseList[item.index][index]==='choose'}"
              >
                <div class="circle">
                  <div class="small" v-show="chooseList[item.index][index]==='choose'"></div>
                </div>
                <div class="tip" style="pointer-events: none;">{{choice}}</div>
                <img :src="correct" v-show="answerList[item.index][index]==='correct'" />
                <img :src="wrong" v-show="answerList[item.index][index]==='wrong'" />
              </div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
      </swiper>
    </div>
    <div style="padding-bottom:20vw">
      <div class="btn submit" @click="submit" v-show="answerList[4].length">提交</div>
    </div>
    <div class="bg">
      <img :src="bg" />
    </div>
    <div class="roleTip" v-show="showTip">
      <div class="box" @click="hide">
        <div style="display:flex;flex-direction:column;align-items:center;">
          <div class="title">猜猜看规则</div>
          <div class="text">
            1.猜猜看每局共有5题，全部以选择题 形式出现。
            <br />2.答题正确率在80%以上可以加5%许 愿值。
          </div>
        </div>
        <div class="btn" @click="hide">X</div>
      </div>
    </div>
  </div>
</template>

<script>
import bg from "../assets/bg.png";
import smoke from "../assets/smoke.png";
import correct from "../assets/correct.png";
import wrong from "../assets/wrong.png";
import apis from "../API/apis";
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
      showTip: true,
      list: [],
      options: [],
      allow: [true, true, true, true, true],
      answerList: [[""], [], [], [], []],
      chooseList: [[""], [], [], [], []],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      bg,
      smoke,
      correct,
      wrong
    };
  },
  created() {
    if (this.$route.params.showTip === false) {
      this.showTip = false;
    }
  },
  mounted() {
    apis.checkTime(res => {
      if (res.errcode !== 0) {
        this.allow = this.allow.map(() => {
          return false;
        });
      }
    });
    apis.getList(res => {
      let i = 0;
      this.list = res.map(item => {
        return {
          ...item,
          index: i++
        };
      });
      this.options = this.list.map(item => {
        return [item.A, item.B, item.C, item.D];
      });
    });
  },
  methods: {
    submit() {
      apis.commit(res => {
        this.$router.push({
          name: "result",
          params: { res: res }
        });
      });
    },
    check(question_id, index, numIndex) {
      this.chooseList[numIndex][index] = "choose";
      let option = optionSwitch[index];
      apis.check(question_id, option, res => {
        this.allow[numIndex] = false;
        let correctIndex = this.findKey(res.answer);
        this.$set(this.answerList[numIndex], correctIndex, "correct");

        if (res.errcode === 1) {
          this.$set(this.answerList[numIndex], index, "wrong");
        }
      });
    },
    findKey(value, compare = (a, b) => a === b) {
      return Object.keys(optionSwitch).find(k =>
        compare(optionSwitch[k], value)
      );
    },
    hide() {
      this.showTip = false;
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
  margin-bottom: 15vw;
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
  cursor: pointer !important;
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
  margin: 10vw auto 0vw auto;
}

.questions .options .item img {
  width: 7%;
  position: absolute;
  right: 7%;
}

.questions .roleTip {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 23;
  background-color: rgba(0, 0, 0, 0.5);
}
.questions .roleTip .box {
  position: absolute;
  width: 62%;
  height: 68.7vw;
  background-color: #d8d4c4;
  border-radius: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4vw;
  box-sizing: border-box;
  justify-content: space-between;
}
.questions .roleTip .box .title {
  color: #000000;
  font-size: 6vw;
}
.questions .roleTip .box .text {
  font-size: 4vw;
  color: #000000;
}
.questions .roleTip .box .btn {
  border-radius: 50%;
  width: 28px;
  height: 28px;
  border: #000000 solid 1px;
  padding: 0;
  margin: 0;
  line-height: 28px;
  text-align: center;
  font-weight: 400;
  color: #000000;
}
</style>