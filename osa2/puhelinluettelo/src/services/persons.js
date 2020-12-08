import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl);
    return request
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log("P cannot load", error);
            return request
        });
};

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log("fail", error);
        });
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return request
        });
};

const del = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request
        .then((response) => {
            return response.status;
        })
}

// eslint-disable-next-line
export default {
    getAll,
    create,
    update,
    del
};
