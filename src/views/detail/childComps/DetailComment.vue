<template>
  <div v-if="Object.keys(Comment).length !== 0" class="DetailComment">
    <div class="Commenttitle">
      <span class="title">用户评价</span>
      <span class="more">更多({{ showNum(Comment.cRate) }})</span>
    </div>
    <div class="user" v-if="Comment.list">
      <img :src="Comment.list[0].user.avatar" alt="" />
      <span>{{ Comment.list[0].user.uname }}</span>
    </div>
    <div class="content" v-if="Comment.list">
      {{ Comment.list[0].content }}
    </div>
    <div class="others-info" v-if="Comment.list">
      <span class="date">{{ showDate(Comment.list[0].created) }}</span>
      <span class="style">{{ Comment.list[0].style }}</span>
      <div class="img">
        <span v-for="item in Comment.list[0].images" :key="item">
          <img :src="item" alt="" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { dataFormat } from "common/utils.js";
export default {
  name: "DetailComment",
  props: {
    Comment: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showDate() {
      return (value) => {
        return dataFormat(value * 1000);
      };
    },
    showNum() {
      return (value) => {
        if (value > 99) {
          return "99+";
        } else {
          return value;
        }
      };
    },
  },
};
</script>

<style scoped>
.DetailComment {
  padding: 0 15px 20px;
  border-bottom: 5px solid #f2f5f8;
}
.Commenttitle {
  height: 60px;
  line-height: 60px;
  color: #000;
  border-bottom: 1px solid rgba(100, 100, 100, 0.3);
}
.Commenttitle .more {
  float: right;
  font-size: 14px;
}
.user {
  margin-top: 10px;
}
.user img {
  width: 50px;
  height: 50px;
  border-radius: 25px;
}
.user span {
  margin-left: 10px;
  position: relative;
  bottom: 20px;
  font-size: 16px;
  color: #000;
}
.content {
  margin: 15px 10px;
  font-size: 16px;
}
.others-info {
  font-size: 12px;
  /* height: 30px; */
  margin: 0 10px;
}
.others-info .img {
  margin-top: 10px;
}
.others-info .style {
  margin-left: 10px;
}
.others-info .img img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>