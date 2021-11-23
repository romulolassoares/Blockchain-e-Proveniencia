const RedeDatabase = require('../app/database/models/RedeModel')
function startNetwork(){
    axios.get('/network/startNetwork')
    .then(function (response) {
        if(response.data.result == "success"){

            toastr.clear()
            toastr.success('A rede está rodando!', 'Sucesso!')

        }
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
}

function stopNetwork(){
    axios.get('/network/stopNetwork')
    .then(function (response) {
        if(response.data.result == "success"){

            toastr.clear()
            toastr.success('A rede foi parada!', 'Sucesso!')

        }
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
}

function enrollAdmin(){
    axios.get('/network/enrollAdmin')
    .then(function (response) {
        if(response.data.result == "success"){

            toastr.clear()
            toastr.success('Administrador cadastrado!', 'Sucesso!')

        }else if(response.data.result == "error"){

            toastr.clear()
            toastr.error('Ocorreu um erro ao cadastrar o administrador!', 'Error!')

        }else if(response.data.result == "exists"){

            toastr.clear()
            toastr.warning('Já existe um administrador cadastrado!', 'Atenção!')

        }

    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
}

function registerUser(){
    var regexnomeUsuario = /^[a-zA-Z]+$/;
    
    nomeUsuario = document.getElementById('nomeUsuario').value;

    if(regexnomeUsuario.test(nomeUsuario)){

        axios.get('/network/registerUser/'+nomeUsuario)
        .then(function (response) {
            if(response.data.result == "success"){
    
                toastr.clear()
                toastr.success('Usuário cadastrado!', 'Sucesso!')
    
            }else if(response.data.result == "error"){
    
                toastr.clear()
                toastr.error('Ocorreu um erro ao cadastrar o usuário!', 'Error!')
    
            }else if(response.data.result == "recorded"){
    
                toastr.clear()
                toastr.warning('Já existe um usuário com este nome cadastrado!', 'Atenção!')
    
            }else if(response.data.result == "adminMissing"){
    
                toastr.clear()
                toastr.warning('Primeiro é necessário cadastrar um administrador!', 'Atenção!')
    
            }
    
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    

    }else{
        toastr.error('Preencha o nome do usuário somente com letras e sem espaços!', 'Erro!')
    }
}

