import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'

class App extends Component {
  state = {contacts : []}
  
  componentDidMount() {
    fetch("http://localhost:5001/contacts", { headers: { 'Authorization': 'devyadav' }})
    .then(response => response.json())
    .then(data => this.setState({
      contacts: data.contacts
    }))
  }

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))
  }

  createContact(contact) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'devyadav' },
        body: JSON.stringify(contact)
    };
    console.log(requestOptions)
    fetch('http://localhost:5001/contacts', requestOptions)
    .then(response => response.json())
    .then(data => this.setState({
      contacts: data.contacts
    }));
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )}/>
        <Route path='/create' render={({ history }) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )}/>
      </div>
    )
  }
}

export default App;
