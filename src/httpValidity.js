import chalk from "chalk";

function extraiLinks(arrLinks){
    return arrLinks.map((objLink) => Object.values(objLink).join());
}

export function listaValidada(listLinks) {
  return extraiLinks(listLinks);
}
