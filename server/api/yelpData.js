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
    location: "new york",
    term: "vegan",
    limit: 10,
  },
}).then(({ data }) => {
  let { businesses } = data;
  console.log('businesses categories:',businesses)
  businesses.forEach((b) => {
    console.log("Name: ", b.name);
  });
});

