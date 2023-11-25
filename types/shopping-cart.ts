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
