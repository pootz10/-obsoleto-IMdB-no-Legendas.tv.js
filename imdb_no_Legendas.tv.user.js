// ==UserScript==
// @name        IMdB no Legendas.tv
// @namespace   pootz10
// @description Poe Link do IMdB do lado do Titulo das Legendas do legendas.tv
// @include     http://*legendas.tv/download/*
// @version     2.0
// @history     2.0 - update search title and regex search for imdb.to shorten url
// @history     1.9 - update url updated
// @history     1.8 - fix bug, onde sem http na url ocorreria falha
// @history     1.7 - quando o link imdb estiver presente na descricao, adiciona a nota e quantidade de votos ao invez do icone
// @history     1.6 - procura pelo ano pra aumentar a precisao de busca pra titulos de mesmo nome e ano diferente
// @history     1.5 - adiciona um botao de download logo abaixo do titulo
// @history     1.4 - arruma bug pra titulos de legendas com barras
// @history     1.3 - coloca o link de download pra baixar a legenda no titulo "azul" a esquerda do imdbIcone imdb
// @history     1.2 - resulta no link direto do imdb e nao no de busca (impreciso pra filmes "remakes" de mesmo nome e data diferente
// @history     1.1 - adiciona imdbIcone imdb a direita do titulo com link de busca para o mesmo
// @history     1.0 - clica no titulo "azul" pra abrir busca do titulo no imdb
// @require     https://code.jquery.com/jquery-2.1.1.min.js
// @updateURL   https://raw.githubusercontent.com/pootz10/IMdB-no-Legendas.tv.js/master/imdb_no_Legendas.tv.user.js
// @downloadURL https://raw.githubusercontent.com/pootz10/IMdB-no-Legendas.tv.js/master/imdb_no_Legendas.tv.user.js
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// ==/UserScript==


//icones
imdbIcone = "data:image/jpeg;base64,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";
downIcone = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAAAWCAIAAADLpcx/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH8SURBVFhH7Vg7bsMwDO0JepLexWfoFbzmHjpEJ4/x2sGDd2/ZDHd3p7axw/KjD61ICVCkQ2ITD4lMUdTjEyMDeQKAE8CEX9M3fqzWSIif6YhaAMz0sVZ7gvfnv+Hl9e2RsAlhsQlhsQlhsQlhsQlhkRAiihBEMYgo4N5xKyGa2r6PxUazc1O77rBw7s3AT21TVCOP2B/C4FDt7VrT0/PQ17Jk6ArxC+LM2u89eWJL3LAjmtoTpQJ8eW7vMEZyfcmRZRvKLqrezUJteAk5O45UyQXpzARcYqoxqJkkZqcCFkJEc+e4GLzgihXKmStCSNE+hvqxBrtqb6qGwxocmMHSzQmRy0x52q4IaREJYjLWiDsimta4FrnYj9q+bfSBeyeNHdHCdLXUvOuM7QIUApfYrskJkc0clvuTTxCTscb//DQc0WhXfAznRvUzaWxX7B3TuLVSCbcx9VS2I9KZ5Vphc7+vBDEZaySEQERB0awgilnsd+WO8DFyU9CloMg5IaRaH+OT77oaAzKZy0pxcD2SICaPCmkhED4i8nv4AAYVo0xtRizPnLLEHak7dnZyqL8syxaFcC8aa7p+7ZEwO0t3Adow+pcRW8QhICsEAqcjj4bO8gC4JMRlRInuHZsQFvQPFcAHwHycv3i8UmMhps/5BDP/cblak45YvQH8Akif3tF8n0IyAAAAAElFTkSuQmCC";

//pega usuario, descricao, download link
var usuario = $("span.nume").text();
var t2 = $("div.t2 p").text();
var download = $("button.icon_arrow").attr("onclick");

//regex dos links imdb a procurar
var procura = /(http:\/\/www\.imdb\.com\/title\/tt\d{7})|(http:\/\/imdb\.com\/title\/tt\d{7})|(www\.imdb\.com\/title\/tt\d{7})|(https:\/\/imdb\.to\/[\w\d]{7})/i;

//acha titulo e corrige possiveis caracteres q podem bugar a busca
h3 = $("h3:first");

buscaTitulo = h3.text();

