import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeForm from 'form-serialize'

class CreateContact extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
    const values = serializeForm(e.target, { hash: true })
    var result = {}
    result.id = values.name.split(" ")[0].toLowerCase();
    result.avatarURL = values.avatarURL
    result.name = values.name
    result.email = values.email
    if (this.props.onCreateContact)
      this.props.onCreateContact(result)
  }

  render() {
    return (
      <div>
        <Link className='close-create-contact' to='/'>Close</Link>
        <form onSubmit={this.handleSubmit} className='create-contact-form'>
          <ImageInput
            className='create-contact-avatar-input'
            name='avatarURL'
            maxHeight={64}
          />
          <div className='create-contact-details'>
            <input type='text' name='name' placeholder='Name'/>
            <input type='text' name='email' placeholder='Email'/>
            <button>Add Contact</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateContact
