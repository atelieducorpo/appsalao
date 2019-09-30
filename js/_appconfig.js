/* CONFIGURAÇÕES DO APLICATIVO */

// Consigurações da conexão com o Google Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDtNZIxi12reDquEEnyIG2U7sdhF12RZRg",
    authDomain: "atelieducorpoapp.firebaseapp.com",
    databaseURL: "https://atelieducorpoapp.firebaseio.com",
    projectId: "atelieducorpoapp",
    storageBucket: "atelieducorpoapp.appspot.com",
    messagingSenderId: "302241854487",
    appId: "1:302241854487:web:e960970824b52415e15852"
};

// Nome da 'key' que armasena as configurações locais
var localStorageKeyName = 'config';

// Configuração inicial do App
var initialConfig = {
    tema : 'light' // Tema inicial (light | dark)
}  