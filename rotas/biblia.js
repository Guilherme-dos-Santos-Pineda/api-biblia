

var tituloBiblia = document.querySelector("#tituloBiblia")
var capituloEVersiculo = document.querySelector("#capituloEVersiculo")
var mudarCor = document.querySelector("#mudarCor")
var corpo = document.querySelector(".corpo")
var a = document.querySelector("#a")
var textoBiblia = document.querySelector(".textoBiblia")
var avançar = document.querySelector(".avançar")
var voltar = document.querySelector(".voltar")
var aparecerCap = document.querySelector(".aparecerCap")
var livros = document.querySelector(".livros")
var infoLivro = document.querySelector(".infoLivro")
var paragrafos = document.getElementsByTagName("p")
var versaoBotao = document.querySelector(".versaoBotao")
var apagar = document.querySelector(".apagar")
var topo = document.querySelector(".corpo")
var opcoes = document.querySelector(".opcoes")
var info = document.getElementById("info");
var capitulo ;
var capitnumeroDeCapitulosulo = null
let url = 'https://www.abibliadigital.com.br/api/verses/nvi/'
var version = "nvi/"
var abreviatura
var cap
var capAtual
var numero
var versaoNVI = 'nvi';
var versaoRA = 'ra';
var versaoACF = 'acf';
var versaoKJV = 'kjv';
var versaoAtual = 'nvi'



function ara(){
    versaoAtual = versaoRA
    versaoBotao.innerText = "ARA"
    pegarDados()
}
function ntlh(){
    versaoAtual = versaoNVI
    versaoBotao.innerText = "NTLH"
    pegarDados()
}
function acf(){
    versaoAtual = versaoACF
    versaoBotao.innerText = "ACF"
    pegarDados()
}
function kjv(){
    versaoAtual = versaoKJV
    versaoBotao.innerText = "KJV"
    pegarDados()
}


function pintarLetra(element){
    
    // let salvar = localStorage.setItem("versiculoPintado", numeroDoVersiculo)
     element.classList.toggle("pintado")

    
}

function scrollParaCima() {

    // Faz a rolagem suave para o elemento selecionado
    topo.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

avançar.addEventListener("click", ()=>{
    
    console.log(aa)
    
    numero++
    pegarDados()
    scrollParaCima()
   
})
voltar.addEventListener("click", ()=>{
    console.log(aa)
    
    numero--
    pegarDados()
    scrollParaCima()
 
})


function pegarDados(){

    var url = `https://www.abibliadigital.com.br/api/verses/${versaoAtual}/${aa}/` + numero;

    fetch(url, {
        method: 'GET', // ou qualquer outro método HTTP que você esteja utilizando
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkZyaSBKdW4gMDIgMjAyMyAwMToxODo0NiBHTVQrMDAwMC42NDc5NDIyN2IxMDc3NTAwMjAwMGQ3OTciLCJpYXQiOjE2ODU2Njg3MjZ9.8PsAyR7ONlfnaGzK5mJ3Zm54OcEe0Al7VDKL4TZnNAY'
        }})
    .then(function(res){
        return res.json()
    })
    .then(function(cons){
        tituloBiblia.innerHTML = cons.book.name
        capituloEVersiculo.innerHTML = cons.chapter.number
        textoBiblia.innerText = ""
        cons.verses.forEach(element => {
            
            textoBiblia.innerHTML = textoBiblia.innerHTML + "<p onclick='pintarLetra(this)'>" + element.number + " " + element.text + "</p>"
         });
         scrollParaCima()
    })
}

mudarCor.addEventListener("click", ()=>{
    //corpo.classList.toggle("bg-black")
    corpo.classList.toggle("text-bg-dark") // muda cor da tela interira
    opcoes.classList.toggle("text-bg-dark") // muda cor da tela interira
})



