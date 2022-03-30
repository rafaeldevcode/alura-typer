var frase = $('.frase').text();
var numeroPalavras = $('#numero-palavras');
var palavras = frase.split(' ').length;
    numeroPalavras.text(palavras);