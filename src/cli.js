import { pegaArquivo } from "./index.js";
import chalk from "chalk";
import fs from 'fs';

const caminho = process.argv;

function imprimeList(result){
    console.log(chalk.yellow('lista-links: '), result)
}

async function processar(argumentos){
    const caminho = argumentos[2];

    if(fs.lstatSync(caminho).isFile()){
        const result = pegaArquivo(argumentos[2]);
        imprimeList(result);
    }else if(fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (nomeFile) => {
            const list = await pegaArquivo(`${caminho}/${nomeFile}`);
            console.log(chalk.blue(`${caminho}/${nomeFile}`));
            imprimeList(list);
        })
        console.log(arquivos);
    }
}

processar(caminho);