import chalk from "chalk";
import { listLinks } from "./links.js";

async function checkStatus(arrUrls) {
  const arrStatus = await Promise.all(
    arrUrls.map(async (url) => {
      try{ const res = await fetch(url);
      return res.status;
      }catch(error){
        return errors(error);
      }
    })
  );
  return arrStatus;
}

function errors(error){
  const errorConsole = 'error...';
  if(error.cause.code === 'ENOTFOUND'){
    const strError = 'not-found!';
    return errorConsole, strError;
  }else{
    return errorConsole;
  }
}

export async function valideLinks(arrLinks) {
  const status = await checkStatus(arrLinks);
  return arrLinks.map((obj, index) => ({
    obj,
    status: status[index],
  }));
}
