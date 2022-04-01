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

function contarPalavrasDigitadas(){
    campo.on('input', ()=>{
        let conteudo = campo.val();

        let qtdPalavras = conteudo.split(/\S+/).length - 1;
            $('#qtd-palavras-dig').text(qtdPalavras);

        let qtdCaracteres = conteudo.length;
            $('#qtd-caracteres').text(qtdCaracteres);
    })
}

function iniciarContador(){
    let temposRestante = $('#tempo-digitacao').text();

    campo.one('focus', ()=>{
        let id = setInterval(()=>{
            temposRestante--;
            $('#tempo-digitacao').text(temposRestante);

            if(temposRestante < 1){
                campo.attr('disabled', true);
                clearInterval(id);
            }
        }, 1000);
    });
}

function reiniaciarJogo(){
    campo.attr('disabled', false);
    campo.val('');
    $('#qtd-palavras-dig').text('0');
    $('#qtd-caracteres').text(0);
    $('#tempo-digitacao').text(tempoInicial);   
    iniciarContador();
}