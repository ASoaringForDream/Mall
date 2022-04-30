import {ADD_CART,ADD_COUNTER,ADD_PRO,CHANGE_SHOP_CLICK,CHANGE_ITEM_CLICK} from './mutation_types'
export default{
  [ADD_COUNTER](state,payload){
    payload[0].num +=payload[1]
  },
  [ADD_CART](state, payload) {
    state.cartList.push(payload)
  },
  [ADD_PRO](state,payload) {
    payload[0].pro.push(payload[1])
  },
  [CHANGE_SHOP_CLICK](state,payload){
    state.cartList.forEach(item => {
      if(item.id===payload[0]){
        item.click=payload[1]
        item.pro.forEach(i => {
          i.click=payload[1]
        })
      }
    });
  },
  [CHANGE_ITEM_CLICK](state,payload){
    state.cartList.forEach(item => {
      let flag=true
      item.pro.forEach(i => {
        if(i.stockId===payload[0]){
          i.click=payload[1];
        }
        if(i.click===false){
          flag=false
        }
      })
      item.click=flag
    })
  },
  changepro(state,payload){
    state.cartList.forEach(item => {
      if(item.id===payload[0].id){
        item.pro=item.pro.filter(i=>{
          if(i.stockId===payload[1]){
            return false
          }
          return true
        })
      }
    })
  },
  delPro(state,payload){
    state.cartList=state.cartList.filter(item => {
      item.pro=item.pro.filter(i => {
        if(i.stockId===payload){
          return false
        }
        return true
      })
      if(item.pro.length===0){
        return false
      }
      return true
    })
  }
}