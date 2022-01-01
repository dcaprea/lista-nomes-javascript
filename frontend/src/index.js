import axios from 'axios';

const url = "http://localhost:3000";

class Usuarios{

  constructor(url){
    this.lerUsuarios(url);
  }

  lerUsuarios(url){
    axios
    .get(`${url}/posts`)
    .then(function(response) {
      let repos = response.data;
      console.log(repos);
      if(repos.length>0){
        let lista = document.querySelector('.listaUsuarios');
        repos.map(name => {
            let todoElement = document.createElement('li');
            let todoText = document.createTextNode(`${name.usuario}`);
            todoElement.className = "clique";
            todoElement.setAttribute("id", `${name.id}`);
            todoElement.appendChild(todoText);
            lista.appendChild(todoElement);
        });
      }else{
        document.querySelector(".info").innerHTML = "Nenhum Usuário encontrado!";
      }
    }).catch(function(error) {
      console.log(error);
    });
  }

  removerUsuario(url, id){
    const _this = this;
    axios
    .delete(`${url}/posts/${id}`)
    .then(function(response) {
      _this.limpaLista();
      _this.lerUsuarios(url);
    }).catch(function(error) {
      console.log(error);
    });
  }

  addUsuario(url, valor){
    const _this = this;
    axios
    .post(`${url}/posts`, {"usuario":valor})
    .then(function(response) {
      document.querySelector('#addUserText').value = "";
      _this.limpaLista();
      _this.lerUsuarios(url);
    }).catch(function(error) {
      console.log(error);
    });
  }

  limpaLista(){
    let lista = document.querySelector('.listaUsuarios');
    lista.innerHTML = "";
    document.querySelector(".info").innerHTML = "";
  }
}

let User = new Usuarios(url);

document.querySelector('.listaUsuarios').addEventListener('click', (evt) => {
  evt.preventDefault();
  User.removerUsuario(url, evt.srcElement.id);
});

document.querySelector('.formAddUser').addEventListener('submit', (evt) => {
  evt.preventDefault();
  User.addUsuario(url, document.querySelector('#addUserText').value);
});