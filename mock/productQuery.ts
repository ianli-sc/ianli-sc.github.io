import mockjs from 'mockjs';

export default {
    'GET /api/getProduct': mockjs.mock({
        'list|20': [{ brand: 'Jacquemus',  productName: '@title', id: '@natural'}],
        more: true
      })
  }
  