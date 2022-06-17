/* var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);
 */

var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores(); //novo
    $("#botao-reiniciar").click(reiniciaJogo);
});

/* conta as palavra e caraceres da frase esplitada .lenght */
function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

/* "Escuta" e inicializa os contadores */
function inicializaContadores() {
    campo.on("input", function() {
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}


/* FUNÇAO Quando clicar, abrir caixa de texto e contar tempo
e ao final do tempo travar a caixa de texto novamente
 */
function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function() {
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                campo.attr("disabled", true);
                clearInterval(cronometroID);
                campo.toggleClass("campo-desativado");
            }
        }, 1000);
    });
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function() {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        console.log("digitado:" + digitado);
        console.log("frase c.:" + comparavel);
        
        if (digitado == comparavel) {
            campo.addClasse("borda-verde");
            campo.removeClasse("borda-vermelha");
        } else {
            campo.addClasse("borda-vermelha");
            campo.removeClasse("borda-verde");
        }

    });
}


function reiniciaJogo(){
    campo.attr("disabled",false);
    
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");

    campo.removeClass("borda-vermelha"); //novo
    campo.removeClass("borda-verde"); //novo
}











//
/* o split retorna o tamanho da frase separada pelos
espaços e retorna um array, que ja indica o seu tamanho */

/* o .length conta quantas palavras tem no array
 e expoe o resultado */

/* Ou seja, a função .text() tem dois 
comportamentos, o primeiro , quando 
utilizamos-a sem nenhum parâmetro,
 nos é retornado o valor de texto
  do elemento, e o segundo, quando 
  passamos um parâmetro para a função, 
  ela altera o valor de texto do elemento! */