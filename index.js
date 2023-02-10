const elementosDasCelulas = document.querySelectorAll("[data-Celulas]");
const borda = document.querySelector("[data-Borda]");
const mensagemDaVitoriaElemento = document.querySelector(
  "[data-Mensagem-Vitoria-Texto]"
);
const mensagemVitoria = document.querySelector("[data-Mensagem-Vitoria]");
const botaoRestart = document.querySelector("[data-mensagem-restart-botao]");

//Contagem do Placar
let placarJogador = 0;
let placarComputador = 0;

//Contagem do Turno
let circuloTurno;

const combinacaoDeVitoria = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const inicioJogo = () => {
  let circuloTurno = false;
  for (const celulas of elementosDasCelulas) {
    celulas.classList.remove("circulo");
    celulas.classList.remove("x");
    celulas.removeEventListener("click", somenteClick);
    celulas.addEventListener("click", somenteClick, { once: true });
  }

  concertandoClasse();
  mensagemVitoria.classList.remove("aparecer-mensagem-vitoria");
};

const fimDeJogo = (deuEmpate) => {
  if (deuEmpate) {
    mensagemDaVitoriaElemento.innerText = "Empate!";
  } else {
    mensagemDaVitoriaElemento.innerText = circuloTurno
      ? "Circulo ganhou"
      : "X ganhou";
  }

  mensagemVitoria.classList.add("aparecer-mensagem-vitoria");
};

const reiniciarJogoNovamente = () => {};

const checandoVitoria = (currentPlayer) => {
  return combinacaoDeVitoria.some((combination) => {
    return combination.every((index) => {
      return elementosDasCelulas[index].classList.contains(currentPlayer);
    });
  });
};

const checandoEmpate = () => {
  return [...elementosDasCelulas].every((celulas) => {
    return (
      celulas.classList.contains("x") || celulas.classList.contains("circulo")
    );
  });
};

const placeMark = (celulas, classeAdicionada) => {
  celulas.classList.add(classeAdicionada);
};

const concertandoClasse = () => {
  borda.classList.remove("circulo");
  borda.classList.remove("x");

  if (circuloTurno) {
    borda.classList.add("circulo");
  } else {
    borda.classList.add("x");
  }
};

const virandoTurnos = () => {
  circuloTurno = !circuloTurno;
  concertandoClasse();
};

const jogadaComputador = () => {
  // Verifica se o jogador vai ganhar na próxima jogada
  let celulaEscolhida;
  do {
    celulaEscolhida = elementosDasCelulas[Math.floor(Math.random() * 9)];
  } while (
    celulaEscolhida.classList.contains("x") ||
    celulaEscolhida.classList.contains("circulo")
  );

  // Marcar a célula como "Circulo"
  placeMark(celulaEscolhida, "circulo");

  // Verificar se o computador ganhou
  const deuVitoria = checandoVitoria("circulo");
  if (deuVitoria) {
    fimDeJogo(false);
    placarComputador++;
    atualizarPlacarComputador();
  } else if (checandoEmpate()) {
    fimDeJogo(true);
  } else {
    // Mudar para o próximo turno (jogador)
    virandoTurnos();
  }
};

const somenteClick = (e) => {
  //Colocar o Xis ou o Circulo
  const celulas = e.target;
  const classeAdicionada = circuloTurno ? "circulo" : "x";

  placeMark(celulas, classeAdicionada);

  //Vitoria
  const deuVitoria = checandoVitoria(classeAdicionada);

  //Empate
  const deuEmpate = checandoEmpate();

  if (deuVitoria) {
    fimDeJogo(false);
    placarJogador++;
    atualizarPlacarJogador();
  } else if (deuEmpate) {
    fimDeJogo(true);
  } else {
    //Mudando Simbolo
    virandoTurnos();
    jogadaComputador();
  }
};

const atualizarPlacarJogador = () => {
  document.getElementById(
    "placar-jogador"
  ).textContent = `Placar Jogador: ${placarJogador}`;
};

const atualizarPlacarComputador = () => {
  document.getElementById(
    "placar-computador"
  ).textContent = `Placar Computador: ${placarComputador}`;
};

inicioJogo();
botaoRestart.addEventListener("click", inicioJogo);
