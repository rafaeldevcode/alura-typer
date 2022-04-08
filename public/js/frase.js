$('#mostrar-frase').click(carregarFraseAleatoria);
$('#buscar-frase-id').click(carregarFraseUnica);

function carregarFraseAleatoria(){
    $('#spinner').show();

    $.get('http://localhost:3000/frases', (res)=>{
        let numeroAleatorio = Math.floor(Math.random() * res.length);

            $('.frase').text(res[numeroAleatorio].texto);
            $('#id-frase').text(res[numeroAleatorio]._id + ' - ');

            atuatizaTempoInicial(res[numeroAleatorio].tempo);
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

function carregarFraseUnica(){
    let fraseId = $('#frase-id').val();
    let data = { id: fraseId };
        $('#spinner').show();
        $.get('http://localhost:3000/frases', data, (res)=>{

            $('.frase').text(res.texto);
            $('#id-frase').text(res._id + ' - ');

            atuatizaTempoInicial(res.tempo);
            contarPalavras();
        }).fail((error)=>{
            // let messageErro = error.status + ' ' + error.statusText + ': ' +error.responseText;
            let messageErro = 'Objeto com o ID não encontrado!';
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