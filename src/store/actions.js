import {ADD_CART,ADD_COUNTER,ADD_PRO} from './mutation_types'
export default {
  addCartPro(context, payload) {
    let shopflag=true
    for (let i of context.state.cartList) {
      if (i.id === payload.id) {
        let flag = true
        for (let item of i.pro) {
          if (item.iid === payload.pro[0].iid && item.stockId === payload.pro[0].stockId) {
            // item.num += payload.pro[0].num
            context.commit(ADD_COUNTER,[item,payload.pro[0].num])
            flag = false
            break
          }
        }
        if (flag) {
          // i.pro.push(payload.pro[0])
          context.commit(ADD_PRO,[i,payload.pro[0]])
        }
        shopflag=false
        break
      }
    }
    if(shopflag){
      // state.cartList.push(payload)
      context.commit(ADD_CART,payload)
    }
  },
}