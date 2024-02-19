import { useState } from 'react'

const SectionTitle = (props) => <h2>{props.title}</h2>

const SubmitForm = (props) => {
    return (
        <form onSubmit={props.addContact}>
            <div>
            name: <input value={props.newName} onChange={props.handleContactChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
      </form>
    )
}



const ContactList = (props) => {
    return (
        props.contacts.map((card)=>{
            return (<div key={card.name} >{card.name}</div>)
    })
    )
}




const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' },
        { name: 'Elvis Cops' }
        ]) 
    const [newName, setNewName] = useState('')

    const addContact = (event) => {
        event.preventDefault()
        const newContactCard = {
            name: newName
        }
        setPersons(persons.concat(newContactCard))
        setNewName('')
    }

    const handleContactChange = (event) => {
        setNewName(event.target.value);
    }

  return (
    <div>
        <SectionTitle title={"Phonebook"}/>
        <SubmitForm addContact={addContact} 
                    handleContactChange={handleContactChange}
                    newName={newName}/>
        <SectionTitle title={"Numbers"}/>
        <ContactList contacts={persons}/>
    </div>
  )
}

export default App
