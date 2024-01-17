const Router = require('../framework/Router')

const router = new Router()

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

router.get('/users', (req, res) => {
  res.send(users)
})

router.post('/users', (req, res) => {
  if(req.body) {
    users.push(req.body)
  }
  console.log(req.body);
  res.send(users)
})

module.exports = router