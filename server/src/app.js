import express          from "express"
import { index_router } from "./routes/index.routes.js"

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(index_router)

export default app