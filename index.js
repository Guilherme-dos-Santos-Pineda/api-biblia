var dado = document.querySelector(".dado")
var texto = document.querySelector(".texto")
var ids = document.querySelector(".ids")
var img = document.querySelector(".img")
var login = document.querySelector(".login")
var createUser = document.querySelector(".createUser")
var subMain = document.querySelector(".subMain")
var telaDeCadastro = document.querySelector(".telaDeCadastro")
var telaDeLogin = document.querySelector(".telaDeLogin")
var fechar = document.querySelector(".fechar")
var fecharDois = document.querySelector(".fecharDois")

createUser.addEventListener( 'click', (e)=>{
    if(e.target){
    subMain.style.display = "none"
    telaDeCadastro.style.display = "flex"
    }
} )
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