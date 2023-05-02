import { Router }           from "express"
import { INDEX_PATH }       from "../global/_env.js"
import { index_controller } from "../controllers/index.controller.js"

const index_router = Router()

index_router.get(INDEX_PATH, index_controller.sayHi)

export { index_router }