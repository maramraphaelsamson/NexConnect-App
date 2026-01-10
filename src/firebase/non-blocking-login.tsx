'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  // Assume getAuth and app are initialized elsewhere
} from 'firebase/auth';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  // CRITICAL: Call signInAnonymously directly. Do NOT use 'await signInAnonymously(...)'.
  signInAnonymously(authInstance).catch((error) => {
    // This is a non-critical error, so we can just log it to the console.
    if (error.code !== 'auth/cancelled-popup-request') {
      console.warn('Anonymous sign-in error:', error);
    }
  });
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Call createUserWithEmailAndPassword directly. Do NOT use 'await createUserWithEmailAndPassword(...)'.
  createUserWithEmailAndPassword(authInstance, email, password).catch((error) => {
    // This is a non-critical error, so we can just log it to the console.
    if (error.code !== 'auth/cancelled-popup-request') {
      console.warn('Email sign-up error:', error);
    }
  });
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Call signInWithEmailAndPassword directly. Do NOT use 'await signInWithEmailAndPassword(...)'.
  signInWithEmailAndPassword(authInstance, email, password).catch((error) => {
    // This is a non-critical error, so we can just log it to the console.
    if (error.code !== 'auth/cancelled-popup-request') {
      console.warn('Email sign-in error:', error);
    }
  });
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate Google sign-in (non-blocking). */
export function initiateGoogleSignIn(authInstance: Auth): void {
  const provider = new GoogleAuthProvider();
  // CRITICAL: Call signInWithPopup directly. Do NOT use 'await signInWithPopup(...)'.
  signInWithPopup(authInstance, provider).catch((error) => {
    // This is a non-critical error, so we can just log it to the console.
    // We check for 'auth/cancelled-popup-request' to avoid logging when the user intentionally closes the popup.
    if (error.code !== 'auth/cancelled-popup-request') {
      console.warn('Google sign-in error:', error);
    }
  });
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}
