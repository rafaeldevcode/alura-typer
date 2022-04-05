$('#mostrar-frase').click(carregarFraseAleatoria);

function carregarFraseAleatoria(){
    $('#spinner').show();

    $.get('http://localhost:3000/frases', (res)=>{
        let numeroAleatorio = Math.floor(Math.random() * res.length);
            
            $('.frase').text(res[numeroAleatorio].texto);
            auatizaTempoInicial(res[numeroAleatorio].tempo);
            contarPalavras();
    }).fail((error)=>{
        let messageErro = error.status + ' ' + error.statusText + ': ' +error.responseText;
        let erroClass = $('.erros')
            erroClass.show();
            erroClass.text(messageErro);

            setTimeout(() => {
                erroClass.hide();
            }, 2500);
    }).always(()=>{
        $('#spinner').hide();
    });
}