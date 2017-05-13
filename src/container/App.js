import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import NewExpense from '../components/newExpense/NewExpense'
import ContactList from '../components/contactList/ContactList'

import './app.scss'

@inject(['user'], ['contacts'], ['expenses']) @observer
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeContact : "usr_1f",
      activeColor : "c-1"
    }

    // App initialisieren fred= usr_1f yuri= usr_2y tilman= usr_3t
    this.props.user
      .fetchUser("usr_2y")
    this.props.contacts
      .fetchContacts("usr_2y")
    this.props.expenses
      .fetchExpenses("usr_2y", "usr_1f")
  }

  changeContact = (id) =>{
    this.props.contacts
      .setactiveContact(id)
  }

  render() {

    // Render sobald Daten geladen wurden
    // TODO Loading Screen gestalten
    if (!this.props.contacts.isLoaded) {
        return <div>Loading...</div>
    }

    return (
      <div id="app">
        <div>{ this.props.expenses.entries
          .reduce( (accumulator,currentValue) => {
            let x = parseInt(currentValue[1].amount, 10)
            if(currentValue[1].payerId !== this.props.user.id) x = parseInt(currentValue[1].amount, 10)*-1
            return accumulator + x;
          }, 0)
        }</div>
        <ContactList changeContact={ this.changeContact } color={ this.props.contacts.activeContact.color } contacts={ this.props.contacts.json } user={ this.props.user } expenses={ this.props.expenses }/>
        <NewExpense color={ this.props.contacts.activeContact.color } user={ this.props.user } activeContact={ this.props.contacts.activeContact.name } expenses={ this.props.expenses }/>
    </div>
    )
  }
}

export default App
