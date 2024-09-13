const fastify = require('fastify');
const { getItems, getItem } = require('../controllers/items');
const fastifyMongodb = require('fastify-mongodb');

const Item = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' }
    }
}



// Options for get all items

// const getItemsOpts = {
//     schema: { 
//         response: {
//             200: {
//                 type: 'array',
//                 items: Item
//             },
//         },
//     },
//     handler : getItems(fastify)
// }


const getItemOpts = {
    schema: {
        response: {
            200: Item
        },
    },
    handler: getItem
}

function itemRoutes(fastify, options, done){
    // get all items
    fastify.get('/items', async (req, reply) => {
        const results = await fastify.mongo.db.collection("listingsAndReviews").findOne({name: "Private Room in Bushwick"});
        reply.send(results);
    });

    // get a single item
    fastify.get('/items/:id', getItemOpts)

    done();
}

module.exports = itemRoutes;