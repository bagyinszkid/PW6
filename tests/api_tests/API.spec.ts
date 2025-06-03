import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import { parse } from 'csv-parse/sync';

test('API one', async ({ request }) => {

  // send GET request to endpoint and check if Status is good
  const response = await request.get('https://reqres.in/api/login');
  expect(response).toBeOK();

  // Check that you've received the expected number of items in the “data” array.
  // The expected number of items in this case is 6

  const text = await response.json();
  expect(text.data).toHaveLength(6);
 
});

test('API second', async ({ request }) => {
  
  // send POST request to endpoint and check if Status is good
  const response = await request.post('https://reqres.in/api/register', {
    data: {
      email: 'eve.holt@reqres.in',
      password: 'mypassword'
    }
  });

  expect(response).toBeOK();
  
  // test the type of the responses 
  const register = await response.json();
  
  expect(register.id).toEqual(expect.any(Number));
  expect(register.token).toEqual(expect.any(String));
  
});

// set up and read in test cases from a CSV file
const records = parse(fs.readFileSync('test-data/api_testdata_test3.csv'), {
  columns: true,
  skip_empty_lines: true
});

// send POST request to endpoint and check if Status is 400 (Bad Request)
// create a test for each record in CSV
for (const record of records) {
  test(`Record ${record.index}`, async ({ request }) => {

    const response = await request.post('https://reqres.in/api/register', {
      data: {
        email: record.email,
        password: record.password
      }
    });

    expect(response.status()).toBe(400);

    const errorText = await response.json();

    //error response text is according to error type 
    if (record.email === '') {
      expect(await errorText.error).toBe('Missing email or username');
    } else if (record.password === '') {
      expect(await errorText.error).toBe('Missing password');
    } else {
      expect(await errorText.error).toBe('Note: Only defined users succeed registration');
    }
  })
};
