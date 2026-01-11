// This configuration is used for client-side Firebase initialization.
// It pulls values from environment variables, which is a best practice
// for security and for different environments (development vs. production).

// IMPORTANT: Do not hardcode your Firebase credentials here.
// For local development, create a `.env` file in your project root and
// add your Firebase configuration there. For production, add these
// environment variables to your hosting provider's settings (e.g., Vercel, Netlify).

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
