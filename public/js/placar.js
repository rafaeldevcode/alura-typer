$('#mostrar-placar').click(mostrarPlacar);

function adicionarLinha(){
    let corpoTable = $('.placar').find('tbody');
    let jogador = 'Rafael';
    let palavras = $('#qtd-palavras-dig').text();

    let linha = criarLinha(jogador, palavras);
        corpoTable.prepend(linha);

        linha.find('.remover').click(removerLinha);
}

function criarLinha(jogador, palavras){
    let icone = $('<i>').addClass('small').addClass('material-icons').text('delete');
    let link = $('<a>').addClass('remover').attr('href', '#');
        link.append(icone);

    let colunaJogador = $('<td>').text(jogador);
    let colunaPalavras = $('<td>').text(palavras);
    let colunaAcoes = $('<td>');
        colunaAcoes.append(link);

    let linha = $('<tr>');
        linha.append(colunaJogador);
        linha. append(colunaPalavras);
        linha.append(colunaAcoes);

    return linha;
}

function removerLinha(event){
    event.preventDefault();
    let item = $(this).parent().parent();
        item.fadeOut(()=>{
            item.remove();
        });
}

function mostrarPlacar(){
    $('.placar').stop().slideToggle();
    scrollPlacar();
}

function scrollPlacar(){
    let posicaoPlacar = $('.placar').offset().top;
        $('body').animate({
            scrollTop: posicaoPlacar + "px"
        }, 1000);
}