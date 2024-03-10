import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data)
}

const addContact = newContact => {
    const request = axios.post(baseUrl,newContact)
    return request.then(response => response.data)
}

const removeContact = contact2Delete => {
    const request = axios.delete(baseUrl+"/"+contact2Delete)
    return request.then(response => response.data)
}

export default {getAll,addContact,removeContact}