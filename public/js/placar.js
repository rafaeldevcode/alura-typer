$('#mostrar-placar').click(mostrarPlacar);
$('#sincronizar').click(sincronizarPlacar);

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

function sincronizarPlacar(){

    let placar = [];
    let linhas = $("tbody>tr");

    linhas.each(function(){
        let usuario = $(this).find("td:nth-child(1)").text();
        let palavras = $(this).find("td:nth-child(2)").text();

        let score = {
            usuario: usuario,
            pontos: palavras            
        };

        placar.push(score); 
    });

    dados = {
        placar: placar
    }

    $.post("http://localhost:3000/placar", dados, ()=>{

        let successClass = $('.success')
        successClass.show();
        successClass.text('Dados sincronizado com sucesso!');

        setTimeout(() => {
            successClass.hide();
        }, 2500);

    }).fail((error)=>{

        let messageErro = error.status + ' ' + error.statusText + ': ' +error.responseText;
        let erroClass = $('.erros')
        erroClass.show();
        erroClass.text(messageErro);

        setTimeout(() => {
            erroClass.hide();
        }, 2500);

    });
}

function atualizarPlacar(){
    $.get("http://localhost:3000/placar", (res)=>{
        $(res).each(function(){

            let linha = criarLinha(this.usuario, this.pontos);
                linha.find('.remover').click(removerLinha);
                $('tbody').append(linha);
        });
    })
}