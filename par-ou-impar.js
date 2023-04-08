const computador = Math.floor(Math.random() * 10);

const escolhaParOuImpar =  process.argv[2];
const numeroUsuario = process.argv[3];

const soma =  computador + Number(numeroUsuario);

if (soma %2 === 0) {
    if (escolhaParOuImpar.toUpperCase() === "PAR") {
        console.log(`Você escolheu par e o computador escolheu impar. O resultado foi ${soma}. Você ganhou!`);
    }else{
        console.log(`Você escolheu impar e o computador escolheu par. O resultado foi ${soma}. Você perdeu!`);
    }
}else {
    if (escolhaParOuImpar.toUpperCase() === "IMPAR") {
        console.log(`Você escolheu impar e o computador escolheu par. O resultado foi ${soma}. Você ganhou!`);
    }else {
        console.log(`Você escolheu par e o computador escolheu impar. O resultado foi ${soma}. Você perdeu!`);
    }
}