import axios from 'axios';

const CONFIG = window.Config;
if (!CONFIG) {
    throw new Error('[axios.js] configuration.js not found.');
}

const DEVELOPMENT = !!CONFIG.development ? true : false;

/**
 * LOCAL 
 * 
 * instance for communicating with localhost. 
 * in if deleopment is True, it will log all requests and 
 * responses to the console. 
 */
const notebookHttp = axios.create({
    baseURL: !!CONFIG.url ? CONFIG.url : 'http://localhost:3000'
});

if (DEVELOPMENT) {
    // Request
    notebookHttp.interceptors.request.use(
        request => {
            console.log(request);
            return request;
        },
        error => {
            console.log(error);
//            Promise.reject(error);
        }
    );

    // Response
    notebookHttp.interceptors.response.use(
        response => {
            console.log(response);
            return response
        },
        error => {
            console.log(error);
//            Promise.reject(error);
        }
    );
}

export {notebookHttp};