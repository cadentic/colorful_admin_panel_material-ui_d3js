import axios from 'axios';

async function getData() {
    // Use this if needs
    // const config = {
    //     auth: {
    //         username: 'username',
    //         password: 'password'
    //     }
    // }
    // Write an url AND config like (axios.get(url, config)...)
    var url = "/";
    let data = {};
    try {
        const res = await axios.get(url);
        data = res.data;
    } catch (error) {
        console.error(error)
    }
    return data;
}

export default getData;