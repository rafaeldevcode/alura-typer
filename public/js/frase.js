$('#mostrar-frase').click(carregarFraseAleatoria);

function carregarFraseAleatoria(){
    $.get('http://localhost:3000/frases', (res)=>{
        let numeroAleatorio = Math.floor(Math.random() * res.length);
            
            $('.frase').text(res[numeroAleatorio].texto);
            auatizaTempoInicial(res[numeroAleatorio].tempo);
            contarPalavras();
    });
}