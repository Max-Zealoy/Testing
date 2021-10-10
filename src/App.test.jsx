// Important - do this if you don't want to import 
// React in every component
import React from 'react';
globalThis.React = React;

// Import of test-utilities
// (there are more like screen but nut using them here)
// see: https://reactjs.org/docs/test-utils.html
// and https://testing-library.com/docs/queries/about/
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

// Make fetch work be mocking it with node-fetch
// (does require that you run the backend whilst running tests)
let f = require('node-fetch');
window.fetch = function (...args) {
  if (args[0].indexOf('/') === 0) {
    args[0] = 'http://localhost:4001' + args[0];
  }
  return f(...args);
}

// A function that let us sleep
// (waiting for fetches, re-renders etc)
let sleep = ms => new Promise(res => setTimeout(res, ms));

// Import App - this means we can test anything in the application
// by the principle: Click on it and check what happens :)
import App from './App';


// test('that that adding two items of the first product gives a correct row-sum in the cart', async () => {

//   await act(async () => {

//     render(<App />);
//     await sleep(1000); // wait for fetches

//     // Check that the cart is empty initially
//     expect(document.querySelector('.cart').innerHTML.includes('The cart is empty')).toBe(true);

//     // Check the price of the first product
//     let products = document.querySelectorAll('.product');
//     let priceOfFirstProduct = products[0].querySelector('.price').innerHTML
//     priceOfFirstProduct = +priceOfFirstProduct.split('$')[1].split('<')[0];

//     // Simulate two clicks on the more button of the first product
//     let moreButtons = document.querySelectorAll('.product .more');
//     moreButtons[0].click();
//     moreButtons[0].click();
//     await sleep(200);

//     // Get all products in the cart
//     let productsInCart = document.querySelectorAll('.productInCart');
//     // Get the row sum of the first product in the cart
//     let rowSum = productsInCart[0].querySelector('.rowSum').innerHTML;
//     rowSum = +rowSum.split('$')[1];
//     expect(rowSum.toFixed(2)).toBe((priceOfFirstProduct * 2).toFixed(2));

//   });
// }, 50000);


// Test that the cart is initially empty  Works
test('that the cart is empty initially', async () => {
  // Wrap your code in act calls
  // According to https://reactjs.org/docs/test-utils.html:
  // "To prepare a component for assertions, wrap the code 
  // rendering it and performing updates inside an act() call.
  // This makes your test run closer to how React works in the browser."
  await act(async () => {
    render(<App />);
    await sleep(1000); // wait for fetches
    expect(document.querySelector('.cart').innerHTML.includes('The cart is empty')).toBe(true);
  });
},50000);





test('the shopping cart should be empty after empty-cart-button get clicked ', async () => {

  await act(async () => {
 
     render(<App />);
     await sleep(1000); // wait for fetches
     let emptyCartButton = document.querySelector('.empty-cart')
     console.log(emptyCartButton);
     act(() => {
      emptyCartButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
     await sleep(200);
     expect(document.querySelector('.cart').innerHTML.includes('The cart is empty')).toBe(true);
   });
 }, 50000);
//lägg till en act





test('less button', async () => { 
  await act(async () => { 
    render(<App />);
    await sleep(1000); 
    let lessButtons = document.querySelectorAll('.product .less');
    lessButtons[0].click();

    //lessButtons[0].click();
    await sleep(200);
    // expect(linkElement).toBeInTheDocument();

  });
},50000);



