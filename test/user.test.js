const express = require('express');
const request = require('supertest');
const {
  beforeAction,
  afterAction,
} = require('./setup/_setup');

const app = express();

let api;
beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

test('User Register', async () => {
  const randomString = Math.random().toString(36).substring(7);

  const res = await request(api)
    .post('/public/register')
    .set('Accept', /json/)
    .send({
      email: `${randomString}@minsu-lee.com`,
      password: 'pwtest',
      password2: 'pwtest',
    })
    .expect(200);
    expect(res.body.rows.affectedRows).toBe(1)
});

test('User login', async () => {
  const res1 = await request(api)
    .post('/public/register')
    .set('Accept', /json/)
    .send({
      email: `test@minsu-lee.com`,
      password: 'pwtest',
      password2: 'pwtest',
    })

  const res2 = await request(api)
    .post('/public/login')
    .set('Accept', /json/)
    .send({
      email: 'test@minsu-lee.com',
      password: 'pwtest',
    })
    .expect(200);
  
  const returnType = {
    token: expect.any(String),
    user: {
      id: expect.any(Number),
      email: expect.any(String),
      password: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    }
  }
  expect(res2.body).toMatchObject(returnType)
})