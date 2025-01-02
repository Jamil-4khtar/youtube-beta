import app from "../config/firebase";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, updateProfile } from "firebase/auth";
import lazySignin from "/src/utilities/googleSignIn";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const signupForm = document.getElementById("signupForm");

// Sign up new users

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validation code
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        // Signed in
        const userCredential = response;

        console.log(userCredential);

        const user = userCredential.user;
        console.log(user);

        await updateProfile(user, {
            displayName: name
        });

        // After successful sign up, redirect to the login page
        // window.location.href = "/login.html";

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error: ${errorCode} - ${errorMessage}`);
    }
});


document.getElementById("google-btn").addEventListener("click", async () => {
    await lazySignin(auth);
    console.log("HOGAYA BHAI!!!");

})