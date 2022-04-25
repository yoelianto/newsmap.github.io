import axios from 'axios';
import * as ihttp from '../constants/initialHttp';
import { localStore } from '../helper';

const URL_API = process['env']['URL_API'];

export const getToken = async (isServer = false) => {
    const url = `${URL_API}${ihttp.URI_TOKEN}`;

    const token = await axios.get(url)
        .then(result => result.data.access_token)
        .catch(error => {
            return { error: true, message: error };
        });

    if (!isServer) {
        localStore('token', token, 'set');
    }
    return token;
}

export const get = async (uri, params = {}, isServer = false) => {
    const url = `${URL_API}${uri}`;
    const tokenStr = isServer ? await getToken(true) : localStore('token');

    const result = await axios.get(url, { headers: { "Authorization": `JWT ${tokenStr}` }, params })
        .then(result => result.data)
        .catch(error => {
            return { error: true, message: error };
        });

    return result;
}