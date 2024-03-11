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

const updateNumber = (contact,contactID) => {
    const userData = {
        name: contact.name,
        number: contact.number
    }
    const url = baseUrl + "/" + contactID
    const request = axios.put(url,userData)
    return request.then(response => response.data)
}

const removeContact = contact2Delete => {
    const request = axios.delete(baseUrl+"/"+contact2Delete)
    return request.then(response => response.data)
}

export default {getAll,addContact,removeContact,updateNumber}