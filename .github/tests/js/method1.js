/** MÉTODO 1
    * Método mais simples, de forma do próprio JS, 
    * sem nenhuma funcionalidade nova ou a mais... De forma
    * "rústica" da linguagem.
    * @param {string} caminho - Caminho do arquivo
    * @returns {string} - Retornaria diretamente toda 
    * a lista com caminho fixo no parâmetro da função
*/
function pegaArquivo(caminho){
    const enconding = 'utf-8';
    fs.readFile(caminho, enconding, (error, text) => {
        if(error){
            trataErro(error);
        }
    console.log(chalk.blue(text))});
};
