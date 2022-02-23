
const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./pooja-appliances-firebase-adminsdk-8looa-4434d894a5.json');

const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin.storage().bucket(`gs://pooja-appliances.appspot.com/`);

module.exports = {
    admin,
    storageRef,
}