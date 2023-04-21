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
