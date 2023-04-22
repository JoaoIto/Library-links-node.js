import { listLinks } from "./links.js";

async function checkStatus(arrUrls) {
  const arrStatus = await Promise.all(
    arrUrls.map(async (url) => {
      const res = await fetch(url);
      return res.status;
    })
  );
  return arrStatus;
}

export async function valideLinks(arrLinks) {
  const status = await checkStatus(arrLinks);
  return status;
}

/*

[Teste de retorno 400](https://httpstat.us/404).
[gatinho salsicha](http://gatinhosalsicha.com.br/)
*/