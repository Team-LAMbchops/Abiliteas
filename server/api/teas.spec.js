/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Tea = db.model('tea')

describe('Tea routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('api/teas/', () => {
    const invisibleTeaName = 'invisitea'

    beforeEach(() => {
      return Tea.create({
        name: invisibleTeaName
      })
    })

    it('GET /api/teas', async () => {
      const res = await request(app)
        .get('/api/teas')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(invisibleTeaName)
    })
  })
})
