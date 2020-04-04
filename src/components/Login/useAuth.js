import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState } from "react";

firebase.initializeApp(firebaseConfig);

const Auth = () => {

    const [user, setUser] = useState(null);

    const signInWithGoogle = () => {

        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then(res => {
                // console.log(res);   
                const {displayName, email, photoURL} = res.user;
                const signedInUser = {name: displayName, email, photo: photoURL};

                setUser(signedInUser);

                return res.user;            
            })
            .catch(err => {
                // console.log(err);
                setUser(null);
                return err.message;
            })
    }

    const signOut = () => {
        firebase.auth().signOut().then(function() {
            setUser(null);
          }).catch(function(error) {
            // An error happened.
          });
    }

    return {
        user,
        signInWithGoogle,
        signOut
    }
}

export default Auth;