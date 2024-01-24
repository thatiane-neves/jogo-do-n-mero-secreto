let listaDeNumerosSorteados [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatório();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    ResponsiveVoice.speak(texto, 'brazilianPortugueseFemale', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'jogo do número secreto')
    exibirTextoNaTela('p' , 'escolha um número entre 1 e 10')
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
   
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById ('reiniciar').removeAttribute('disabeld');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'o número secreto é menor');
        } else {
            exibirTextoNaTela('p','O número secreto é maior');
        } 
        tentativas++;        
        limparCampo();            
    }
}

function gerarNumeroAleatório() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    
    if(quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }   
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){   
        return gerarNumeroAleatório();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() { 
   chute = document.querySelector('input');
   chute.value = '';
}

function reiniciarJogo() { 
    numeroSecreto = gerarNumeroAleatório();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}   