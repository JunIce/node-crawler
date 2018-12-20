import { Schema, model} from 'mongoose'
const urlSchema = new Schema({
    url: String,
    content: String
})

const Url = model('photo', urlSchema)
export default Url