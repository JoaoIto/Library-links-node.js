## Busca de arquivos node

**A biblioteca nativa e muito bem reconhecida, até por fazer propriamente do próprio windows, é a biblioteca de *fs*. Ela utilizada para ler arquivos e caminhos de endereço dentro ou fora do seu computador. Vamos entender também os possíveis métodos para buscar o nosso arquivo**

```js
[ 'textoCopy.md', 'textos.md' ]
./archives/textos.md
lista-links:  [
  {
    FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
  },
  {
    '<input>': 'https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input'
  },
  {
    DataTransfer: 'https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer'
  },
  {
    HTMLCanvasElement: 'https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement'
  },
  {
    'Implementation notes': 'https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes'
  }
]
./archives/textoCopy.md
lista-links:  [
  {    FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList' 
  },  {
    '<input>': 'https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input'
  },  {
    DataTransfer: 'https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer'
  },  {
    HTMLCanvasElement: 'https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement'
  },  {
    'Implementation notes': 'https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes'
  },
  { 'Teste de retorno 400': 'https://httpstat.us/404' },
  { 'gatinho salsicha': 'http://gatinhosalsicha.com.br/' }
]
```

---
### Trecho base

```jsx
function pegaArquivo(caminho){ // caminho: caminho ou endereço de arquivo
    const enconding = 'utf-8'; // qual o endoding a ser usado, padrão UTF-8
    fs.readFile(caminho, enconding, (_, text) => { // text é a resposta do arquivo
    console.log(chalk.green(text))});
};
```

---

### Verificação dentro do método

**Quando buscamos este trecho de código de links a partir do método base do windows de *fs*, agora vamos tratar estes dados, e isso aprendemos a partir de métodos de busca do próprio JS, onde ele consegue fazer a verificação de recebimento e algum erro de recebimento dentro do arquivo, com isso:**

```jsx
.then((texto) => console.log(chalk.green(texto))) // => para quando o arquivo for recebido
.catch(trataErro(error)); // => caso haja erro de parâmetro nos links
```

---

### Método async await

**Este é o método para funções assíncronas que precisam ser completadas, assim que feitas uma promessa dentro do JS, e para isso usaremos o método de função de espera, em uma função assíncrona, conhecida como *async* e *await;***

---

Entendemos que queremos buscar uma informação de textos com links, e para isso, chamamos uma promessa, com o método padrão do widows de fs. Assim usamos esta função.:

```jsx
async function pegaArquivo(caminho){ // => async usado para indicar a função em tempo síncrono, normalmente
    try { // Método try de => sinônimo de while()
        const enconding = 'utf-8';
        const texto = await fs.promises.readFile(caminho, enconding); /* => Aqui, usamos o await
                                     apenas para a indicação de 
                                     espera de resposta para a 
                                     promise chamada */
        console.log(chalk.green(texto));
    }catch(error){
        trataErro(error);
    }
}

pegaArquivo('./textos.md')
pegaArquivo("./textoftyfs.md");
```

---

## Validando com expressão regular

**Porém a intenção literal do nosso curso é que consigamos identificar os pacotes de links dentro dos textos. E para isso, utilizamos uma linguagem, um superset de linguagem, na qual ela consegue identificar um tipo de expressão a partir de um trecho de expressão regular.**

---

**Porém a intenção literal do nosso curso é que consigamos identificar os pacotes de links dentro dos textos. E para isso, utilizamos uma linguagem, um superset de linguagem, na qual ela consegue identificar um tipo de expressão a partir de um trecho de expressão regular.**

**Perceba que dentro dos nosso textos, os links são sempre identificados dentro do marckdown, dentro de [NomeDoLink](Link). Sendo assim a expressão regular para este tipo de expressão fica desta forma.**

```jsx
const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
```

---

**A partir daqui, se chamarmos um método que busque pelos textos a partir de nossa função, conseguimos identificar os links e nomes dentro do texto separadamente. Só que, qual método?**

