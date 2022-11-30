import {
    getApps,
    initializeApp
} from "firebase/app";

function _initializeApp() {
  if (!getApps().length) {
    return initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,//"1:495601554678:web:c1972e59a95480a46488d7"
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,//"G-QRVG6KD3K3"
      
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_BUCKET,
    });
  }

  return getApps()[0];
}

export default _initializeApp();
