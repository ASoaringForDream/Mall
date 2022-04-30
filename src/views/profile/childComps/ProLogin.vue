<template>
  <div class="Pro-login">
    <div class="Pro_avatar">
      <img src="~assets/img/profile/avatar.svg" alt="" />
    </div>
    <div class="info">
      <div class="login"><span>登录</span>/<span>注册</span></div>
      <div class="phonenum">
        <img src="~assets/img/profile/phone.svg" alt="" />
        <span class="detailinfo">暂未绑定手机号</span>
      </div>
    </div>
    <div class="enter">
      <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "ProLogin",
};
</script>

<style scoped>
.Pro-login {
  position: relative;
  width: 100vw;
  height: 85px;
  background-color: var(--color-tint);
  padding: 7px 10px;
  display: flex;
}
.Pro_avatar {
  width: 70px;
  height: 70px;
}
.info {
  color: #fff;
  margin-left: 20px;
  margin-top: 15px;
}
.Pro_avatar img {
  width: 70px;
  height: 70px;
}
.phonenum img {
  width: 20px;
  height: 30px;
  vertical-align: middle;
  margin-left: -5px;
}
.phonenum .detailinfo {
  font-size: 14px;
}
.enter img {
  position: absolute;
  right: 10px;
  top: 32px;
  width: 20px;
  height: 20px;
}
</style>