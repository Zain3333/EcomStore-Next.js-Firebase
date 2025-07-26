
// Load .env.local for Node.js scripts (not in browser/Next.js runtime)
if (typeof process !== 'undefined' && process.versions?.node) {
  // Only require dotenv if not already loaded
  try {
    require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });
  } catch (e) {}
}
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Optional: Warn if any env variable is missing
Object.entries(firebaseConfig).forEach(([key, value]) => {
  if (!value) {
    console.warn(`Missing Firebase env variable for: ${key}`);
  }
});

const app = initializeApp(firebaseConfig);

if (typeof window !== "undefined") {
  // Only import and initialize analytics on the client using dynamic import
  import("firebase/analytics").then(({ getAnalytics }) => {
    getAnalytics(app);
  });
}

export default app;
