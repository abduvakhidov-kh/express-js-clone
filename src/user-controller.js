const users = [
  {
    id: 1,
    username: 'user'
  },
  {
    id: 2,
    username: 'user2'
  },
]

const createUsers = (req, res) => {
  if(req.body) {
    users.push(req.body)
  }

  res.send(users)
}

const getUsers = (req, res) => {
  res.send(users)
}

module.exports = {
  createUsers,
  getUsers
}