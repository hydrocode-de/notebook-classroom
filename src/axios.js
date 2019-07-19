import axios from 'axios';

const DEVELOPMENT = true;

/**
 * LOCAL 
 * 
 * instance for communicating with localhost. 
 * in if deleopment is True, it will log all requests and 
 * responses to the console. 
 */
const notebookHttp = axios.create({
    baseURL: DEVELOPMENT ? 'http://localhost:3000' : 'http://localhost:80'
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