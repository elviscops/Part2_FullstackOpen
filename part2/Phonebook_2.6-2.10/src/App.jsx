import { useState } from 'react'

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
    return (
        props.contacts.map((card)=>{
            return (<div key={card.name} >{card.name}: {card.number}</div>)
    })
    )
}


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number : "22093943" },
        { name: 'Elvis Cops' , number : "34843685234" },
        { name: 'Martins Zakis' , number : "8345348578" }
        ]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newString, setNewString] = useState('')
    const [filteredPersons, setNewFilteredPersons] = useState('')

    const addContact = (event) => {
        event.preventDefault()
        const newContactCard = {
            name: newName,
            number: newNumber
        }
        if (findEquals(newContactCard.name, persons)) {
            alert(newContactCard.name + " already exists")
        }else {
            setPersons(persons.concat(newContactCard))
            setNewName('')
            setNewNumber('')
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
        event.preventDefault()
        //console.log(event.target.value)
        setNewString(event.target.value)
        filterPersons(persons,event.target.value)
    }

    const filterPersons = (props) => {

        const tmpPersons = props

        tmpPersons.filter(item => {
            item.forEach()

        })
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
        <ContactList contacts={persons}/>
    </div>
  )
}

export default App
