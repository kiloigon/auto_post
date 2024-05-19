const axios = require("axios")
const fs = require("fs");
// const adapter = require('@shopify/shopify-api/adapters/node')
//
// const {shopifyApi, LATEST_API_VERSION} = require('@shopify/shopify-api');
const dotenv = require("dotenv");
dotenv.config()

const shopName = 'jjrab'; // Replace with your Shopify shop name
const accessToken = 'shpua_d900ebefceab1a9f4701b9bbe5634950'; // Replace with your Shopify access token

const baseUrl = `https://${shopName}.myshopify.com/admin/`; // Update API version if needed

async function getAllProducts() {
    const products = [];
    let hasNextPage = true;
    let nextPageUrl = `${baseUrl}products.json`;

    while (hasNextPage) {
        const response = await axios.get(nextPageUrl, {
            headers: {
                'X-Shopify-Access-Token': accessToken,
            },
        });
        console.log("---> ",response.data.products)
        products.push(...response.data.products);
        nextPageUrl = response.data.next_page_link;
        hasNextPage = nextPageUrl !== null;
    }

    return products;
}

(async () => {
    try {
        const allProducts = await getAllProducts();
        console.log(allProducts); // Array containing all product data
    } catch (error) {
        console.error(error);
    }
})();

//
// const shopify = shopifyApi({
//     // The next 4 values are typically read from environment variables for added security
//     apiKey: process.env.SHOPIFY_API_KEY,
//     apiSecretKey: process.env.SHOPIFY_API_SECRET,
//     scopes: ['read_products'],
//     hostName: process.env.TUNNEL_URL
//
// });
// const client = new shopify.clients.Rest({accessToken: "shpua_d900ebefceab1a9f4701b9bbe5634950"});
// const response = client.get({path: 'shop'}).then(resp => console.log(resp));
//
// resp = axios.post("https://jjrab.myshopify.com/admin/oauth/access_token", {
//
//     "client_id": "fc1aa7f1da8d1e35eb8cac5cb3694ef0",
//     "client_secret": "2901be55dbb7a8df21c824fe2061c6c1",
//     "grant_type": "urn:ietf:params:oauth:grant-type:token-exchange",
//     "subject_token": "shpua_d900ebefceab1a9f4701b9bbe5634950",
//     "subject_token_type": "urn:ietf:params:oauth:token-type:id_token",
//     "requested_token_type": "urn:shopify:params:oauth:token-type:online-access-token"
//     // }
// }, {
//     "headers": {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//     }
// }).then(res => {
//
//     fs.writeFileSync("./test.html", res.response.data)
// }).catch(err => {
//     console.log(err.response.data)
//     fs.writeFileSync("./test.html", err.response.data)
//     // console.log("error",err)
// })
//
