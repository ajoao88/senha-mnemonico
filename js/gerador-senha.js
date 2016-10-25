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