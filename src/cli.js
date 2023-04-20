import { pegaArquivo } from "./index.js";
import chalk from "chalk";
import fs from 'fs';

const caminho = process.argv;

async function processar(argumentos){
    const caminho = argumentos[2];

    if(fs.lstatSync(caminho).isFile()){
        const result = await pegaArquivo(argumentos[2]);
        console.log(chalk.yellow("link-list"), result);
    }else if(fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho);
        console.log(arquivos);
    }
}

processar(caminho);