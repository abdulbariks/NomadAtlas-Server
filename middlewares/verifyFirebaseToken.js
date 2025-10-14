import admin from "firebase-admin";


// import serviceAccount from "../firebase-admin-key.json"

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

import fs from "fs";

const serviceAccount = JSON.parse(
    fs.readFileSync(new URL("../firebase-admin-key.json", import.meta.url))
);


const verifyFirebaseToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'unauthorized access' })
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'unauthorized access' })
    }

    //verify the token
    try {
        const decoded = await admin.auth().verifyIdToken(token)
        req.decoded = decoded
        next();
    }
    catch (error) {
        return res.status(403).send({ message: 'forbidden access' })
    }
}

export default verifyFirebaseToken;