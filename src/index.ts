import express from 'express'
import dotenv from 'dotenv-safe'
// import routes from './routes';
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(cors())
// app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
