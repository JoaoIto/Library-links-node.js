import chalk from "chalk";
import fs from "fs";
import { pegaArquivo } from "./index.js";
import { listLinks } from "./httpValidity.js";

const caminho = process.argv;

function imprimeList(valide, result) {

    if(valide){
        console.log(
          chalk.magenta("lista validada!"),
          chalk.yellow("lista-links: "),
          listLinks(result)
        );
    }else{
        console.log(
            chalk.yellow("lista-links: "), result);
    }

}

async function processar(argumentos) {
  const caminho = argumentos[2];
  const valida = argumentos[3] === '--links';

  try {
    fs.lstatSync(caminho);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(chalk.red("Arquivo não existe!"));
      return;
    }
  }
  if (fs.lstatSync(caminho).isFile()) {
    const result = pegaArquivo(argumentos[2]);
    imprimeList(valida, result);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (nomeFile) => {
      const list = await pegaArquivo(`${caminho}/${nomeFile}`);
      console.log(chalk.blue(`${caminho}/${nomeFile}`));
      imprimeList(valida, list);
    });
    console.log(arquivos);
  }
}

processar(caminho);
