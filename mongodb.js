
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

main().catch(console.error);

/*
const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://demo:1234@cluster0.dtrfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await deleteListingsScrapedBeforeDate(client, new Date("2019-02-15"));
        //await updateAllListingsToHavePropertyType(client);
        //await deleteListingByName(client, "Cozy Cottage");
        //await upsertListingByName(client, "Cozy Cottage one", { name: "Cozy Cottage two", bedrooms: 2, bathrooms: 2 });
        //await updateListingByName(client, "Lovely Loft", { bedrooms: 10, beds: 21 });
        // await findListingWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
        //     maximumNumberOfResults: 5,
        //     minimumNumberOfBathrooms:2,
        //     minimumNumberOfBedrooms: 3
        // })

       // await findOnelistingByName(client, "Lovely Loft one");

        // await createMultipleListing(client, [
        //     {
        //         name: "Lovely Loft",
        //         summary: "A charming loft in Paris",
        //         bedrooms: 1,
        //         bathrooms: 1
        //     },
        //     {
        //         name: "Spacious Apartment",
        //         summary: "A spacious apartment in New York",
        //         bedrooms: 3,
        //         bathrooms: 2
        //     }, {
        //         name: "Cozy Cottage",
        //         summary: "A cozy cottage in San Francisco",
        //         bedrooms: 2,
        //         bathrooms: 1
        //     }, {    
        //         name: "Charming Condo",
        //         summary: "A charming condo in Seattle",
        //         bedrooms: 2,
        //         bathrooms: 2,
        //         last_review: new Date()
        //     }
        // ]);
      
        // await listDatabase(client);;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function deleteListingsScrapedBeforeDate(client, date){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
    .deleteMany({ last_scraped: { $lt: date } }); // $lt in mongodb is less than
    console.log(`${result.deletedCount} documents were deleted`);
}

async function deleteListingByName(client, nameOfListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteOne({name: nameOfListing});
    console.log(result.deletedCount)
}


async function updateAllListingsToHavePropertyType(client){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateMany({ property_type: { $exists: false } }, { $set: { property_type: "Unknown" } });

    console.log(result.matchedCount);
    console.log(result)
}

async function createMultipleListing(client, newListings){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);
    console.log(`${result.insertedCount} new listings created with the following ids: ${result.insertedIds}`);
    console.log(result);

}

async  function findListingWithMinimumBedroomsBathroomsAndMostRecentReviews
(client, {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews").find({
        bedrooms: { $gte: minimumNumberOfBedrooms }, // $gte in mongodb is greater than or equal to
        bathrooms: { $gte: minimumNumberOfBathrooms }
}).sort({ last_review: -1 })
  .limit(maximumNumberOfResults);

  const result = await cursor.toArray();
    console.log(result);
}

async function updateListingByName(client, nameOfListing, updatedListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({name: nameOfListing}, {$set: updatedListing});

    console.log(result.matchedCount);
    console.log(result.modifiedCount);
}

async function findOnelistingByName(client, nameOfListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({name: nameOfListing});
    if (result){
        console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

async function createListing(client, newListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing)
    console.log(`new listing created with following id: ${result.insertedId}`);
    console.log(result);
}
async function upsertListingByName(client, nameOfListing, updatedListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({name: nameOfListing}, {$set: updatedListing}, {upsert: true});
    console.log(result.matchedCount);

    if(result.upsertedCount > 0){
        console.log(`One document was upserted with the id ${result.upsertedId}`);
    }  else {
        console.log(`${result.modifiedCount} document(s) was/were updated`);
    }
}


async function listDatabase(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(` - ${db.name}`)
    });
}



*/