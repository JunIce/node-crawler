import {DbConfig} from './dbPromise'
import mysqlPool from './dbPromise'
import './mongo'
import {Types} from 'mongoose'
import Model from './urlModel'
let ObjectId = Types.ObjectId

const config: DbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: '3',
    port: 3311,
    database: 'wygx',
    charset: 'utf8mb4'
}

const db = mysqlPool(config)

// db.query("select content from phome_ecms_article_data_1 where classid = ? order by id desc limit ? ", [43, 6])
// .then((res: any) => {
//     console.log(res)
// })

Model.count({}, function(err,c){
    console.log(c)
})

Model.findByIdAndUpdate(ObjectId("5c1a114bbb9fbb268c43c62d"), {$set: {content: 'hello mongo'}} ,function(err, res: any) {
    if(err) {
        return new Error(err)
    }
    console.log(res.id)
})