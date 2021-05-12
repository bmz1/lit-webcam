import { expect, fixture } from '@open-wc/testing';

import './lit-webcam.js';

describe('Lit-Webcam', () => {
  it('should render', async () => {
    const el = await fixture(`<lit-webcam width="${640}" height="${480}"></lit-webcam>`);
    expect(el).to.exist;
  });
});
