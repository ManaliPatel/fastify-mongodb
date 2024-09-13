
const items = require('../Items');
const { MongoClient } = require('mongodb');
const main = require('../mongodb');
// const { mongo } = requrie('fastify-mongodb');

// const getItems =  (req, reply) => {
//     const results = req.server.mongo.db().admin().listDatabases().then(databasesList => {
//         console.log("Databases:");
//         databasesList.databases.forEach(db => {
//             console.log(` - ${db.name}`)
//         });
//     });

//     //const mongo = req.server.mongoDB
//     // const collection = mongo.db("sample_airbnb").collection("listingsAndReviews").findOne({name: "hello"});
//      reply.send(results);
// }

const getItem = (req, reply) => {
    const { id } = req.params;
    const item = items.find(i => i.id === id);
    reply.send(item);
}


module.exports = {
   // getItems,
    getItem
}