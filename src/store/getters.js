export default {
  totalPrice(state) {
    let total = 0
    state.cartList.forEach(item => {
      item.pro.forEach(i => {
        if (i.click) {
          total += parseFloat(i.nowprice.substr(1)) * i.num
        }
      })
    });
    if(total>=10000){
      total=total/10000
      return '￥'+total+'万'
    }
    return '￥'+total.toFixed(2)
  },
  oldTotalPrice(state){
    let total = 0
    state.cartList.forEach(item => {
      item.pro.forEach(i => {
        if (i.click) {
          total += parseFloat(i.oldprice.substr(1)) * i.num
        }
      })
    });
    if(total>=10000){
      total=total/10000
      return '￥'+total+'万'
    }
    return '￥'+total.toFixed(2)
  },
  counter(state){
    let counter=0
    state.cartList.forEach(item => {
      item.pro.forEach(i=>{
        if(i.click){
          counter+=i.num
        }
      })
    })
    return counter
  }
}