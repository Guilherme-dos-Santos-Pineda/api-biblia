const dado = document.querySelector(".dado");
const texto = document.querySelector(".texto");
const ids = document.querySelector(".ids");
const img = document.querySelector(".img");
const login = document.querySelector(".login");
const createUser = document.querySelector(".createUser");
const subMain = document.querySelector(".subMain");
const telaDeCadastro = document.querySelector(".telaDeCadastro");
const telaDeLogin = document.querySelector(".telaDeLogin");
const fechar = document.querySelector(".fechar");
const fecharDois = document.querySelector(".fecharDois");
const aviso = document.querySelector("#aviso");
let token;

createUser.addEventListener('click', (e) => {
  if (e.target) {
    subMain.style.display = "none";
    telaDeCadastro.style.display = "flex";
  }
});
fechar.addEventListener("click", ()=>{
    subMain.style.display = "flex"
    telaDeCadastro.style.display = "none"
})
fecharDois.addEventListener("click", ()=>{
    subMain.style.display = "flex"
    telaDeLogin.style.display = "none"
})
login.addEventListener( 'click', (e)=>{
    subMain.style.display = "none"
    telaDeLogin.style.display = "flex"
} )



dado.addEventListener("click", (e)=>{

    
    // var url = 'https://www.abibliadigital.com.br/api/verses/nvi/random';
    var url = 'https://www.abibliadigital.com.br/api/verses/nvi/pv/random';

    fetch(url)
    .then(function(res){
        return res.json()
    })
    .then(function(cons){
        dado.setAttribute("disabled","disabled");
        setTimeout(function(){
            dado.removeAttribute("disabled");
            texto.innerHTML = cons.text
            ids.innerHTML = `${cons.book.name}-${cons.chapter}:${cons.number}`
            console.log(cons.text)
        }, 2000) 
        console.log(cons)
    })
})


// PARTE RESPONSAVEL POR PEGAR OS DADOS DE CADASTRO, E SALVAR NO LOCAL STORAGE inicio.

document.getElementById('meuFormulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário
    
    // Captura dos valores dos campos
    var nome = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    // ...
  
    // Aqui você pode fazer o que quiser com os dados capturados
    // Por exemplo, você pode armazená-los em um objeto ou enviá-los para um servidor
  
    // Exibindo os dados no console
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Senha:', password);
    
    criarUsuario(nome, email, password)
   
    
  });

  function criarUsuario(nome, email, password) {
    var url = 'https://www.abibliadigital.com.br/api/users';
    var notifications = true; // Variável para as notificações
  
    var data = {
      name: nome,
      email: email,
      password: password,
      notifications: notifications
    };
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          return response.json(); // Analisa a resposta como um objeto JSON
        } else {
          throw new Error('Erro ao criar usuário: ' + response.statusText);
        }
      })
      .then(data => {
        // Aqui você pode acessar o token do objeto de dados retornado pela API
        token = data.token;
  
        // Faça algo com o token, como armazená-lo no localStorage, enviar para o servidor, etc.
        console.log('Token:', token);
  
        // Outras ações após obter o token
        cadastroBemSucedido()
      })
      .catch(error => {
        console.error('Erro ao criar usuário:', error);
        cadastroMalSucedido()
      });
  }

