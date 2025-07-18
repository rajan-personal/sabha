import { createAuthClient } from "better-auth/react";

// Get the base URL for the auth client
const getBaseURL = () => {
  // In production, use the NEXT_PUBLIC_APP_URL if available
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  
  // In browser, use the current origin
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // Fallback to localhost for development
  return "http://localhost:3000";
};

export const authClient = createAuthClient({
    baseURL: getBaseURL(),
});

export const {
    signIn,
    signOut,
    signUp,
    useSession,
    getSession,
} = authClient;