import { Schema, model} from 'mongoose'
const urlSchema = new Schema({
    url: String
})

const Url = model('photo', urlSchema)
export default Url