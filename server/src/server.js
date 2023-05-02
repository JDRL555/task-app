import "dotenv/config.js"
import { PORT, URL_DEV }  from "./global/_env.js"
import app                from "./app.js"

app.listen(PORT, () => console.log(`Server's running on ${URL_DEV}:${PORT}`))