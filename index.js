const http = require("http")
const dotenv = require("dotenv");
const Router = require('./framework/Router')
const Application = require('./framework/Applicatioin')

dotenv.config()

const PORT = process.env.PORT || 6000;

const app = new Application( )

const router = new Router();

router.get('/users', (req, res) => {
  res.end('/users endpoint')
})

router.get('/posts', (req, res) => {
  res.end('/posts endpoint')
})

app.addRouter(router)

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
})