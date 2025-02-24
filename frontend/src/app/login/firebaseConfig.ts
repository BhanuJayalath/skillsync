// firebaseConfig.ts
import { 
  initializeApp 
} from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signInWithPopup 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7H6zCP3ElRR7z9_HOJt7w32FQ82pc6jw",
  authDomain: "skillsync-e8261.firebaseapp.com",
  projectId: "skillsync-e8261",
  storageBucket: "skillsync-e8261.appspot.com",
  messagingSenderId: "712761881619",
  appId: "1:712761881619:web:c521707a86b86e49be3be6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ✅ Google Authentication
export const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google User Info:", result.user);
    return result.user;
  } catch (error: any) {
    console.error("Google Sign-In Error:", error.message);
    throw new Error("Failed to sign in with Google. Please try again.");
  }
};

// ✅ Facebook Authentication
export const facebookProvider = new FacebookAuthProvider();
export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    console.log("Facebook User Info:", result.user);
    return result.user;
  } catch (error: any) {
    console.error("Facebook Sign-In Error:", error.message);
    throw new Error("Failed to sign in with Facebook. Please try again.");
  }
};

// ✅ Email & Password Authentication
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    console.error("Sign-Up Error:", error.message);
    throw new Error("Failed to create an account. Please try again.");
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    console.error("Sign-In Error:", error.message);
    throw new Error("Invalid email or password. Please try again.");
  }
};

// ✅ Forgot Password
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent to:", email);
  } catch (error: any) {
    console.error("Password Reset Error:", error.message);
    throw new Error("Failed to send password reset email. Please try again.");
  }
};

export { app };
