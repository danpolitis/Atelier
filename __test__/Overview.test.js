/**
 * @jest-environment puppeteer
 */

import 'expect-puppeteer';

describe('Should prompt use to select a size if add to cart is clicked with no size selected', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/');
  });

  it('should be titled "FEC Project Ocelot"', async () => {
    await expect(page.title()).resolves.toMatch('FEC Project Ocelot');
  });

  it('should click add to cart without selecting size', async () => {
    await page.evaluate(()=>document.querySelector('#addToCart').click());
  });

  it('should show message when no size is selected', async () => {
    await expect(page).toMatch('Please select size');
  });
});
