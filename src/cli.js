import { pegaArquivo } from "./index.js";
import chalk from "chalk";

const caminho = process.argv;

async function processar(caminho){
    const result = await pegaArquivo(caminho[2]);
    console.log(chalk.yellow('link-list'), result);
}

processar(caminho);