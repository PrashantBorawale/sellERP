const axios = require('axios');

async function test() {
  try {
    const response = await axios.get('https://sellerp-backend.onrender.com/Account/invoice/date-filter/', {
      params: {
        from_date: '2026-05-01',
        to_date: '2026-05-10'
      }
    });
    console.log(JSON.stringify(response.data, null, 2).substring(0, 500));
  } catch (err) {
    console.error(err.message);
  }
}

test();
