import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import productRoutes from "./routes/productRoutes.js"

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))
console.log(process.env.CORS_ORIGIN)

app.use(express.json({ limit: '50kb'  }))
app.use(express.urlencoded({extended:true, limit: '50kb'  }))

app.use(express.static('public'))
app.use(cookieParser())


app.use("/api/v1/products", productRoutes)
export {app}