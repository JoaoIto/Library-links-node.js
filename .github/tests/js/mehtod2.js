/** MÉTODO 2
    *  => Este método um pouco melhorado em questão de seu
    * antesessor pois consegue usar argumentos e funções 
    * disponíveis na própria parte de promisses, com o 
    * catch() e then();
    * @param {string} caminho - Caminho do arquivo
    * @returns {string} - Retornaria diretamente toda 
    * a lista com caminho fixo no parâmetro da função
*/

function pegaArquivo(caminho){
    const enconding = 'utf-8';
    fs.promises.readFile(caminho, enconding)
    .then((texto) => console.log(chalk.green(texto)))
    .catch(trataErro(error));
};
