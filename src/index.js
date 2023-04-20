import fs from "fs";
import chalk from "chalk";

function trataErro(error) {
  console.log(error);
  throw new Error(chalk.red(error.code, "Há erro na chamada!"));
}

/** // => Regex function: 
  * REGEX expression para conseguir capturar links para cada ocorrência,
  * e ainda separar devido aos textos de links, quanto ao de cada link em si
  * os parênteses e colchetes que o envolvem. A expressão:
  * 
  * @param {string} text - Captura todos os links que estão dentro do 
  * arquivo, fazendo a função que esperamos destes links;
  * 
  * @returns {Object &| Array} result - retorna já a lista ou objeto de links
  * usando o argumento regex \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\);
*/

function getLinks(text) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capture = [...text.matchAll(regex)];
  const result = capture.map((capture) => ({ [capture[1]]: capture[2] }));
  return result.length !== 0 ? result : chalk.red('list-links = 0');
}

/** MÉTODO 3
 * A função pega arquivo, é a principal, na qual ela faz a parte
 * de leitura do arquivo que é colocado dentro do terminal assíncronamente
 * usando a biblioteca comum de fs. Ainda chamando as funções secundárias, 
 * obviamente de conseguir os links e tratar erros dentro do arquivo ou chamada
 * no terminal;
 * @param {string} caminho - Pega o caminho do arquivo escrito no terminal:
 * @returns {Array<string>} - Devolve um array com a lista de arquivos que foi 
 * chamado, logicamente já fazendo as verificações nas funções secundárias.
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
