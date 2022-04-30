import { request } from "./request"
export function getDetail(id){
  return request({
    url:'/detail',
    params:{
      iid:id
    }
  })
}
export function getRecommend() {
	return request({
		url: '/recommend'
	})
}
export class Goods {
	constructor(itemInfo, columns, services) {
		this.title = itemInfo.title
		this.desc = itemInfo.desc
		this.newPrice = itemInfo.price
		this.oldPrice = itemInfo.oldPrice
		this.discount = itemInfo.discountDesc
		this.columns = columns
		this.services = services
		this.realPrice = itemInfo.lowNowPrice
	}
}
export class Shop {
	constructor(shopInfo) {
		this.logo=shopInfo.shopLogo;
		this.name=shopInfo.name
		this.cFans=shopInfo.cFans
		this.cSells=shopInfo.cSells
		this.cGoods=shopInfo.cGoods
		this.score=shopInfo.score
	}
}
export class CartInfo{
	constructor(iid,res){
		this.iid=iid
		this.shopId=res.shopInfo.shopId
		this.shopLogo=res.shopInfo.shopLogo
		this.shopName=res.shopInfo.name
		this.title=res.skuInfo.title
		this.desc=res.itemInfo.desc
		this.labels=res.skuInfo.props
		this.cate=res.skuInfo.skus
	}
}