// Inicializa firebase
firebase.initializeApp(firebaseConfig);

// Inicializa Firestore
db = firebase.firestore();

// Provedores de autenticação
var provider1 = new firebase.auth.GoogleAuthProvider();

// Variável que contém dados de usuário logado
var user = {};