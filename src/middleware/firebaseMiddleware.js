const admin = require('firebase-admin');

const serviceAccountKey = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
}


// Initialize the Firebase Admin SDK with the service account key
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
});

function verifyFirebaseToken(req, res, next) {

    // Get the ID token from the request headers or query parameters
    const token = req.headers.authorization || req.body.token;
    if (!token) {
        // Return an error if no ID token is provided
        return res.status(401).send('Authorization token is required');
    }
    // Verify the ID token
    admin.auth().verifyIdToken(token)
        .then(decodedToken => {
            // Attach the decoded token data to the request object for later use
            req.decodedToken = decodedToken;
            // Call the next middleware function
            next();
        })
        .catch(error => {
            // Return an error if the ID token is invalid or expired
            console.error('Error verifying Firebase ID token:', error);
            return res.status(401).send('Invalid or expired authorization token');
        });
}

module.exports = { verifyFirebaseToken, };