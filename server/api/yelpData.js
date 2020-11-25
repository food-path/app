const axios = require("axios");

let API_KEY =
  "ls257Ls4aesR09k4XvsoTRKD0Gweg-ogvQi4Lafbkdhi-71_vYHHmRZhUOAU0G1PolGfxHsWjbzbVloxtihgiuscn5FBaeGCTzmr2S2fy87SWHcDoAetV4QlK3y9X3Yx";

// REST
let yelpREST = axios.create({
  baseURL: "https://api.yelp.com/v3/",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-type": "application/json",
  },
});

yelpREST("/businesses/search", {
  params: {
    location: "kyoto",
    term: "coffee",
    limit: 10,
  },
}).then(({ data }) => {
  let { businesses } = data;
  console.log('businesses:',businesses)
  businesses.forEach((b) => {
    console.log("Name: ", b.name);
  });
});

//import axios from "axios";

// const options = {
//   method: 'GET',
//   url: 'https://api.yelp.com/v3/businesses/search',
//   headers: {
//     Authorization: `Bearer ${API_KEY}`,
//     "Content-type": "application/json"
//   },
//   data: {
//     accessToken: 'ls257Ls4aesR09k4XvsoTRKD0Gweg-ogvQi4Lafbkdhi-71_vYHHmRZhUOAU0G1PolGfxHsWjbzbVloxtihgiuscn5FBaeGCTzmr2S2fy87SWHcDoAetV4QlK3y9X3Yx',
//     locale: 'kyoto',
//     radius: '4000',
//     term: 'restaurants',
//     limit: '1',
//     categories: 'sushi',
//     sortBy: 'rating'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });