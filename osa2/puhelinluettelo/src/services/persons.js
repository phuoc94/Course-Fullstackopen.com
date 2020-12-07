import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log("fail", error);
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
