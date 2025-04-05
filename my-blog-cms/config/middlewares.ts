module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      headers: '*',
      origin: [
        'http://localhost:3000',
        'https://drivewaydetailing-nextjs-production.up.railway.app',
        'https://dwdetail.com',
        'https://www.dwdetail.com'
      ]
    }
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];