import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
    apiKey: "AIzaSyA3WuTnPalidi5zDXXWkq7Kb1doL7dYU0g",
    authDomain: "aapkabazaar-ab521.firebaseapp.com",
    databaseURL: "https://aapkabazaar-ab521.firebaseio.com",
    projectId: "aapkabazaar-ab521",
    storageBucket: "aapkabazaar-ab521.appspot.com",
    messagingSenderId: "974957603382",
    appId: "1:974957603382:web:0b5f406ff15533975fc697"
  };


  export const createUserProfileDocument=async (userAuth,additionalData)=>{
    if(!userAuth) return;

    const userRef=firestore.doc(`users/${userAuth.uid}`)
    const snapShot=await userRef.get()
    console.log(snapShot)
    if(!snapShot.exists)
    {
      const {displayName,email}=userAuth;
      const createdAt=new Date();

      try{
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          })
      }catch(error){
          console.log('error creating user ', error.message)
      }
    }

    return userRef;
  } 

  firebase.initializeApp(config);
  export const auth=firebase.auth();
  export const firestore=firebase.firestore();

  const provider=new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle=()=> auth.signInWithPopup(provider);
  export default firebase;