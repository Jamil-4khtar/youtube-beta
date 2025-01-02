import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

async function lazySignin(auth) {
    try {
        let response = await signInWithPopup(auth, provider);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(response);
        const token = credential.accessToken;
        console.log("🚀 ~ lazySignin ~ token:", token)

        // The signed-in user info.
        const user = response.user;
        console.log("🚀 ~ lazySignin ~ user:", user)

    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("🚀 errorMessage:", errorMessage)

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("🚀 ~ lazySignin ~ credential:", credential)
        // ...
    }
}

export default lazySignin;