function aparecerLivros(){
    let verificado = 0
    let listaDosLivros = livros.getElementsByTagName('li');
    if(!listaDosLivros.length > 0){
        tituloBiblia.disabled = true;
        tituloBiblia.innerHTML = `
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span class="visually-hidden">Carregando...</span>
            `;
        verificado = 1
    } 


    var url = 'https://www.abibliadigital.com.br/api/books';

    fetch(url, {
        method: 'GET', // ou qualquer outro método HTTP que você esteja utilizando
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkZyaSBKdW4gMDIgMjAyMyAwMToxODo0NiBHTVQrMDAwMC42NDc5NDIyN2IxMDc3NTAwMjAwMGQ3OTciLCJpYXQiOjE2ODU2Njg3MjZ9.8PsAyR7ONlfnaGzK5mJ3Zm54OcEe0Al7VDKL4TZnNAY'
        }})
    .then(function(res){
        return res.json()
    })
    .then(function(cons){

        // console.log(cons)
        abreviatura = null
        
        livros.innerHTML = ""
        cons.forEach(element => {
            // console.log(element.name)
            url = `https://www.abibliadigital.com.br/api/verses/${versaoAtual}/`
            
            abreviatura = element.abbrev.pt
            numeroDeCapitulos = element.chapters
            url = `https://www.abibliadigital.com.br/api/verses/${versaoAtual}/` + abreviatura + '/' + 1               
            // console.log(url)
            
            livros.innerHTML = livros.innerHTML +
                `<li>
                    <h6 role="button" class="dropdown-item" onclick="receberDados('${url}', '${abreviatura}', '${numeroDeCapitulos}')">
                        ${element.name}
                    </h6>
                </li>`                
                // console.log(abreviatura)

        });
        scrollParaCima()  
        tituloBiblia.disabled = false;
        if(verificado == 1){
            tituloBiblia.innerHTML = `Livro`
            verificado = 0
        }

        

    }) 

}

function aparecerCapitulos(urlNova, abrev, capitulos){
    fetch(urlNova, {
        method: 'GET', // ou qualquer outro método HTTP que você esteja utilizando
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkZyaSBKdW4gMDIgMjAyMyAwMToxODo0NiBHTVQrMDAwMC42NDc5NDIyN2IxMDc3NTAwMjAwMGQ3OTciLCJpYXQiOjE2ODU2Njg3MjZ9.8PsAyR7ONlfnaGzK5mJ3Zm54OcEe0Al7VDKL4TZnNAY'
        }})
    .then(function(res) {
      return res.json();
    })
    .then(function(res) {
    let arrayLivros = res
    
     
    
        // arrayLivros.forEach((element)=>{
        
        //     cap.push({
        //         livro: element.abbrev.pt,
        //         capitulos: element.chapters,
        //         linkBase: 'https://www.abibliadigital.com.br/api/verses/nvi/' + element.abbrev.pt + '/' + 1
                
        //     })



        //     abreviatura = element.abbrev.pt
        //     // console.log(element.chapters)   
        //     // console.log(urlNova)   
 
        // })
        abreviatura = abrev
        
        a.innerHTML = ""
        for(let i = 1; i<= capitulos; i++){
            a.innerHTML = a.innerHTML + `
                <div onclick="receberDados('https://www.abibliadigital.com.br/api/verses/${versaoAtual}/${abreviatura}/${i}')" class="col m-1 col-xs-6 btn btn-primary rounded-start-2" data-bs-dismiss="modal">${i}</div>
            
            `
            aa = abreviatura
            cap = i
        }
    
    });
}
capituloEVersiculo.addEventListener("click", ()=>{




        a.innerHTML = ""
        for(let i = 1; i<= cap; i++){
            a.innerHTML = a.innerHTML + `
                <div onclick="receberDados('https://www.abibliadigital.com.br/api/verses/${versaoAtual}/${aa}/${i}')" class="col m-1 col-xs-6 btn btn-primary rounded-start-2" data-bs-dismiss="modal">${i}</div>
            
            `
            capAtual = i
            
        }
        console.log(aa, cap)
        scrollParaCima()

    }
    
)



function receberDados(url, abrev, i){
    fetch(url, {
        method: 'GET', // ou qualquer outro método HTTP que você esteja utilizando
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkZyaSBKdW4gMDIgMjAyMyAwMToxODo0NiBHTVQrMDAwMC42NDc5NDIyN2IxMDc3NTAwMjAwMGQ3OTciLCJpYXQiOjE2ODU2Njg3MjZ9.8PsAyR7ONlfnaGzK5mJ3Zm54OcEe0Al7VDKL4TZnNAY'
        }})
    .then(function(res) {
      return res.json();
    })
    .then(function(res) {




        
        let regex = /\/(\d+)$/; 
        let match = url.match(regex); // Executa a correspondência usando a expressão regular

        if (match) {
        numero = parseInt(match[1]); // Converte o valor correspondente para um número inteiro
        console.log(numero); // Exibe o número encontrado
        } else {
        console.log('Número não encontrado na URL');
        }
               





    numeroDeCapitulos = i
    capitulo = i
    let versos = res.verses
        urlNova = url
        
            // A UrlNova É O LIVRO CAP 1 COM OS VERSICULOS, DEPOIS BASTA RETIRAR A FUNÇÃO APARECER CAP DAQUI
        aparecerCapitulos('https://www.abibliadigital.com.br/api/books', abrev, i)
        
        textoBiblia.innerHTML = ""
        tituloBiblia.innerHTML = res.book.name
        capituloEVersiculo.innerHTML = res.chapter.number
        
        
        

        
        versos.forEach((element)=>{

            // console.log(element.number, element.text, url)
            let i = element.number
            textoBiblia.innerHTML = textoBiblia.innerHTML + "<p onclick='pintarLetra(this)' style='cursor: pointer;'>" + element.number + " " + element.text + "</p>"
            console.log(i)

            
            
          
            
        })
        scrollParaCima()
       
    });
}




