import mockjs from 'mockjs';

export default {
    'GET /api/getProduct': mockjs.mock({
        'list|20': [{ brand: 'Jacquemus',  productName: '@title', 'id|1': ['T817274', 'T185770']}],
        more: true
      }),
      'Get /api/getDetail/T817274': {
        ProductId: 'T817274',
        Season: 'New Season',
        Brand: 'Jacquemus',
        Name: 'Jacquemus Le chiquito Foldover Long Tote Bag',
        Price: '$713.42',
        Imgs: [
            'https://m.360buyimg.com/babel/jfs/t1/185569/13/31711/669824/63a81270E4ffb7de4/b4a9de5ea3d42f44.png',
            'https://m.360buyimg.com/babel/jfs/t1/73731/13/24418/58790/63a8126dE555cec79/6b9f6d63e1303b16.png',
            'https://m.360buyimg.com/babel/jfs/t1/133864/38/32899/69158/63a81239E23fcddfc/124b9def9a16e405.png',
            'https://m.360buyimg.com/babel/jfs/t1/244/22/16762/96605/63a81288E0701459c/f84a07a1069932f5.png'
        ]
      },
      'Get /api/getDetail/T185770': {
        ProductId: 'T185770',
        Season: 'New Season',
        Brand: 'Saint Laurent',
        Name: 'Saint Laurent Monogram Patterned Velvet Detailed Duffle Bag',
        Price: '$613.42',
        Imgs: [
            'https://m.360buyimg.com/babel/jfs/t1/180565/34/32392/44374/63a81236E654b0706/768b2ffd832ec45a.png',
            'https://m.360buyimg.com/babel/jfs/t1/204798/1/29905/87066/63a8127dEffcc7b96/35813a15e648b153.png',
            'https://m.360buyimg.com/babel/jfs/t1/189678/29/31081/93083/63a81237E687dad2a/7fd035bb1dafbbc0.png',
        ]
      }
  }
  