**Bom, se chamarmos qualquer método que busque diretamente estes partes dentro do texto a partir do regex, ele irá retornar basicamente um objeto, que não pode ser lido e devolvido diretamente. Para isso, utilizaremos um método de Array chamado de *`matchAll`*. Para motivos de expandimento, usamos o *[spreed operator*](https://developer.mozilla.org/en-US/docs/web/javascript/reference/operators/spread_syntax), que ele consegue transformar em acessível o nosso objeto iterável.**

- ***`matchAll`*: [String.prototype.matchAll() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)**

    **Este método é chamado para que seja chamado um objeto, porém um objeto iterável, que assim passado a outro método de array conseguirá ser lido.**

```jsx
const capture = [...text.matchAll(regex)];
```

**Feito isso, agora usamos o método map para conseguir capturar somente as informações necessárias. Dentro do nosso retorno, temos isso:**

```jsx
[
  {
    FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
  },
  {
    '<input>': 'https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input'
  },
  {
    DataTransfer: 'https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer'
  },
  {
    HTMLCanvasElement: 'https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement'
  },
  {
    'Implementation notes': 'https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes'
  },
  { 'Teste de retorno 400': 'https://httpstat.us/404' },
  { 'gatinho salsicha': 'http://gatinhosalsicha.com.br/' }
]
PS C:\Users\muril\Documents\GitHub\JavaScript\Node\library> node ./index.js                           
[
  [
    '[FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList)',
    'FileList',
    'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList',
    index: 151,
    input: 'A interface File provê informações sobre arquivos e permite ao JavaScript  a acessar seu conteúdo.\r\n' +
      '\r\n' +
      'São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.).\r\n' +
      '\r\n' +
      '[Teste de retorno 400](https://httpstat.us/404).\r\n' +
      '[gatinho salsicha](http://gatinhosalsicha.com.br/)',
    groups: undefined
  ],
  [
    '[<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input)',
    '<input>',
    'https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input',
    index: 310,
    input: 'A interface File provê informações sobre arquivos e permite ao JavaScript  a acessar seu conteúdo.\r\n' +
      '\r\n' +
      'São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.).\r\n' +
      '\r\n' +
      '[Teste de retorno 400](https://httpstat.us/404).\r\n' +
      '[gatinho salsicha](http://gatinhosalsicha.com.br/)',
    groups: undefined
  ],
  [
    '[DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer)',
    'DataTransfer',
    'https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer',
    index: 405,
    input: 'A interface File provê informações sobre arquivos e permite ao JavaScript  a acessar seu conteúdo.\r\n' +
      '\r\n' +
      'São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.).\r\n' +
      '\r\n' +
      '[Teste de retorno 400](https://httpstat.us/404).\r\n' +
      '[gatinho salsicha](http://gatinhosalsicha.com.br/)',
    groups: undefined
  ],
  [
    '[HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement)',
    'HTMLCanvasElement',
    'https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement',
    index: 570,
    input: 'A interface File provê informações sobre arquivos e permite ao JavaScript  a acessar seu conteúdo.\r\n' +
      '\r\n' +
      'São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.).\r\n' +
      '\r\n' +
      '[Teste de retorno 400](https://httpstat.us/404).\r\n' +
      '[gatinho salsicha](http://gatinhosalsicha.com.br/)',
    groups: undefined
  ],
  [
    '[Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes)',
    'Implementation notes',
    'https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes',
    index: 789,
    input: 'A interface File provê informações sobre arquivos e permite ao JavaScript  a acessar seu conteúdo.\r\n' +
      '\r\n' +
      'São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.).\r\n' +
      '\r\n' +
      '[Teste de retorno 400](https://httpstat.us/404).\r\n' +
      '[gatinho salsicha](http://gatinhosalsicha.com.br/)',
    groups: undefined
  ],
  [
    '[Teste de retorno 400](https://httpstat.us/404)',
    'Teste de retorno 400',
    'https://httpstat.us/404',
    index: 916,
    input: 'A interface File provê informações sobre arquivos e permite ao JavaScript  a acessar seu conteúdo.\r\n' +
      '\r\n' +
      'São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.).\r\n' +
      '\r\n' +
      '[Teste de retorno 400](https://httpstat.us/404).\r\n' +
      '[gatinho salsicha](http://gatinhosalsicha.com.br/)',
    groups: undefined
  ],
  [
    '[gatinho salsicha](http://gatinhosalsicha.com.br/)',
    'gatinho salsicha',
    'http://gatinhosalsicha.com.br/',
    index: 966,
    input: 'A interface File provê informações sobre arquivos e permite ao JavaScript  a acessar seu conteúdo.\r\n' +
      '\r\n' +
      'São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.).\r\n' +
      '\r\n' +
      '[Teste de retorno 400](https://httpstat.us/404).\r\n' +
      '[gatinho salsicha](http://gatinhosalsicha.com.br/)',
    groups: undefined
  ]
]
```

**Percebemos que ele retorna muitas informações que não queremos, que só poluirá o console, sendo assim, entendemos que só precisamos que ele retorne um objeto, sendo um índice 1 para o nome do link e índice 2 para o texto do link. E assim temos o nosso código de map com um objeto.**

```jsx
const result = capture.map(capture => ({[capture[1]]: capture[2]}))
```

E assim o objeto que conseguimos retornar é:

```jsx
[
  {
    FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
  },
  {
    '<input>': 'https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input'
  },
  {
    DataTransfer: 'https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer'
  },
  {
    HTMLCanvasElement: 'https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement'
  },
  {
    'Implementation notes': 'https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes'
  },
  { 'Teste de retorno 400': 'https://httpstat.us/404' },
  { 'gatinho salsicha': 'http://gatinhosalsicha.com.br/' }
]
```

---

## Teste em linha de comando (CLI)

**Nosso teste em biblioteca já esta certa, porém por enquanto isso que fizemos, esta somente entre os arquivos, chamados diretamente na função. O que não é muito prático, já que só conseguimos chamar a partir desse caminho absoluto.**

Para isso, faremos: **Teste de caminho dito em linha de comando!**

```js
const caminho = process.argv;
console.log(caminho);
```

**Quando testamos esta linha de código, percebemos que ele devolve o processo de busca a partir da linha raiz do computador, até o arquivo da CLI.**

 A primeira é um caminho absoluto do diretório raiz até "/bin/node", a pasta de binários do Node.js. A segunda é o caminho absoluto entre a pasta raiz e "cli.js".

 E assim, entendemos que, se quisermos praticar isso a partir de um comando no terminal, só precisamos buscar diretamente no caminho do arquivo, chamado no 3° índice do array de *caminho*, deste modo:

  ```js
  import { pegaArquivo } from "./index";

const caminho = process.argv;
pegaArquivo(caminho[2])
  ```