var loader = document.getElementById('carregador')
  function cadastroBemSucedido(){
    
  var form = document.getElementById('meuFormulario')
  form.classList.add('hide'); // Adiciona a classe 'hide' para ocultar o formulário
  loader.classList.add('c-loader'); // Adiciona a classe 'hide' para ocultar o formulário

  setTimeout(function() {

    form.reset(); // Limpa os campos do formulário
    form.classList.remove('hide'); // Remove a classe 'hide' para exibir o formulário novamente
    loader.classList.remove('c-loader'); // Remove a classe 'hide' para exibir o formulário novamente

  }, 500);

  setTimeout(()=>{
    aviso.innerHTML = `
    <div style="position: absolute; transition: 1s; opacity: 1; width: 350px;" class="alert alert-success d-flex align-items-center" role="alert">
      <svg style="height: 5vw; width: 5vh; transition: 0.4s; opacity = "1" " bi flex-shrink-0 me-2" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
    <div>  
      Cadastro bem sucedido! Aperte <div onclick="copiarToken()"><b style="color: blue; cursor: pointer;">AQUI</b></div> para copiar o ID !!!
      Guarde bem o seu ID, vai precisar somente dele para fazer login e acessar o App.
    </div>  
    </div>`
    
  }, 600)

  }

  function cadastroMalSucedido(){
    
    var form = document.getElementById('meuFormulario')
    form.classList.add('hide'); // Adiciona a classe 'hide' para ocultar o formulário
    loader.classList.add('c-loader'); // Adiciona a classe 'hide' para ocultar o formulário
  
    setTimeout(function() {

     
      form.reset(); // Limpa os campos do formulário
      form.classList.remove('hide'); // Remove a classe 'hide' para exibir o formulário novamente
      loader.classList.remove('c-loader'); // Remove a classe 'hide' para exibir o formulário novamente
    }, 500);

    setTimeout(()=>{
      aviso.innerHTML = `
      <div style="position: absolute; transition: 1s; opacity: 1;" class="alert alert-danger d-flex align-items-center" role="alert">
        <svg style="height: 5vw; width: 5vh; transition: 0.4s; opacity = "1" " class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
        <div>
        Cadastro Mal sucedido, tente novamente, se o problema persistir use outro E-mail!
        </div>
      </div>`
    }, 600)

      setTimeout(()=>{
        aviso.style.opacity = "0"
      }, 2500)

      setTimeout(()=>{
        aviso.innerHTML = ""
        aviso.style.opacity = "1"
      }, 3500)

    }


    function copiarToken() {
      let id = localStorage.setItem("id", token)
      console.log("salvo no local storage de nome:" + localStorage.getItem('id'))



      var dados = token;
      
      // Cria um elemento <textarea> temporário
      var textareaTemp = document.createElement("textarea");
      textareaTemp.value = dados;

      // Adiciona o elemento à página
      document.body.appendChild(textareaTemp);

      // Seleciona o conteúdo do elemento <textarea>
      textareaTemp.select();

      // Copia o conteúdo para a área de transferência
      document.execCommand("copy");

      // Remove o elemento <textarea> temporário
      document.body.removeChild(textareaTemp);

      // Mensagem opcional para indicar que os dados foram copiados
      alert("Dados copiados para a área de transferência!");



      setTimeout(()=>{
        aviso.style.opacity = "0"
      }, 2500)

      setTimeout(()=>{
        aviso.innerHTML = ""
        aviso.style.opacity = "1"
      }, 3500)
    }
    



    document.getElementById('formLogin').addEventListener('submit', function(event) {
      event.preventDefault(); // Evita o envio do formulário
      
      // Captura dos valores dos campos
      var IDLogin = document.getElementById('ID').value;
      var emailLogin = document.getElementById('emailLogin').value;

      // ...
    
      // Aqui você pode fazer o que quiser com os dados capturados
      // Por exemplo, você pode armazená-los em um objeto ou enviá-los para um servidor
    
      // Exibindo os dados no console
      console.log('Id:', IDLogin);
      console.log('Email:', emailLogin);

      
      pegarUsuario(IDLogin, emailLogin)
     
      
    });


function pegarUsuario(IDLogin, email){
  let url = `https://www.abibliadigital.com.br/api/users/${email}`

  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${IDLogin}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        return response.json(); // Analisa a resposta como um objeto JSONs
      } else {
        throw new Error('Erro ao logar: ' + response.statusText);
      }
    })
    .then(data => {
      // Aqui você pode acessar o token do objeto de dados retornado pela API
      
      // Faça algo com o token, como armazená-lo no localStorage, enviar para o servidor, etc.
      console.log('Token:', data);
      alert("Login bem sucedido")
      window.location.href = "./rotas/biblia.html";
      // Outras ações após obter o token
      
    })
    .catch(error => {
      console.error('Erro ao criar usuário:', error);
      
    });



}