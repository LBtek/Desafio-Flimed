import server from './main'
import dotenv from 'dotenv'

dotenv.config()

server.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`))