function centerElement() {
    var element = document.getElementById('centered-element');
    var windowHeight = window.innerHeight;
    var elementHeight = element.offsetHeight;
  
    var topOffset = Math.max((windowHeight - elementHeight) * 0.80, 0);
    element.style.top = topOffset + 'px';
  }
  
  window.addEventListener('scroll', centerElement);
  window.addEventListener('resize', centerElement);
  
  // Chama a função inicialmente para centralizar o elemento quando a página é carregada.
  centerElement();
  var prevScrollPos = window.pageYOffset || document.documentElement.scrollTop;
var centeredElement = document.getElementById('centered-element');

function handleScroll() {
  var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollPos > prevScrollPos) {
    centeredElement.classList.add('hidden');
  } else {
    centeredElement.classList.remove('hidden');
  }

  prevScrollPos = currentScrollPos;
}

window.addEventListener('scroll', handleScroll);




info.addEventListener("click",(e)=>{
    
        var infoLivros = `https://www.abibliadigital.com.br/api/books/${aa}`;
    
        fetch(infoLivros, {
            method: 'GET', // ou qualquer outro método HTTP que você esteja utilizando
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkZyaSBKdW4gMDIgMjAyMyAwMToxODo0NiBHTVQrMDAwMC42NDc5NDIyN2IxMDc3NTAwMjAwMGQ3OTciLCJpYXQiOjE2ODU2Njg3MjZ9.8PsAyR7ONlfnaGzK5mJ3Zm54OcEe0Al7VDKL4TZnNAY'
            }})
        .then(function(res){
            return res.json()
        })
        .then(function(cons){
    
            // console.log(cons)
            // abreviatura = null
            
            infoLivro.innerHTML = ""
            // cons.forEach(element => {
            //     // console.log(element.name)
            //     // url = `https://www.abibliadigital.com.br/api/verses/${versaoAtual}/`
                
            //     // abreviatura = element.abbrev.pt
            //     // numeroDeCapitulos = element.chapters
            //     // url = `https://www.abibliadigital.com.br/api/verses/${versaoAtual}/` + abreviatura + '/' + 1               
            //     // console.log(url)
                
                 infoLivro.innerHTML = infoLivro.innerHTML +
                     `
                         <h6>Nome: ${cons.name}</h6>                         
                         <h6>Possível Autor: ${cons.author}</h6>
                         <h6>Capitulos: ${cons.chapters}</h6>
                         <h5 class="my-2">Comentario: ${cons.comment}</h5>
                         <h6>Grupo de Livro: ${cons.group}</h6>
                         <h6>Abreviatura: ${cons.abbrev.pt}</h6>
                         <h6>Testamento: ${cons.testament}</h6>
                     `
                    
                   
    
            // });
            console.log(cons)
        }) 
    
    
})

var formularioApagar = document.querySelector(".formularioApagar")
var formularioFecharBotao = document.querySelector(".formularioFechar")


formularioFecharBotao.addEventListener("click", ()=>{
    formularioApagar.classList.remove("show");
    formularioApagar.style.display = "none"
})
function fecharForm(){
    formularioApagar.classList.remove("show");
    formularioApagar.style.display = "none"
}

apagar.addEventListener("click", (e)=>{

    formularioApagar.classList.add("show");
    formularioApagar.style.display = "block"
    
})


var dadosDoToken = localStorage.getItem("id")
document.getElementById('confirmarDadosDoForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita o envio do formulário
    
    // Captura dos valores dos campos
    var email1 = document.querySelector('.email1').value;
    var password1 = document.querySelector('.password1').value;
    // ...
  
    // Aqui você pode fazer o que quiser com os dados capturados
    // Por exemplo, você pode armazená-los em um objeto ou enviá-los para um servidor
  
    // Exibindo os dados no console
    console.log('Email:', email1);
    console.log('Senha:', password1);

    deletarID(email1, password1, dadosDoToken)
   
})




function deletarID(email, senha, token){
    console.log(token)
    var url = 'https://www.abibliadigital.com.br/api/users';
  
    var data = {
        email: email,
        password: senha,
    };
  
    fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            console.log('Usuário excluído com sucesso');
            // Faça algo após a exclusão bem-sucedida
          } else {
            throw new Error('Erro ao deletar usuário: ' + response.statusText);
          }
        })
        .catch(error => {
          console.error('Erro ao deletar usuário:', error);
          // Faça algo em caso de erro
        });
}