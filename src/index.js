require('dotenv').config();
require('./db/mongoose')

const express = require('express');
const cors = require('cors')
const chalk = require('chalk')

const app = express();
app.use(cors())

const port = process.env.PORT || 3001;

const userRouter = require('./routers/userRouter')

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {console.log(chalk.magenta('Server started on port', port))})
