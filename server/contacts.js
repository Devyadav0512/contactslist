const clone = require('clone')
const config = require('./config')

const db = {}

const defaultData = {
  contacts: [
    {
      id: 'ryan',
      name: 'Ryan Florence',
      email: 'ryan@reacttraining.com',
      avatarURL: config.origin + '/ryan.jpg'
    },
    {
      id: 'michael',
      name: 'Michael Jackson',
      email: 'michael@reacttraining.com',
      avatarURL: config.origin + '/michael.jpg'
    },
    {
      id: 'tyler',
      name: 'Tyler McGinnis',
      email: 'tyler@reacttraining.com',
      avatarURL: config.origin + '/tyler.jpg'
    }
  ]
}

const get = (token) => {
  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultData)
  }

  return data
}

const add = (token, contact) => {
  contact.avatarURL = config.origin + contact.avatarURL
  get(token).contacts.push(contact)
  return get(token)
}

const remove = (token, id) => {
  const data = get(token)
  const contact = data.contacts.find(c => c.id === id)

  if (contact) {
    data.contacts = data.contacts.filter(c => c !== contact)
    db[token] = data
  }

  return db[token]
}

module.exports = {
  get,
  add,
  remove
}
