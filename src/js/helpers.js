import { TIME_OUT } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const getJson = async function (url) {
    try {
        const responseApi = await Promise.race([fetch(url), timeout(TIME_OUT)]);

        const responseData = await responseApi.json();

        if (!responseApi.ok) throw new Error(`Somthing went wrong in responseApi.status ${response.status},${responseData.message}`);

        return responseData;

    } catch (err) {

        throw err;

    }

}

export const sendJson = async function (url,uploadData) {
    try {
       const fetchPro = fetch(url,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(uploadData),
       })
        const responseApi = await Promise.race([fetchPro, timeout(TIME_OUT)]);

        const responseData = await responseApi.json();

        if (!responseApi.ok) throw new Error(`Somthing went wrong in responseApi.status ${response.status},${responseData.message}`);

        return responseData;

    } catch (err) {

        throw err;

    }

}