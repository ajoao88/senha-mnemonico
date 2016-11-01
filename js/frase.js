var Frase = function(frase) {
    this.frase = frase;
};

Frase.prototype.extrairPalavras = function() {
    return this.frase.split(' ');
}

Frase.prototype.removerEspacosDuplicados = function() {
    let frase = this.frase;
    frase = frase.split(' ').filter(function(indice) {
        return indice;
    }).join(' ');

    return frase;
}

Frase.prototype.limpar = function() {
    let frase = this.frase,
        mapaHexAcentos = {
            a: /[\xE0-\xE6]/g,
            e: /[\xE8-\xEB]/g,
            i: /[\xEC-\xEF]/g,
            o: /[\xF2-\xF6]/g,
            u: /[\xF9-\xFC]/g,
            c: /\xE7/g,
            n: /\xF1/g
        };

    frase = this.removerEspacosDuplicados();

    for (let chave in mapaHexAcentos) {
        frase = frase.replace(mapaHexAcentos[chave], chave);
    }
    frase = frase.replace(/ /g, ' ');
    frase = frase.replace(/[^\w ]/g, '');

    return frase;
}

Frase.prototype.validar = function() {
    let frase = this.frase,
        palavras = this.extrairPalavras(),
        cont = 0,
        posicao = 0;

    if (frase.split(' ').length < 4) {
        alert('Digite uma frase com no mínimo 4 palavras');
        return false;
    }


    for (var palavra in palavras) {
        let prefixo = palavras[palavra].substr(0, 2);
        cont = 0;

        for (var i = 0; i < palavras.length; i++) {
            cont += prefixo == palavras[i].substr(0, 2) ? 1 : 0;
        }
        if (cont > 2) {
            break;
        }
    }

    if (cont > 2) {
        alert('Essa frase contém muitos prefixos iguais, mude sua frase por favor');
        return false;
    }

    return true;
}

Frase.prototype.converter = function() {
    let letrasASubstituir = [/a/i, /e/i, /i/i, /o/i, /t/i],
        simbolosSubstitutos = ['@', '&', '!', '*', '+'],
        numerosSubstitutos = [4, 3, 1, 0, 7],
        substituidoPorSimbolo = false,
        substituidoPorNumero = false,
        frase = this.frase,
        senha = '';

    frase.split(' ').forEach(function(palavra) {
        senha += palavra.substr(0, 2);
    });

    let chars = senha.split('');
    let i = 0;
    i = escolherIndiceAleatorio(simbolosSubstitutos.join(''), /./);

    //Leetificação e conversão de case de algumas letras
    while (!substituidoPorSimbolo || !substituidoPorNumero) {
        if (!substituidoPorSimbolo &&
            simbolosSubstitutos[i] && senha.search(letrasASubstituir[i]) >= 0) {
            senha = senha.replace(letrasASubstituir[i], simbolosSubstitutos[i]);
            substituidoPorSimbolo = true;
        }

        if (!substituidoPorNumero &&
            senha.search(letrasASubstituir[i]) >= 0) {
            senha = senha.replace(letrasASubstituir[i], numerosSubstitutos[i]);
            substituidoPorNumero = true;
        }
        i = escolherIndiceAleatorio(simbolosSubstitutos.join(''), /./)
    }

    let pos = escolherIndiceAleatorio(senha, /[a-zA-Z]/);
    //Troca de case de algumas letras
    senha = senha.substring(0, (pos <= 1) ? 1 : pos) + senha[pos].toLowerCase() + senha.substr(pos + 1)
    pos = parseInt(senha.length) - pos;
    while (!/[a-zA-Z]/.test(senha[pos])) {
        pos++;
    }
    senha = senha.substring(0, (pos <= 1) ? 1 : pos) + senha[pos].toUpperCase() + senha.substr(pos + 1);

    return senha;
}