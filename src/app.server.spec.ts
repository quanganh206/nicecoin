import * as supertest from 'supertest'
import app from './app.server'

describe('App', () => {
  it('Server works', () =>
    supertest(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
  )
});