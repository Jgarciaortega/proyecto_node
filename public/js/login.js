import * as Validate from './validate.js';

/* Variables globales */
let newUser = {
    nombre: "Javier",
    apellidos: "García",
    nickname: "jagaroc",
    email: "txhavi@gmail.com",
    password: "Hola12345",
    passwordCheck: "Hola12345"

};

function dataResgistry() {

    let inputName = this.attributes[1].nodeValue;
    let inputContent = this.value;
    switch (inputName) {

        case "nombre":
            verifyData(Validate.name, inputContent.toUpperCase(), inputName);
            break;

        case "apellidos":
            verifyData(Validate.name, inputContent.toUpperCase(), inputName);
            break;

        case "nickname":
            verifyData(Validate.username, inputContent, inputName);
            break;

        case "email":
            verifyData(Validate.email, inputContent, inputName);
            break;

        case "passwordRegistry":
            verifyData(Validate.passwordModerate, inputContent, inputName);
            break;

        case "passwordCheck":
            verifyData(Validate.passwordModerate, inputContent, inputName);
            break;
    }
}

function verifyData(funcion, inputContent, inputName) {

    let message = funcion(inputContent);
    let messagePass;

    //si el dato es erroneo se muestra error
    if (message != 'ok') {

        showError(inputName, message);

        //inicializamos el atributo del objeto por si tiene un dato previo
        if (inputName == 'nombre') newUser.nombre = "";
        else if (inputName == 'apellidos') newUser.apellidos = "";
        else if (inputName == 'nickname') newUser.nickname = "";
        else if (inputName == 'email') newUser.email = "";
        else if (inputName == 'passwordRegistry') newUser.password = "";
        else if (inputName == 'passwordCheck') newUser.passwordCheck = "";

    }

    else {

        //si el dato es correcto pero previamente habia error se elimina este
        const input = document.querySelector('input[name="' + inputName + '"]');
        const msg = document.getElementById('error-' + inputName);

        if (!msg.classList.contains('noVisible')) {

            msg.classList.add('noVisible');
            input.classList.remove('error');
        }

        //guardamos el dato en el objteto newUser
        if (inputName == 'nombre') newUser.nombre = inputContent;
        else if (inputName == 'apellidos') newUser.apellidos = inputContent;
        else if (inputName == 'nickname') newUser.nickname = inputContent;
        else if (inputName == 'email') newUser.email = inputContent;
        else if (inputName == 'passwordRegistry') {

            //si el input de confirmacion tiene password validamos que coincidan
            if (newUser.passwordCheck != "") {
                messagePass = Validate.confirmPassword(inputContent, newUser.passwordCheck);
                if (messagePass == 'ok') {
                    newUser.password = inputContent;
                } else showError(inputName, messagePass);

            } else {
                newUser.password = inputContent;
            }
        }

        else if (inputName == 'passwordCheck') {
            //si el input password tiene password validamos que coincidan
            if (newUser.password != "") {
                messagePass = Validate.confirmPassword(inputContent, newUser.password);
                if (messagePass == 'ok') {
                    newUser.passwordCheck = inputContent;
                } else showError(inputName, messagePass);
            } else {
                newUser.passwordCheck = inputContent;
            }

        }
    }

}

function showError(inputName, message) {

    const input = document.querySelector('input[name="' + inputName + '"]');
    const msg = document.getElementById('error-' + inputName);
    
    msg.innerHTML =
        '<i class="fas fa-exclamation-triangle"  class="msgError noVisible"></i>' +
        '<span>' + message + '</span>';
    msg.classList.remove('noVisible');
    input.classList.add('error');

}

function createUser() {
    let url = '/users/createUser';
    let validationOk = true;
    // Obteniendo todas las claves del objeto newUser para comprobar si hay errores
    for (let clave in newUser) {
        if (newUser.hasOwnProperty(clave)) {
            if (newUser[clave] == ""){
                alert('Hay errores en los campos de registro'); 
                send = false;
                break;
            }              
        } 
    }
    //si no hay errores en el formulario preguntamos al server si ya existe (nickname o email)
    if(validationOk){

        sendToServer(url,newUser);         
    }  
}

function askToServer(url,data){


}

function sendToServer(url,data){

    fetch(url, {
        method:'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(function (myJson) {

            console.log(myJson);
        });

}

function login() {

    let user = document.querySelector('input[name="userLogin"]').value;
    let pass = document.querySelector('input[name="passwordLogin"]').value;
    let url = '/users/isValidUser';

    let userLogin = {
        nickname: user,
        password: pass
    }
    
    sendToServer(url,userLogin);
    location.href="userProfile.html";
    
}

function init() {

    /* INIT LISTENERS LOGIN */
    document.querySelector('input[name="btnlogin"]').addEventListener('click', login);

    /* INIT LISTENERS REGISTRY */
    document.querySelector('input[name="nombre"]').addEventListener('blur', dataResgistry);
    document.querySelector('input[name="apellidos"]').addEventListener('blur', dataResgistry);
    document.querySelector('input[name="nickname"]').addEventListener('blur', dataResgistry);
    document.querySelector('input[name="email"]').addEventListener('blur', dataResgistry);
    document.querySelector('input[name="passwordRegistry"]').addEventListener('blur', dataResgistry);
    document.querySelector('input[name="passwordCheck"]').addEventListener('blur', dataResgistry);
    document.querySelector('input[name="btnregistro"]').addEventListener('click', createUser);

}
window.addEventListener('load', init);