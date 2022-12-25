import mockjs from 'mockjs';

export default {
    'GET /api/getProduct': mockjs.mock({
        'list|100': [{ brand: 'Jacquemus',  productName: '@title'}],
      })
  }
  