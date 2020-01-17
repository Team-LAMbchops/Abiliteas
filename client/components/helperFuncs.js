export const findPrice = num => {
  const mustNum = Number(num)
  const finalPrice = mustNum / 100
  return finalPrice
}
//itemsArr should be the array containing all the teas
//qtyObj is the qty obj in the cart
export const findTotal = (itemsArr, qtyObj) => {
  let total = 0
  for (let items of itemsArr) {
    let price = items.price / 100
    let quantity = qtyObj[items.id]
    total += price * quantity
  }
  return total
}
