export interface IShoppingCartItem {
  id: number
  product_name: string
  product_price: number
  image: string
  in_stock: number
  parts_manufacturer: string
  boiler_manufacturer: string
  count: number
  total_price: number
  userId: number
  productId: number
}
export interface IAddToCartFx {
  username: string
  url: string
  productId: number
}

export interface IUpdateCartItemFx {
  url: string
  payload: {
    total_price?: number
    count?: number
  }
}
export interface ICartItemCounterProps {
  totalCount: number
  productId: number
  initialCount: number
  increasePrice: VoidFunction
  decreasePrice: VoidFunction
}
