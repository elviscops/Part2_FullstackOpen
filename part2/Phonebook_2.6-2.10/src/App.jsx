import { useState, useEffect } from 'react'
import axios from 'axios'

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
                    return (<div key={card.name} >{card.name}: {card.number}</div>)
                    }
                )
            )
        } else {
            return (
                props.contacts.filter(
                    item => item.name.toLowerCase().includes(props.newString)).map(filteredName =>{
                        return <div key={filteredName.name} >{filteredName.name}: {filteredName.number}</div>
                    }
                )
            )
        }
}


const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newString, setNewString] = useState('')
    const [showAllContacts, setShowAllContacts] = useState(true)

    useEffect(()=>{
        axios.get('http://localhost:3001/persons')
            .then(response => {
                const personData = response.data
                setPersons(personData)
            })
    },[])

    const addContact = (event) => {
        event.preventDefault()
        const newContactCard = {
            name: newName,
            number: newNumber
        }
        if (findEquals(newContactCard.name, persons)) {
            alert(newContactCard.name + " already exists")
        }else {
            axios
                .post('http://localhost:3001/persons',newContactCard)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
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
        <ContactList contacts={persons} showAllContacts={showAllContacts} newString={newString}/> 
    </div>
  )
}

export default App
