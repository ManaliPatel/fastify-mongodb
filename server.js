const fastify = require('fastify')({ logger: true });
const fastifyMongoDB = require('fastify-mongodb');
const PORT = 3000;
// fastify.register(require('fastify-swagger'), { 
//     exposeRoute: true,
//     routePrefix: '/docs',
//     swagger: {
//         info: { title: 'fastify-api' },
//     },
// })

fastify.register(require('./routes/items'));
fastify.register(fastifyMongoDB, {
    forceClose: true,
    url:  "mongodb+srv://demo:1234@cluster0.dtrfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    database: "sample_airbnb"
});

const start = async () => {
    try {
        await fastify.listen(PORT);
    } catch(error) {
        fastify.log.error(error);
        process.exit(1);
    }
}


start()
