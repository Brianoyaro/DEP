const fetch = require('axios')
async function test() {
    const resp = await axios.get('https://swapi.dev/api/people/1')
    const data =await resp.json()
    console.log(data)
};
test();