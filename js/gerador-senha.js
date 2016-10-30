/**
 * Função que localiza aletóriamente o índice de uma vogal dentro de uma string
 * @param {string} texto    Texto onde será procurado um caracter aleatório de acordo com a regExp
 * @param {regExp} regExp   Expressão regular para escolher um caracter de acordo com o critério desejado
 * @return {int}   pos      Índice do caracter
 */
function escolherIndiceAleatorio(texto, regExp) {
    let pos = parseInt(texto.length) - parseInt((Math.random() * 10).toFixed());
    if (pos < 0) pos *= (-1);
    while (pos > texto.length || pos > texto.length ||
        !regExp.test(texto[pos])) {

        pos = parseInt(texto.length) - parseInt((Math.random() * 10).toFixed());
        if (pos < 0) pos *= (-1);
    }


    // if (pos >= texto.length) {
    //     pos = texto.length - 2;
    // } else if (pos <= 0) {
    //     pos = 1;
    // }

    // while (!/[a-zA-Z]/.test(texto[pos])) {
    //     pos++;
    // }
    return pos;
}

document.querySelector('#txtFrase').addEventListener('keyup', (ev) => {
    let txtFrase = ev.target;
    let valor = txtFrase.value.trim();


    //console.log('Valor atual(keypress): ' + valor);

    let lblQtdLetras = document.getElementById('lblQtdLetras');
    let lblQtdPalavras = document.getElementById('lblQtdPalavras');
    if (valor) {
        if (lblQtdLetras) {
            lblQtdLetras.innerHTML = 'Quantidade de letras: ' + valor.match(/[^ ]/g).length;
        }

        if (lblQtdPalavras) {
            let valorLimpo = new Frase(valor);
            valorLimpo = valorLimpo.removerEspacosDuplicados();
            lblQtdPalavras.innerHTML = 'Quantidade de palavras ' + valorLimpo.split(' ').length;
        }
    } else {
        lblQtdLetras.innerHTML = '';
    }


});

document.querySelector('#btnGerarSenha').addEventListener('click', (ev) => {
    try {
        let frase = new Frase(document.querySelector('#txtFrase').value.trim())
        frase.frase = frase.limpar();
        if (frase.validar()) {
            frase = frase.converter();
            let resultado = document.querySelector('#txtSenha');
            if (resultado) {
                resultado.value = frase;
            }
        }


    } catch (ex) {
        //alert(ex.message);
    }
});

document.getElementById('icoVerSenha').addEventListener('mouseenter', function(ev) {
    let txtSenha = document.getElementById('txtSenha');
    txtSenha.setAttribute('type', 'text')
});

document.getElementById('icoVerSenha').addEventListener('mouseleave', function(ev) {
    let txtSenha = document.getElementById('txtSenha');
    txtSenha.setAttribute('type', 'password')
});