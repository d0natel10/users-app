const axios = require('axios');

(async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8080/api/users/getUsers')
        console.log(response.data)
    }
    catch (e) {
        console.log(e.message);
    }
    
})()