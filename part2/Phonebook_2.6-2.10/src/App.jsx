import { useState, useEffect } from 'react'
import axios from 'axios'
import phoneBookHandler from './persons'

const SectionTitle = (props) => <h2>{props.title}</h2>

const SubmitForm = (props) => {
    return (
        <form onSubmit={props.addContact}>
            <div>
            name: <input value={props.newName} onChange={props.handleContactChange}/>
            </div>
            <div>
            number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
      </form>
    )
}

const SearchFilter = (props) => {
    return (
            <div>
            Filter by: <input value={props.newString} onChange={props.handleFilterStringChange}/>
            </div>
    )
}

const ContactList = (props) => {
        if (props.showAllContacts) {
            return (
                props.contacts.map((card)=>{
                    return (<div key={card.name} >{card.name}: {card.number} <button onClick={()=>props.deleteContact(card.id, card.name)}>Delete</button></div>)
                    }
                )
            )
        } else {
            return (
                props.contacts.filter(
                    item => item.name.toLowerCase().includes(props.newString)).map(filteredName =>{
                        return <div key={filteredName.name} >
                                    {filteredName.name}: {filteredName.number} <button onClick={()=>props.deleteContact(filteredName.id, filteredName.name)}>Delete</button>
                                </div>
                    }
                )
            )
        }
}

const Notification = ({message,mood}) => {
    const notificationClass = mood ? 'notificationPositive' : 'notificationNegative';
    if (message === null) {
        return null
    }
    return (
        <div className={notificationClass}>{message}</div>
    )
}


const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newString, setNewString] = useState('')
    const [showAllContacts, setShowAllContacts] = useState(true)
    const [notificationMessage, setNotificationMessage] = useState("Initial contacts loaded!")
    const [notificationMood, setNotificationMood] = useState(true)

    useEffect(()=>{
        phoneBookHandler
            .getAll()
            .then(response => {
                setPersons(response)
                setTimeout(() => {
                    setNotificationMessage(null,true)
                  }, 1000)
        })
    },[])



    const addContact = (event) => {
        event.preventDefault()
        const newContactCard = {
            name: newName,
            number: newNumber
        }
        let newContactIDFound = ''
        if (findEquals(newContactCard.name, persons)) {
            persons.forEach((p) => {
                if (newContactCard.name.replace(/\s/g, '').toLowerCase() === p.name.replace(/\s/g, '').toLowerCase()){
                    newContactIDFound = p.id
                }}
            )
            if (window.confirm(newContactCard.name + " already exists. Do you want to update the number?")) {
                setNotificationMessage(`${newContactCard.name} contacts was updated`,true)
                setNotificationMood(true)
                setTimeout(() => {
                    setNotificationMessage(null)
                  }, 5000)
                phoneBookHandler
                        .updateNumber(newContactCard,newContactIDFound)
                        .then(() =>{
                            phoneBookHandler
                                    .getAll()
                                    .then(response => {
                                    setPersons(response)
                                    setNewName('')
                                    setNewNumber('')
                                    })
                        })
                        .catch(error => {
                            setNotificationMessage(`${newContactCard.name} has been already removed from contacts`,false)
                            setNotificationMood(false)
                            setTimeout(() => {
                                setNotificationMessage(null)
                                }, 5000)
                        })
            }
        } else {
            setNotificationMessage(`${newContactCard.name} was added to the contacts`)
            setNotificationMood(true)
            phoneBookHandler
                .addContact(newContactCard)
                .then(response => {
                    //setPersons(persons.concat(response))
                    setPersons(response)
                    setNewName('')
                    setNewNumber('')
                })
                setTimeout(() => {
                    setNotificationMessage(null)
                  }, 5000)
        }
    }
    const deleteContact = (id,contact) =>{
        if (window.confirm("Do you want to delete '" + contact +"' from your contact list?")){
            setNotificationMessage(`${contact} was removed from contacts`,true)
            setNotificationMood(true)
            setTimeout(() => {
                setNotificationMessage(null)
                }, 2000)
            phoneBookHandler.removeContact(id)
                            .then(() => {
                                phoneBookHandler
                                            .getAll()
                                            .then(response => {
                                                setPersons(response)
                                    })
                            })
                            
        }
    }

    const handleContactChange = (event) => {
        event.preventDefault()
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        event.preventDefault()
        setNewNumber(event.target.value);
    }

    const handleFilterStringChange = (event) => {
        let currString = event.target.value
        setNewString(currString.toLowerCase())
        currString === '' ? setShowAllContacts(true) : setShowAllContacts(false)
    }

    const findEquals = (newOne,allContacts) => {
        let hasEqual = false
            allContacts.forEach((card)=>{
                if (newOne.replace(/\s/g, '').toLowerCase() === card.name.replace(/\s/g, '').toLowerCase()) {
                    hasEqual = true;
                    return;
                }
        })
        return hasEqual
    }

  return (
    <div>
        <SectionTitle title={"Phonebook"}/>
        <Notification message={notificationMessage} mood={notificationMood}/>
        <SearchFilter newString={newString}
                    handleFilterStringChange={handleFilterStringChange}
                    />
        <SectionTitle title={"Add new contact"}/>
        <SubmitForm addContact={addContact} 
                    handleContactChange={handleContactChange}
                    newName={newName}
                    handleNumberChange={handleNumberChange}
                    newNumber={newNumber}
                    />
        <SectionTitle title={"Numbers"}/>
        <ContactList   
                    contacts={persons} 
                    showAllContacts={showAllContacts} 
                    newString={newString} 
                    deleteContact={deleteContact}
                    /> 
    </div>
  )
}

export default App
