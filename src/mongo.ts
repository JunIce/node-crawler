import { MongoClient } from 'mongodb'
const url = 'mongodb://localhost:27017';
const dbName = 'wygx';

MongoClient.connect(url, {useNewUrlParser: true}, function(err: any, client: any) {
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    db.collection('prices').find({"position": '港市-新浦区'}).toArray((err:any, res: any) => {
        if(err) {
            console.log(err)
        }
        console.log(res)
    })
    client.close();
});