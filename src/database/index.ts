import {
    getApps,
    initializeApp
} from "firebase/app";

function _initializeApp() {
  if (!getApps().length) {
    return initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_BUCKET,
    });
  }

  return getApps()[0];
}

export default _initializeApp();
