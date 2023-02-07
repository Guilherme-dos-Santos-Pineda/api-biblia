var dado = document.querySelector(".dado")
var texto = document.querySelector(".texto")
var ids = document.querySelector(".ids")
var img = document.querySelector(".img")

dado.addEventListener("click", (e)=>{

    
    var url = 'https://api.adviceslip.com/advice';

    fetch(url)
    .then(function(res){
        return res.json()
    })
    .then(function(cons){
        dado.setAttribute("disabled","disabled");
        setTimeout(function(){
            dado.removeAttribute("disabled");
            texto.innerHTML = cons.slip.advice
            ids.innerHTML = `Advice #${cons.slip.id}`
            console.log(cons.slip.advice)
        }, 2000) 
    })
})