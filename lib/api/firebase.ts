import * as firebaseAdmin from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// @ts-ignore
const isInitialized = !!global.firebaseInitialized;

// prevent hot reload re-init
if (!isInitialized) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.cert({
      clientEmail: process.env.APP_GOOGLE_CLIENT_EMAIL,
      privateKey: JSON.parse(process.env.APP_GOOGLE_PRIVATE_KEY ?? ``).key,
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
