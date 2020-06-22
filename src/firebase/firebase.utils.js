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
    // console.log(snapShot)
    // console.log(snapShot.data())
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

//for addding store to database

export const  addCollectionAndDocuments=async (collectionKey,objectsToAdd)=>{
const collectionRef=firestore.collection(collectionKey)
console.log(collectionRef)
const batch=firestore.batch()
objectsToAdd.forEach(obj=>{
 const newDocRef=collectionRef.doc(); //get the document at the emptystring//ie tell firebase to give doc at this reference and generate random id for that
 // const newDocRef=collectionRef.doc(obj.title);//now key would be titles i.e mens women,sneakers etc
   batch.set(newDocRef,obj)        //newDocRef.set(obj)
})
return await batch.commit() //fires off our batch request and it return a promise adn when succeed it return a null
}



//for aaditioon of additional data like route name and id,to the fetched(firebase data) so we can use in our application 
export const convertCollectionsSnapshotToMap=(collections)=>{
  const transformedCollection=collections.docs.map(doc=>{
    const {title,items}=doc.data();

    return{
      routeName:encodeURI(title.toLowerCase()),
      id:doc.id,
      title,
      items
    }
  });
 // console.log(transformedCollection)
 
//it return a obj with key like jacket,shirt etc and they correspond with their collection
  return transformedCollection.reduce((accumulator,collection)=>{
    accumulator[collection.title.toLowerCase()]=collection;
    return accumulator
  },{})
}