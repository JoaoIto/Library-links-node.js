export function extraiLinks(arrLinks) {
  return arrLinks.map((objLink) => Object.values(objLink).join());
}

export function listLinks(listLinks) {
  return extraiLinks(listLinks);
}
