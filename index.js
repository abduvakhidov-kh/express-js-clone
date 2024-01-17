const dotenv = require("dotenv");
const jsonParser = require('./framework/jsonParse')
// const bodyParser = require('./framework/bodyParse')
const Application = require('./framework/Applicatioin')
const userRouter = require('./src/user-router');
const urlParser = require("./framework/urlParser");


dotenv.config()

const PORT = process.env.PORT || 6000;

const app = new Application()

app.use(jsonParser)
app.use(urlParser)
// app.use(bodyParser)

app.addRouter(userRouter)

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
})