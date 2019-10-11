import firebase from 'firebase';


//import 'firebase/storage'


const config = {
    apiKey: "AIzaSyBv7tBYtZERGd7VMg8bTzeRvSPOFtncS0k",
    authDomain: "moon-steel-fab-project.firebaseapp.com",
    databaseURL: "https://moon-steel-fab-project.firebaseio.com",
    projectId: "moon-steel-fab-project",
    storageBucket: "gs://moon-steel-fab-project.appspot.com/",
    messagingSenderId: "759525385837",
    appId: "1:759525385837:web:b08f152825d34112",

  };

  console.log(config.apiKey)
  console.log(process.env.REACT_APP_API_KEY)

  firebase.initializeApp(config)



 export default firebase;