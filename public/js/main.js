var campo = $('.texto-digitado')
var tempoInicial = $('#tempo-digitacao').text();

$(document).ready(()=>{
    contarPalavras();
    contarPalavrasDigitadas();
    iniciarContador();
    $('#reiniciar-jogo').click(reiniaciarJogo);
})

function contarPalavras(){
    let frase = $('.frase').text();
    let numeroPalavras = $('#qtd-palavras');
    let qtdPalavras = frase.split(' ').length;
        numeroPalavras.text(qtdPalavras);
}

function auatizaTempoInicial(tempo){
    tempoInicial = tempo;
    $('#tempo-digitacao').text(tempo);
}

function contarPalavrasDigitadas(){
    campo.on('input', ()=>{
        let conteudo = campo.val();

        let qtdPalavras = conteudo.split(/\S+/).length - 1;
            $('#qtd-palavras-dig').text(qtdPalavras);

        let qtdCaracteres = conteudo.length;
            $('#qtd-caracteres').text(qtdCaracteres);

        verificarCampoDigitado(conteudo);
    })
}

function iniciarContador(){
    campo.one('focus', ()=>{
        let temposRestante = $('#tempo-digitacao').text();
        let id = setInterval(()=>{
            temposRestante--;
            $('#tempo-digitacao').text(temposRestante);

            if(temposRestante < 1){
                clearInterval(id);
                finalizarJogo();
            }
        }, 1000);
    });
}

function finalizarJogo(){
    campo.attr('disabled', true);
    campo.toggleClass('campo-desabilitado');
    adicionarLinha();

    $('.placar').slideDown();
    scrollPlacar();
}

function verificarCampoDigitado(conteudo){
    let frase = $('.frase').text();
        if(conteudo == frase.substr(0, conteudo.length)){
            campo.removeClass('borda-vermelha');
            campo.addClass('borda-verde');
        }else{
            campo.removeClass('borda-verde');
            campo.addClass('borda-vermelha');
        }
}

function reiniaciarJogo(){
    campo.attr('disabled', false);
    campo.val('');
    campo.toggleClass('campo-desabilitado');
    $('#qtd-palavras-dig').text('0');
    $('#qtd-caracteres').text(0);
    $('#tempo-digitacao').text(tempoInicial);
    campo.removeClass('borda-vermelha');
    campo.removeClass('borda-verde');
    iniciarContador();
}