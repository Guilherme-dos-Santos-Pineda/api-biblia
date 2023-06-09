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
var paragrafos = document.getElementsByTagName("p")
var capitulo ;
var capitnumeroDeCapitulosulo = null
let url = 'https://www.abibliadigital.com.br/api/verses/nvi/'
var version = "nvi/"
var abreviatura
var cap
var capAtual
var numero

function pintarLetra(element, numeroDoVersiculo){
    
    // let salvar = localStorage.setItem("versiculoPintado", numeroDoVersiculo)
     element.classList.toggle("pintado")

    
}

avançar.addEventListener("click", ()=>{
    console.log(aa)
    
    numero++
    pegarDados()
   
})
voltar.addEventListener("click", ()=>{
    console.log(aa)
    
    numero--
    pegarDados()
 
})


function pegarDados(){
    var url = `https://www.abibliadigital.com.br/api/verses/nvi/${aa}/` + numero;

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
            
            textoBiblia.innerHTML = textoBiblia.innerHTML + "<p>" + element.number + " " + element.text + "</p>"
         });

    })
}

mudarCor.addEventListener("click", ()=>{
    // corpo.classList.toggle("bg-black")
    corpo.classList.toggle("text-bg-dark")
})



function aparecerLivros(){
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
            url = 'https://www.abibliadigital.com.br/api/verses/nvi/'
            
            abreviatura = element.abbrev.pt
            numeroDeCapitulos = element.chapters
            url = 'https://www.abibliadigital.com.br/api/verses/nvi/' + abreviatura + '/' + 1               
            // console.log(url)
            
            livros.innerHTML = livros.innerHTML +
                `<li>
                    <h6 role="button" class="dropdown-item" onclick="receberDados('${url}', '${abreviatura}', '${numeroDeCapitulos}')">
                        ${element.name}
                    </h6>
                </li>`                
                // console.log(abreviatura)

        });
            
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
                <div onclick="receberDados('https://www.abibliadigital.com.br/api/verses/nvi/${abreviatura}/${i}')" class="col m-1 col-xs-6 btn btn-primary rounded-start-2" data-bs-dismiss="modal">${i}</div>
            
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
                <div onclick="receberDados('https://www.abibliadigital.com.br/api/verses/nvi/${aa}/${i}')" class="col m-1 col-xs-6 btn btn-primary rounded-start-2" data-bs-dismiss="modal">${i}</div>
            
            `
            capAtual = i
            
        }
        console.log(aa, cap)

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
            textoBiblia.innerHTML = textoBiblia.innerHTML + "<p onclick='pintarLetra(this)'>" + element.number + " " + element.text + "</p>"
            console.log(i)

            
            
          
            
        })
       
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
