import app from "../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import lazySignin from "../utilities/googleSignIn";

const auth = getAuth(app);

const loginForm = document.getElementById("loginForm");


// Sign in existing users
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    try {
        let response = await signInWithEmailAndPassword(auth, email, password);
        // Signed in
        const userCredential = response;
        console.log(userCredential);
        
        const user = userCredential.user;
        console.log(user);
        
    } catch (error) {
        const errorCode = error.code;
        console.log("errorCode:", errorCode)
        
        const errorMessage = error.message;
        console.log("errorMessage:", errorMessage)
    }
})



    document.getElementById("google-btn").addEventListener("click", async () => {
        await lazySignin(auth);
        console.log("HOGAYA BHAI!!!");
        
    })