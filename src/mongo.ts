import { connect, connection} from 'mongoose'
const url = 'mongodb://localhost:27017/wygx';

connect(url, {useNewUrlParser: true})

connection.on('error', () => {
    console.log(`connect error`)
})