//se tem barra / no titulo
if (buscaTitulo.indexOf("/") != -1) {

    if (buscaTitulo.indexOf("'s") != -1) {

        var j = buscaTitulo.indexOf("/");

        if (buscaTitulo.charAt(j - 1) == " ") {
            buscaTitulo = buscaTitulo.slice(0, j - 1);
        } else {
            buscaTitulo = buscaTitulo.slice(0, j);
        }

    } else {

        var i = buscaTitulo.lastIndexOf('/');

        if (buscaTitulo.substring(i + 1).charAt(0) == " ") {
            buscaTitulo = buscaTitulo.substring(i + 2);
        } else {
            buscaTitulo = buscaTitulo.substring(i + 1);
        }

    }

    trataTitulo();

}
else {

    trataTitulo();

}

//busca por link do imdb na descricao, e pega o primeiro encontrado e insere a direita do titulo
//(nao busca, se uploader for creepysubs, por adicionarem mtos links imdb nao relacionados ao filme
if ( procura.test(t2) ) { // && usuario != "creepysubs")

        var imdb = t2.match(procura)[0];

        if (imdb.indexOf("http") == -1) {
            imdb = "http://" + imdb;
        }

        GM_xmlhttpRequest ( {
            method:         "GET",
            url:            imdb,
            onload:         imdbRate
        });

}
//inicia busca do titulo da legenda no imdb
else {

        site = "http://www.imdb.com/find?q=" + buscaTitulo + "&s=tt&exact=false";

        GM_xmlhttpRequest ( {
                method:         "GET",
                url:            site,
                onload:         pesquisaIMdB
        });

}

//insere link imdb ao lado do titulo
function insere(imdb) {

    if (imdb != "undefined" || imdb !== null) {

        var imdbLink = '<h3>' + h3.text() + '</h3><br><a id="download" onclick="' + download + '" target="_blank"><img src="' + downIcone + '"></img></a><a id="imdb" href="' + imdb + '" target="_blank"><img src="' + imdbIcone + '"></img></a>';
        h3.replaceWith(imdbLink);

    }
}

function insereRate(imdb, rates) {

    if (rates != "undefined" || rates !== null) {

        var imdbLink = '<h3>' + h3.text() + '</h3><br><a id="download" onclick="' + download + '" target="_blank"><img src="' + downIcone + '"></img></a><a id="imdb" href="' + imdb + '" target="_blank"><font color="blue" size="3"><b>' + rates + '</b></font></a>';
        h3.replaceWith(imdbLink);

    } else {
        insere(imdb);
    }
}

function imdbRate(object) {

    var resp = $(object.responseText);
    var rate = resp.find('span[itemprop="ratingValue"]');
    var count = resp.find('span[itemprop="ratingCount"]');
    var rates = rate[0].textContent + " (" + count[0].textContent + ")";
    insereRate(imdb, rates);

}


//encapsula xmlhttprequest pra nao perder dados, acha links e titulos da pesquisa, e seta link imdb
function pesquisaIMdB(objeto) {

    var respDoc = $(objeto.responseText);
    var resultados = respDoc.find('.result_text');
    var achou = false;
    var h1 = $("h1:first").text().trim();

    var ano = /20[0-3][0-9]|19[0-9][0-9]/;
    if (ano.test(h1)){
        pegaAno = h1.match(ano)[0];
    } else {
        pegaAno = null;
    }

    for (var i = 0; i < resultados.length; i++) {

        var achaTitulo = resultados[i].textContent.toLowerCase();
        var iLink = resultados[i].getElementsByTagName("a")[0].getAttribute("href");

        if (pegaAno !== null) {

            if (achaTitulo.indexOf( pegaAno ) != -1) {

                achou = true;
                var achaLink = iLink.slice( iLink, iLink.indexOf("/?") );
                imdb = "http://www.imdb.com" + achaLink;
                insere(imdb);
                break;

            }

        } else {

            if (achaTitulo.indexOf( oTitulo ) != -1) {

                achou = true;
                buscaLink = iLink.slice( iLink, iLink.indexOf("/?") );
                imdb = "http://www.imdb.com" + buscaLink;
                insere(imdb);
                break;

            }
        }

    }

    if (!achou) {

        imdb = site;
        insere(imdb);

    }

}

function trataTitulo () {

    oTitulo = buscaTitulo.toLowerCase();
    buscaTitulo = buscaTitulo.replace(/&/g,"%26");
    buscaTitulo = buscaTitulo.replace(/\?/g,"%3F");
    buscaTitulo = buscaTitulo.replace(/=/g,"%3D");
    buscaTitulo = buscaTitulo.replace(/ /g,"+");

}

//Posiciona link imdb a direita do titulo
GM_addStyle ( '                         			      \
    #download {					                            \
        position: absolute;					                \
    }                                               \
    #imdb {					                                \
        position: absolute;					                \
        right:  0px;                                \
    }                                               \
' );
