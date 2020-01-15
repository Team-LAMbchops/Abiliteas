'use strict'

const db = require('../server/db')
const {
  User,
  Cart,
  Order,
  Tea,
  CartProduct,
  OrderProduct
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Ming',
      lastName: 'Chen',
      address: 'abc',
      email: 'ming@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      firstName: 'Ariana',
      lastName: 'Hwang',
      address: 'abc',
      email: 'ariana@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      firstName: 'Laura',
      lastName: 'Barger',
      address: 'abc',
      email: 'laura@email.com',
      password: '123',
      isAdmin: true
    }),
    User.create({
      firstName: 'Lizzo',
      lastName: 'Einstein',
      address: 'abc',
      email: 'lizzo@email.com',
      password: '123',
      isAdmin: false
    })
  ])

  const carts = await Promise.all([
    Cart.create({
      userId: 1
    }),
    Cart.create({
      userId: 2
    }),
    Cart.create({
      userId: 3
    }),
    Cart.create({
      userId: 4
    })
  ])

  const products = await Promise.all([
    Tea.create({
      name: 'Telekinesis',
      flavor: 'Patagonian Wild Guava',
      description:
        'This tea gives you the ability to move objects with your mind',
      price: 1000.0,
      inventory: 100,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_PatagonianWildGuava_LG.jpg'
    }),
    Tea.create({
      name: 'Telepathy',
      flavor: 'Blueberry Rooibos',
      description:
        'This tea gives you the ability to control the minds of others',
      price: 10000.0,
      inventory: 200,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_BlueberryRooibos_LG.jpg'
    }),
    Tea.create({
      name: 'Invisibility',
      flavor: 'Chamomile Medley',
      description: 'This tea gives you the ability to be see-through',
      price: 300.0,
      inventory: 4000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_ChamomileMedley_LG.jpg'
    }),
    Tea.create({
      name: 'Mind-control',
      flavor: 'Blue Jasmine',
      description:
        'This tea gives you the ability to control the minds of others',
      price: 1000000.0,
      inventory: 10,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/bluejasmineleaf.jpg'
    }),
    Tea.create({
      name: 'Immortality',
      flavor: 'Hibiscus',
      description: 'This tea gives you the ability to live forever',
      price: 1000.0,
      inventory: 10000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_Hibiscus_LG.jpg'
    }),
    Tea.create({
      name: 'Superstrength',
      flavor: 'Tumeric Mango',
      description:
        'This tea gives you the ability to have super-human stregth, meant for a good workout',
      price: 50.0,
      inventory: 50000,
      imageUrl:
        'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/BulkTea_TurmericMango_LG.jpg'
    })
  ])

  const cartProducts = await Promise.all([
    CartProduct.create({
      quantity: 3,
      cartId: 1,
      teaId: 4
    }),
    CartProduct.create({
      quantity: 5,
      cartId: 1,
      teaId: 3
    }),
    CartProduct.create({
      quantity: 1,
      cartId: 1,
      teaId: 2
    }),
    CartProduct.create({
      quantity: 2,
      cartId: 2,
      teaId: 1
    }),
    CartProduct.create({
      quantity: 1,
      cartId: 2,
      teaId: 6
    }),
    CartProduct.create({
      quantity: 6,
      cartId: 2,
      teaId: 2
    }),
    CartProduct.create({
      quantity: 1,
      cartId: 2,
      teaId: 4
    }),
    CartProduct.create({
      quantity: 1,
      cartId: 3,
      teaId: 1
    }),
    CartProduct.create({
      quantity: 2,
      cartId: 3,
      teaId: 2
    }),
    CartProduct.create({
      quantity: 3,
      cartId: 3,
      teaId: 3
    }),
    CartProduct.create({
      quantity: 1,
      cartId: 4,
      teaId: 1
    })
  ])

  const orders = await Promise.all([
    Order.create({
      address: 'Mars',
      date: '01/14/2019',
      status: 'Delivered',
      userId: 1
    }),
    Order.create({
      address: 'Venus',
      date: '01/20/2019',
      status: 'Delivered',
      userId: 1
    }),
    Order.create({
      address: 'Pluto',
      date: '01/30/2019',
      status: 'Delivered',
      userId: 1
    }),
    Order.create({
      address: 'California',
      date: '02/20/2019',
      status: 'Delivered',
      userId: 2
    }),
    Order.create({
      address: 'New York',
      date: '02/30/2019',
      status: 'Delivered',
      userId: 2
    }),
    Order.create({
      address: 'Avengers Mansion',
      date: '03/20/2019',
      status: 'Delivered',
      userId: 3
    }),
    Order.create({
      address: '4 Yancy St',
      date: '02/30/2019',
      status: 'Delivered',
      userId: 3
    }),
    Order.create({
      address: 'Denver, CO',
      date: '05/30/2019',
      status: 'Delivered',
      userId: 4
    })
  ])

  const orderProducts = await Promise.all([
    OrderProduct.create({
      quantity: 3,
      orderId: 1,
      teaId: 1
    }),
    OrderProduct.create({
      quantity: 3,
      orderId: 1,
      teaId: 2
    }),
    OrderProduct.create({
      quantity: 3,
      orderId: 1,
      teaId: 3
    }),
    OrderProduct.create({
      quantity: 1,
      orderId: 2,
      teaId: 4
    }),
    OrderProduct.create({
      quantity: 1,
      orderId: 2,
      teaId: 5
    }),
    OrderProduct.create({
      quantity: 1,
      orderId: 3,
      teaId: 6
    }),
    OrderProduct.create({
      quantity: 2,
      orderId: 3,
      teaId: 5
    }),
    OrderProduct.create({
      quantity: 1,
      orderId: 4,
      teaId: 6
    }),
    OrderProduct.create({
      quantity: 2,
      orderId: 4,
      teaId: 5
    }),
    OrderProduct.create({
      quantity: 10,
      orderId: 5,
      teaId: 1
    }),
    OrderProduct.create({
      quantity: 5,
      orderId: 6,
      teaId: 2
    }),
    OrderProduct.create({
      quantity: 3,
      orderId: 7,
      teaId: 1
    }),
    OrderProduct.create({
      quantity: 3,
      orderId: 7,
      teaId: 2
    }),
    OrderProduct.create({
      quantity: 3,
      orderId: 8,
      teaId: 5
    })
  ])

  console.log(`seeded ${carts.length} users`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${cartProducts.length} cart products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${orderProducts.length} order products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
