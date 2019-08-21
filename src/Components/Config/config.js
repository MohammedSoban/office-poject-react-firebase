import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyBv7tBYtZERGd7VMg8bTzeRvSPOFtncS0k",
    authDomain: "moon-steel-fab-project.firebaseapp.com",
    databaseURL: "https://moon-steel-fab-project.firebaseio.com",
    projectId: "moon-steel-fab-project",
    storageBucket: "",
    messagingSenderId: "759525385837",
    appId: "1:759525385837:web:b08f152825d34112"
  };


  firebase.initializeApp(config)

  export default firebase;