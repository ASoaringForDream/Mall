<template>
  <div class="account">
    <div class="balance">
      <div class="balance_num"><span class="num">0.00</span>元</div>
      <div class="account_info">我的余额</div>
    </div>
    <div class="ticket">
      <div class="ticket_num">
        <span class="num">0</span>个</div>
      <div class="account_info">我的优惠</div>
    </div>
    <div class="integral">
      <div class="integral_num">
        <span class="num">0</span>分</div>
      <div class="account_info">我的积分</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Account",
};
</script>

<style scoped>
.account {
  display: flex;
  height: 85px;
  text-align: center;
  font-size: 14px;
}
.account>div {
  padding-top: 20px;
}
.ticket {
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
.num {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}
.account_info {
  margin-top: 5px;
}
.account div {
  flex: 1;
}
</style>