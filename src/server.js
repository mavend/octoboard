const { Kalambury } = require('./games/kalambury/Kalambury');
const { Server, Mongo, Firebase } = require('boardgame.io/server');

// const serviceAccount = require('./serviceAccountKey.json');
// const admin = require('firebase-admin');

const server = Server({
    games: [Kalambury],
    // db: new Mongo({
    //     url: 'mongodb://localhost',
    //     dbname: 'bgio',
    // }),
    // db: new Firebase({
    //     config: {
    //         credential: admin.credential.cert(serviceAccount),
    //         databaseURL: "https://corona-games-1.firebaseio.com",
    //     },
    //     dbname: 'CoronaGameDB',
    //     engine: 'Firestore',
    //     adminClient: true,
    // }),
});
server.run(8000);
