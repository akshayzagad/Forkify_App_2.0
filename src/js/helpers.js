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