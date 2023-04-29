const catAPIURL = 'https://api.thecatapi.com/v1/images/search';
const key = 'live_xV4RyocMtmrbbQqmRmrKx8oBIwysDrevYMtamk1wnCq7EcVJvzwxQrBU1P9iBpBh';
let url;

module.exports = {
    getImages(limit, breed) {
        if (limit && breed) {
            url = `${catAPIURL}?limit=${limit}&breed_ids=${breed}&api_key=${key}`;
        } 
        else if (!limit && breed) {
            url = `${catAPIURL}?breed_ids=${breed}&api_key=${key}`;
        }
        else if (!breed && limit) {
            url = `${catAPIURL}?limit=${limit}&api_key=${key}`;
        }
        else {
            url = catAPIURL;
        }

        return url;
    }
}