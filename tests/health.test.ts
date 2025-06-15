import request from 'supertest';
import { expect } from 'chai';
import { app } from '../src/app/app';

describe('GET /health', () => {
  it('should return 200 and status ok', async () => {
    const res = await request(app).get('/health');

    expect(res.body).to.deep.equal({
      success: true,
      status_code: 200,
      message: "Health fetched successfully!",
      data: 'App Health: OK',
      error: null
    });
  });
});
