import * as firebaseAdmin from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// @ts-ignore
const isInitialized = !!global.firebaseInitialized;

console.log(process.env.APP_GOOGLE_PRIVATE_KEY)

// prevent hot reload re-init
if (!isInitialized) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.cert({
      clientEmail: process.env.APP_GOOGLE_CLIENT_EMAIL,
      privateKey: process.env.APP_GOOGLE_PRIVATE_KEY,
      projectId: process.env.APP_GOOGLE_PROJECT_ID,
    }),
  });
}

export const firestore = getFirestore();

if (!isInitialized) {
  firestore.settings({ ignoreUndefinedProperties: true });
}

// @ts-ignore
global.firebaseInitialized = true;
