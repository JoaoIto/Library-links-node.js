import fs from "fs";
import chalk from "chalk";

function trataErro(error) {
  console.log(error);
  throw new Error(chalk.red(error.code, "Há erro na chamada!"));
}

// MÉTODO 1

/* => Método mais simples, de forma do próprio JS, 
sem nenhuma funcionalidade nova ou a mais... De forma
"rústica" da linguagem.
*/
/* function pegaArquivo(caminho){
    const enconding = 'utf-8';
    fs.readFile(caminho, enconding, (error, text) => {
        if(error){
            trataErro(error);
        }
    console.log(chalk.blue(text))});
};
*/

// MÉTODO 2

/* => Este método apesar de já usar 2 funcionalidades,
ainda sim é um método bem simples e ainda sim bem eficaz, de 
forma a contar com a verificação de erros e recebimento do 
arquivo a ser solicitado... É de suma importância que se entenda 
estes tipos de funções, para que entenda a mais complexa!
*/

/*
function pegaArquivo(caminho){
    const enconding = 'utf-8';
    fs.promises.readFile(caminho, enconding)
    .then((texto) => console.log(chalk.green(texto)))
    .catch(trataErro(error));
};
*/

/* => REGEX expression para conseguir capturar links para cada ocorrência,
e ainda separar devido aos textos de links, quanto ao de cada link em si
os parênteses e colchetes que o envolvem. A expressão:

\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)


*/

// => Regex function:

function getLinks(text) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capture = [...text.matchAll(regex)];
  const result = capture.map((capture) => ({ [capture[1]]: capture[2] }));
  return result.length !== 0 ? result : chalk.red('list-links = 0');
}

// MÉTODO 3

/* Este sim. Este já é um dos métodos mais conhecidos e utilizados,
principalmente em situações reais, onde utilizaremos uma API, para
testes destes código, e aí sim, com await e async
*/

export async function pegaArquivo(caminho) {
  try {
    const enconding = "utf-8";
    const texto = await fs.promises.readFile(caminho, enconding);
    return getLinks(texto);
  } catch (error) {
    trataErro(error);
  }
}
