#!/usr/bin/env node

import chalk from "chalk";
import fs from "fs";
import { pegaArquivo } from "./index.js";
import { listLinks } from "./links.js";
import { valideLinks } from "./httpValidity.js";

const caminho = process.argv;

async function imprimeList(valide, links, result) {
  if (valide === true) {
    const linksV = listLinks(result);
    console.log(chalk.magenta("lista validada! "), await valideLinks(linksV));
  } else if (links === true) {
    console.log(chalk.yellow("lista-links: "), listLinks(result));
  } else {
    console.log(chalk.yellow("lista-links: "), result);
  }
}

async function processar(argumentos) {
  const caminho = argumentos[2];
  const links = argumentos[3] === "--links";
  const valide = argumentos[3] == "--valida";

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
    imprimeList(valide, links, result);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (nomeFile) => {
      const list = await pegaArquivo(`${caminho}/${nomeFile}`);
      console.log(chalk.blue(`${caminho}/${nomeFile}`));
      imprimeList(valide, links, list);
    });
    console.log(arquivos);
  }
}

processar(caminho);
