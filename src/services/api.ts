import axios from "axios";

const api = axios.create({
    // O React Native não deixa utilizar o localhost, porque utilizar o http e o so pode o HTTPS;
    // Sendo assim, para não dá erro é recomendado que utilize o IP para essa função!
    baseURL: 'http://192.168.1.5:3333'
})

export { api };