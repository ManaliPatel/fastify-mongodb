
const { MongoClient } = require('mongodb');

async function main(){
    const uri = "mongodb+srv://demo:1234@cluster0.dtrfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        await listDatabase(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabase(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(` - ${db.name}`)
    });
}

module.exports = main; 

