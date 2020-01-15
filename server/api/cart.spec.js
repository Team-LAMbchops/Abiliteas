/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const CartProduct = db.model('cart_product')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let ming
  let ariana //is this supposed to be grey?

  beforeEach('Seed users', async () => {
    //this might be optional?

    const users = [
      {
        firstName: 'Ming',
        lastName: 'Chen',
        address: 'abc',
        email: 'ming@email.com',
        password: '123',
        isAdmin: true,
        cartId: 1
      },
      {
        firstName: 'Ariana',
        lastName: 'Hwang',
        address: 'abc',
        email: 'ariana@email.com',
        password: '123',
        isAdmin: true,
        cartId: 2
      }
    ]
    const createdUsers = await User.bulkCreate(users, {returning: true})
    ming = createdUsers[0].id
    ariana = createdUsers[1].id
  })

  let shoppingCartProductsOne //is this supposed to be grey?
  let shoppingCartProductsTwo

  beforeEach('Seed cart products', async () => {
    //this might be optional?
    const products = [
      {
        quantity: 3,
        cartId: 1,
        teaId: 4
      },

      {
        quantity: 5,
        cartId: 1,
        teaId: 3
      }
    ]
    const createdProducts = await CartProduct.bulkCreate(products, {
      returning: true
    })
    shoppingCartProductsOne = createdProducts[0].cartId
    shoppingCartProductsTwo = createdProducts[1].cartId
  })

  describe('/api/cart/:UserId', () => {
    //eager loading

    it('serves up a cart - WITH CART PRODUCTS - for a specific user on GET /api/cart/:UserId', async () => {
      const res = await request(app)
        .get(`/api/cart/1`)
        .expect(201)

      expect(res.body).to.be.an('array')
      expect(res.body[0].id).to.be.equal(ming)
      expect(res.body[0].cartId).to.be.equal(shoppingCartProductsTwo) //it's equal to both. Not sure how I should write this?
    })
  })
})
