<template>
  <div class="Profile">
    <nav-bar class="profile-nav">
      <template v-slot:center>
        <div>我的信息</div>
      </template>
    </nav-bar>
    <pro-login></pro-login>
    <account></account>
    <normal-list :listItem="order"></normal-list>
    <normal-list :listItem="service"></normal-list>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"; //导航栏
import ProLogin from "./childComps/ProLogin.vue" //登录注册组件
import Account from "./childComps/Account.vue"//统计
import NormalList from "./childComps/NormalList.vue"//服务功能
export default {
  name:'Profile',
  components:{
    NavBar,
    ProLogin,
    Account,
    NormalList
  },
  data() {
    	return {
		    order: [
			    {icon: 'message.svg', info: '我的消息'},
			    {icon: 'pointer.svg', info: '积分商城'},
			    {icon: 'vip.svg', info: '会员卡'},
		    ],
		    service: [
			    {icon: 'cart.svg', info: '我的购物车'},
			    {icon: 'shopping.svg', info: '下载购物APP'},
		    ]
      }
    }
}
</script>

<style scoped>
.profile-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 20px;
  z-index: 99;
}
</style>