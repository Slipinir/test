# Getting started

A integração com o sistema Mercos é feita através de uma API em protocolo HTTP (modelo REST), e os dados são comunicados em formato JSON. Apesar das siglas complicadas, o processo é muito simples. Seu software poderá se comunicar com nossos servidores através de requisições HTTP, de forma muito parecida com um navegador de internet.

O protocolo HTTP é utilizado pelos navegadores para se comunicar com servidores web, através dos métodos GET, POST e PUT. Você irá utilizar estes mesmos métodos para fazer leitura, cadastro e atualização de registros em nossa API.

Utilizamos o protocolo HTTPS no ambiente produção e no ambiente de teste (sandbox).

É possível desenvolver a integração em qualquer linguagem de programação. Os únicos componentes que você irá precisar são:

* Uma biblioteca para realizar conexões HTTP: <a href="http://unirest.io/" target="_blank">Biblioteca Unirest para várias linguagens</a>

* Uma biblioteca para leitura/escrita de dados em formato JSON: <a href="https://github.com/burningtree/awesome-json#libraries" target="_blank">Veja a lista aqui</a>

A maioria das linguagens de programação possuem bibliotecas nativas ou senão de terceiros (necessita baixar e instalar) para este tipo de operação.

#Primeiros passos

Para começar a consumir a API do Mercos são necessários alguns passos.

**1. Preecher o formulário de interesse**

- <a href="https://meuspedidos.com.br/integracao-erp/" target="_blank">Formulário - Seja um parceiro da Mercos </a>

Assim entraremos em contato e enviaremos as chaves de acesso.

**2. Ler as seguintes seções do Manual para entender melhor como funciona a integração com Mercos**

*Como Funciona*

*Sincronizando Dados na Prática*

*Autenticação e Segurança*

*Entidades Mercos*

<a href="http://api.meuspedidos.com.br/criterios.pdf" target="_blank"> **Critérios de Homologação (Clique aqui)**</a>

<a href="http://api.meuspedidos.com.br/CheckList.pdf" target="_blank"> **CheckList (pdf) (Clique aqui)**</a>

-----

### JSON

O formato JSON é antes de mais nada, um formato de texto, ou seja, tanto a sua geração como leitura deve ser feita através de uma biblioteca específica para sua linguagem de programação.

A utilização de uma biblioteca evita diversos problemas, como:

- **Geração do conteúdo incorreto:** pode faltar uma vírgula, um colchetes, uma aspas, e pode ocupar muito tempo para detectar esses problemas.

- **Lógica complexa:** evita do programador criar uma lógica complexa para ler ou gerar o JSON, utilizando uma biblioteca em poucas linhas é possível obter qualquer valor contido na estrutura JSON, ou converter um vetor ou objeto em formato JSON.

- **Performance:** a maioria das bibliotecas preza por desempenho na leitura ou geração do formato JSON, isso vem pronto para o programador.

- **Código pronto:** não é necessário perder tempo escrevendo código de algo que está pronto, basta aprender como a biblioteca funciona, evitando ter que entender e implementar todas as regras do formato JSON.

Para isso, utilize umas das bibliotecas disponíveis para sua linguagem de programação:

- <a href="https://github.com/burningtree/awesome-json#libraries" target="_blank">Lista de bibliotecas para interpretar JSON em várias linguagens</a>

-----

### HTTP

Os métodos do protocolo HTTP são amplamente utilizados por navegadores web, e também para fazer chamadas em API REST, como a do Mercos.  Também existe uma imensidão de bibliotecas nativas e de terceiros para se trabalhar com HTTP na sua linguagem de programação.

Geralmente o programador pode utilizar a biblioteca que já é nativa com a linguagem de programação.  Caso esta possua uma sintaxe muito complexa, indicamos utilizar a bibliteca HTTP Unirest:

- <a href="http://unirest.io/" target="_blank">Biblioteca Unirest para várias linguagens</a>

-----

### Testar chamadas

Existe uma extensão do Chrome chamada **Postman**, que permite executar requisições GET, POST e PUT diretamente do navegador. É muito boa para fazer testes na API, sugerimos sua utilização.

- <a href="https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop" target="_blank">Extensão PostMan para o navegador Chrome</a>

-----

### Como funciona

Cada **entidade** (Pedidos, Clientes, Produtos, etc) existente na Mercos é acessível através de uma URL. Para fazer a leitura, cadastro e alteração destas entidades, você deverá executar alguns comandos HTTP nesta URL (os comandos serão detalhados mais adiante).

Por exemplo, vamos analisar a entidade **Clientes**. A URL que identifica os clientes é a seguinte: `https://app.mercos.com/api/v1/clientes/`.

Chamamos isto de **URL raíz** da entidade Clientes. Ela representa todos os clientes cadastrados no sistema.

Cada registro individual também possui sua URL. Esta URL é sempre composta da URL raíz da entidade, **seguida pelo ID do registro**.

Então, um cliente cujo ID no banco de dados seja 123, será representado pela URL `https://app.mercos.com/api/v1/clientes/123/`.

#### Buscando Registros

Para buscar os registros de uma entidade, deve-se utilizar o comando HTTP **GET**.

Se você fizer um GET na URL raíz da entidade, será retornada uma lista com todos os registros cadastrados.

Se você fizer GET na URL específica de 1 registro, será retornado apenas aquele registro individual.

Por exemplo, para buscar todos os clientes cadastrados, basta fazer um GET no endereço `https://app.mercos.com/api/v1/clientes/`.

Para buscar o cliente 1001, basta fazer GET no endereço `https://app.mercos.com/api/v1/clientes/1001`.

#### Criando Novos Registros

Para criar novos registros, deve-se executar um comando HTTP POST na URL raíz da entidade. No corpo da requisição, você deve enviar as informações do registro em formato JSON. Também deverá ser informado o header “Content-Type” = “application/json” na requisição, saiba mais sobre Content-Type na seção **"Informações adicionais"**.

Em caso de sucesso, será retornado o StatusCode `201 (CREATED)`. Serão enviados 2 headers HTTP identificando o novo registro criado. São eles:

`MeusPedidosID`: contém o ID do registro no banco de dados da Mercos.

`MeusPedidosURL`: contém a URL de acesso ao registro. É sempre formada pela URL raíz, seguida do ID do registro.

Continuando o exemplo dos clientes, caso você queira cadastrar um novo cliente, basta fazer **POST** na URL `https://app.mercos.com/api/v1/clientes/`. Digamos que o servidor salve este registro em nosso Banco de Dados, e o ID gerado seja 456. Então, a API irá retornar os seguintes headers:

`MeusPedidosID`:`456`

`MeusPedidosURL`:`https://app.mercos.com/api/v1/clientes/456`

#### Atualizando Registros

Para atualizar um registro já existente, basta executar um comando **PUT** na URL do registro, enviando no corpo da requisição as informações em formato JSON. (Este comando PUT não é utilizado pelos navegadores web, mas é um comando válido do protocolo HTTP). Também deverá ser informado o header “Content-Type” = “application/json” na requisição.

Em caso de sucesso, será retornado o StatusCode `200 (OK)`. Nenhum header será enviado.

Importante ressaltar que a atualização de dados via API no sistema Mercos, não necessita o envio do JSON completo. Apenas os campos obrigatórios e o campo a ser alterado.

#### Excluindo Registros

Para preservar a integridade das informações, a Mercos trabalha com o conceito de exclusão lógica de dados. Todos os registros possuem uma propriedade **excluido** para este fim. Portanto, para realizar exclusão de dados, basta executar um **comando PUT**, informando o valor `true` na propriedade **excluido** do registro.

#### Validação de Dados

Ao executar comandos POST e PUT, a API irá validar os dados enviados, de acordo com a descrição da Entidade. Em caso de erro de validação, será retornado o StatusCode 412 (Precondition Failed), e no corpo da resposta será enviado um objeto JSON descrevendo os erros encontrados. O exemplo ao lado mostra uma situação onde o campo nome da Entidade era obrigatório, mas não foi informado.

```json
    {
        "erros": [
            {
                "mensagem": "Este campo é obrigatório.",
                "campo": "nome"
            }
        ]
     }
```

#### Informações adicionais

**O que é um Content-Type**

Um “Content-type” é simplesmente um cabeçalho definido em muitos protocolos, como HTTP, que faz uso de tipos MIME para especificar a natureza do arquivo que está sendo manipulado.

**O que é um tipo MIME**

MIME significa “Multipurpose Internet Mail Extensions”, é um modo de identificar os arquivos na Internet, de acordo com sua natureza e formato. Por exemplo, usando o valor de cabeçalho “Content-type” definido em uma resposta HTTP, o navegador pode abrir o arquivo como HTML, ou ainda abrir o aplicativo mais adequado para exibir o conteúdo.

**Mobile**

Para realizar testes nos aplicativos, a instalação é realizada através das lojas, após a instalação basta pressionar por 20s a logo da Mercos
ou clicar 20 vezes para o Android.

-----

### Na prática

#### Sincronizando dados na prática

A API da Mercos trabalha com um mecanismo de sincronização incremental, baseado na data de última alteração de cada registro. Desta forma, você **deve buscar apenas os registros que foram cadastrados ou sofreram alteração na Mercos** (novos pedidos, novos clientes) evitando o tráfego desnecessário de dados. Sem este mecanismo, a API retornaria todos os registros cadastrados em toda requisição, o que tornaria processamento mais demorado.

Cada registro da API possui um campo chamado **ultima_alteracao**. Como o próprio nome indica, este campo guarda a hora exata em que o registro foi alterado dentro da Mercos, apesar do header retornar horário UTC (https://tools.ietf.org/html/rfc7231#section-7.1.1.2), a Mercos grava o horário de Brasília. Ao fazer um GET, você poderá enviar o parâmetro **alterado_apos** na URL. Ao fazer isto, serão retornados apenas os registros cuja **ultima_alteracao** seja superior ao **alterado_apos** que você enviou.

Exemplo:

GET `https://app.mercos.com/api/v1/clientes?alterado_apos=2014-02-28%2012:32:55`

Isto retornará os clientes que sofreram alteração depois das 12:32:55 do dia 28 de Fevereiro de 2014 (detalhe: os caracteres "%20" entre a Data e a Hora representam o espaço em branco no formato URL Encoding. Referência: [Url encode Reference](http://www.w3schools.com/tags/ref_urlencode.asp)).

**OBS:** Para testes feitos no apiary, em **alterado_apos** dentro de URI Parameters, você deve preencher a data e o horário com um espaço entre eles. Exemplo: **2018-08-05 08:40:51**. Isso fará com que seja convertida corretamente a informação da data para a URL.

#### Buscando Informações: exemplo prático

A forma ideal de sincronizar os dados é manter uma tabela de mapeamento para cada Entidade (clientes, produtos, pedidos, etc). Estas tabelas irão relacionar os IDs do seu ERP aos IDs da Mercos. Também é importante que a tabela armazene o campo **ultima_alteracao** dos registros da Mercos. Assim, antes de fazer um GET na API, você poderá buscar o maior valor deste campo (ex: select max(ultima_alteracao) from mapeamento_pedidos), e enviar este valor no parâmetro **alterado_apos**. A API irá retornar apenas os pedidos que foram alterados depois da sua última requisição.

Digamos que você executou um GET em `https://app.mercos.com/api/v2/pedidos/` e foi retornado 1 único pedido, cujo ID na Mercos é 9876543 e **ultima_alteracao** é "2014-03-01 07:21:44". Digamos que você salve este pedido no seu banco de dados, gerando o ID 4312 no seu ERP. Em seguida, insira um registro na tabela de mapeamento de pedidos, informando que o seu ID 4312 equivale ao ID 9876543 da Mercos. Salve também neste registro o campo **ultima_alteracao** do pedido.

Na próxima vez que você buscar Pedidos, selecione o maior valor da coluna **ultima_alteracao** na tabela de mapeamento de pedidos, e envie este valor no parâmetro **alterado_apos** da API. Neste caso, ficaria: GET `https://app.mercos.com/api/v2/pedidos/?alterado_apos=2014-03-01%2007:21:44`.

Caso aquele pedido ID 9876543 tenha sido alterado na Mercos, ele será enviado novamente pela API. Ao verificar a sua tabela de mapeamento, você vai descobrir que ele já está cadastrado no seu ERP. Assim, poderá atualizar o registro já existente, evitando a duplicação de Pedidos.

**Detalhe importante.** Nestas operações GET, o servidor retorna um limite máximo de registros por requisição. Esse limite pode variar dependendo da entidade para evitar longos processamentos no caso de bases grandes. Portanto, sempre que você executar um GET e for retornado no header o parâmetro `MEUSPEDIDOS_LIMITOU_REGISTROS = 1`, você deverá salvar os registros retornados e em seguida executar uma nova operação GET (não esquecendo de atualizar o parâmetro **alterado_apos**). Os registros retornados pelo servidor são ordenados pelo campo **ultima_alteracao**, portanto não existe risco de perda de dados.

#### Enviando Informações: exemplo prático

Digamos que seu usuário cadastrou um novo Produto, cujo ID é 1050 no seu ERP. Para cadastrar este produto na Mercos, você faz um POST em `https://app.mercos.com/api/v1/produtos/` com os dados. Digamos que o servidor retorne com sucesso, e informe o header MeusPedidosID=12345678. Neste momento, você irá inserir um registro na sua tabela de mapeamento de produtos, informando que o seu produto ID 1050 equivale ao produto ID 12345678 na Mercos. O campo **ultima_alteracao** deverá ser nulo, para não interferir no processo de busca de dados.

No futuro, quando este produto ID 1050 sofrer alteração no seu sistema, você saberá que ele equivale ao ID 12345678 na Mercos. Então, basta fazer um PUT no endereço `https://app.mercos.com/api/v1/produtos/12345678` com as novas informações. Esta é a forma correta de manter os 2 sistemas sincronizados.

-----

### Autenticação e Segurança

A segurança dos seus dados é uma das nossas maiores prioridades. Por isso nossa API possui um mecanismo de autenticação que impede que outros usuários tenham acesso e façam qualquer tipo de alteração nas informações dos seus clientes.

Este mecanismo de autenticação é baseado em tokens. Os tokens são parecidos com uma senha de acesso, mas com a vantagem de serem únicos dentro do sistema. Eles são gerados automaticamente e nunca são repetidos. Desta forma, garantimos que todos os clientes e todas as empresas parceiras possuem um token exclusivo que as identifica.

Ao fazer qualquer operação na API, você deverá enviar 2 tokens nos headers do comando HTTP:

- `ApplicationToken`: Identifica a aplicação externa (por exemplo, seu ERP) que está se conectando.

- `CompanyToken`: Identifica o cliente da aplicação externa (os clientes da sua empresa) que está se conectando.

Ao receber estes tokens de acesso, será sua responsabilidade guardar estas chaves em segurança, para garantir que ninguém fora da sua empresa tenha acesso aos dados.

-----

### Throttling

Para evitar uso excessivo da API existe um mecanismo de throttling que **por company token** bloqueia qualquer requisição após uma certa **quantidade total de requisições** seja ultrapassada. Quando isso acontecer em vez do retorno normal da API será enviado uma resposta indicando bloqueio com **StatusCode** `429 (TOO MANY REQUESTS)`:

OBS: Caso tenha dificuldades para simular, solicite aos implanters que diminua a quantidade de requisições para que você possa testar.

> Exemplo de Resposta com Status 429

```json
{
   "tempo_ate_permitir_novamente": 75,
   "limite_de_requisicoes": 30
}
```

**Toda requisição** deve tratar esse possível retorno, **sempre validando** o StatusCode. Ao receber isso, o integrador **deve** ler o campo `tempo_ate_permitir_novamente` que indica quanto tempo, em segundos, a integração dever **aguardar sem enviar novas requisições**. Todas implementações devem levar isso em conta e não serão homologadas em caso contrário.

A quantidade de requisições total e o intervalo de tempo para ser concedida um novo "lote" de requisições é um valor que **pode ser alterado sem aviso prévio**, por isso é **imprescindível** que o campo `tempo_ate_permitir_novamente` seja utilizado. No ambiente de `sandbox` para facilitar os testes desse mecânismo temos um limite bem mais baixo do que o de produção.

#### Exemplo de Funcionamento

Imagine que atualmente o limite seja **150 requisições** a cada **60 segundos**. No caso de você possuir 200 clientes para atualizar, digamos que sua integração envie as primeiras 150 requisições em 20 segundos, a partir da próxima requisição você receberá o retorno do bloqueio informando `limite_de_requisicoes: 150` e com `tempo_ate_permitir_novamente: 40`. Qualquer outra tentativa nos **próximos 40 segundos** resultará na mesma resposta, mas informando uma quantia de tempo menor. Após esse tempo a integração conseguirá enviar as **50 requisições** restantes.

**Importante**, mesmo que novas requisições sejam bloqueadas de qualquer forma as integrações **precisam** respeitar esse tempo, caso contrário podem ocasionar **bloqueio permanente** da API. Lembre-se que uma integração **corretamente implementada** deve enviar alterações **apenas quando elas ocorrem**, então difícilmente o throttling irá prejudicar a comunicação entre os sistemas, na pior das hipóteses só haverá um pequeno retardo no processo.

----

### Status Mercos

Para veridicar se nossos serviços estão disponíveis 
 acesse o o endereço **https://status.mercos.com/**

-----

### Entidades da Mercos

Estão disponíveis na API quase todas as entidades presentes no sistema Web.

As entidades são formadas por diversas propriedades, e cada propriedade possui um tipo específico.
A API realiza a validação dos dados com base nestes tipos de dados, e recusa operações que não estejam de acordo.

Os tipos aceitos são:

- `String`: sequência de caracteres `utf-8`, envoltos em aspas duplas. Caso a quantidade de caracteres seja limitada, também é informado a quantidade máxima aceita. Ex: (String: 30) significa que o campo aceita no máximo 30 caracteres.

- `Boolean`: true ou false.

- `Integer`: número inteiro.

- `Double`: número com casas decimais, utiliza o "." (ponto) como separador decimal.

- `Date`: data no formato **yyyy-mm-dd**.

- `DateTime`: data e hora no formato **yyyy-mm-dd HH:mm:ss**.

#### Entidades disponíveis

#### Relacionadas à Produtos

| Entidade                       | Obter um ou mais registros | Incluir um registro | Atualizar um registro |
| ---                            |---                         |---                  |---     |
| Produtos                       | [GET]                      | [POST]              | [PUT]  |
| Imagens do Produto             |                            | [POST]              |        |
| Tabelas de Preço               | [GET]                      | [POST]              | [PUT]  |
| Tabelas de Preço por Produto   | [GET]                      | [POST]              | [PUT]  |
| Categorias de Produtos         | [GET]                      | [POST]              | [PUT]  |
| Estoque                        |                            |                     | [PUT]

---

#### Relacionadas à Clientes

| Entidade                       | Obter um ou mais registros | Incluir um registro | Atualizar um registro |
| ---                            |---                         |---                  |---                |
| Clientes                       | [GET]                      | [POST]              | [PUT]             |
| Condições Pagamento por Cliente|                            |                     | [POST]            |                                                     |
| Categorias por Cliente         |                            |                     | [POST]            |                                                     |
| Tabelas de Preço por Cliente   |                            |                     | [POST]            |                                                     |
| Usuários (Vendedores)          | [GET]                      |                     |                   |                                                     |
| Adicionar cliente à Carteira   | [GET]                      | [POST]              | [PUT]             |
| Segmento                       | [GET]                      | [POST]              | [PUT]             |
| Rede                           | [GET]                      | [POST]              | [PUT]             |
| Tags                           | [GET]                      | [POST]              | [PUT]             |
| Tags por cliente               |                            | [POST]              |                   |

---

#### Relacionadas à Pedidos

| Entidade                       | Obter um ou mais registros | Incluir um registro | Atualizar um registro |
| ---                            |---                         |---                  |---                    |
| Transportadoras                | [GET]                      | [POST]              | [PUT]                 |
| Condições de Pagamento         | [GET]                      | [POST]              | [PUT]                 |
| Formas de Pagamento            | [GET]                      | [POST]              | [PUT]                 |
| Pedidos                        | [GET]                      | [POST]              | [PUT]                 |
| Campos Extras do Pedido        | [GET]                      | [POST]              | [PUT]                 |
| Faturamento de Pedido          |                            | [POST]              | [PUT]                 |
| Títulos Vencidos               |                            | [POST]              | [PUT]                 |
| ICMS-ST                        | [GET]                      | [POST]              | [PUT]                 |
| Tipo de Pedido                 | [GET]                      | [POST]              | [PUT]                 |      
| Status do Pedido               | [GET]                      | [POST]              | [PUT]                 |

----

### Histórico de versões

Versão         | Data           | Descrição |
-------------- | -------------- | --------------
1.0            | 25/12/2018     | - Nova documentação Mercos.
1.1            | 26/12/2018     | - Endereço de Entrega.
1.1            | 03/01/2019     | - Rede de Clientes.
1.1            | 04/01/2019     | - APK Android Mercos
1.1            | 01/02/2019     | - Volume de informações no retorno do GET.
1.1            | 02/02/2019     | - Checklist de homologação
1.1            | 26/02/2019     | - Adicionado obrigatoriedade nos campos extras
1.1            | 15/04/2019     | - Tags de Clientes
1.1            | 16/04/2019     | - Adicionado campos descontos_do_vendedor, descontos_de_promocoes e descontos_de_politicas no GET de pedidos.
1.1            | 17/04/2019     | - Adicionado exibir_para_cliente nos campos extras
1.1            | 23/04/2019     | - Adicionado itens e lista_multipla nos campos extras
1.1            | 24/04/2019     | - Vincular Tags à Clientes
1.1            | 11/09/2019     | - Promoções
1.1            | 16/09/2019     | - Políticas comerciais
1.1            | 06/11/2019     | - V2 do endpoint de pedidos

## How to Build

The generated SDK relies on [Node Package Manager](https://www.npmjs.com/) (NPM) being available to resolve dependencies. If you don't already have NPM installed, please go ahead and follow instructions to install NPM from [here](https://nodejs.org/en/download/).
The SDK also requires Node to be installed. If Node isn't already installed, please install it from [here](https://nodejs.org/en/download/)
> NPM is installed by default when Node is installed

To check if node and npm have been successfully installed, write the following commands in command prompt:

* `node --version`
* `npm -version`

![Version Check](https://apidocs.io/illustration/nodejs?step=versionCheck&workspaceFolder=API%20de%20integra%C3%A7%C3%A3o%20Mercos-Node)

Now use npm to resolve all dependencies by running the following command in the root directory (of the SDK folder):

```bash
npm install
```

![Resolve Dependencies](https://apidocs.io/illustration/nodejs?step=resolveDependency1&workspaceFolder=API%20de%20integra%C3%A7%C3%A3o%20Mercos-Node)

![Resolve Dependencies](https://apidocs.io/illustration/nodejs?step=resolveDependency2)

This will install all dependencies in the `node_modules` folder.

Once dependencies are resolved, you will need to move the folder `APIDeIntegraOMercosLib ` in to your `node_modules` folder.

## How to Use

The following section explains how to use the library in a new project.

### 1. Open Project Folder
Open an IDE/Text Editor for JavaScript like Sublime Text. The basic workflow presented here is also applicable if you prefer using a different editor or IDE.

Click on `File` and select `Open Folder`.

![Open Folder](https://apidocs.io/illustration/nodejs?step=openFolder)

Select the folder of your SDK and click on `Select Folder` to open it up in Sublime Text. The folder will become visible in the bar on the left.

![Open Project](https://apidocs.io/illustration/nodejs?step=openProject&workspaceFolder=API%20de%20integra%C3%A7%C3%A3o%20Mercos-Node)

### 2. Creating a Test File

Now right click on the folder name and select the `New File` option to create a new test file. Save it as `index.js` Now import the generated NodeJS library using the following lines of code:

```js
var lib = require('lib');
```

Save changes.

![Create new file](https://apidocs.io/illustration/nodejs?step=createNewFile&workspaceFolder=API%20de%20integra%C3%A7%C3%A3o%20Mercos-Node)

![Save new file](https://apidocs.io/illustration/nodejs?step=saveNewFile&workspaceFolder=API%20de%20integra%C3%A7%C3%A3o%20Mercos-Node)

### 3. Running The Test File

To run the `index.js` file, open up the command prompt and navigate to the Path where the SDK folder resides. Type the following command to run the file:

```
node index.js
```

![Run file](https://apidocs.io/illustration/nodejs?step=runProject&workspaceFolder=API%20de%20integra%C3%A7%C3%A3o%20Mercos-Node)


## How to Test

These tests use Mocha framework for testing, coupled with Chai for assertions. These dependencies need to be installed for tests to run.
Tests can be run in a number of ways:

### Method 1 (Run all tests)

1. Navigate to the root directory of the SDK folder from command prompt.
2. Type `mocha --recursive` to run all the tests.

### Method 2 (Run all tests)

1. Navigate to the `../test/Controllers/` directory from command prompt.
2. Type `mocha *` to run all the tests.

### Method 3 (Run specific controller's tests)

1. Navigate to the `../test/Controllers/` directory from command prompt.
2. Type `mocha  API de integração MercosController`  to run all the tests in that controller file.

> To increase mocha's default timeout, you can change the `TEST_TIMEOUT` parameter's value in `TestBootstrap.js`.

![Run Tests](https://apidocs.io/illustration/nodejs?step=runTests&controllerName=API%20de%20integra%C3%A7%C3%A3o%20MercosController)

## Initialization

### 

API client can be initialized as following:

```JavaScript
const lib = require('lib');


```



# Class Reference

## <a name="list_of_controllers"></a>List of Controllers

* [APIController](#api_controller)

## <a name="api_controller"></a>![Class: ](https://apidocs.io/img/class.png ".APIController") APIController

### Get singleton instance

The singleton instance of the ``` APIController ``` class can be accessed from the API Client.

```javascript
var controller = lib.APIController;
```

### <a name="get_obter_status"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterStatus") getObterStatus

> TODO: Add a method description


```javascript
function getObterStatus(contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'application/json';
    var applicationToken = '1413cea4-d18a-11e4-be31-f23c91df94d9';
    var companyToken = 'a77da094-9443-11e5-be32-f23c91df94d9';

    controller.getObterStatus(contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_todos_os_produtos"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodosOsProdutos") getObterTodosOsProdutos

> A entidade Produtos contém tudo o que é necessário para gerenciar os produtos do sistema Mercos como :
> 
> - Grades de cores e tamanhos
> 
> - Imagens
> 
> - Preços distintos
> 
> - Categoria
> 
> Para associar deve informar nos atributos `grade_cores` e `grade_tamanhos`(todas as cores e tamanhos disponíveis) como mostra no exemplo de JSON de POST. No caso das imagens,
> deve usar a entidade `imagens` informando o ID do produto.
> Quando integrar preços distintos, precisa realizar a integração das `tabelas de preço`. Já a categoria é necessário o vinculo  do ID  no campo `categoria_id`.
> 
> ### Estrutura de Retorno do GET
> 
> Campo | Tipo | Descrição |
> -------------- | -------------- | --------------
> id | Integer | Identificador único
> codigo | String: 50 | Código de referência do produto
> nome | String: 100 | Nome do produto.
> comissao | Double | Comissão do produto. Ex: 5.0 para 5%. Informe null caso não queira calcular comissões pela Mercos.
> preco_tabela | Double | Preço deste produto na tabela padrão.
> preco_minimo | Double | Preço mínimo do produto para o recurso da Rentabilidade (apenas Plano Ouro)
> ipi | Double | Caso não possua IPI, informe null.
> tipo_ipi | String: 1 | Tipo do IPI do produto: "P" para percentual, "V" para valor fixo em Reais.
> st | Double | Percentual de Substituição Tributária do produto. Caso não possua ST, informe null.
> grade_cores | Lista | Lista de cores (String) em que o produto está disponível. Caso não trabalhe com variação de cores, informe null.
> grade_tamanhos | Lista | Lista de tamanhos (String) em que o produto está disponível. Caso não trabalhe com variação de tamanhos, informe null.
> moeda | String: 1 | Moeda do produto: Real ("0"), Dólar ("1") ou Euro ("2").
> unidade | String: 10 | Unidade de medida do produto, por exemplo "Kg" ou "Cx". Opcional.
> saldo_estoque | Double: 7 | Saldo de estoque do produto. Valor máximo suportado: 9999999.99
> observacoes | String: 500 | Utilize para guardar quaisquer informações que não tenham campos específicos.
> ultima_alteracao | DateTime | Data e hora da última modificação deste produto na Mercos.
> excluido | Boolean | Indica se o produto está excluído. Os produtos excluídos não poderão mais ser atualizados.  Após excluir um produto `"excluido": true`, este processo não tem retorno, será necessário criar outro produto.
> ativo | Boolean | Indica se o produto está ativo. Os produtos inativos podem ser atualizados, inclusive podendo voltar a ser ativos.
> categoria_id | Integer | Identificador único da categoria relacionada ao produto.
> codigo_ncm | String | Código do NCM - Nomenclatura Comum do Mercosul, utilizado para cálculo automático do ST.
> multiplo | Double | Múltiplo de venda do produto.
> peso_bruto | Double | Peso bruto do produto em kg (com até 3 casas decimais).
> 
> **Obs.: Ambos produtos excluídos e inativos não serão exibidos em tela para o usuário.**


```javascript
function getObterTodosOsProdutos(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodosOsProdutos(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_um_produto_espec_fico"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterUmProdutoEspecFico") getObterUmProdutoEspecFico

> A entidade Produtos contém tudo o que é necessário para gerenciar os produtos do sistema Mercos como :
> 
> - Grades de cores e tamanhos
> 
> - Imagens
> 
> - Preços distintos
> 
> - Categoria
> 
> Para associar deve informar nos atributos `grade_cores` e `grade_tamanhos`(todas as cores e tamanhos disponíveis) como mostra no exemplo de JSON de POST. No caso das imagens,
> deve usar a entidade `imagens` informando o ID do produto.
> Quando integrar preços distintos, precisa realizar a integração das `tabelas de preço`. Já a categoria é necessário o vinculo  do ID  no campo `categoria_id`.
> 
> ### Estrutura de Retorno do GET
> 
> Campo | Tipo | Descrição |
> -------------- | -------------- | --------------
> id | Integer | Identificador único
> codigo | String: 50 | Código de referência do produto
> nome | String: 100 | Nome do produto.
> comissao | Double | Comissão do produto. Ex: 5.0 para 5%. Informe null caso não queira calcular comissões pela Mercos.
> preco_tabela | Double | Preço deste produto na tabela padrão.
> preco_minimo | Double | Preço mínimo do produto para o recurso da Rentabilidade (apenas Plano Ouro)
> ipi | Double | Caso não possua IPI, informe null.
> tipo_ipi | String: 1 | Tipo do IPI do produto: "P" para percentual, "V" para valor fixo em Reais.
> st | Double | Percentual de Substituição Tributária do produto. Caso não possua ST, informe null.
> grade_cores | Lista | Lista de cores (String) em que o produto está disponível. Caso não trabalhe com variação de cores, informe null.
> grade_tamanhos | Lista | Lista de tamanhos (String) em que o produto está disponível. Caso não trabalhe com variação de tamanhos, informe null.
> moeda | String: 1 | Moeda do produto: Real ("0"), Dólar ("1") ou Euro ("2").
> unidade | String: 10 | Unidade de medida do produto, por exemplo "Kg" ou "Cx". Opcional.
> saldo_estoque | Double: 7 | Saldo de estoque do produto. Valor máximo suportado: 9999999.99
> observacoes | String: 500 | Utilize para guardar quaisquer informações que não tenham campos específicos.
> ultima_alteracao | DateTime | Data e hora da última modificação deste produto na Mercos.
> excluido | Boolean | Indica se o produto está excluído. Os produtos excluídos não poderão mais ser atualizados.  Após excluir um produto `"excluido": true`, este processo não tem retorno, será necessário criar outro produto.
> ativo | Boolean | Indica se o produto está ativo. Os produtos inativos podem ser atualizados, inclusive podendo voltar a ser ativos.
> categoria_id | Integer | Identificador único da categoria relacionada ao produto.
> codigo_ncm | String | Código do NCM - Nomenclatura Comum do Mercosul, utilizado para cálculo automático do ST.
> multiplo | Double | Múltiplo de venda do produto.
> peso_bruto | Double | Peso bruto do produto em kg (com até 3 casas decimais).
> 
> **Obs.: Ambos produtos excluídos e inativos não serão exibidos em tela para o usuário.**


```javascript
function getObterUmProdutoEspecFico(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do Produto no sistema Mercos |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 45.2789336025151;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterUmProdutoEspecFico(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="create_incluir_um_produto"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createIncluirUmProduto") createIncluirUmProduto

> A entidade Produtos contém tudo o que é necessário para gerenciar os produtos do sistema Mercos como :
> 
> - Grades de cores e tamanhos
> 
> - Imagens
> 
> - Preços distintos
> 
> - Categoria
> 
> Para associar deve informar nos atributos `grade_cores` e `grade_tamanhos`(todas as cores e tamanhos disponíveis) como mostra no exemplo de JSON de POST. No caso das imagens,
> deve usar a entidade `imagens` informando o ID do produto.
> Quando integrar preços distintos, precisa realizar a integração das `tabelas de preço`. Já a categoria é necessário o vinculo  do ID  no campo `categoria_id`.
> 
> ### Estrutura de Retorno do GET
> 
> Campo | Tipo | Descrição |
> -------------- | -------------- | --------------
> id | Integer | Identificador único
> codigo | String: 50 | Código de referência do produto
> nome | String: 100 | Nome do produto.
> comissao | Double | Comissão do produto. Ex: 5.0 para 5%. Informe null caso não queira calcular comissões pela Mercos.
> preco_tabela | Double | Preço deste produto na tabela padrão.
> preco_minimo | Double | Preço mínimo do produto para o recurso da Rentabilidade (apenas Plano Ouro)
> ipi | Double | Caso não possua IPI, informe null.
> tipo_ipi | String: 1 | Tipo do IPI do produto: "P" para percentual, "V" para valor fixo em Reais.
> st | Double | Percentual de Substituição Tributária do produto. Caso não possua ST, informe null.
> grade_cores | Lista | Lista de cores (String) em que o produto está disponível. Caso não trabalhe com variação de cores, informe null.
> grade_tamanhos | Lista | Lista de tamanhos (String) em que o produto está disponível. Caso não trabalhe com variação de tamanhos, informe null.
> moeda | String: 1 | Moeda do produto: Real ("0"), Dólar ("1") ou Euro ("2").
> unidade | String: 10 | Unidade de medida do produto, por exemplo "Kg" ou "Cx". Opcional.
> saldo_estoque | Double: 7 | Saldo de estoque do produto. Valor máximo suportado: 9999999.99
> observacoes | String: 500 | Utilize para guardar quaisquer informações que não tenham campos específicos.
> ultima_alteracao | DateTime | Data e hora da última modificação deste produto na Mercos.
> excluido | Boolean | Indica se o produto está excluído. Os produtos excluídos não poderão mais ser atualizados.  Após excluir um produto `"excluido": true`, este processo não tem retorno, será necessário criar outro produto.
> ativo | Boolean | Indica se o produto está ativo. Os produtos inativos podem ser atualizados, inclusive podendo voltar a ser ativos.
> categoria_id | Integer | Identificador único da categoria relacionada ao produto.
> codigo_ncm | String | Código do NCM - Nomenclatura Comum do Mercosul, utilizado para cálculo automático do ST.
> multiplo | Double | Múltiplo de venda do produto.
> peso_bruto | Double | Peso bruto do produto em kg (com até 3 casas decimais).
> 
> **Obs.: Ambos produtos excluídos e inativos não serão exibidos em tela para o usuário.**


```javascript
function createIncluirUmProduto(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new IncluirUmProdutoRequest({"key":"value"});

    controller.createIncluirUmProduto(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```



### <a name="alterar_um_produto"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarUmProduto") alterarUmProduto

> A entidade Produtos contém tudo o que é necessário para gerenciar os produtos do sistema Mercos como :
> 
> - Grades de cores e tamanhos
> 
> - Imagens
> 
> - Preços distintos
> 
> - Categoria
> 
> Para associar deve informar nos atributos `grade_cores` e `grade_tamanhos`(todas as cores e tamanhos disponíveis) como mostra no exemplo de JSON de POST. No caso das imagens,
> deve usar a entidade `imagens` informando o ID do produto.
> Quando integrar preços distintos, precisa realizar a integração das `tabelas de preço`. Já a categoria é necessário o vinculo  do ID  no campo `categoria_id`.
> 
> ### Estrutura de Retorno do GET
> 
> Campo | Tipo | Descrição |
> -------------- | -------------- | --------------
> id | Integer | Identificador único
> codigo | String: 50 | Código de referência do produto
> nome | String: 100 | Nome do produto.
> comissao | Double | Comissão do produto. Ex: 5.0 para 5%. Informe null caso não queira calcular comissões pela Mercos.
> preco_tabela | Double | Preço deste produto na tabela padrão.
> preco_minimo | Double | Preço mínimo do produto para o recurso da Rentabilidade (apenas Plano Ouro)
> ipi | Double | Caso não possua IPI, informe null.
> tipo_ipi | String: 1 | Tipo do IPI do produto: "P" para percentual, "V" para valor fixo em Reais.
> st | Double | Percentual de Substituição Tributária do produto. Caso não possua ST, informe null.
> grade_cores | Lista | Lista de cores (String) em que o produto está disponível. Caso não trabalhe com variação de cores, informe null.
> grade_tamanhos | Lista | Lista de tamanhos (String) em que o produto está disponível. Caso não trabalhe com variação de tamanhos, informe null.
> moeda | String: 1 | Moeda do produto: Real ("0"), Dólar ("1") ou Euro ("2").
> unidade | String: 10 | Unidade de medida do produto, por exemplo "Kg" ou "Cx". Opcional.
> saldo_estoque | Double: 7 | Saldo de estoque do produto. Valor máximo suportado: 9999999.99
> observacoes | String: 500 | Utilize para guardar quaisquer informações que não tenham campos específicos.
> ultima_alteracao | DateTime | Data e hora da última modificação deste produto na Mercos.
> excluido | Boolean | Indica se o produto está excluído. Os produtos excluídos não poderão mais ser atualizados.  Após excluir um produto `"excluido": true`, este processo não tem retorno, será necessário criar outro produto.
> ativo | Boolean | Indica se o produto está ativo. Os produtos inativos podem ser atualizados, inclusive podendo voltar a ser ativos.
> categoria_id | Integer | Identificador único da categoria relacionada ao produto.
> codigo_ncm | String | Código do NCM - Nomenclatura Comum do Mercosul, utilizado para cálculo automático do ST.
> multiplo | Double | Múltiplo de venda do produto.
> peso_bruto | Double | Peso bruto do produto em kg (com até 3 casas decimais).
> 
> **Obs.: Ambos produtos excluídos e inativos não serão exibidos em tela para o usuário.**


```javascript
function alterarUmProduto(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do Produto no sistema Mercos |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 45.2789336025151;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.alterarUmProduto(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="update_ajustar_o_estoque_de_produto"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.updateAjustarOEstoqueDeProduto") updateAjustarOEstoqueDeProduto

> Este endpoint ajusta o estoque de um produto no sistema.## Parâmetros do JSON de envio
> 
> Campo | Tipo | Descrição |
> ----- | ---- | -----
> **produto_id**<br><small>(obrigatório)</small>| Integer | Identificador do produto.
> **novo_saldo**<br><small>(obrigatório)</small>| Double: 7 | Novo saldo de estoque do produto. Após o ajuste de estoque, o saldo do produto ficará igual ao valor informado neste campo. Valor máximo suportado: 9999999.99.


```javascript
function updateAjustarOEstoqueDeProduto(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new AjustarOEstoqueDeProdutoRequest({"key":"value"});

    controller.updateAjustarOEstoqueDeProduto(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 422 | Unexpected error in API call. See HTTP response body for details. |




### <a name="create_incluir_uma_imagem"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createIncluirUmaImagem") createIncluirUmaImagem

> Este método adiciona uma imagem a um produto específico, mas o produto pode conter várias imagens.
> É possível escolher entre duas formas de envio:
> 
> * URL da imagem
> 
> * Imagem convertida em Base64
> 
> Caso os dois parâmetros sejam informados o sistema irá considerar apenas a URL da imagem.
> 
> ### Estrutura de Retorno do GET
> 
> Esta integração não possui um body JSON no retorno em caso de sucesso, será retornado um HTTP status code 201 e os seguintes headers:
> 
> Campo | Tipo | Descrição |
> ---|- | -
> MeusPedidosID | Integer | Identificador único da imagem na Mercos.
> MEUSPEDIDOS_QTDE_TOTAL_REGISTROS | Integer | Valor será sempre 0 nesse método.Este método adiciona uma imagem ao produto específico. É possível escolher entre duas formas de envio, URL da imagem ou a imagem convertida em Base64. Caso os dois parâmetros sejam informados o sistema irá considerar apenas a URL da imagem
> 
> ### Requisição HTTP
> 
> `POST https://app.mercos.com/api/v1/imagens_produto`
> 
> ### Parâmetros da URL
> 
> Campo | Tipo | Descrição |
> ----- |----- | --
> **produto_id**<br><small>(obrigatório)</small> | Integer | Identificador único do Produto na Mercos.
> ordem | Integer | Ordem que as imagens serão exibidas na Mercos. Sendo 1 a imagem principal.
> imagem_url | String: 500 | URL pública da imagem.
> imagem_base64 | String | Imagem convertida em Base64.
> 
> É **obrigatório** informar um dos seguintes campos: `imagem_url` ou `imagem_base64`.


```javascript
function createIncluirUmaImagem(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = {
        id : 21
    };

    controller.createIncluirUmaImagem(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="get_obter_todas_as_tabelas_de_pre_o"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodasAsTabelasDePreO") getObterTodasAsTabelasDePreO

> Representa as demais tabelas de preço disponíveis, além da tabela padrão. Cada produto pode ter um preço diferente em cada tabela de preço.
> 
> Existem 3 tipos de tabelas:
> 
> * Preço Livre: o preço dos produtos é informado livremente através da API.
> 
> * Acréscimo: o preço dos produtos é calculado automaticamente, aplicando um acréscimo sobre o preço padrão (cadastrado na entidade Produto).
> 
> * Desconto: o preço dos produtos é calculado automaticamente, aplicando um desconto sobre o preço padrão (cadastrado na entidade Produto).
> 
> -----
> 
> #### Estrutura de Retorno do GET
> 
> |       Campo      |     Tipo    | Descrição                                                                         |
> |:----------------:|:-----------:|-----------------------------------------------------------------------------------|
> |        id        |   Integer   | Identificador único                                                               |
> |       nome       | String: 100 | Nome da tabela de preço                                                           |
> |       tipo       |  String: 2  | Tipo da tabela. Valores possíveis: P (preço livre) - A (acrescimo) - D (desconto) |
> |     acrescimo    |    Float    | Acréscimo a ser aplicado nas tabelas do tipo A                                    |
> |     desconto     |    Float    | Desconto a ser aplicado nas tabelas do tipo D                                     |
> |     excluido     |   Boolean   | Indica se a tabela de preço está excluída                                         |
> | ultima_alteracao |   DateTime  | Data e hora da última modificação desta tabela de preço no Mercos                 |


```javascript
function getObterTodasAsTabelasDePreO(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodasAsTabelasDePreO(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_uma_tabela_de_pre_o"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterUmaTabelaDePreO") getObterUmaTabelaDePreO

> Representa as demais tabelas de preço disponíveis, além da tabela padrão. Cada produto pode ter um preço diferente em cada tabela de preço.
> 
> Existem 3 tipos de tabelas:
> 
> * Preço Livre: o preço dos produtos é informado livremente através da API.
> 
> * Acréscimo: o preço dos produtos é calculado automaticamente, aplicando um acréscimo sobre o preço padrão (cadastrado na entidade Produto).
> 
> * Desconto: o preço dos produtos é calculado automaticamente, aplicando um desconto sobre o preço padrão (cadastrado na entidade Produto).
> 
> -----
> 
> #### Estrutura de Retorno do GET
> 
> |       Campo      |     Tipo    | Descrição                                                                         |
> |:----------------:|:-----------:|-----------------------------------------------------------------------------------|
> |        id        |   Integer   | Identificador único                                                               |
> |       nome       | String: 100 | Nome da tabela de preço                                                           |
> |       tipo       |  String: 2  | Tipo da tabela. Valores possíveis: P (preço livre) - A (acrescimo) - D (desconto) |
> |     acrescimo    |    Float    | Acréscimo a ser aplicado nas tabelas do tipo A                                    |
> |     desconto     |    Float    | Desconto a ser aplicado nas tabelas do tipo D                                     |
> |     excluido     |   Boolean   | Indica se a tabela de preço está excluída                                         |
> | ultima_alteracao |   DateTime  | Data e hora da última modificação desta tabela de preço no Mercos                 |


```javascript
function getObterUmaTabelaDePreO(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID da Tabela de Preço no sistema Mercos |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 45.2789336025151;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterUmaTabelaDePreO(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="create_incluir_uma_tabela_de_pre_o"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createIncluirUmaTabelaDePreO") createIncluirUmaTabelaDePreO

> Representa as demais tabelas de preço disponíveis, além da tabela padrão. Cada produto pode ter um preço diferente em cada tabela de preço.
> 
> Existem 3 tipos de tabelas:
> 
> * Preço Livre: o preço dos produtos é informado livremente através da API.
> 
> * Acréscimo: o preço dos produtos é calculado automaticamente, aplicando um acréscimo sobre o preço padrão (cadastrado na entidade Produto).
> 
> * Desconto: o preço dos produtos é calculado automaticamente, aplicando um desconto sobre o preço padrão (cadastrado na entidade Produto).
> 
> -----
> 
> #### Estrutura de Retorno do GET
> 
> |       Campo      |     Tipo    | Descrição                                                                         |
> |:----------------:|:-----------:|-----------------------------------------------------------------------------------|
> |        id        |   Integer   | Identificador único                                                               |
> |       nome       | String: 100 | Nome da tabela de preço                                                           |
> |       tipo       |  String: 2  | Tipo da tabela. Valores possíveis: P (preço livre) - A (acrescimo) - D (desconto) |
> |     acrescimo    |    Float    | Acréscimo a ser aplicado nas tabelas do tipo A                                    |
> |     desconto     |    Float    | Desconto a ser aplicado nas tabelas do tipo D                                     |
> |     excluido     |   Boolean   | Indica se a tabela de preço está excluída                                         |
> | ultima_alteracao |   DateTime  | Data e hora da última modificação desta tabela de preço no Mercos                 |


```javascript
function createIncluirUmaTabelaDePreO(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new IncluirUmaTabelaDePreORequest({"key":"value"});

    controller.createIncluirUmaTabelaDePreO(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```



### <a name="alterar_uma_tabela_de_pre_o"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarUmaTabelaDePreO") alterarUmaTabelaDePreO

> Representa as demais tabelas de preço disponíveis, além da tabela padrão. Cada produto pode ter um preço diferente em cada tabela de preço.
> 
> Existem 3 tipos de tabelas:
> 
> * Preço Livre: o preço dos produtos é informado livremente através da API.
> 
> * Acréscimo: o preço dos produtos é calculado automaticamente, aplicando um acréscimo sobre o preço padrão (cadastrado na entidade Produto).
> 
> * Desconto: o preço dos produtos é calculado automaticamente, aplicando um desconto sobre o preço padrão (cadastrado na entidade Produto).
> 
> -----
> 
> #### Estrutura de Retorno do GET
> 
> |       Campo      |     Tipo    | Descrição                                                                         |
> |:----------------:|:-----------:|-----------------------------------------------------------------------------------|
> |        id        |   Integer   | Identificador único                                                               |
> |       nome       | String: 100 | Nome da tabela de preço                                                           |
> |       tipo       |  String: 2  | Tipo da tabela. Valores possíveis: P (preço livre) - A (acrescimo) - D (desconto) |
> |     acrescimo    |    Float    | Acréscimo a ser aplicado nas tabelas do tipo A                                    |
> |     desconto     |    Float    | Desconto a ser aplicado nas tabelas do tipo D                                     |
> |     excluido     |   Boolean   | Indica se a tabela de preço está excluída                                         |
> | ultima_alteracao |   DateTime  | Data e hora da última modificação desta tabela de preço no Mercos                 |


```javascript
function alterarUmaTabelaDePreO(id, contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID da Tabela de Preço no sistema Mercos |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 45.2789336025151;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new AlterarUmaTabelaDePreORequest({"key":"value"});

    controller.alterarUmaTabelaDePreO(id, contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```



### <a name="get_obter_todos_os_v_nculos_de_produtos_com_tabelas_de_pre_o"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodosOsVNculosDeProdutosComTabelasDePreO") getObterTodosOsVNculosDeProdutosComTabelasDePreO

> Esta entidade faz a associação entre os Produtos e as Tabelas de Preço.
> 
> Representa o preço de um produto em determinada tabela de preço.
> Cada produto pode ter um preço diferente para cada tabela de preço cadastrada.
> 
> ----
> 
> #### Estrutura de Retorno do GET
> 
> | id               | Integer  | Identificador único                                                                        |
> |------------------|----------|--------------------------------------------------------------------------------------------|
> | preco            | Float    | Preço do produto nesta tabela                                                              |
> | tabela_id        | Integer  | ID da Tabela de Preço. Este deve ser o ID cadastrado no Mercos, e não o ID do seu Sistema. |
> | produto_id       | Integer  | ID do Produto. Este deve ser o ID cadastrado no Mercos, e não o ID do seu Sistema.         |
> | excluido         | Boolean  | Indica se o preço está excluído                                                            |
> | ultima_alteracao | DateTime | Data e hora da última modificação desta tabela de preço no Mercos                          |


```javascript
function getObterTodosOsVNculosDeProdutosComTabelasDePreO(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodosOsVNculosDeProdutosComTabelasDePreO(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_um_v_nculo_de_produto_com_tabela_de_pre_o"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterUmVNculoDeProdutoComTabelaDePreO") getObterUmVNculoDeProdutoComTabelaDePreO

> Esta entidade faz a associação entre os Produtos e as Tabelas de Preço.
> 
> Representa o preço de um produto em determinada tabela de preço.
> Cada produto pode ter um preço diferente para cada tabela de preço cadastrada.
> 
> ----
> 
> #### Estrutura de Retorno do GET
> 
> | id               | Integer  | Identificador único                                                                        |
> |------------------|----------|--------------------------------------------------------------------------------------------|
> | preco            | Float    | Preço do produto nesta tabela                                                              |
> | tabela_id        | Integer  | ID da Tabela de Preço. Este deve ser o ID cadastrado no Mercos, e não o ID do seu Sistema. |
> | produto_id       | Integer  | ID do Produto. Este deve ser o ID cadastrado no Mercos, e não o ID do seu Sistema.         |
> | excluido         | Boolean  | Indica se o preço está excluído                                                            |
> | ultima_alteracao | DateTime | Data e hora da última modificação desta tabela de preço no Mercos                          |


```javascript
function getObterUmVNculoDeProdutoComTabelaDePreO(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | Id do vinculo da tabela de preço com o produto |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 45.2789336025151;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterUmVNculoDeProdutoComTabelaDePreO(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="create_incluir_um_v_nculo_de_produto_com_tabela_de_pre_o"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createIncluirUmVNculoDeProdutoComTabelaDePreO") createIncluirUmVNculoDeProdutoComTabelaDePreO

> Esta entidade faz a associação entre os Produtos e as Tabelas de Preço.
> 
> Representa o preço de um produto em determinada tabela de preço.
> Cada produto pode ter um preço diferente para cada tabela de preço cadastrada.
> 
> ----
> 
> #### Estrutura de Retorno do GET
> 
> | id               | Integer  | Identificador único                                                                        |
> |------------------|----------|--------------------------------------------------------------------------------------------|
> | preco            | Float    | Preço do produto nesta tabela                                                              |
> | tabela_id        | Integer  | ID da Tabela de Preço. Este deve ser o ID cadastrado no Mercos, e não o ID do seu Sistema. |
> | produto_id       | Integer  | ID do Produto. Este deve ser o ID cadastrado no Mercos, e não o ID do seu Sistema.         |
> | excluido         | Boolean  | Indica se o preço está excluído                                                            |
> | ultima_alteracao | DateTime | Data e hora da última modificação desta tabela de preço no Mercos                          |


```javascript
function createIncluirUmVNculoDeProdutoComTabelaDePreO(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new IncluirUmVNculoDeProdutoComTabelaDePreORequest({"key":"value"});

    controller.createIncluirUmVNculoDeProdutoComTabelaDePreO(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="alterar_um_v_nculo_de_produto_com_tabela_de_pre_o"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarUmVNculoDeProdutoComTabelaDePreO") alterarUmVNculoDeProdutoComTabelaDePreO

> Esta entidade faz a associação entre os Produtos e as Tabelas de Preço.
> 
> Representa o preço de um produto em determinada tabela de preço.
> Cada produto pode ter um preço diferente para cada tabela de preço cadastrada.
> 
> ----
> 
> #### Estrutura de Retorno do GET
> 
> | id               | Integer  | Identificador único                                                                        |
> |------------------|----------|--------------------------------------------------------------------------------------------|
> | preco            | Float    | Preço do produto nesta tabela                                                              |
> | tabela_id        | Integer  | ID da Tabela de Preço. Este deve ser o ID cadastrado no Mercos, e não o ID do seu Sistema. |
> | produto_id       | Integer  | ID do Produto. Este deve ser o ID cadastrado no Mercos, e não o ID do seu Sistema.         |
> | excluido         | Boolean  | Indica se o preço está excluído                                                            |
> | ultima_alteracao | DateTime | Data e hora da última modificação desta tabela de preço no Mercos                          |


```javascript
function alterarUmVNculoDeProdutoComTabelaDePreO(id, contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | Id do vinculo da tabela de preço com o produto |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 45.2789336025151;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new AlterarUmVNculoDeProdutoComTabelaDePreORequest({"key":"value"});

    controller.alterarUmVNculoDeProdutoComTabelaDePreO(id, contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="get_obter_todos_os_clientes"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodosOsClientes") getObterTodosOsClientes

> A entidade clientes permite incluir, alterar e excluir clientes no Mercos.
> 
> Nessa entidade, também é possível realizar a configuração especifica sobre as exceções fiscais das configurações de ICMS-ST definas pela integração ou manualmente no sistema Mercos.
> 
> #### Estrutura de Retorno GET
> 
> | Campo                | Tipo        | Descrição                                                                                                                                                                                                                                            |
> |----------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                   | Integer     | Identificador único                                                                                                                                                                                                                                  |
> | razao_social         | String: 100 | Razão social para pessoa jurídica.Nome do cliente para pessoa física.                                                                                                                                                                                |
> | nome_fantasia        | String: 100 | Nome fantasia (somente pessoa jurídica).                                                                                                                                                                                                             |
> | tipo                 | String: 1   | J para pessoa jurídicaF para pessoa física.                                                                                                                                                                                                          |
> | cnpj                 | String: 18  | CNPJ para pessoa jurídicaCPF para pessoa física.Apenas números, sem pontuação.                                                                                                                                                                       |
> | inscricao_estadual   | String: 30  | Identificação da inscrição estadual do cliente.                                                                                                                                                                                                      |
> | suframa              | String: 20  | Código Suframa para clientes da Zona Franca de Manaus. Caso seja informado, todos os pedidos deste cliente terão IPI zerado (isento).                                                                                                                |
> | rua                  | String: 100 | Rua do endereço do cliente                                                                                                                                                                                                                           |
> | numero               | String: 100 | Número do endereço do cliente                                                                                                                                                                                                                 |
> | complemento          | String: 50  | Informações adicinais do endereço do cliente.                                                                                                                                                                                                        |
> | cep                  | String: 9   | Pode ser informado com ou sem hífen.                                                                                                                                                                                                                 |
> | bairro               | String: 30  | Bairro do cliente                                                                                                                                                                                                                                    |
> | cidade               | String: 50  | Cidade do cliente                                                                                                                                                                                                                                    |
> | estado               | String: 2   | Sigla do Estado.                                                                                                                                                                                                                                     |
> | observacao           | String: 500 | Utilize para guardar quaisquer informações que não tenham campos específicos.                                                                                                                                                                        |
> | emails               | List        | Lista de objetos Email com os emails do cliente. - e-mail (String: 75)                                                                                                                                                                               |
> | telefones            | List        | Lista de objetos Telefone com os telefones do cliente. - numero (String: 30)                                                                                                                                                                         |
> | contatos             | List        | Lista de objetos Contato com os contatos do cliente. - nome (String: 50) - cargo (String: 30) - excluido (Boolean) - emails (List) - telefones (List)                                                                                                |
> | nome_excecao_fiscal  | String: 20  | Exceção fiscal que identifica o(s) cliente(s) sujeito(s) a esta configuração de ICMS-ST. Ex: “SIMPLES”.                                                                                                                                              |
> | segmento_id          | Integer     | Identificador do segmento do cliente para diferenciação em relatórios e políticas comerciais. Ex: 123.                                                                                                                                               |
> | rede_id              | Integer     | Identificador da rede do cliente para diferenciação em relatórios. Ex: 456.
> | bloqueado_b2b        | Boolean     | Indica se o cliente possui bloqueio de acesso ao E-commerce B2B.
> | excluido             | Boolean     | Indica se o cliente está excluído.                                                                                                                                                                                                                   |
> | enderecos_adicionais | List        | Lista de objetos EnderecoAdicional do cliente. - cep (String: 9) Pode ser informado com ou sem hífen. - endereco (String: 200) - numero (String: 100) - complemento (String: 200) - bairro (String: 200) - cidade (String: 200) - estado (String: 2) |
> | ultima_alteracao     | DateTime    | Data e hora da última modificação deste cliente no Mercos.                                                                                                                                                                                           |


```javascript
function getObterTodosOsClientes(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodosOsClientes(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_um_cliente_espec_fico"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterUmClienteEspecFico") getObterUmClienteEspecFico

> A entidade clientes permite incluir, alterar e excluir clientes no Mercos.
> 
> Nessa entidade, também é possível realizar a configuração especifica sobre as exceções fiscais das configurações de ICMS-ST definas pela integração ou manualmente no sistema Mercos.
> 
> #### Estrutura de Retorno GET
> 
> | Campo                | Tipo        | Descrição                                                                                                                                                                                                                                            |
> |----------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                   | Integer     | Identificador único                                                                                                                                                                                                                                  |
> | razao_social         | String: 100 | Razão social para pessoa jurídica.Nome do cliente para pessoa física.                                                                                                                                                                                |
> | nome_fantasia        | String: 100 | Nome fantasia (somente pessoa jurídica).                                                                                                                                                                                                             |
> | tipo                 | String: 1   | J para pessoa jurídicaF para pessoa física.                                                                                                                                                                                                          |
> | cnpj                 | String: 18  | CNPJ para pessoa jurídicaCPF para pessoa física.Apenas números, sem pontuação.                                                                                                                                                                       |
> | inscricao_estadual   | String: 30  | Identificação da inscrição estadual do cliente.                                                                                                                                                                                                      |
> | suframa              | String: 20  | Código Suframa para clientes da Zona Franca de Manaus. Caso seja informado, todos os pedidos deste cliente terão IPI zerado (isento).                                                                                                                |
> | rua                  | String: 100 | Rua do endereço do cliente                                                                                                                                                                                                                           |
> | numero               | String: 100 | Número do endereço do cliente                                                                                                                                                                                                                 |
> | complemento          | String: 50  | Informações adicinais do endereço do cliente.                                                                                                                                                                                                        |
> | cep                  | String: 9   | Pode ser informado com ou sem hífen.                                                                                                                                                                                                                 |
> | bairro               | String: 30  | Bairro do cliente                                                                                                                                                                                                                                    |
> | cidade               | String: 50  | Cidade do cliente                                                                                                                                                                                                                                    |
> | estado               | String: 2   | Sigla do Estado.                                                                                                                                                                                                                                     |
> | observacao           | String: 500 | Utilize para guardar quaisquer informações que não tenham campos específicos.                                                                                                                                                                        |
> | emails               | List        | Lista de objetos Email com os emails do cliente. - e-mail (String: 75)                                                                                                                                                                               |
> | telefones            | List        | Lista de objetos Telefone com os telefones do cliente. - numero (String: 30)                                                                                                                                                                         |
> | contatos             | List        | Lista de objetos Contato com os contatos do cliente. - nome (String: 50) - cargo (String: 30) - excluido (Boolean) - emails (List) - telefones (List)                                                                                                |
> | nome_excecao_fiscal  | String: 20  | Exceção fiscal que identifica o(s) cliente(s) sujeito(s) a esta configuração de ICMS-ST. Ex: “SIMPLES”.                                                                                                                                              |
> | segmento_id          | Integer     | Identificador do segmento do cliente para diferenciação em relatórios e políticas comerciais. Ex: 123.                                                                                                                                               |
> | rede_id              | Integer     | Identificador da rede do cliente para diferenciação em relatórios. Ex: 456.
> | bloqueado_b2b        | Boolean     | Indica se o cliente possui bloqueio de acesso ao E-commerce B2B.
> | excluido             | Boolean     | Indica se o cliente está excluído.                                                                                                                                                                                                                   |
> | enderecos_adicionais | List        | Lista de objetos EnderecoAdicional do cliente. - cep (String: 9) Pode ser informado com ou sem hífen. - endereco (String: 200) - numero (String: 100) - complemento (String: 200) - bairro (String: 200) - cidade (String: 200) - estado (String: 2) |
> | ultima_alteracao     | DateTime    | Data e hora da última modificação deste cliente no Mercos.                                                                                                                                                                                           |


```javascript
function getObterUmClienteEspecFico(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do cliente no sistema Mercos |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 45.2789336025151;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterUmClienteEspecFico(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="create_incluir_um_cliente"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createIncluirUmCliente") createIncluirUmCliente

> A entidade clientes permite incluir, alterar e excluir clientes no Mercos.
> 
> Nessa entidade, também é possível realizar a configuração especifica sobre as exceções fiscais das configurações de ICMS-ST definas pela integração ou manualmente no sistema Mercos.
> 
> #### Estrutura de Retorno GET
> 
> | Campo                | Tipo        | Descrição                                                                                                                                                                                                                                            |
> |----------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                   | Integer     | Identificador único                                                                                                                                                                                                                                  |
> | razao_social         | String: 100 | Razão social para pessoa jurídica.Nome do cliente para pessoa física.                                                                                                                                                                                |
> | nome_fantasia        | String: 100 | Nome fantasia (somente pessoa jurídica).                                                                                                                                                                                                             |
> | tipo                 | String: 1   | J para pessoa jurídicaF para pessoa física.                                                                                                                                                                                                          |
> | cnpj                 | String: 18  | CNPJ para pessoa jurídicaCPF para pessoa física.Apenas números, sem pontuação.                                                                                                                                                                       |
> | inscricao_estadual   | String: 30  | Identificação da inscrição estadual do cliente.                                                                                                                                                                                                      |
> | suframa              | String: 20  | Código Suframa para clientes da Zona Franca de Manaus. Caso seja informado, todos os pedidos deste cliente terão IPI zerado (isento).                                                                                                                |
> | rua                  | String: 100 | Rua do endereço do cliente                                                                                                                                                                                                                           |
> | numero               | String: 100 | Número do endereço do cliente                                                                                                                                                                                                                 |
> | complemento          | String: 50  | Informações adicinais do endereço do cliente.                                                                                                                                                                                                        |
> | cep                  | String: 9   | Pode ser informado com ou sem hífen.                                                                                                                                                                                                                 |
> | bairro               | String: 30  | Bairro do cliente                                                                                                                                                                                                                                    |
> | cidade               | String: 50  | Cidade do cliente                                                                                                                                                                                                                                    |
> | estado               | String: 2   | Sigla do Estado.                                                                                                                                                                                                                                     |
> | observacao           | String: 500 | Utilize para guardar quaisquer informações que não tenham campos específicos.                                                                                                                                                                        |
> | emails               | List        | Lista de objetos Email com os emails do cliente. - e-mail (String: 75)                                                                                                                                                                               |
> | telefones            | List        | Lista de objetos Telefone com os telefones do cliente. - numero (String: 30)                                                                                                                                                                         |
> | contatos             | List        | Lista de objetos Contato com os contatos do cliente. - nome (String: 50) - cargo (String: 30) - excluido (Boolean) - emails (List) - telefones (List)                                                                                                |
> | nome_excecao_fiscal  | String: 20  | Exceção fiscal que identifica o(s) cliente(s) sujeito(s) a esta configuração de ICMS-ST. Ex: “SIMPLES”.                                                                                                                                              |
> | segmento_id          | Integer     | Identificador do segmento do cliente para diferenciação em relatórios e políticas comerciais. Ex: 123.                                                                                                                                               |
> | rede_id              | Integer     | Identificador da rede do cliente para diferenciação em relatórios. Ex: 456.
> | bloqueado_b2b        | Boolean     | Indica se o cliente possui bloqueio de acesso ao E-commerce B2B.
> | excluido             | Boolean     | Indica se o cliente está excluído.                                                                                                                                                                                                                   |
> | enderecos_adicionais | List        | Lista de objetos EnderecoAdicional do cliente. - cep (String: 9) Pode ser informado com ou sem hífen. - endereco (String: 200) - numero (String: 100) - complemento (String: 200) - bairro (String: 200) - cidade (String: 200) - estado (String: 2) |
> | ultima_alteracao     | DateTime    | Data e hora da última modificação deste cliente no Mercos.                                                                                                                                                                                           |


```javascript
function createIncluirUmCliente(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new IncluirUmClienteRequest({"key":"value"});

    controller.createIncluirUmCliente(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="alterar_um_cliente"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarUmCliente") alterarUmCliente

> A entidade clientes permite incluir, alterar e excluir clientes no Mercos.
> 
> Nessa entidade, também é possível realizar a configuração especifica sobre as exceções fiscais das configurações de ICMS-ST definas pela integração ou manualmente no sistema Mercos.
> 
> #### Estrutura de Retorno GET
> 
> | Campo                | Tipo        | Descrição                                                                                                                                                                                                                                            |
> |----------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                   | Integer     | Identificador único                                                                                                                                                                                                                                  |
> | razao_social         | String: 100 | Razão social para pessoa jurídica.Nome do cliente para pessoa física.                                                                                                                                                                                |
> | nome_fantasia        | String: 100 | Nome fantasia (somente pessoa jurídica).                                                                                                                                                                                                             |
> | tipo                 | String: 1   | J para pessoa jurídicaF para pessoa física.                                                                                                                                                                                                          |
> | cnpj                 | String: 18  | CNPJ para pessoa jurídicaCPF para pessoa física.Apenas números, sem pontuação.                                                                                                                                                                       |
> | inscricao_estadual   | String: 30  | Identificação da inscrição estadual do cliente.                                                                                                                                                                                                      |
> | suframa              | String: 20  | Código Suframa para clientes da Zona Franca de Manaus. Caso seja informado, todos os pedidos deste cliente terão IPI zerado (isento).                                                                                                                |
> | rua                  | String: 100 | Rua do endereço do cliente                                                                                                                                                                                                                           |
> | numero               | String: 100 | Número do endereço do cliente                                                                                                                                                                                                                 |
> | complemento          | String: 50  | Informações adicinais do endereço do cliente.                                                                                                                                                                                                        |
> | cep                  | String: 9   | Pode ser informado com ou sem hífen.                                                                                                                                                                                                                 |
> | bairro               | String: 30  | Bairro do cliente                                                                                                                                                                                                                                    |
> | cidade               | String: 50  | Cidade do cliente                                                                                                                                                                                                                                    |
> | estado               | String: 2   | Sigla do Estado.                                                                                                                                                                                                                                     |
> | observacao           | String: 500 | Utilize para guardar quaisquer informações que não tenham campos específicos.                                                                                                                                                                        |
> | emails               | List        | Lista de objetos Email com os emails do cliente. - e-mail (String: 75)                                                                                                                                                                               |
> | telefones            | List        | Lista de objetos Telefone com os telefones do cliente. - numero (String: 30)                                                                                                                                                                         |
> | contatos             | List        | Lista de objetos Contato com os contatos do cliente. - nome (String: 50) - cargo (String: 30) - excluido (Boolean) - emails (List) - telefones (List)                                                                                                |
> | nome_excecao_fiscal  | String: 20  | Exceção fiscal que identifica o(s) cliente(s) sujeito(s) a esta configuração de ICMS-ST. Ex: “SIMPLES”.                                                                                                                                              |
> | segmento_id          | Integer     | Identificador do segmento do cliente para diferenciação em relatórios e políticas comerciais. Ex: 123.                                                                                                                                               |
> | rede_id              | Integer     | Identificador da rede do cliente para diferenciação em relatórios. Ex: 456.
> | bloqueado_b2b        | Boolean     | Indica se o cliente possui bloqueio de acesso ao E-commerce B2B.
> | excluido             | Boolean     | Indica se o cliente está excluído.                                                                                                                                                                                                                   |
> | enderecos_adicionais | List        | Lista de objetos EnderecoAdicional do cliente. - cep (String: 9) Pode ser informado com ou sem hífen. - endereco (String: 200) - numero (String: 100) - complemento (String: 200) - bairro (String: 200) - cidade (String: 200) - estado (String: 2) |
> | ultima_alteracao     | DateTime    | Data e hora da última modificação deste cliente no Mercos.                                                                                                                                                                                           |


```javascript
function alterarUmCliente(id, contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do cliente no sistema Mercos |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 45.2789336025151;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new AlterarUmClienteRequest({"key":"value"});

    controller.alterarUmCliente(id, contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="get_obter_todas_as_redes"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodasAsRedes") getObterTodasAsRedes

> A entidade redes permite incluir, alterar e excluir redes que um cliente pertence, no Mercos.
> 
> #### Estrutura de Retorno GET
> 
> | Campo            | Tipo       | Descrição                                                    |
> |------------------|------------|--------------------------------------------------------------|
> | id               | Integer    | Identificador único                                          |
> | nome             | String: 50 | Nome da rede                                                 |
> | ultima_alteracao | DateTime   | Data e hora da última modificação desta rede na Mercos       |
> | excluido         | Boolean    | Indica se a rede está excluída                               |


```javascript
function getObterTodasAsRedes(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodasAsRedes(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_uma_rede_espec_fica"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterUmaRedeEspecFica") getObterUmaRedeEspecFica

> A entidade redes permite incluir, alterar e excluir redes que um cliente pertence, no Mercos.
> 
> #### Estrutura de Retorno GET
> 
> | Campo            | Tipo       | Descrição                                                    |
> |------------------|------------|--------------------------------------------------------------|
> | id               | Integer    | Identificador único                                          |
> | nome             | String: 50 | Nome da rede                                                 |
> | ultima_alteracao | DateTime   | Data e hora da última modificação desta rede na Mercos       |
> | excluido         | Boolean    | Indica se a rede está excluída                               |


```javascript
function getObterUmaRedeEspecFica(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID da rede no sistema Mercos |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterUmaRedeEspecFica(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="create_incluir_uma_nova_rede"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createIncluirUmaNovaRede") createIncluirUmaNovaRede

> A entidade redes permite incluir, alterar e excluir redes que um cliente pertence, no Mercos.
> 
> #### Estrutura de Retorno GET
> 
> | Campo            | Tipo       | Descrição                                                    |
> |------------------|------------|--------------------------------------------------------------|
> | id               | Integer    | Identificador único                                          |
> | nome             | String: 50 | Nome da rede                                                 |
> | ultima_alteracao | DateTime   | Data e hora da última modificação desta rede na Mercos       |
> | excluido         | Boolean    | Indica se a rede está excluída                               |


```javascript
function createIncluirUmaNovaRede(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new IncluirUmaNovaRedeRequest({"key":"value"});

    controller.createIncluirUmaNovaRede(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="alterar_uma_rede_existente"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarUmaRedeExistente") alterarUmaRedeExistente

> A entidade redes permite incluir, alterar e excluir redes que um cliente pertence, no Mercos.
> 
> #### Estrutura de Retorno GET
> 
> | Campo            | Tipo       | Descrição                                                    |
> |------------------|------------|--------------------------------------------------------------|
> | id               | Integer    | Identificador único                                          |
> | nome             | String: 50 | Nome da rede                                                 |
> | ultima_alteracao | DateTime   | Data e hora da última modificação desta rede na Mercos       |
> | excluido         | Boolean    | Indica se a rede está excluída                               |


```javascript
function alterarUmaRedeExistente(id, contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID da rede no sistema Mercos |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new AlterarUmaRedeExistenteRequest({"key":"value"});

    controller.alterarUmaRedeExistente(id, contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="get_obter_todos_os_segmentos"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodosOsSegmentos") getObterTodosOsSegmentos

> A entidade segmentos permite incluir, alterar e excluir os segmentos de clientes no Mercos.
> 
> #### Estrutura de Retorno GET
> 
> | Campo            | Tipo       | Descrição                                                        |
> |------------------|------------|------------------------------------------------------------------|
> | id               | Integer    | Identificador único                                              |
> | nome             | String: 50 | Nome do segmento                                                 |
> | ultima_alteracao | DateTime   | Data e hora da última modificação deste segmento na Merocs       |
> | excluido         | Boolean    | Indica se o segmento está excluída                               |


```javascript
function getObterTodosOsSegmentos(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodosOsSegmentos(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_um_segmento"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterUmSegmento") getObterUmSegmento

> A entidade segmentos permite incluir, alterar e excluir os segmentos de clientes no Mercos.
> 
> #### Estrutura de Retorno GET
> 
> | Campo            | Tipo       | Descrição                                                        |
> |------------------|------------|------------------------------------------------------------------|
> | id               | Integer    | Identificador único                                              |
> | nome             | String: 50 | Nome do segmento                                                 |
> | ultima_alteracao | DateTime   | Data e hora da última modificação deste segmento na Merocs       |
> | excluido         | Boolean    | Indica se o segmento está excluída                               |


```javascript
function getObterUmSegmento(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do segmento no sistema Mercos |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterUmSegmento(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="create_incluir_um_segmento"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createIncluirUmSegmento") createIncluirUmSegmento

> A entidade segmentos permite incluir, alterar e excluir os segmentos de clientes no Mercos.
> 
> #### Estrutura de Retorno GET
> 
> | Campo            | Tipo       | Descrição                                                        |
> |------------------|------------|------------------------------------------------------------------|
> | id               | Integer    | Identificador único                                              |
> | nome             | String: 50 | Nome do segmento                                                 |
> | ultima_alteracao | DateTime   | Data e hora da última modificação deste segmento na Merocs       |
> | excluido         | Boolean    | Indica se o segmento está excluída                               |


```javascript
function createIncluirUmSegmento(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new IncluirUmSegmentoRequest({"key":"value"});

    controller.createIncluirUmSegmento(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="alterar_um_segmento_existente"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarUmSegmentoExistente") alterarUmSegmentoExistente

> A entidade segmentos permite incluir, alterar e excluir os segmentos de clientes no Mercos.
> 
> #### Estrutura de Retorno GET
> 
> | Campo            | Tipo       | Descrição                                                        |
> |------------------|------------|------------------------------------------------------------------|
> | id               | Integer    | Identificador único                                              |
> | nome             | String: 50 | Nome do segmento                                                 |
> | ultima_alteracao | DateTime   | Data e hora da última modificação deste segmento na Merocs       |
> | excluido         | Boolean    | Indica se o segmento está excluída                               |


```javascript
function alterarUmSegmentoExistente(id, contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do segmento no sistema Mercos |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new AlterarUmSegmentoExistenteRequest({"key":"value"});

    controller.alterarUmSegmentoExistente(id, contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="get_obter_todas_as_tags"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodasAsTags") getObterTodasAsTags

> A entidade tags de clientes permite incluir, alterar e excluir as tags utilizadas para o agrupamento de clientes no Mercos.
> 
> O limite máximo de tags que podem ser cadastradas é 200.
> 
> #### Estrutura de Retorno GET
> 
> | Campo            | Tipo       | Descrição                                                        |
> |------------------|------------|------------------------------------------------------------------|
> | id               | Integer    | Identificador único                                              |
> | nome             | String: 50 | Nome da tag                                                      |
> | ultima_alteracao | DateTime   | Data e hora da última modificação desta tag na Mercos            |
> | excluido         | Boolean    | Indica se a tag está excluída                                    |


```javascript
function getObterTodasAsTags(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodasAsTags(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_uma_tag_espec_fica"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterUmaTagEspecFica") getObterUmaTagEspecFica

> A entidade tags de clientes permite incluir, alterar e excluir as tags utilizadas para o agrupamento de clientes no Mercos.
> 
> O limite máximo de tags que podem ser cadastradas é 200.
> 
> #### Estrutura de Retorno GET
> 
> | Campo            | Tipo       | Descrição                                                        |
> |------------------|------------|------------------------------------------------------------------|
> | id               | Integer    | Identificador único                                              |
> | nome             | String: 50 | Nome da tag                                                      |
> | ultima_alteracao | DateTime   | Data e hora da última modificação desta tag na Mercos            |
> | excluido         | Boolean    | Indica se a tag está excluída                                    |


```javascript
function getObterUmaTagEspecFica(tagId, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| tagId |  ``` Required ```  | ID da tag no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var tagId = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterUmaTagEspecFica(tagId, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="create_incluir_uma_tag"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createIncluirUmaTag") createIncluirUmaTag

> A entidade tags de clientes permite incluir, alterar e excluir as tags utilizadas para o agrupamento de clientes no Mercos.
> 
> O limite máximo de tags que podem ser cadastradas é 200.
> 
> #### Estrutura de Retorno GET
> 
> | Campo            | Tipo       | Descrição                                                        |
> |------------------|------------|------------------------------------------------------------------|
> | id               | Integer    | Identificador único                                              |
> | nome             | String: 50 | Nome da tag                                                      |
> | ultima_alteracao | DateTime   | Data e hora da última modificação desta tag na Mercos            |
> | excluido         | Boolean    | Indica se a tag está excluída                                    |


```javascript
function createIncluirUmaTag(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new IncluirUmaTagRequest({"key":"value"});

    controller.createIncluirUmaTag(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="alterar_uma_tag_existente"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarUmaTagExistente") alterarUmaTagExistente

> A entidade tags de clientes permite incluir, alterar e excluir as tags utilizadas para o agrupamento de clientes no Mercos.
> 
> O limite máximo de tags que podem ser cadastradas é 200.
> 
> #### Estrutura de Retorno GET
> 
> | Campo            | Tipo       | Descrição                                                        |
> |------------------|------------|------------------------------------------------------------------|
> | id               | Integer    | Identificador único                                              |
> | nome             | String: 50 | Nome da tag                                                      |
> | ultima_alteracao | DateTime   | Data e hora da última modificação desta tag na Mercos            |
> | excluido         | Boolean    | Indica se a tag está excluída                                    |


```javascript
function alterarUmaTagExistente(tagId, contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| tagId |  ``` Required ```  | ID da tag no sistema Mercos |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var tagId = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new AlterarUmaTagExistenteRequest({"key":"value"});

    controller.alterarUmaTagExistente(tagId, contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="create_vincular_cliente_tags"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createVincularClienteTags") createVincularClienteTags

> Este endpoint permite vincular tags à clientes. As tags enviadas substituirão as tags existentes nos clientes informados. Se desejar remover todas as tags de um ou vários clientes, basta enviar a lista de tags ids vazia.
> 
> #### Parâmetros do JSON de envio
> 
> | Campo                                      | Tipo             | Descrição                                                                                                                                          |
> |--------------------------------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
> | clientes_ids(obrigatório)                  | Lista de Integer | Lista de Identificadores únicos dos Clientes do Mercos. Deve conter pelo menos um elemento.                                                        |
> | tags_ids(obrigatório)                      | Lista de Integer | Lista contendo os identificadores únicos das Tags de Clientes do Mercos. Pode ser vazia, se desejar remover todas as tags dos clientes informados. |


```javascript
function createVincularClienteTags(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new VincularClienteTagsRequest({"key":"value"});

    controller.createVincularClienteTags(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="get_obter_todas_as_categorias"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodasAsCategorias") getObterTodasAsCategorias

> A entidade categorias permite incluir, alterar e excluir as categorias de produtos no Mercos.
> 
> As categorias terão uma estrutura hierárquica de até 3 níveis. Uma categoria não pode ter o mesmo nome de uma categoria irmã.
> 
> No put da categoria, só é permitido alterar o seu nome e se ela está excluída.
> 
> #### Estrutura de Retorno GET
> 
> | Campo            | Tipo        | Descrição                                                                 |
> |------------------|-------------|---------------------------------------------------------------------------|
> | id               | Integer     | Identificador único                                                       |
> | nome             | String: 100 | Nome da categoria                                                         |
> | categoria_pai_id | Integer     | Só estará presente no retorno quando tiver alguma categoria pai vinculada |
> | ultima_alteracao | DateTime    | Data e hora da última modificação desta categoria na Mercos               |
> | excluido         | Boolean     | Indica se a categoria está excluída                                       |


```javascript
function getObterTodasAsCategorias(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodasAsCategorias(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_uma_categoria_espec_fica"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterUmaCategoriaEspecFica") getObterUmaCategoriaEspecFica

> A entidade categorias permite incluir, alterar e excluir as categorias de produtos no Mercos.
> 
> As categorias terão uma estrutura hierárquica de até 3 níveis. Uma categoria não pode ter o mesmo nome de uma categoria irmã.
> 
> No put da categoria, só é permitido alterar o seu nome e se ela está excluída.
> 
> #### Estrutura de Retorno GET
> 
> | Campo            | Tipo        | Descrição                                                                 |
> |------------------|-------------|---------------------------------------------------------------------------|
> | id               | Integer     | Identificador único                                                       |
> | nome             | String: 100 | Nome da categoria                                                         |
> | categoria_pai_id | Integer     | Só estará presente no retorno quando tiver alguma categoria pai vinculada |
> | ultima_alteracao | DateTime    | Data e hora da última modificação desta categoria na Mercos               |
> | excluido         | Boolean     | Indica se a categoria está excluída                                       |


```javascript
function getObterUmaCategoriaEspecFica(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID da categoria no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterUmaCategoriaEspecFica(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="create_incluir_uma_nova_categoria"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createIncluirUmaNovaCategoria") createIncluirUmaNovaCategoria

> A entidade categorias permite incluir, alterar e excluir as categorias de produtos no Mercos.
> 
> As categorias terão uma estrutura hierárquica de até 3 níveis. Uma categoria não pode ter o mesmo nome de uma categoria irmã.
> 
> No put da categoria, só é permitido alterar o seu nome e se ela está excluída.
> 
> #### Estrutura de Retorno GET
> 
> | Campo            | Tipo        | Descrição                                                                 |
> |------------------|-------------|---------------------------------------------------------------------------|
> | id               | Integer     | Identificador único                                                       |
> | nome             | String: 100 | Nome da categoria                                                         |
> | categoria_pai_id | Integer     | Só estará presente no retorno quando tiver alguma categoria pai vinculada |
> | ultima_alteracao | DateTime    | Data e hora da última modificação desta categoria na Mercos               |
> | excluido         | Boolean     | Indica se a categoria está excluída                                       |


```javascript
function createIncluirUmaNovaCategoria(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new IncluirUmaNovaCategoriaRequest({"key":"value"});

    controller.createIncluirUmaNovaCategoria(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="alterar_uma_categoria_existente"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarUmaCategoriaExistente") alterarUmaCategoriaExistente

> A entidade categorias permite incluir, alterar e excluir as categorias de produtos no Mercos.
> 
> As categorias terão uma estrutura hierárquica de até 3 níveis. Uma categoria não pode ter o mesmo nome de uma categoria irmã.
> 
> No put da categoria, só é permitido alterar o seu nome e se ela está excluída.
> 
> #### Estrutura de Retorno GET
> 
> | Campo            | Tipo        | Descrição                                                                 |
> |------------------|-------------|---------------------------------------------------------------------------|
> | id               | Integer     | Identificador único                                                       |
> | nome             | String: 100 | Nome da categoria                                                         |
> | categoria_pai_id | Integer     | Só estará presente no retorno quando tiver alguma categoria pai vinculada |
> | ultima_alteracao | DateTime    | Data e hora da última modificação desta categoria na Mercos               |
> | excluido         | Boolean     | Indica se a categoria está excluída                                       |


```javascript
function alterarUmaCategoriaExistente(id, contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID da categoria no sistema Mercos |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new AlterarUmaCategoriaExistenteRequest({"key":"value"});

    controller.alterarUmaCategoriaExistente(id, contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="create_vincular_cliente_categoria"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createVincularClienteCategoria") createVincularClienteCategoria

> A entidade de categorias por cliente permite apenas a inclusão de vínculos entre cliente e categoria.
> 
> Utilizando este método é possível definir uma ou mais categorias que serão exibidas para um determinado cliente.
> 
> Todas as demais categorias não estarão disponíveis para clientes que tiverem registros desta configuração.
> 
> Ao liberar uma categoria pai, todas as categorias filhas já estarão liberadas. Não devem ser informadas na mesma requisição as categorias que possuem alguma relação entre si (pai-filha, avô-neta).
> 
> Categorias exemplo:
> 
> - Eletrodomésticos
>   - Linha Branca
>     - Geladeira
>     - Micro-ondas
>   - Linha cinza
>     - Fogão
> 
> - Ao informar a categoria `eletrodomésticos`, todas as categorias serão liberadas.
> 
> - Ao informar a categoria `linha branca`, esta categoria e suas subcategorias serão liberadas, assim a categoria `linha cinza` e suas subcategorias não serão liberadas.
> 
> - Ao informar as categorias `linha branca` e `geladeira` na mesma requisição um erro será retornado informando que `geladeira` não deve ser enviado pois já é liberado pela categoria `linha branca`. O mesmo ocorrerá caso seja enviado `eletrodomésticos` e `geladeira` na mesma requisição
> 
> #### Parâmetros do JSON de envio
> 
> | Campo                             | Tipo             | Descrição                                                                |
> |-----------------------------------|------------------|--------------------------------------------------------------------------|
> | cliente_id(obrigatório)           | Integer          | Identificador único do Cliente do Mercos.                          |
> | categorias_liberadas(obrigatório) | Lista de Integer | Lista contendo os identificadores únicos das Categorias do Mercos. |


```javascript
function createVincularClienteCategoria(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new VincularClienteCategoriaRequest({"key":"value"});

    controller.createVincularClienteCategoria(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="create_liberar_todas_as_categorias_para_o_cliente"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createLiberarTodasAsCategoriasParaOCliente") createLiberarTodasAsCategoriasParaOCliente

> A entidade de categorias por cliente permite apenas a inclusão de vínculos entre cliente e categoria.
> 
> Utilizando este método é possível definir uma ou mais categorias que serão exibidas para um determinado cliente.
> 
> Todas as demais categorias não estarão disponíveis para clientes que tiverem registros desta configuração.
> 
> Ao liberar uma categoria pai, todas as categorias filhas já estarão liberadas. Não devem ser informadas na mesma requisição as categorias que possuem alguma relação entre si (pai-filha, avô-neta).
> 
> Categorias exemplo:
> 
> - Eletrodomésticos
>   - Linha Branca
>     - Geladeira
>     - Micro-ondas
>   - Linha cinza
>     - Fogão
> 
> - Ao informar a categoria `eletrodomésticos`, todas as categorias serão liberadas.
> 
> - Ao informar a categoria `linha branca`, esta categoria e suas subcategorias serão liberadas, assim a categoria `linha cinza` e suas subcategorias não serão liberadas.
> 
> - Ao informar as categorias `linha branca` e `geladeira` na mesma requisição um erro será retornado informando que `geladeira` não deve ser enviado pois já é liberado pela categoria `linha branca`. O mesmo ocorrerá caso seja enviado `eletrodomésticos` e `geladeira` na mesma requisição
> 
> #### Parâmetros do JSON de envio
> 
> | Campo                             | Tipo             | Descrição                                                                |
> |-----------------------------------|------------------|--------------------------------------------------------------------------|
> | cliente_id(obrigatório)           | Integer          | Identificador único do Cliente do Mercos.                          |
> | categorias_liberadas(obrigatório) | Lista de Integer | Lista contendo os identificadores únicos das Categorias do Mercos. |


```javascript
function createLiberarTodasAsCategoriasParaOCliente(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new LiberarTodasAsCategoriasParaOClienteRequest({"key":"value"});

    controller.createLiberarTodasAsCategoriasParaOCliente(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="create_vincular_cliente_tabela_de_pre_o"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createVincularClienteTabelaDePreO") createVincularClienteTabelaDePreO

> A entidade tabela de preço por cliente permite que as tabelas de preço sejam vinculadas aos clientes, permitindo a liberação/bloqueio de tabelas de preço para clientes específicos.
> 
> Utilizando este método é possível definir uma ou mais tabelas de preço que serão exibidas para um determinado cliente.
> 
> Todas as demais tabelas de preço não estarão disponíveis para clientes que tiverem registros desta configuração.
> 
> #### Parâmetros do JSON de envio
> 
> | Campo                          | Tipo             | Descrição                                                                                                                                                  |
> |--------------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | cliente_id(obrigatório)        | Integer          | Identificador único do Cliente do Mercos.                                                                                                            |
> | tabelas_liberadas(obrigatório) | Lista de Integer | Lista contendo os identificadores únicos das Tabela de preço do Mercos.O identificador especial ‘0’ é referente a tabela de valor padrão do produto. |


```javascript
function createVincularClienteTabelaDePreO(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new VincularClienteTabelaDePreORequest({"key":"value"});

    controller.createVincularClienteTabelaDePreO(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="create_liberar_todas_as_tabelas_de_pre_o_para_o_cliente"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createLiberarTodasAsTabelasDePreOParaOCliente") createLiberarTodasAsTabelasDePreOParaOCliente

> A entidade tabela de preço por cliente permite que as tabelas de preço sejam vinculadas aos clientes, permitindo a liberação/bloqueio de tabelas de preço para clientes específicos.
> 
> Utilizando este método é possível definir uma ou mais tabelas de preço que serão exibidas para um determinado cliente.
> 
> Todas as demais tabelas de preço não estarão disponíveis para clientes que tiverem registros desta configuração.
> 
> #### Parâmetros do JSON de envio
> 
> | Campo                          | Tipo             | Descrição                                                                                                                                                  |
> |--------------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | cliente_id(obrigatório)        | Integer          | Identificador único do Cliente do Mercos.                                                                                                            |
> | tabelas_liberadas(obrigatório) | Lista de Integer | Lista contendo os identificadores únicos das Tabela de preço do Mercos.O identificador especial ‘0’ é referente a tabela de valor padrão do produto. |


```javascript
function createLiberarTodasAsTabelasDePreOParaOCliente(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new LiberarTodasAsTabelasDePreOParaOClienteRequest({"key":"value"});

    controller.createLiberarTodasAsTabelasDePreOParaOCliente(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="get_obter_todos_os_vendedores"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodosOsVendedores") getObterTodosOsVendedores

> Representa os usuários que tem acesso ao Mercos.
> 
> Somente podem ser cadastrados através da interface Web do Mercos. A recomendação é que seja criado 1 usuário para cada vendedor cadastrado no Sistema do cliente.
> 
> O mapeamento entre usuários do Mercos e vendedores do Sistema pode ser feito através do email do vendedor.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo        | Descrição                                                  |
> |------------------|-------------|------------------------------------------------------------|
> | id               | Integer     | Identificador único                                        |
> | nome             | String: 100 | Nome do usuário                                            |
> | email            | String: 75  | Email do usuário (sempre único no mercos)                  |
> | telefone         | String: 15  | Telefone do usuário                                        |
> | administrador    | Boolean     | Indica se o usuário é Administrador do sistema.            |
> | excluido         | Boolean     | Indica se o usuário está excluído.                         |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste usuário no Mercos. |


```javascript
function getObterTodosOsVendedores(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodosOsVendedores(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_um_vendedor_espec_fico"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterUmVendedorEspecFico") getObterUmVendedorEspecFico

> Representa os usuários que tem acesso ao Mercos.
> 
> Somente podem ser cadastrados através da interface Web do Mercos. A recomendação é que seja criado 1 usuário para cada vendedor cadastrado no Sistema do cliente.
> 
> O mapeamento entre usuários do Mercos e vendedores do Sistema pode ser feito através do email do vendedor.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo        | Descrição                                                  |
> |------------------|-------------|------------------------------------------------------------|
> | id               | Integer     | Identificador único                                        |
> | nome             | String: 100 | Nome do usuário                                            |
> | email            | String: 75  | Email do usuário (sempre único no mercos)                  |
> | telefone         | String: 15  | Telefone do usuário                                        |
> | administrador    | Boolean     | Indica se o usuário é Administrador do sistema.            |
> | excluido         | Boolean     | Indica se o usuário está excluído.                         |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste usuário no Mercos. |


```javascript
function getObterUmVendedorEspecFico(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do usuário no sistema Mercos |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterUmVendedorEspecFico(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_todas_as_regras_de_libera_o"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodasAsRegrasDeLiberaO") getObterTodasAsRegrasDeLiberaO

> Cada registro dessa entidade contém uma regra que define se um usuário possui ou não acesso a um cliente armazenado no Mercos. O conjunto dessas regras será utilizado para obter a carteira de clientes de cada usuário dentro do Mercos.
> 
> Não é possível editar um registro desta entidade, porém o sistema Mercos sempre irá respeitar o registro mais recente tratando da liberação de um determinado cliente para um determinado usuário.
> 
> Por padrão os clientes cadastrados via integração estão bloqueados para todos os usuários com a opção “Limitar acesso aos clientes” selecionada, sendo necessário fazer um POST nesta entidade criando liberações destes clientes para os respectivos usuários.
> 
> Novos usuários cadastrados na interface da Mercos com a opção “Limitar acesso aos clientes” não tem liberação de acesso para nenhum cliente, sendo necessário fazer um POST nesta entidade criando liberações deste usuário para os respectivos clientes.
> 
> Caso seja feito um POST criando uma regra de liberação para um usuário com a opção “Acessar todos os Clientes” selecionada, este usuário será automaticamente alterado para a opção “Limitar acesso aos clientes” e a nova regra de liberação será cadastrada.
> 
> Por padrão clientes cadastrados pela interface do sistema Mercos estão liberados para o usuário que cadastrou estes clientes, mesmo que o usuário esteja com a opção “Limitar acesso aos clientes” selecionada. Caso seja feito um POST bloqueando um cliente para o usuário que o cadastrou, o sistema irá respeitar este bloqueio.
> 
> Não é possível fazer um bloqueio de cliente para um usuário administrador.
> 
> Ao atualizar as liberações de clientes para os usuários, não é recomendado enviar POSTs de bloqueio de todos os clientes para todos os usuários e depois enviar as novas liberações, este procedimento seria muito lento e poderia causar problemas na base do cliente e o bloqueio da integração pela Mercos. A forma correta é efetuar primeiro um GET de todos os registros desta entidade e comparar este retorno com as novas permissões definidas no ERP realizando POSTs apenas para os casos de divergência nas liberações.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo     | Descrição                                                   |
> |------------------|----------|-------------------------------------------------------------|
> | cliente_id       | Integer  | Identificador único do Cliente da Mercos.                   |
> | usuario_id       | Integer  | Identificador único do Usuário da Mercos.                   |
> | liberado         | Boolean  | Representa se o Usuário tem acesso ao Cliente.              |
> | ultima_alteracao | DateTime | Data e hora da última modificação desta categoria no Mercos |


```javascript
function getObterTodasAsRegrasDeLiberaO(contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'application/json';
    var applicationToken = '1413cea4-d18a-11e4-be31-f23c91df94d9';
    var companyToken = 'a77da094-9443-11e5-be32-f23c91df94d9';

    controller.getObterTodasAsRegrasDeLiberaO(contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_as_regras_para_um_cliente_espec_fico"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterAsRegrasParaUmClienteEspecFico") getObterAsRegrasParaUmClienteEspecFico

> Cada registro dessa entidade contém uma regra que define se um usuário possui ou não acesso a um cliente armazenado no Mercos. O conjunto dessas regras será utilizado para obter a carteira de clientes de cada usuário dentro do Mercos.
> 
> Não é possível editar um registro desta entidade, porém o sistema Mercos sempre irá respeitar o registro mais recente tratando da liberação de um determinado cliente para um determinado usuário.
> 
> Por padrão os clientes cadastrados via integração estão bloqueados para todos os usuários com a opção “Limitar acesso aos clientes” selecionada, sendo necessário fazer um POST nesta entidade criando liberações destes clientes para os respectivos usuários.
> 
> Novos usuários cadastrados na interface da Mercos com a opção “Limitar acesso aos clientes” não tem liberação de acesso para nenhum cliente, sendo necessário fazer um POST nesta entidade criando liberações deste usuário para os respectivos clientes.
> 
> Caso seja feito um POST criando uma regra de liberação para um usuário com a opção “Acessar todos os Clientes” selecionada, este usuário será automaticamente alterado para a opção “Limitar acesso aos clientes” e a nova regra de liberação será cadastrada.
> 
> Por padrão clientes cadastrados pela interface do sistema Mercos estão liberados para o usuário que cadastrou estes clientes, mesmo que o usuário esteja com a opção “Limitar acesso aos clientes” selecionada. Caso seja feito um POST bloqueando um cliente para o usuário que o cadastrou, o sistema irá respeitar este bloqueio.
> 
> Não é possível fazer um bloqueio de cliente para um usuário administrador.
> 
> Ao atualizar as liberações de clientes para os usuários, não é recomendado enviar POSTs de bloqueio de todos os clientes para todos os usuários e depois enviar as novas liberações, este procedimento seria muito lento e poderia causar problemas na base do cliente e o bloqueio da integração pela Mercos. A forma correta é efetuar primeiro um GET de todos os registros desta entidade e comparar este retorno com as novas permissões definidas no ERP realizando POSTs apenas para os casos de divergência nas liberações.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo     | Descrição                                                   |
> |------------------|----------|-------------------------------------------------------------|
> | cliente_id       | Integer  | Identificador único do Cliente da Mercos.                   |
> | usuario_id       | Integer  | Identificador único do Usuário da Mercos.                   |
> | liberado         | Boolean  | Representa se o Usuário tem acesso ao Cliente.              |
> | ultima_alteracao | DateTime | Data e hora da última modificação desta categoria no Mercos |


```javascript
function getObterAsRegrasParaUmClienteEspecFico(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do cliente no sistema Mercos |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterAsRegrasParaUmClienteEspecFico(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_as_regras_para_um_usu_rio_espec_fico"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterAsRegrasParaUmUsuRioEspecFico") getObterAsRegrasParaUmUsuRioEspecFico

> Cada registro dessa entidade contém uma regra que define se um usuário possui ou não acesso a um cliente armazenado no Mercos. O conjunto dessas regras será utilizado para obter a carteira de clientes de cada usuário dentro do Mercos.
> 
> Não é possível editar um registro desta entidade, porém o sistema Mercos sempre irá respeitar o registro mais recente tratando da liberação de um determinado cliente para um determinado usuário.
> 
> Por padrão os clientes cadastrados via integração estão bloqueados para todos os usuários com a opção “Limitar acesso aos clientes” selecionada, sendo necessário fazer um POST nesta entidade criando liberações destes clientes para os respectivos usuários.
> 
> Novos usuários cadastrados na interface da Mercos com a opção “Limitar acesso aos clientes” não tem liberação de acesso para nenhum cliente, sendo necessário fazer um POST nesta entidade criando liberações deste usuário para os respectivos clientes.
> 
> Caso seja feito um POST criando uma regra de liberação para um usuário com a opção “Acessar todos os Clientes” selecionada, este usuário será automaticamente alterado para a opção “Limitar acesso aos clientes” e a nova regra de liberação será cadastrada.
> 
> Por padrão clientes cadastrados pela interface do sistema Mercos estão liberados para o usuário que cadastrou estes clientes, mesmo que o usuário esteja com a opção “Limitar acesso aos clientes” selecionada. Caso seja feito um POST bloqueando um cliente para o usuário que o cadastrou, o sistema irá respeitar este bloqueio.
> 
> Não é possível fazer um bloqueio de cliente para um usuário administrador.
> 
> Ao atualizar as liberações de clientes para os usuários, não é recomendado enviar POSTs de bloqueio de todos os clientes para todos os usuários e depois enviar as novas liberações, este procedimento seria muito lento e poderia causar problemas na base do cliente e o bloqueio da integração pela Mercos. A forma correta é efetuar primeiro um GET de todos os registros desta entidade e comparar este retorno com as novas permissões definidas no ERP realizando POSTs apenas para os casos de divergência nas liberações.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo     | Descrição                                                   |
> |------------------|----------|-------------------------------------------------------------|
> | cliente_id       | Integer  | Identificador único do Cliente da Mercos.                   |
> | usuario_id       | Integer  | Identificador único do Usuário da Mercos.                   |
> | liberado         | Boolean  | Representa se o Usuário tem acesso ao Cliente.              |
> | ultima_alteracao | DateTime | Data e hora da última modificação desta categoria no Mercos |


```javascript
function getObterAsRegrasParaUmUsuRioEspecFico(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do usuário no sistema Mercos |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterAsRegrasParaUmUsuRioEspecFico(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_a_regra_de_um_cliente_para_um_usu_rio"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterARegraDeUmClienteParaUmUsuRio") getObterARegraDeUmClienteParaUmUsuRio

> Cada registro dessa entidade contém uma regra que define se um usuário possui ou não acesso a um cliente armazenado no Mercos. O conjunto dessas regras será utilizado para obter a carteira de clientes de cada usuário dentro do Mercos.
> 
> Não é possível editar um registro desta entidade, porém o sistema Mercos sempre irá respeitar o registro mais recente tratando da liberação de um determinado cliente para um determinado usuário.
> 
> Por padrão os clientes cadastrados via integração estão bloqueados para todos os usuários com a opção “Limitar acesso aos clientes” selecionada, sendo necessário fazer um POST nesta entidade criando liberações destes clientes para os respectivos usuários.
> 
> Novos usuários cadastrados na interface da Mercos com a opção “Limitar acesso aos clientes” não tem liberação de acesso para nenhum cliente, sendo necessário fazer um POST nesta entidade criando liberações deste usuário para os respectivos clientes.
> 
> Caso seja feito um POST criando uma regra de liberação para um usuário com a opção “Acessar todos os Clientes” selecionada, este usuário será automaticamente alterado para a opção “Limitar acesso aos clientes” e a nova regra de liberação será cadastrada.
> 
> Por padrão clientes cadastrados pela interface do sistema Mercos estão liberados para o usuário que cadastrou estes clientes, mesmo que o usuário esteja com a opção “Limitar acesso aos clientes” selecionada. Caso seja feito um POST bloqueando um cliente para o usuário que o cadastrou, o sistema irá respeitar este bloqueio.
> 
> Não é possível fazer um bloqueio de cliente para um usuário administrador.
> 
> Ao atualizar as liberações de clientes para os usuários, não é recomendado enviar POSTs de bloqueio de todos os clientes para todos os usuários e depois enviar as novas liberações, este procedimento seria muito lento e poderia causar problemas na base do cliente e o bloqueio da integração pela Mercos. A forma correta é efetuar primeiro um GET de todos os registros desta entidade e comparar este retorno com as novas permissões definidas no ERP realizando POSTs apenas para os casos de divergência nas liberações.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo     | Descrição                                                   |
> |------------------|----------|-------------------------------------------------------------|
> | cliente_id       | Integer  | Identificador único do Cliente da Mercos.                   |
> | usuario_id       | Integer  | Identificador único do Usuário da Mercos.                   |
> | liberado         | Boolean  | Representa se o Usuário tem acesso ao Cliente.              |
> | ultima_alteracao | DateTime | Data e hora da última modificação desta categoria no Mercos |


```javascript
function getObterARegraDeUmClienteParaUmUsuRio(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | Primeiro o ID do usuário e depois o ID do cliente no sistema Mercos |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterARegraDeUmClienteParaUmUsuRio(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="create_incluir_uma_regra_de_libera_o"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createIncluirUmaRegraDeLiberaO") createIncluirUmaRegraDeLiberaO

> Cada registro dessa entidade contém uma regra que define se um usuário possui ou não acesso a um cliente armazenado no Mercos. O conjunto dessas regras será utilizado para obter a carteira de clientes de cada usuário dentro do Mercos.
> 
> Não é possível editar um registro desta entidade, porém o sistema Mercos sempre irá respeitar o registro mais recente tratando da liberação de um determinado cliente para um determinado usuário.
> 
> Por padrão os clientes cadastrados via integração estão bloqueados para todos os usuários com a opção “Limitar acesso aos clientes” selecionada, sendo necessário fazer um POST nesta entidade criando liberações destes clientes para os respectivos usuários.
> 
> Novos usuários cadastrados na interface da Mercos com a opção “Limitar acesso aos clientes” não tem liberação de acesso para nenhum cliente, sendo necessário fazer um POST nesta entidade criando liberações deste usuário para os respectivos clientes.
> 
> Caso seja feito um POST criando uma regra de liberação para um usuário com a opção “Acessar todos os Clientes” selecionada, este usuário será automaticamente alterado para a opção “Limitar acesso aos clientes” e a nova regra de liberação será cadastrada.
> 
> Por padrão clientes cadastrados pela interface do sistema Mercos estão liberados para o usuário que cadastrou estes clientes, mesmo que o usuário esteja com a opção “Limitar acesso aos clientes” selecionada. Caso seja feito um POST bloqueando um cliente para o usuário que o cadastrou, o sistema irá respeitar este bloqueio.
> 
> Não é possível fazer um bloqueio de cliente para um usuário administrador.
> 
> Ao atualizar as liberações de clientes para os usuários, não é recomendado enviar POSTs de bloqueio de todos os clientes para todos os usuários e depois enviar as novas liberações, este procedimento seria muito lento e poderia causar problemas na base do cliente e o bloqueio da integração pela Mercos. A forma correta é efetuar primeiro um GET de todos os registros desta entidade e comparar este retorno com as novas permissões definidas no ERP realizando POSTs apenas para os casos de divergência nas liberações.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo     | Descrição                                                   |
> |------------------|----------|-------------------------------------------------------------|
> | cliente_id       | Integer  | Identificador único do Cliente da Mercos.                   |
> | usuario_id       | Integer  | Identificador único do Usuário da Mercos.                   |
> | liberado         | Boolean  | Representa se o Usuário tem acesso ao Cliente.              |
> | ultima_alteracao | DateTime | Data e hora da última modificação desta categoria no Mercos |


```javascript
function createIncluirUmaRegraDeLiberaO(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new IncluirUmaRegraDeLiberaORequest({"key":"value"});

    controller.createIncluirUmaRegraDeLiberaO(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="get_obter_todas_as_transportadoras"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodasAsTransportadoras") getObterTodasAsTransportadoras

> A entidade transportadoras permite incluir, alterar e excluir as transportadoras no Mercos.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo                  | Tipo        | Descrição                                                                                                                                                            |
> |------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                     | Integer     | Identificador único                                                                                                                                                  |
> | nome                   | String: 100 | Nome da transportadora                                                                                                                                               |
> | cidade                 | String: 50  | Cidade da transportadora                                                                                                                                             |
> | estado                 | String: 2   | Sigla do estado da transportadora                                                                                                                                    |
> | informacoes_adicionais | String: 500 | Utilize para guardar quaisquer informações que não tenham campos específicos.                                                                                        |
> | telefones              | List        | Lista de objetos com os telefones da transportadora.numero (String: 30): Número do telefone, com DDD e formatação inclusos.tipo sempre Tid identificador do telefone |
> | excluido               | Boolean     | Indica se a transportadora está excluída.                                                                                                                            |
> | ultima_alteracao       | DateTime    | Data e hora da última modificação desta transportadora no Mercos.


```javascript
function getObterTodasAsTransportadoras(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodasAsTransportadoras(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_uma_transportadora_espec_fica"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterUmaTransportadoraEspecFica") getObterUmaTransportadoraEspecFica

> A entidade transportadoras permite incluir, alterar e excluir as transportadoras no Mercos.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo                  | Tipo        | Descrição                                                                                                                                                            |
> |------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                     | Integer     | Identificador único                                                                                                                                                  |
> | nome                   | String: 100 | Nome da transportadora                                                                                                                                               |
> | cidade                 | String: 50  | Cidade da transportadora                                                                                                                                             |
> | estado                 | String: 2   | Sigla do estado da transportadora                                                                                                                                    |
> | informacoes_adicionais | String: 500 | Utilize para guardar quaisquer informações que não tenham campos específicos.                                                                                        |
> | telefones              | List        | Lista de objetos com os telefones da transportadora.numero (String: 30): Número do telefone, com DDD e formatação inclusos.tipo sempre Tid identificador do telefone |
> | excluido               | Boolean     | Indica se a transportadora está excluída.                                                                                                                            |
> | ultima_alteracao       | DateTime    | Data e hora da última modificação desta transportadora no Mercos.


```javascript
function getObterUmaTransportadoraEspecFica(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID da transportadora no sistema Mercos |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterUmaTransportadoraEspecFica(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="create_incluir_uma_transportadora"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createIncluirUmaTransportadora") createIncluirUmaTransportadora

> A entidade transportadoras permite incluir, alterar e excluir as transportadoras no Mercos.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo                  | Tipo        | Descrição                                                                                                                                                            |
> |------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                     | Integer     | Identificador único                                                                                                                                                  |
> | nome                   | String: 100 | Nome da transportadora                                                                                                                                               |
> | cidade                 | String: 50  | Cidade da transportadora                                                                                                                                             |
> | estado                 | String: 2   | Sigla do estado da transportadora                                                                                                                                    |
> | informacoes_adicionais | String: 500 | Utilize para guardar quaisquer informações que não tenham campos específicos.                                                                                        |
> | telefones              | List        | Lista de objetos com os telefones da transportadora.numero (String: 30): Número do telefone, com DDD e formatação inclusos.tipo sempre Tid identificador do telefone |
> | excluido               | Boolean     | Indica se a transportadora está excluída.                                                                                                                            |
> | ultima_alteracao       | DateTime    | Data e hora da última modificação desta transportadora no Mercos.


```javascript
function createIncluirUmaTransportadora(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new IncluirUmaTransportadoraRequest({"key":"value"});

    controller.createIncluirUmaTransportadora(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="alterar_uma_transportadora"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarUmaTransportadora") alterarUmaTransportadora

> A entidade transportadoras permite incluir, alterar e excluir as transportadoras no Mercos.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo                  | Tipo        | Descrição                                                                                                                                                            |
> |------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                     | Integer     | Identificador único                                                                                                                                                  |
> | nome                   | String: 100 | Nome da transportadora                                                                                                                                               |
> | cidade                 | String: 50  | Cidade da transportadora                                                                                                                                             |
> | estado                 | String: 2   | Sigla do estado da transportadora                                                                                                                                    |
> | informacoes_adicionais | String: 500 | Utilize para guardar quaisquer informações que não tenham campos específicos.                                                                                        |
> | telefones              | List        | Lista de objetos com os telefones da transportadora.numero (String: 30): Número do telefone, com DDD e formatação inclusos.tipo sempre Tid identificador do telefone |
> | excluido               | Boolean     | Indica se a transportadora está excluída.                                                                                                                            |
> | ultima_alteracao       | DateTime    | Data e hora da última modificação desta transportadora no Mercos.


```javascript
function alterarUmaTransportadora(id, contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID da transportadora no sistema Mercos |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new AlterarUmaTransportadoraRequest({"key":"value"});

    controller.alterarUmaTransportadora(id, contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="get_obter_todas_as_condi_es_de_pagamento"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodasAsCondiEsDePagamento") getObterTodasAsCondiEsDePagamento

> Aqui você poderá integrar suas condições de pagamento, por exemplo: “30/60”, “30/60/90”, e outras.
> 
> Esta entidade é opcional. Caso você não integre esta informação, será utilizado um campo de texto livre na Condição de Pagamento dos pedidos. O vendedor poderá preencher qualquer valor.
> 
> Também é possível definir um valor mínimo para cada condição de pagamento, desta forma a condição só estará disponível caso o valor total do pedido seja igual ou maior ao valor mínimo daquela condição.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo        | Descrição                                                                                           |
> |------------------|-------------|-----------------------------------------------------------------------------------------------------|
> | id               | Integer     | Identificador único                                                                                 |
> | nome             | String: 100 | Nome da condição de pagamento. Ex: “A vista”.                                                       |
> | valor_minimo     | Double      | Valor mínimo do pedido (sem IPI e ICMS-ST) para que esta condição de pagamento possa ser utilizada. |
> | excluido         | Boolean     | Indica se a condição de pagamento está excluída.                                                    |
> | ultima_alteracao | DateTime    | Data e hora da última modificação desta condição de pagamento no Mercos.                            |


```javascript
function getObterTodasAsCondiEsDePagamento(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodasAsCondiEsDePagamento(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_uma_condi_o_de_pagamento"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterUmaCondiODePagamento") getObterUmaCondiODePagamento

> Aqui você poderá integrar suas condições de pagamento, por exemplo: “30/60”, “30/60/90”, e outras.
> 
> Esta entidade é opcional. Caso você não integre esta informação, será utilizado um campo de texto livre na Condição de Pagamento dos pedidos. O vendedor poderá preencher qualquer valor.
> 
> Também é possível definir um valor mínimo para cada condição de pagamento, desta forma a condição só estará disponível caso o valor total do pedido seja igual ou maior ao valor mínimo daquela condição.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo        | Descrição                                                                                           |
> |------------------|-------------|-----------------------------------------------------------------------------------------------------|
> | id               | Integer     | Identificador único                                                                                 |
> | nome             | String: 100 | Nome da condição de pagamento. Ex: “A vista”.                                                       |
> | valor_minimo     | Double      | Valor mínimo do pedido (sem IPI e ICMS-ST) para que esta condição de pagamento possa ser utilizada. |
> | excluido         | Boolean     | Indica se a condição de pagamento está excluída.                                                    |
> | ultima_alteracao | DateTime    | Data e hora da última modificação desta condição de pagamento no Mercos.                            |


```javascript
function getObterUmaCondiODePagamento(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID da condição de pagamento no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterUmaCondiODePagamento(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="create_incluir_uma_condi_o_de_pagamento"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createIncluirUmaCondiODePagamento") createIncluirUmaCondiODePagamento

> Aqui você poderá integrar suas condições de pagamento, por exemplo: “30/60”, “30/60/90”, e outras.
> 
> Esta entidade é opcional. Caso você não integre esta informação, será utilizado um campo de texto livre na Condição de Pagamento dos pedidos. O vendedor poderá preencher qualquer valor.
> 
> Também é possível definir um valor mínimo para cada condição de pagamento, desta forma a condição só estará disponível caso o valor total do pedido seja igual ou maior ao valor mínimo daquela condição.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo        | Descrição                                                                                           |
> |------------------|-------------|-----------------------------------------------------------------------------------------------------|
> | id               | Integer     | Identificador único                                                                                 |
> | nome             | String: 100 | Nome da condição de pagamento. Ex: “A vista”.                                                       |
> | valor_minimo     | Double      | Valor mínimo do pedido (sem IPI e ICMS-ST) para que esta condição de pagamento possa ser utilizada. |
> | excluido         | Boolean     | Indica se a condição de pagamento está excluída.                                                    |
> | ultima_alteracao | DateTime    | Data e hora da última modificação desta condição de pagamento no Mercos.                            |


```javascript
function createIncluirUmaCondiODePagamento(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new IncluirUmaCondiODePagamentoRequest({"key":"value"});

    controller.createIncluirUmaCondiODePagamento(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="alterar_uma_condi_o_de_pagamento"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarUmaCondiODePagamento") alterarUmaCondiODePagamento

> Aqui você poderá integrar suas condições de pagamento, por exemplo: “30/60”, “30/60/90”, e outras.
> 
> Esta entidade é opcional. Caso você não integre esta informação, será utilizado um campo de texto livre na Condição de Pagamento dos pedidos. O vendedor poderá preencher qualquer valor.
> 
> Também é possível definir um valor mínimo para cada condição de pagamento, desta forma a condição só estará disponível caso o valor total do pedido seja igual ou maior ao valor mínimo daquela condição.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo        | Descrição                                                                                           |
> |------------------|-------------|-----------------------------------------------------------------------------------------------------|
> | id               | Integer     | Identificador único                                                                                 |
> | nome             | String: 100 | Nome da condição de pagamento. Ex: “A vista”.                                                       |
> | valor_minimo     | Double      | Valor mínimo do pedido (sem IPI e ICMS-ST) para que esta condição de pagamento possa ser utilizada. |
> | excluido         | Boolean     | Indica se a condição de pagamento está excluída.                                                    |
> | ultima_alteracao | DateTime    | Data e hora da última modificação desta condição de pagamento no Mercos.                            |


```javascript
function alterarUmaCondiODePagamento(id, contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID da condição de pagamento no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new AlterarUmaCondiODePagamentoRequest({"key":"value"});

    controller.alterarUmaCondiODePagamento(id, contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="create_vincular_cliente_condi_o_de_pagamento"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createVincularClienteCondiODePagamento") createVincularClienteCondiODePagamento

> A entidade de condições de pagamento por cliente permite apenas a inclusão de vínculos entre cliente e condição de pagamento.
> 
> Utilizando este método é possível definir uma ou mais condições de pagamento que serão exibidas para um determinado cliente.
> 
> Todas as demais condições de pagamento não estarão disponíveis para ele.
> 
> #### Parâmetros do JSON de envio
> 
> | Campo                                      | Tipo             | Descrição                                                                            |
> |--------------------------------------------|------------------|--------------------------------------------------------------------------------------|
> | cliente_id(obrigatório)                    | Integer          | Identificador único do Cliente do Mercos.                                      |
> | condicoes_pagamento_liberadas(obrigatório) | Lista de Integer | Lista contendo os identificadores únicos das Condições de Pagamento do Mercos. |


```javascript
function createVincularClienteCondiODePagamento(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new VincularClienteCondiODePagamentoRequest({"key":"value"});

    controller.createVincularClienteCondiODePagamento(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="create_liberar_todas_as_condi_es_de_pagamento_para_o_cliente"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createLiberarTodasAsCondiEsDePagamentoParaOCliente") createLiberarTodasAsCondiEsDePagamentoParaOCliente

> A entidade de condições de pagamento por cliente permite apenas a inclusão de vínculos entre cliente e condição de pagamento.
> 
> Utilizando este método é possível definir uma ou mais condições de pagamento que serão exibidas para um determinado cliente.
> 
> Todas as demais condições de pagamento não estarão disponíveis para ele.
> 
> #### Parâmetros do JSON de envio
> 
> | Campo                                      | Tipo             | Descrição                                                                            |
> |--------------------------------------------|------------------|--------------------------------------------------------------------------------------|
> | cliente_id(obrigatório)                    | Integer          | Identificador único do Cliente do Mercos.                                      |
> | condicoes_pagamento_liberadas(obrigatório) | Lista de Integer | Lista contendo os identificadores únicos das Condições de Pagamento do Mercos. |


```javascript
function createLiberarTodasAsCondiEsDePagamentoParaOCliente(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new LiberarTodasAsCondiEsDePagamentoParaOClienteRequest({"key":"value"});

    controller.createLiberarTodasAsCondiEsDePagamentoParaOCliente(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="get_obter_todas_as_formas_de_pagamento"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodasAsFormasDePagamento") getObterTodasAsFormasDePagamento

> Aqui você poderá integrar suas formas de pagamento, por exemplo “Boleto”, “Cheque”, e outras.
> 
> Esta entidade é opcional. Caso você não integre esta informação, o campo Forma de Pagamento não irá aparecer nos pedidos.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo        | Descrição                                                             |
> |------------------|-------------|-----------------------------------------------------------------------|
> | id               | Integer     | Identificador único                                                   |
> | nome             | String: 100 | Nome da forma de pagamento                                            |
> | excluido         | Boolean     | Indica se a forma de pagamento está excluída.                         |
> | ultima_alteracao | DateTime    | Data e hora da última modificação desta forma de pagamento no Mercos. |


```javascript
function getObterTodasAsFormasDePagamento(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodasAsFormasDePagamento(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_uma_forma_de_pagamento_espec_fica"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterUmaFormaDePagamentoEspecFica") getObterUmaFormaDePagamentoEspecFica

> Aqui você poderá integrar suas formas de pagamento, por exemplo “Boleto”, “Cheque”, e outras.
> 
> Esta entidade é opcional. Caso você não integre esta informação, o campo Forma de Pagamento não irá aparecer nos pedidos.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo        | Descrição                                                             |
> |------------------|-------------|-----------------------------------------------------------------------|
> | id               | Integer     | Identificador único                                                   |
> | nome             | String: 100 | Nome da forma de pagamento                                            |
> | excluido         | Boolean     | Indica se a forma de pagamento está excluída.                         |
> | ultima_alteracao | DateTime    | Data e hora da última modificação desta forma de pagamento no Mercos. |


```javascript
function getObterUmaFormaDePagamentoEspecFica(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID da forma de pagamento no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterUmaFormaDePagamentoEspecFica(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="create_incluir_uma_forma_de_pagamento"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createIncluirUmaFormaDePagamento") createIncluirUmaFormaDePagamento

> Aqui você poderá integrar suas formas de pagamento, por exemplo “Boleto”, “Cheque”, e outras.
> 
> Esta entidade é opcional. Caso você não integre esta informação, o campo Forma de Pagamento não irá aparecer nos pedidos.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo        | Descrição                                                             |
> |------------------|-------------|-----------------------------------------------------------------------|
> | id               | Integer     | Identificador único                                                   |
> | nome             | String: 100 | Nome da forma de pagamento                                            |
> | excluido         | Boolean     | Indica se a forma de pagamento está excluída.                         |
> | ultima_alteracao | DateTime    | Data e hora da última modificação desta forma de pagamento no Mercos. |


```javascript
function createIncluirUmaFormaDePagamento(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new IncluirUmaFormaDePagamentoRequest({"key":"value"});

    controller.createIncluirUmaFormaDePagamento(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="alterar_uma_forma_de_pagamento"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarUmaFormaDePagamento") alterarUmaFormaDePagamento

> Aqui você poderá integrar suas formas de pagamento, por exemplo “Boleto”, “Cheque”, e outras.
> 
> Esta entidade é opcional. Caso você não integre esta informação, o campo Forma de Pagamento não irá aparecer nos pedidos.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo        | Descrição                                                             |
> |------------------|-------------|-----------------------------------------------------------------------|
> | id               | Integer     | Identificador único                                                   |
> | nome             | String: 100 | Nome da forma de pagamento                                            |
> | excluido         | Boolean     | Indica se a forma de pagamento está excluída.                         |
> | ultima_alteracao | DateTime    | Data e hora da última modificação desta forma de pagamento no Mercos. |


```javascript
function alterarUmaFormaDePagamento(id, contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID da forma de pagamento no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new AlterarUmaFormaDePagamentoRequest({"key":"value"});

    controller.alterarUmaFormaDePagamento(id, contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="get_obter_todos_os_pedidos"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodosOsPedidos") getObterTodosOsPedidos

> > #### Atenção
> > O endpoint de pedidos acessado pela url `/v1/pedidos` está depreciado. Novas homologações devem ser realizadas na versão 2 (`/v2/pedidos`). A versão 1 não receberá mais atualizações e com o tempo deixará de ser suportada.
> 
> A entidade Pedidos engloba tanto pedidos realizados quanto orçamentos pendentes.
> 
> O que diferencia um orçamento de um pedido efetivado é a propriedade status, que pode ser consultado 
> usando GET EX: *https://app.mercos.com/api/v1/pedidos/?alterado_apos=2019-03-01%2007:21:44&status=2*
> 
> #### Estrutura de Retorno do Pedido
> 
> | Campo                      | Tipo        | Descrição                                                                                                            |
> |----------------------------|-------------|----------------------------------------------------------------------------------------------------------------------|
> | id                         | Integer     | Identificador único.                                                                                                 |
> | cliente_id                 | Integer     | Identificador único do cliente.                                                                                      |
> | cliente_razao_social       | String: 100 | Razão social do cliente                                                                                              |
> | cliente_nome_fantasia      | String: 100 | Nome fantasia do cliente                                                                                             |
> | cliente_cnpj               | String: 14  | CNPJ do cliente                                                                                                      |
> | cliente_inscricao_estadual | String: 30  | Inscrição estadual do cliente                                                                                        |
> | cliente_rua                | String: 100 | Rua do cliente                                                                                                       |
> | cliente_numero             | String: 100 | Número do endereço do cliente                                                                                                     |
> | cliente_complemento        | String: 50  | Complemento do cliente                                                                                               |
> | cliente_cep                | String: 8   | CEP do cliente                                                                                                       |
> | cliente_bairro             | String: 30  | Bairro do cliente                                                                                                    |
> | cliente_cidade             | String: 50  | Cidade do cliente                                                                                                    |
> | cliente_estado             | String: 2   | Estado do cliente                                                                                                    |
> | cliente_suframa            | String: 20  | Suframa do cliente                                                                                                   |
> | representada_id            | Integer     | ID da Representada                                                                                                   |
> | representada_nome_fantasia | String: 50  | Nome fantasia da Representada                                                                                        |
> | representada_razao_social  | String: 50  | Razão Social da Representada                                                                                         |
> | transportadora_id          | Integer     | Identificador único da transportadora.                                                                               |
> | criador_id                 | Integer     | Identificador único do vendedor que fez o pedido.                                                                    |
> | nome_contato               | String: 50  | Nome do contato do cliente.                                                                                          |
> | status                     | String: 1   | Status atual do pedido. 0 = Cancelado, 1 = Orçamento, 2 = Pedido.                                                    |
> | numero                     | Integer     | Número auto-incremental do pedido.                                                                                   |
> | total                      | Double      | Valor total do pedido.                                                                                               |
> | condicao_pagamento         | String: 100 | Condição de pagamento em formato texto livre.É usado apenas caso você não integre a entidade Condições de Pagamento. |
> | condicao_pagamento_id      | Integer     | Identificador único da condição de pagamento.É usado apenas caso você integre a entidade Condições de Pagamento.     |
> | tipo_pedido_id             | Integer     | Identificador único do tipo de pedido.É usado apenas caso você integre a entidade Tipo de Pedido.                    |
> | forma_pagamento_id         | Integer     | Identificador único da forma de pagamento.É usado apenas caso você integre a entidade Formas de Pagamento.           |
> | data_emissao               | Date        | Data de emissão do pedido. Pode ser null.                                                                            |
> | observacoes                | String: 500 | Informações adicionais que o vendedor registrou no pedido. 
> | status_custom_id           | Integer     | Identificador único do status de pedido customizado. É usado apenas caso você integre a entidade Status de Pedido Customizado.|
> | status_b2b                 | Integer     | Status atual do pedido no B2b. null = Pedido não foi gerado com o B2B, 1 = Em aberto, 2 = Concluído.                 |
> 
> #### Estrutura de Retorno do Item do pedido
> 
> | Campo                   | Tipo        | Descrição                                                                                                                                                                                                                                                                         |
> |-------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                      | Integer     | Identificador único do item do pedido.                                                                                                                                                                                                                                                              |
> | produto_id              | Integer     | ID do produto na Mercos.                                                                                                                                                                                                                                                          |
> | produto_codigo          | String: 50  | Código do Produto na Mercos.                                                                                                                                                                                                                                                      |
> | produto_nome            | String: 100 | Nome do Produto na Mercos.                                                                                                                                                                                                                                                        |
> | tabela_preco_id         | Integer     | ID da tabela de preço na Mercos. Caso tenha sido utilizado o preço padrão (campo “preco_tabela” da entidade Produto), a tabela_preco_id será null.                                                                                                                                |
> | quantidade              | Double      | Quantidade vendida.                                                                                                                                                                                                                                                               |
> | preco_bruto             | Double      | Preço padrão do produto no momento da venda (campo “preco_tabela” da entidade Produto) ou caso tenha sido utilizada uma tabela de preço (tabela_preco_id diferente de null) será o valor da tabela de preço utilizada.                                                            |
> | preco_liquido           | Double      | Preço de venda do produto.                                                                                                                                                                                                                                                        |
> | cotacao_moeda           | Double      | Cotação da moeda, em caso de venda em moeda estrangeira.                                                                                                                                                                                                                          |
> | quantidade_grades       | List        | Lista com as grades de cores e tamanhos usadas, e suas respectivas quantidades. Caso o produto possua somente Cor, o Tamanho será null, e vice-versa. A soma das quantidades nesta lista será igual ao campo quantidade do item.cor String: 15tamanho String: 15quantidade Double |
> | descontos_do_vendedor   | List        | Lista com os descontos concedidos pelo vendedor ao item, em formato Double.                                                                                                                                                                                                       |
> | descontos_de_promocoes  | List        | Lista com os descontos de promoções aplicadas ao item, cada elemento da lista é um objeto no formato: ```{"regra_id": Integer, "desconto": Double}```                                                                                                                             |
> | descontos_de_politicas  | List        | Lista com os acréscimos ou descontos de políticas comerciais aplicadas ao item, cada elemento da lista é um objeto no formato: ```{"regra_id": Integer, "desconto": Double} ``` *Um acréscimo é identificado por um desconto com valor negativo.*                                                  |
> | descontos               | List        | Lista com todos os descontos aplicados ao item, em formato Double. O valor deste campo é igual a concatenação dos valores dos campos `descontos_do_vendedor`, `descontos_de_promocoes` e `descontos_de_politicas`.                                                                |
> | observacoes             | String: 500 | Informações adicionais que o vendedor registrou no item.                                                                                                                                                                                                                          |
> | excluido                | Boolean     | Indica se o item está excluído.                                                                                                                                                                                                                                                   |
> | ipi                     | Double      | Valor do IPI do produto                                                                                                                                                                                                                                                           |
> | tipo_ipi                | Char        | Indica se o IPI é percentual P ou valor fixo V                                                                                                                                                                                                                                    |
> | st                      | Double      | Valor da ST (Substituição Tributária)                                                                                                                                                                                                                                             |
> | subtotal                | Double      | Subtotal final calculado                                                                                                                                                                                                                                                          |
> 
> #### Estrutura de Retorno de Campos extras do pedido
> 
> | Campo          | Tipo       | Descrição                           |
> |----------------|------------|-------------------------------------|
> | campo_extra_id | Integer    | Identificador único do campo extra. |
> | nome           | String: 50 | Nome do campo extra.                |
> | tipo | String| (“0”) Texto livre, (“1”) data, ("2") numérico, ("3") hora, ("4") Lista e ("5") Somente leitura. | 
> | valor_texto    | String: 50 | Retorna um texto se o campo for do tipo texto ou somente leitura. |
> | valor_data     | String | Retorna uma data se o campo for do tipo data. |
> | valor_decimal  | Double | Retorna um Double se o campo for do tipo numérico. |
> | valor_hora     | String | Retorna uma hora o valor se o campo for do tipo texto. |
> | valor_lista    | List  | Retorna uma lista de Ids e valores dos itens da lista, ex: [[1, "sp"], [2, "sc"]]. |
> | valor          | | O tipo deste atributo depente do tipo do campo extra como descrito na tabela abaixo. |
> 
> | Tipo do campo extra | Tipo      | Formato|
> | --------------------| ----------|--------|
> | Texto simples("0") | String: 50| |
> | Data("1") | String | "yyyy-dd-mm", ex: "2018-21-02". |
> | Numérico("2") | Double | Valor máximo: 99999999.99999. |
> | Hora("3") | String | "HH:mm",  ex: "21:56".|
> | Lista("4") | List | Retorna uma lista de Ids e valores dos itens da lista, ex: [[1, "sp"], [2, "sc"]]. |
> | Somente leitura("5") | String: 50| |
> 
> #### Estrutura de Envio de Campos extras do pedido
> 
> Obs: os campos extras cadastrados que não forem enviados serão salvo como vazio.
> 
> | Campo          | Tipo       | Descrição                           |
> |----------------|------------|-------------------------------------|
> | id             | Integer    | Identificador único do campo extra. |
> | valor          | | O tipo deste atributo depente do tipo do campo extra como descrito na tabela abaixo.|
> 
> | Tipo do campo extra | Tipo      | Formato|
> | --------------------| ----------|--------|
> | Texto simples("0") | String: 50| |
> | Data("1") | String | "yyyy-dd-mm", ex: "2018-21-02" |
> | Numérico("2") | Double | Valor máximo: 99999999.99999 |
> | Hora("3") | String | "HH:mm",  ex: "21:56"|
> | Lista("4") | List: int | Lista de ids dos itens selecionados, se atributo lista_multipla for verdadeiro pode ser enviado mais de 1 id na lista. |
> | Somente leitura("5") | String: 50| |
> 
> #### Estrutura de Retorno do Endereço de entrega
> 
> | Campo       | Tipo        | Descrição                                                                                       |
> |-------------|-------------|-------------------------------------------------------------------------------------------------|
> | id          | Integer     | Identificador único do endereço. Este identificador é o mesmo de endereço adicional de cliente. |
> | cep         | String: 8   | CEP da localização do endereço                                                                  |
> | endereco    | String: 200 | Endereço ou rua                                                                                 |
> | numero      | String: 100 | Número do local                                                                                 |
> | complemento | String: 200 | Complementos do endereço                                                                        |
> | bairro      | String: 200 | Bairro do endereço                                                                              |
> | cidade      | String: 200 | Cidade do endereço                                                                              |
> | estado      | String: 2   | Estado da cidade                                                                                |


```javascript
function getObterTodosOsPedidos(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodosOsPedidos(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_um_pedido_espec_fico"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterUmPedidoEspecFico") getObterUmPedidoEspecFico

> > #### Atenção
> > O endpoint de pedidos acessado pela url `/v1/pedidos` está depreciado. Novas homologações devem ser realizadas na versão 2 (`/v2/pedidos`). A versão 1 não receberá mais atualizações e com o tempo deixará de ser suportada.
> 
> A entidade Pedidos engloba tanto pedidos realizados quanto orçamentos pendentes.
> 
> O que diferencia um orçamento de um pedido efetivado é a propriedade status, que pode ser consultado 
> usando GET EX: *https://app.mercos.com/api/v1/pedidos/?alterado_apos=2019-03-01%2007:21:44&status=2*
> 
> #### Estrutura de Retorno do Pedido
> 
> | Campo                      | Tipo        | Descrição                                                                                                            |
> |----------------------------|-------------|----------------------------------------------------------------------------------------------------------------------|
> | id                         | Integer     | Identificador único.                                                                                                 |
> | cliente_id                 | Integer     | Identificador único do cliente.                                                                                      |
> | cliente_razao_social       | String: 100 | Razão social do cliente                                                                                              |
> | cliente_nome_fantasia      | String: 100 | Nome fantasia do cliente                                                                                             |
> | cliente_cnpj               | String: 14  | CNPJ do cliente                                                                                                      |
> | cliente_inscricao_estadual | String: 30  | Inscrição estadual do cliente                                                                                        |
> | cliente_rua                | String: 100 | Rua do cliente                                                                                                       |
> | cliente_numero             | String: 100 | Número do endereço do cliente                                                                                                     |
> | cliente_complemento        | String: 50  | Complemento do cliente                                                                                               |
> | cliente_cep                | String: 8   | CEP do cliente                                                                                                       |
> | cliente_bairro             | String: 30  | Bairro do cliente                                                                                                    |
> | cliente_cidade             | String: 50  | Cidade do cliente                                                                                                    |
> | cliente_estado             | String: 2   | Estado do cliente                                                                                                    |
> | cliente_suframa            | String: 20  | Suframa do cliente                                                                                                   |
> | representada_id            | Integer     | ID da Representada                                                                                                   |
> | representada_nome_fantasia | String: 50  | Nome fantasia da Representada                                                                                        |
> | representada_razao_social  | String: 50  | Razão Social da Representada                                                                                         |
> | transportadora_id          | Integer     | Identificador único da transportadora.                                                                               |
> | criador_id                 | Integer     | Identificador único do vendedor que fez o pedido.                                                                    |
> | nome_contato               | String: 50  | Nome do contato do cliente.                                                                                          |
> | status                     | String: 1   | Status atual do pedido. 0 = Cancelado, 1 = Orçamento, 2 = Pedido.                                                    |
> | numero                     | Integer     | Número auto-incremental do pedido.                                                                                   |
> | total                      | Double      | Valor total do pedido.                                                                                               |
> | condicao_pagamento         | String: 100 | Condição de pagamento em formato texto livre.É usado apenas caso você não integre a entidade Condições de Pagamento. |
> | condicao_pagamento_id      | Integer     | Identificador único da condição de pagamento.É usado apenas caso você integre a entidade Condições de Pagamento.     |
> | tipo_pedido_id             | Integer     | Identificador único do tipo de pedido.É usado apenas caso você integre a entidade Tipo de Pedido.                    |
> | forma_pagamento_id         | Integer     | Identificador único da forma de pagamento.É usado apenas caso você integre a entidade Formas de Pagamento.           |
> | data_emissao               | Date        | Data de emissão do pedido. Pode ser null.                                                                            |
> | observacoes                | String: 500 | Informações adicionais que o vendedor registrou no pedido. 
> | status_custom_id           | Integer     | Identificador único do status de pedido customizado. É usado apenas caso você integre a entidade Status de Pedido Customizado.|
> | status_b2b                 | Integer     | Status atual do pedido no B2b. null = Pedido não foi gerado com o B2B, 1 = Em aberto, 2 = Concluído.                 |
> 
> #### Estrutura de Retorno do Item do pedido
> 
> | Campo                   | Tipo        | Descrição                                                                                                                                                                                                                                                                         |
> |-------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                      | Integer     | Identificador único do item do pedido.                                                                                                                                                                                                                                                              |
> | produto_id              | Integer     | ID do produto na Mercos.                                                                                                                                                                                                                                                          |
> | produto_codigo          | String: 50  | Código do Produto na Mercos.                                                                                                                                                                                                                                                      |
> | produto_nome            | String: 100 | Nome do Produto na Mercos.                                                                                                                                                                                                                                                        |
> | tabela_preco_id         | Integer     | ID da tabela de preço na Mercos. Caso tenha sido utilizado o preço padrão (campo “preco_tabela” da entidade Produto), a tabela_preco_id será null.                                                                                                                                |
> | quantidade              | Double      | Quantidade vendida.                                                                                                                                                                                                                                                               |
> | preco_bruto             | Double      | Preço padrão do produto no momento da venda (campo “preco_tabela” da entidade Produto) ou caso tenha sido utilizada uma tabela de preço (tabela_preco_id diferente de null) será o valor da tabela de preço utilizada.                                                            |
> | preco_liquido           | Double      | Preço de venda do produto.                                                                                                                                                                                                                                                        |
> | cotacao_moeda           | Double      | Cotação da moeda, em caso de venda em moeda estrangeira.                                                                                                                                                                                                                          |
> | quantidade_grades       | List        | Lista com as grades de cores e tamanhos usadas, e suas respectivas quantidades. Caso o produto possua somente Cor, o Tamanho será null, e vice-versa. A soma das quantidades nesta lista será igual ao campo quantidade do item.cor String: 15tamanho String: 15quantidade Double |
> | descontos_do_vendedor   | List        | Lista com os descontos concedidos pelo vendedor ao item, em formato Double.                                                                                                                                                                                                       |
> | descontos_de_promocoes  | List        | Lista com os descontos de promoções aplicadas ao item, cada elemento da lista é um objeto no formato: ```{"regra_id": Integer, "desconto": Double}```                                                                                                                             |
> | descontos_de_politicas  | List        | Lista com os acréscimos ou descontos de políticas comerciais aplicadas ao item, cada elemento da lista é um objeto no formato: ```{"regra_id": Integer, "desconto": Double} ``` *Um acréscimo é identificado por um desconto com valor negativo.*                                                  |
> | descontos               | List        | Lista com todos os descontos aplicados ao item, em formato Double. O valor deste campo é igual a concatenação dos valores dos campos `descontos_do_vendedor`, `descontos_de_promocoes` e `descontos_de_politicas`.                                                                |
> | observacoes             | String: 500 | Informações adicionais que o vendedor registrou no item.                                                                                                                                                                                                                          |
> | excluido                | Boolean     | Indica se o item está excluído.                                                                                                                                                                                                                                                   |
> | ipi                     | Double      | Valor do IPI do produto                                                                                                                                                                                                                                                           |
> | tipo_ipi                | Char        | Indica se o IPI é percentual P ou valor fixo V                                                                                                                                                                                                                                    |
> | st                      | Double      | Valor da ST (Substituição Tributária)                                                                                                                                                                                                                                             |
> | subtotal                | Double      | Subtotal final calculado                                                                                                                                                                                                                                                          |
> 
> #### Estrutura de Retorno de Campos extras do pedido
> 
> | Campo          | Tipo       | Descrição                           |
> |----------------|------------|-------------------------------------|
> | campo_extra_id | Integer    | Identificador único do campo extra. |
> | nome           | String: 50 | Nome do campo extra.                |
> | tipo | String| (“0”) Texto livre, (“1”) data, ("2") numérico, ("3") hora, ("4") Lista e ("5") Somente leitura. | 
> | valor_texto    | String: 50 | Retorna um texto se o campo for do tipo texto ou somente leitura. |
> | valor_data     | String | Retorna uma data se o campo for do tipo data. |
> | valor_decimal  | Double | Retorna um Double se o campo for do tipo numérico. |
> | valor_hora     | String | Retorna uma hora o valor se o campo for do tipo texto. |
> | valor_lista    | List  | Retorna uma lista de Ids e valores dos itens da lista, ex: [[1, "sp"], [2, "sc"]]. |
> | valor          | | O tipo deste atributo depente do tipo do campo extra como descrito na tabela abaixo. |
> 
> | Tipo do campo extra | Tipo      | Formato|
> | --------------------| ----------|--------|
> | Texto simples("0") | String: 50| |
> | Data("1") | String | "yyyy-dd-mm", ex: "2018-21-02". |
> | Numérico("2") | Double | Valor máximo: 99999999.99999. |
> | Hora("3") | String | "HH:mm",  ex: "21:56".|
> | Lista("4") | List | Retorna uma lista de Ids e valores dos itens da lista, ex: [[1, "sp"], [2, "sc"]]. |
> | Somente leitura("5") | String: 50| |
> 
> #### Estrutura de Envio de Campos extras do pedido
> 
> Obs: os campos extras cadastrados que não forem enviados serão salvo como vazio.
> 
> | Campo          | Tipo       | Descrição                           |
> |----------------|------------|-------------------------------------|
> | id             | Integer    | Identificador único do campo extra. |
> | valor          | | O tipo deste atributo depente do tipo do campo extra como descrito na tabela abaixo.|
> 
> | Tipo do campo extra | Tipo      | Formato|
> | --------------------| ----------|--------|
> | Texto simples("0") | String: 50| |
> | Data("1") | String | "yyyy-dd-mm", ex: "2018-21-02" |
> | Numérico("2") | Double | Valor máximo: 99999999.99999 |
> | Hora("3") | String | "HH:mm",  ex: "21:56"|
> | Lista("4") | List: int | Lista de ids dos itens selecionados, se atributo lista_multipla for verdadeiro pode ser enviado mais de 1 id na lista. |
> | Somente leitura("5") | String: 50| |
> 
> #### Estrutura de Retorno do Endereço de entrega
> 
> | Campo       | Tipo        | Descrição                                                                                       |
> |-------------|-------------|-------------------------------------------------------------------------------------------------|
> | id          | Integer     | Identificador único do endereço. Este identificador é o mesmo de endereço adicional de cliente. |
> | cep         | String: 8   | CEP da localização do endereço                                                                  |
> | endereco    | String: 200 | Endereço ou rua                                                                                 |
> | numero      | String: 100 | Número do local                                                                                 |
> | complemento | String: 200 | Complementos do endereço                                                                        |
> | bairro      | String: 200 | Bairro do endereço                                                                              |
> | cidade      | String: 200 | Cidade do endereço                                                                              |
> | estado      | String: 2   | Estado da cidade                                                                                |


```javascript
function getObterUmPedidoEspecFico(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do Pedido no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterUmPedidoEspecFico(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="create_incluir_um_pedido"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createIncluirUmPedido") createIncluirUmPedido

> > #### Atenção
> > O endpoint de pedidos acessado pela url `/v1/pedidos` está depreciado. Novas homologações devem ser realizadas na versão 2 (`/v2/pedidos`). A versão 1 não receberá mais atualizações e com o tempo deixará de ser suportada.
> 
> A entidade Pedidos engloba tanto pedidos realizados quanto orçamentos pendentes.
> 
> O que diferencia um orçamento de um pedido efetivado é a propriedade status, que pode ser consultado 
> usando GET EX: *https://app.mercos.com/api/v1/pedidos/?alterado_apos=2019-03-01%2007:21:44&status=2*
> 
> #### Estrutura de Retorno do Pedido
> 
> | Campo                      | Tipo        | Descrição                                                                                                            |
> |----------------------------|-------------|----------------------------------------------------------------------------------------------------------------------|
> | id                         | Integer     | Identificador único.                                                                                                 |
> | cliente_id                 | Integer     | Identificador único do cliente.                                                                                      |
> | cliente_razao_social       | String: 100 | Razão social do cliente                                                                                              |
> | cliente_nome_fantasia      | String: 100 | Nome fantasia do cliente                                                                                             |
> | cliente_cnpj               | String: 14  | CNPJ do cliente                                                                                                      |
> | cliente_inscricao_estadual | String: 30  | Inscrição estadual do cliente                                                                                        |
> | cliente_rua                | String: 100 | Rua do cliente                                                                                                       |
> | cliente_numero             | String: 100 | Número do endereço do cliente                                                                                                     |
> | cliente_complemento        | String: 50  | Complemento do cliente                                                                                               |
> | cliente_cep                | String: 8   | CEP do cliente                                                                                                       |
> | cliente_bairro             | String: 30  | Bairro do cliente                                                                                                    |
> | cliente_cidade             | String: 50  | Cidade do cliente                                                                                                    |
> | cliente_estado             | String: 2   | Estado do cliente                                                                                                    |
> | cliente_suframa            | String: 20  | Suframa do cliente                                                                                                   |
> | representada_id            | Integer     | ID da Representada                                                                                                   |
> | representada_nome_fantasia | String: 50  | Nome fantasia da Representada                                                                                        |
> | representada_razao_social  | String: 50  | Razão Social da Representada                                                                                         |
> | transportadora_id          | Integer     | Identificador único da transportadora.                                                                               |
> | criador_id                 | Integer     | Identificador único do vendedor que fez o pedido.                                                                    |
> | nome_contato               | String: 50  | Nome do contato do cliente.                                                                                          |
> | status                     | String: 1   | Status atual do pedido. 0 = Cancelado, 1 = Orçamento, 2 = Pedido.                                                    |
> | numero                     | Integer     | Número auto-incremental do pedido.                                                                                   |
> | total                      | Double      | Valor total do pedido.                                                                                               |
> | condicao_pagamento         | String: 100 | Condição de pagamento em formato texto livre.É usado apenas caso você não integre a entidade Condições de Pagamento. |
> | condicao_pagamento_id      | Integer     | Identificador único da condição de pagamento.É usado apenas caso você integre a entidade Condições de Pagamento.     |
> | tipo_pedido_id             | Integer     | Identificador único do tipo de pedido.É usado apenas caso você integre a entidade Tipo de Pedido.                    |
> | forma_pagamento_id         | Integer     | Identificador único da forma de pagamento.É usado apenas caso você integre a entidade Formas de Pagamento.           |
> | data_emissao               | Date        | Data de emissão do pedido. Pode ser null.                                                                            |
> | observacoes                | String: 500 | Informações adicionais que o vendedor registrou no pedido. 
> | status_custom_id           | Integer     | Identificador único do status de pedido customizado. É usado apenas caso você integre a entidade Status de Pedido Customizado.|
> | status_b2b                 | Integer     | Status atual do pedido no B2b. null = Pedido não foi gerado com o B2B, 1 = Em aberto, 2 = Concluído.                 |
> 
> #### Estrutura de Retorno do Item do pedido
> 
> | Campo                   | Tipo        | Descrição                                                                                                                                                                                                                                                                         |
> |-------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                      | Integer     | Identificador único do item do pedido.                                                                                                                                                                                                                                                              |
> | produto_id              | Integer     | ID do produto na Mercos.                                                                                                                                                                                                                                                          |
> | produto_codigo          | String: 50  | Código do Produto na Mercos.                                                                                                                                                                                                                                                      |
> | produto_nome            | String: 100 | Nome do Produto na Mercos.                                                                                                                                                                                                                                                        |
> | tabela_preco_id         | Integer     | ID da tabela de preço na Mercos. Caso tenha sido utilizado o preço padrão (campo “preco_tabela” da entidade Produto), a tabela_preco_id será null.                                                                                                                                |
> | quantidade              | Double      | Quantidade vendida.                                                                                                                                                                                                                                                               |
> | preco_bruto             | Double      | Preço padrão do produto no momento da venda (campo “preco_tabela” da entidade Produto) ou caso tenha sido utilizada uma tabela de preço (tabela_preco_id diferente de null) será o valor da tabela de preço utilizada.                                                            |
> | preco_liquido           | Double      | Preço de venda do produto.                                                                                                                                                                                                                                                        |
> | cotacao_moeda           | Double      | Cotação da moeda, em caso de venda em moeda estrangeira.                                                                                                                                                                                                                          |
> | quantidade_grades       | List        | Lista com as grades de cores e tamanhos usadas, e suas respectivas quantidades. Caso o produto possua somente Cor, o Tamanho será null, e vice-versa. A soma das quantidades nesta lista será igual ao campo quantidade do item.cor String: 15tamanho String: 15quantidade Double |
> | descontos_do_vendedor   | List        | Lista com os descontos concedidos pelo vendedor ao item, em formato Double.                                                                                                                                                                                                       |
> | descontos_de_promocoes  | List        | Lista com os descontos de promoções aplicadas ao item, cada elemento da lista é um objeto no formato: ```{"regra_id": Integer, "desconto": Double}```                                                                                                                             |
> | descontos_de_politicas  | List        | Lista com os acréscimos ou descontos de políticas comerciais aplicadas ao item, cada elemento da lista é um objeto no formato: ```{"regra_id": Integer, "desconto": Double} ``` *Um acréscimo é identificado por um desconto com valor negativo.*                                                  |
> | descontos               | List        | Lista com todos os descontos aplicados ao item, em formato Double. O valor deste campo é igual a concatenação dos valores dos campos `descontos_do_vendedor`, `descontos_de_promocoes` e `descontos_de_politicas`.                                                                |
> | observacoes             | String: 500 | Informações adicionais que o vendedor registrou no item.                                                                                                                                                                                                                          |
> | excluido                | Boolean     | Indica se o item está excluído.                                                                                                                                                                                                                                                   |
> | ipi                     | Double      | Valor do IPI do produto                                                                                                                                                                                                                                                           |
> | tipo_ipi                | Char        | Indica se o IPI é percentual P ou valor fixo V                                                                                                                                                                                                                                    |
> | st                      | Double      | Valor da ST (Substituição Tributária)                                                                                                                                                                                                                                             |
> | subtotal                | Double      | Subtotal final calculado                                                                                                                                                                                                                                                          |
> 
> #### Estrutura de Retorno de Campos extras do pedido
> 
> | Campo          | Tipo       | Descrição                           |
> |----------------|------------|-------------------------------------|
> | campo_extra_id | Integer    | Identificador único do campo extra. |
> | nome           | String: 50 | Nome do campo extra.                |
> | tipo | String| (“0”) Texto livre, (“1”) data, ("2") numérico, ("3") hora, ("4") Lista e ("5") Somente leitura. | 
> | valor_texto    | String: 50 | Retorna um texto se o campo for do tipo texto ou somente leitura. |
> | valor_data     | String | Retorna uma data se o campo for do tipo data. |
> | valor_decimal  | Double | Retorna um Double se o campo for do tipo numérico. |
> | valor_hora     | String | Retorna uma hora o valor se o campo for do tipo texto. |
> | valor_lista    | List  | Retorna uma lista de Ids e valores dos itens da lista, ex: [[1, "sp"], [2, "sc"]]. |
> | valor          | | O tipo deste atributo depente do tipo do campo extra como descrito na tabela abaixo. |
> 
> | Tipo do campo extra | Tipo      | Formato|
> | --------------------| ----------|--------|
> | Texto simples("0") | String: 50| |
> | Data("1") | String | "yyyy-dd-mm", ex: "2018-21-02". |
> | Numérico("2") | Double | Valor máximo: 99999999.99999. |
> | Hora("3") | String | "HH:mm",  ex: "21:56".|
> | Lista("4") | List | Retorna uma lista de Ids e valores dos itens da lista, ex: [[1, "sp"], [2, "sc"]]. |
> | Somente leitura("5") | String: 50| |
> 
> #### Estrutura de Envio de Campos extras do pedido
> 
> Obs: os campos extras cadastrados que não forem enviados serão salvo como vazio.
> 
> | Campo          | Tipo       | Descrição                           |
> |----------------|------------|-------------------------------------|
> | id             | Integer    | Identificador único do campo extra. |
> | valor          | | O tipo deste atributo depente do tipo do campo extra como descrito na tabela abaixo.|
> 
> | Tipo do campo extra | Tipo      | Formato|
> | --------------------| ----------|--------|
> | Texto simples("0") | String: 50| |
> | Data("1") | String | "yyyy-dd-mm", ex: "2018-21-02" |
> | Numérico("2") | Double | Valor máximo: 99999999.99999 |
> | Hora("3") | String | "HH:mm",  ex: "21:56"|
> | Lista("4") | List: int | Lista de ids dos itens selecionados, se atributo lista_multipla for verdadeiro pode ser enviado mais de 1 id na lista. |
> | Somente leitura("5") | String: 50| |
> 
> #### Estrutura de Retorno do Endereço de entrega
> 
> | Campo       | Tipo        | Descrição                                                                                       |
> |-------------|-------------|-------------------------------------------------------------------------------------------------|
> | id          | Integer     | Identificador único do endereço. Este identificador é o mesmo de endereço adicional de cliente. |
> | cep         | String: 8   | CEP da localização do endereço                                                                  |
> | endereco    | String: 200 | Endereço ou rua                                                                                 |
> | numero      | String: 100 | Número do local                                                                                 |
> | complemento | String: 200 | Complementos do endereço                                                                        |
> | bairro      | String: 200 | Bairro do endereço                                                                              |
> | cidade      | String: 200 | Cidade do endereço                                                                              |
> | estado      | String: 2   | Estado da cidade                                                                                |


```javascript
function createIncluirUmPedido(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new IncluirUmPedidoRequest({"key":"value"});

    controller.createIncluirUmPedido(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="alterar_um_pedido"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarUmPedido") alterarUmPedido

> > #### Atenção
> > O endpoint de pedidos acessado pela url `/v1/pedidos` está depreciado. Novas homologações devem ser realizadas na versão 2 (`/v2/pedidos`). A versão 1 não receberá mais atualizações e com o tempo deixará de ser suportada.
> 
> A entidade Pedidos engloba tanto pedidos realizados quanto orçamentos pendentes.
> 
> O que diferencia um orçamento de um pedido efetivado é a propriedade status, que pode ser consultado 
> usando GET EX: *https://app.mercos.com/api/v1/pedidos/?alterado_apos=2019-03-01%2007:21:44&status=2*
> 
> #### Estrutura de Retorno do Pedido
> 
> | Campo                      | Tipo        | Descrição                                                                                                            |
> |----------------------------|-------------|----------------------------------------------------------------------------------------------------------------------|
> | id                         | Integer     | Identificador único.                                                                                                 |
> | cliente_id                 | Integer     | Identificador único do cliente.                                                                                      |
> | cliente_razao_social       | String: 100 | Razão social do cliente                                                                                              |
> | cliente_nome_fantasia      | String: 100 | Nome fantasia do cliente                                                                                             |
> | cliente_cnpj               | String: 14  | CNPJ do cliente                                                                                                      |
> | cliente_inscricao_estadual | String: 30  | Inscrição estadual do cliente                                                                                        |
> | cliente_rua                | String: 100 | Rua do cliente                                                                                                       |
> | cliente_numero             | String: 100 | Número do endereço do cliente                                                                                                     |
> | cliente_complemento        | String: 50  | Complemento do cliente                                                                                               |
> | cliente_cep                | String: 8   | CEP do cliente                                                                                                       |
> | cliente_bairro             | String: 30  | Bairro do cliente                                                                                                    |
> | cliente_cidade             | String: 50  | Cidade do cliente                                                                                                    |
> | cliente_estado             | String: 2   | Estado do cliente                                                                                                    |
> | cliente_suframa            | String: 20  | Suframa do cliente                                                                                                   |
> | representada_id            | Integer     | ID da Representada                                                                                                   |
> | representada_nome_fantasia | String: 50  | Nome fantasia da Representada                                                                                        |
> | representada_razao_social  | String: 50  | Razão Social da Representada                                                                                         |
> | transportadora_id          | Integer     | Identificador único da transportadora.                                                                               |
> | criador_id                 | Integer     | Identificador único do vendedor que fez o pedido.                                                                    |
> | nome_contato               | String: 50  | Nome do contato do cliente.                                                                                          |
> | status                     | String: 1   | Status atual do pedido. 0 = Cancelado, 1 = Orçamento, 2 = Pedido.                                                    |
> | numero                     | Integer     | Número auto-incremental do pedido.                                                                                   |
> | total                      | Double      | Valor total do pedido.                                                                                               |
> | condicao_pagamento         | String: 100 | Condição de pagamento em formato texto livre.É usado apenas caso você não integre a entidade Condições de Pagamento. |
> | condicao_pagamento_id      | Integer     | Identificador único da condição de pagamento.É usado apenas caso você integre a entidade Condições de Pagamento.     |
> | tipo_pedido_id             | Integer     | Identificador único do tipo de pedido.É usado apenas caso você integre a entidade Tipo de Pedido.                    |
> | forma_pagamento_id         | Integer     | Identificador único da forma de pagamento.É usado apenas caso você integre a entidade Formas de Pagamento.           |
> | data_emissao               | Date        | Data de emissão do pedido. Pode ser null.                                                                            |
> | observacoes                | String: 500 | Informações adicionais que o vendedor registrou no pedido. 
> | status_custom_id           | Integer     | Identificador único do status de pedido customizado. É usado apenas caso você integre a entidade Status de Pedido Customizado.|
> | status_b2b                 | Integer     | Status atual do pedido no B2b. null = Pedido não foi gerado com o B2B, 1 = Em aberto, 2 = Concluído.                 |
> 
> #### Estrutura de Retorno do Item do pedido
> 
> | Campo                   | Tipo        | Descrição                                                                                                                                                                                                                                                                         |
> |-------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                      | Integer     | Identificador único do item do pedido.                                                                                                                                                                                                                                                              |
> | produto_id              | Integer     | ID do produto na Mercos.                                                                                                                                                                                                                                                          |
> | produto_codigo          | String: 50  | Código do Produto na Mercos.                                                                                                                                                                                                                                                      |
> | produto_nome            | String: 100 | Nome do Produto na Mercos.                                                                                                                                                                                                                                                        |
> | tabela_preco_id         | Integer     | ID da tabela de preço na Mercos. Caso tenha sido utilizado o preço padrão (campo “preco_tabela” da entidade Produto), a tabela_preco_id será null.                                                                                                                                |
> | quantidade              | Double      | Quantidade vendida.                                                                                                                                                                                                                                                               |
> | preco_bruto             | Double      | Preço padrão do produto no momento da venda (campo “preco_tabela” da entidade Produto) ou caso tenha sido utilizada uma tabela de preço (tabela_preco_id diferente de null) será o valor da tabela de preço utilizada.                                                            |
> | preco_liquido           | Double      | Preço de venda do produto.                                                                                                                                                                                                                                                        |
> | cotacao_moeda           | Double      | Cotação da moeda, em caso de venda em moeda estrangeira.                                                                                                                                                                                                                          |
> | quantidade_grades       | List        | Lista com as grades de cores e tamanhos usadas, e suas respectivas quantidades. Caso o produto possua somente Cor, o Tamanho será null, e vice-versa. A soma das quantidades nesta lista será igual ao campo quantidade do item.cor String: 15tamanho String: 15quantidade Double |
> | descontos_do_vendedor   | List        | Lista com os descontos concedidos pelo vendedor ao item, em formato Double.                                                                                                                                                                                                       |
> | descontos_de_promocoes  | List        | Lista com os descontos de promoções aplicadas ao item, cada elemento da lista é um objeto no formato: ```{"regra_id": Integer, "desconto": Double}```                                                                                                                             |
> | descontos_de_politicas  | List        | Lista com os acréscimos ou descontos de políticas comerciais aplicadas ao item, cada elemento da lista é um objeto no formato: ```{"regra_id": Integer, "desconto": Double} ``` *Um acréscimo é identificado por um desconto com valor negativo.*                                                  |
> | descontos               | List        | Lista com todos os descontos aplicados ao item, em formato Double. O valor deste campo é igual a concatenação dos valores dos campos `descontos_do_vendedor`, `descontos_de_promocoes` e `descontos_de_politicas`.                                                                |
> | observacoes             | String: 500 | Informações adicionais que o vendedor registrou no item.                                                                                                                                                                                                                          |
> | excluido                | Boolean     | Indica se o item está excluído.                                                                                                                                                                                                                                                   |
> | ipi                     | Double      | Valor do IPI do produto                                                                                                                                                                                                                                                           |
> | tipo_ipi                | Char        | Indica se o IPI é percentual P ou valor fixo V                                                                                                                                                                                                                                    |
> | st                      | Double      | Valor da ST (Substituição Tributária)                                                                                                                                                                                                                                             |
> | subtotal                | Double      | Subtotal final calculado                                                                                                                                                                                                                                                          |
> 
> #### Estrutura de Retorno de Campos extras do pedido
> 
> | Campo          | Tipo       | Descrição                           |
> |----------------|------------|-------------------------------------|
> | campo_extra_id | Integer    | Identificador único do campo extra. |
> | nome           | String: 50 | Nome do campo extra.                |
> | tipo | String| (“0”) Texto livre, (“1”) data, ("2") numérico, ("3") hora, ("4") Lista e ("5") Somente leitura. | 
> | valor_texto    | String: 50 | Retorna um texto se o campo for do tipo texto ou somente leitura. |
> | valor_data     | String | Retorna uma data se o campo for do tipo data. |
> | valor_decimal  | Double | Retorna um Double se o campo for do tipo numérico. |
> | valor_hora     | String | Retorna uma hora o valor se o campo for do tipo texto. |
> | valor_lista    | List  | Retorna uma lista de Ids e valores dos itens da lista, ex: [[1, "sp"], [2, "sc"]]. |
> | valor          | | O tipo deste atributo depente do tipo do campo extra como descrito na tabela abaixo. |
> 
> | Tipo do campo extra | Tipo      | Formato|
> | --------------------| ----------|--------|
> | Texto simples("0") | String: 50| |
> | Data("1") | String | "yyyy-dd-mm", ex: "2018-21-02". |
> | Numérico("2") | Double | Valor máximo: 99999999.99999. |
> | Hora("3") | String | "HH:mm",  ex: "21:56".|
> | Lista("4") | List | Retorna uma lista de Ids e valores dos itens da lista, ex: [[1, "sp"], [2, "sc"]]. |
> | Somente leitura("5") | String: 50| |
> 
> #### Estrutura de Envio de Campos extras do pedido
> 
> Obs: os campos extras cadastrados que não forem enviados serão salvo como vazio.
> 
> | Campo          | Tipo       | Descrição                           |
> |----------------|------------|-------------------------------------|
> | id             | Integer    | Identificador único do campo extra. |
> | valor          | | O tipo deste atributo depente do tipo do campo extra como descrito na tabela abaixo.|
> 
> | Tipo do campo extra | Tipo      | Formato|
> | --------------------| ----------|--------|
> | Texto simples("0") | String: 50| |
> | Data("1") | String | "yyyy-dd-mm", ex: "2018-21-02" |
> | Numérico("2") | Double | Valor máximo: 99999999.99999 |
> | Hora("3") | String | "HH:mm",  ex: "21:56"|
> | Lista("4") | List: int | Lista de ids dos itens selecionados, se atributo lista_multipla for verdadeiro pode ser enviado mais de 1 id na lista. |
> | Somente leitura("5") | String: 50| |
> 
> #### Estrutura de Retorno do Endereço de entrega
> 
> | Campo       | Tipo        | Descrição                                                                                       |
> |-------------|-------------|-------------------------------------------------------------------------------------------------|
> | id          | Integer     | Identificador único do endereço. Este identificador é o mesmo de endereço adicional de cliente. |
> | cep         | String: 8   | CEP da localização do endereço                                                                  |
> | endereco    | String: 200 | Endereço ou rua                                                                                 |
> | numero      | String: 100 | Número do local                                                                                 |
> | complemento | String: 200 | Complementos do endereço                                                                        |
> | bairro      | String: 200 | Bairro do endereço                                                                              |
> | cidade      | String: 200 | Cidade do endereço                                                                              |
> | estado      | String: 2   | Estado da cidade                                                                                |


```javascript
function alterarUmPedido(id, contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do Pedido no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new AlterarUmPedidoRequest({"key":"value"});

    controller.alterarUmPedido(id, contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="get_obter_todos_os_pedidos1"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodosOsPedidos1") getObterTodosOsPedidos1

> A entidade Pedidos engloba tanto pedidos realizados quanto orçamentos pendentes.
> 
> O que diferencia um orçamento de um pedido efetivado é a propriedade status, que pode ser consultado
> usando GET EX: *https://app.mercos.com/api/v2/pedidos/?alterado_apos=2019-03-01%2007:21:44&status=2*
> 
> ### O que mudou da v1 para a v2
> 
> **GET:**
> 
> - O campo "items" foi renomeado para "itens".
> 
> - O campo "descontos" foi removido.
> 
> - O campo "preco_bruto" foi renomeado para "preco_tabela".
> 
> - Nos campos "descontos_de_promocoes" e "descontos_de_politicas" é retornada uma lista contendo o ID da regra e o percentual de desconto.
> 
> **POST:**
> 
> - O campo "descontos" foi renomeado para "descontos_do_vendedor".
> 
> - Os campos "descontos_de_promocoes" e "descontos_de_politicas" foram acrescentados.
> 
> - O campo "preco_bruto" foi renomeado para "preco_tabela".
> 
> - Os IDs dos itens criados são retornados no corpo da resposta.
> 
> **PUT:**
> 
> - O campo "descontos" foi renomeado para "descontos_do_vendedor".
> 
> - Os campos "descontos_de_promocoes" e "descontos_de_politicas" foram acrescentados.
> 
> - O campo "preco_bruto" foi renomeado para "preco_tabela".
> 
> - Os IDs dos itens criados ou atualizados são retornados no corpo da resposta.
> 
> #### Estrutura de Retorno do Pedido
> 
> | Campo                      | Tipo        | Descrição                                                                                                            |
> |----------------------------|-------------|----------------------------------------------------------------------------------------------------------------------|
> | id                         | Integer     | Identificador único.                                                                                                 |
> | cliente_id                 | Integer     | Identificador único do cliente.                                                                                      |
> | cliente_razao_social       | String: 100 | Razão social do cliente                                                                                              |
> | cliente_nome_fantasia      | String: 100 | Nome fantasia do cliente                                                                                             |
> | cliente_cnpj               | String: 14  | CNPJ do cliente                                                                                                      |
> | cliente_inscricao_estadual | String: 30  | Inscrição estadual do cliente                                                                                        |
> | cliente_rua                | String: 100 | Rua do cliente                                                                                                       |
> | cliente_numero             | String: 100 | Número do endereço do cliente                                                                                                     |
> | cliente_complemento        | String: 50  | Complemento do cliente                                                                                               |
> | cliente_cep                | String: 8   | CEP do cliente                                                                                                       |
> | cliente_bairro             | String: 30  | Bairro do cliente                                                                                                    |
> | cliente_cidade             | String: 50  | Cidade do cliente                                                                                                    |
> | cliente_estado             | String: 2   | Estado do cliente                                                                                                    |
> | cliente_suframa            | String: 20  | Suframa do cliente                                                                                                   |
> | representada_id            | Integer     | ID da Representada                                                                                                   |
> | representada_nome_fantasia | String: 50  | Nome fantasia da Representada                                                                                        |
> | representada_razao_social  | String: 50  | Razão Social da Representada                                                                                         |
> | transportadora_id          | Integer     | Identificador único da transportadora.                                                                               |
> | criador_id                 | Integer     | Identificador único do vendedor que fez o pedido.                                                                    |
> | nome_contato               | String: 50  | Nome do contato do cliente.                                                                                          |
> | status                     | String: 1   | Status atual do pedido. 0 = Cancelado, 1 = Orçamento, 2 = Pedido.                                                    |
> | numero                     | Integer     | Número auto-incremental do pedido.                                                                                   |
> | total                      | Double      | Valor total do pedido.                                                                                               |
> | condicao_pagamento         | String: 100 | Condição de pagamento em formato texto livre.É usado apenas caso você não integre a entidade Condições de Pagamento. |
> | condicao_pagamento_id      | Integer     | Identificador único da condição de pagamento.É usado apenas caso você integre a entidade Condições de Pagamento.     |
> | tipo_pedido_id             | Integer     | Identificador único do tipo de pedido.É usado apenas caso você integre a entidade Tipo de Pedido.                    |
> | forma_pagamento_id         | Integer     | Identificador único da forma de pagamento.É usado apenas caso você integre a entidade Formas de Pagamento.           |
> | data_emissao               | Date        | Data de emissão do pedido. Pode ser null.                                                                            |
> | observacoes                | String: 500 | Informações adicionais que o vendedor registrou no pedido.
> | status_custom_id           | Integer     | Identificador único do status de pedido customizado. É usado apenas caso você integre a entidade Status de Pedido Customizado.|
> | status_b2b                 | Integer     | Status atual do pedido no B2b. null = Pedido não foi gerado com o B2B, 1 = Em aberto, 2 = Concluído.                 |
> 
> #### Estrutura de Retorno do Item do pedido
> 
> | Campo                   | Tipo        | Descrição                                                                                                                                                                                                                                                                         |
> |-------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                      | Integer     | Identificador único do item do pedido.                                                                                                                                                                                                                                                              |
> | produto_id              | Integer     | ID do produto na Mercos.                                                                                                                                                                                                                                                          |
> | produto_codigo          | String: 50  | Código do Produto na Mercos.                                                                                                                                                                                                                                                      |
> | produto_nome            | String: 100 | Nome do Produto na Mercos.                                                                                                                                                                                                                                                        |
> | tabela_preco_id         | Integer     | ID da tabela de preço na Mercos. Caso tenha sido utilizado o preço padrão (campo “preco_tabela” da entidade Produto), a tabela_preco_id será null.                                                                                                                                |
> | quantidade              | Double      | Quantidade vendida.                                                                                                                                                                                                                                                               |
> | preco_tabela            | Double      | Preço padrão do produto no momento da venda (campo “preco_tabela” da entidade Produto) ou caso tenha sido utilizada uma tabela de preço (tabela_preco_id diferente de null) será o valor da tabela de preço utilizada.                                                            |
> | preco_liquido           | Double      | Preço de venda do produto.                                                                                                                                                                                                                                                        |
> | cotacao_moeda           | Double      | Cotação da moeda, em caso de venda em moeda estrangeira.                                                                                                                                                                                                                          |
> | quantidade_grades       | List        | Lista com as grades de cores e tamanhos usadas, e suas respectivas quantidades. Caso o produto possua somente Cor, o Tamanho será null, e vice-versa. A soma das quantidades nesta lista será igual ao campo quantidade do item.cor String: 15tamanho String: 15quantidade Double |
> | descontos_do_vendedor   | List        | Lista com os descontos concedidos pelo vendedor ao item, em formato Double.                                                                                                                                                                                                       |
> | descontos_de_promocoes  | List        | Lista com os descontos de promoções aplicadas ao item, cada elemento da lista é um objeto no formato: ```{"regra_id": Integer, "desconto": Double}```                                                                                                                             |
> | descontos_de_politicas  | List        | Lista com os acréscimos ou descontos de políticas comerciais aplicadas ao item, cada elemento da lista é um objeto no formato: ```{"regra_id": Integer, "desconto": Double} ``` *Um acréscimo é identificado por um desconto com valor negativo.*                                                  |
> | observacoes             | String: 500 | Informações adicionais que o vendedor registrou no item.                                                                                                                                                                                                                          |
> | excluido                | Boolean     | Indica se o item está excluído.                                                                                                                                                                                                                                                   |
> | ipi                     | Double      | Valor do IPI do produto                                                                                                                                                                                                                                                           |
> | tipo_ipi                | Char        | Indica se o IPI é percentual P ou valor fixo V                                                                                                                                                                                                                                    |
> | st                      | Double      | Valor da ST (Substituição Tributária)                                                                                                                                                                                                                                             |
> | subtotal                | Double      | Subtotal final calculado                                                                                                                                                                                                                                                          |
> 
> #### Estrutura de Retorno de Campos extras do pedido
> 
> | Campo          | Tipo       | Descrição                           |
> |----------------|------------|-------------------------------------|
> | campo_extra_id | Integer    | Identificador único do campo extra. |
> | nome           | String: 50 | Nome do campo extra.                |
> | tipo | String| (“0”) Texto livre, (“1”) data, ("2") numérico, ("3") hora, ("4") Lista e ("5") Somente leitura. |
> | valor_texto    | String: 50 | Retorna um texto se o campo for do tipo texto ou somente leitura. |
> | valor_data     | String | Retorna uma data se o campo for do tipo data. |
> | valor_decimal  | Double | Retorna um Double se o campo for do tipo numérico. |
> | valor_hora     | String | Retorna uma hora o valor se o campo for do tipo texto. |
> | valor_lista    | List  | Retorna uma lista de Ids e valores dos itens da lista, ex: [[1, "sp"], [2, "sc"]]. |
> | valor          | | O tipo deste atributo depente do tipo do campo extra como descrito na tabela abaixo. |
> 
> | Tipo do campo extra | Tipo      | Formato|
> | --------------------| ----------|--------|
> | Texto simples("0") | String: 50| |
> | Data("1") | String | "yyyy-dd-mm", ex: "2018-21-02". |
> | Numérico("2") | Double | Valor máximo: 99999999.99999. |
> | Hora("3") | String | "HH:mm",  ex: "21:56".|
> | Lista("4") | List | Retorna uma lista de Ids e valores dos itens da lista, ex: [[1, "sp"], [2, "sc"]]. |
> | Somente leitura("5") | String: 50| |
> 
> #### Estrutura de Envio de Campos extras do pedido
> 
> Obs: os campos extras cadastrados que não forem enviados serão salvo como vazio.
> 
> | Campo          | Tipo       | Descrição                           |
> |----------------|------------|-------------------------------------|
> | id             | Integer    | Identificador único do campo extra. |
> | valor          |            | O tipo deste atributo depente do tipo do campo extra como descrito na tabela abaixo.|
> 
> | Tipo do campo extra | Tipo      | Formato|
> | --------------------| ----------|--------|
> | Texto simples("0") | String: 50| |
> | Data("1") | String | "yyyy-dd-mm", ex: "2018-21-02" |
> | Numérico("2") | Double | Valor máximo: 99999999.99999 |
> | Hora("3") | String | "HH:mm",  ex: "21:56"|
> | Lista("4") | List: int | Lista de ids dos itens selecionados, se atributo lista_multipla for verdadeiro pode ser enviado mais de 1 id na lista. |
> | Somente leitura("5") | String: 50| |
> 
> #### Estrutura de Retorno do Endereço de entrega
> 
> | Campo       | Tipo        | Descrição                                                                                       |
> |-------------|-------------|-------------------------------------------------------------------------------------------------|
> | id          | Integer     | Identificador único do endereço. Este identificador é o mesmo de endereço adicional de cliente. |
> | cep         | String: 8   | CEP da localização do endereço                                                                  |
> | endereco    | String: 200 | Endereço ou rua                                                                                 |
> | numero      | String: 100 | Número do local                                                                                 |
> | complemento | String: 200 | Complementos do endereço                                                                        |
> | bairro      | String: 200 | Bairro do endereço                                                                              |
> | cidade      | String: 200 | Cidade do endereço                                                                              |
> | estado      | String: 2   | Estado da cidade                                                                                |


```javascript
function getObterTodosOsPedidos1(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodosOsPedidos1(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_um_pedido_espec_fico1"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterUmPedidoEspecFico1") getObterUmPedidoEspecFico1

> A entidade Pedidos engloba tanto pedidos realizados quanto orçamentos pendentes.
> 
> O que diferencia um orçamento de um pedido efetivado é a propriedade status, que pode ser consultado
> usando GET EX: *https://app.mercos.com/api/v2/pedidos/?alterado_apos=2019-03-01%2007:21:44&status=2*
> 
> ### O que mudou da v1 para a v2
> 
> **GET:**
> 
> - O campo "items" foi renomeado para "itens".
> 
> - O campo "descontos" foi removido.
> 
> - O campo "preco_bruto" foi renomeado para "preco_tabela".
> 
> - Nos campos "descontos_de_promocoes" e "descontos_de_politicas" é retornada uma lista contendo o ID da regra e o percentual de desconto.
> 
> **POST:**
> 
> - O campo "descontos" foi renomeado para "descontos_do_vendedor".
> 
> - Os campos "descontos_de_promocoes" e "descontos_de_politicas" foram acrescentados.
> 
> - O campo "preco_bruto" foi renomeado para "preco_tabela".
> 
> - Os IDs dos itens criados são retornados no corpo da resposta.
> 
> **PUT:**
> 
> - O campo "descontos" foi renomeado para "descontos_do_vendedor".
> 
> - Os campos "descontos_de_promocoes" e "descontos_de_politicas" foram acrescentados.
> 
> - O campo "preco_bruto" foi renomeado para "preco_tabela".
> 
> - Os IDs dos itens criados ou atualizados são retornados no corpo da resposta.
> 
> #### Estrutura de Retorno do Pedido
> 
> | Campo                      | Tipo        | Descrição                                                                                                            |
> |----------------------------|-------------|----------------------------------------------------------------------------------------------------------------------|
> | id                         | Integer     | Identificador único.                                                                                                 |
> | cliente_id                 | Integer     | Identificador único do cliente.                                                                                      |
> | cliente_razao_social       | String: 100 | Razão social do cliente                                                                                              |
> | cliente_nome_fantasia      | String: 100 | Nome fantasia do cliente                                                                                             |
> | cliente_cnpj               | String: 14  | CNPJ do cliente                                                                                                      |
> | cliente_inscricao_estadual | String: 30  | Inscrição estadual do cliente                                                                                        |
> | cliente_rua                | String: 100 | Rua do cliente                                                                                                       |
> | cliente_numero             | String: 100 | Número do endereço do cliente                                                                                                     |
> | cliente_complemento        | String: 50  | Complemento do cliente                                                                                               |
> | cliente_cep                | String: 8   | CEP do cliente                                                                                                       |
> | cliente_bairro             | String: 30  | Bairro do cliente                                                                                                    |
> | cliente_cidade             | String: 50  | Cidade do cliente                                                                                                    |
> | cliente_estado             | String: 2   | Estado do cliente                                                                                                    |
> | cliente_suframa            | String: 20  | Suframa do cliente                                                                                                   |
> | representada_id            | Integer     | ID da Representada                                                                                                   |
> | representada_nome_fantasia | String: 50  | Nome fantasia da Representada                                                                                        |
> | representada_razao_social  | String: 50  | Razão Social da Representada                                                                                         |
> | transportadora_id          | Integer     | Identificador único da transportadora.                                                                               |
> | criador_id                 | Integer     | Identificador único do vendedor que fez o pedido.                                                                    |
> | nome_contato               | String: 50  | Nome do contato do cliente.                                                                                          |
> | status                     | String: 1   | Status atual do pedido. 0 = Cancelado, 1 = Orçamento, 2 = Pedido.                                                    |
> | numero                     | Integer     | Número auto-incremental do pedido.                                                                                   |
> | total                      | Double      | Valor total do pedido.                                                                                               |
> | condicao_pagamento         | String: 100 | Condição de pagamento em formato texto livre.É usado apenas caso você não integre a entidade Condições de Pagamento. |
> | condicao_pagamento_id      | Integer     | Identificador único da condição de pagamento.É usado apenas caso você integre a entidade Condições de Pagamento.     |
> | tipo_pedido_id             | Integer     | Identificador único do tipo de pedido.É usado apenas caso você integre a entidade Tipo de Pedido.                    |
> | forma_pagamento_id         | Integer     | Identificador único da forma de pagamento.É usado apenas caso você integre a entidade Formas de Pagamento.           |
> | data_emissao               | Date        | Data de emissão do pedido. Pode ser null.                                                                            |
> | observacoes                | String: 500 | Informações adicionais que o vendedor registrou no pedido.
> | status_custom_id           | Integer     | Identificador único do status de pedido customizado. É usado apenas caso você integre a entidade Status de Pedido Customizado.|
> | status_b2b                 | Integer     | Status atual do pedido no B2b. null = Pedido não foi gerado com o B2B, 1 = Em aberto, 2 = Concluído.                 |
> 
> #### Estrutura de Retorno do Item do pedido
> 
> | Campo                   | Tipo        | Descrição                                                                                                                                                                                                                                                                         |
> |-------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                      | Integer     | Identificador único do item do pedido.                                                                                                                                                                                                                                                              |
> | produto_id              | Integer     | ID do produto na Mercos.                                                                                                                                                                                                                                                          |
> | produto_codigo          | String: 50  | Código do Produto na Mercos.                                                                                                                                                                                                                                                      |
> | produto_nome            | String: 100 | Nome do Produto na Mercos.                                                                                                                                                                                                                                                        |
> | tabela_preco_id         | Integer     | ID da tabela de preço na Mercos. Caso tenha sido utilizado o preço padrão (campo “preco_tabela” da entidade Produto), a tabela_preco_id será null.                                                                                                                                |
> | quantidade              | Double      | Quantidade vendida.                                                                                                                                                                                                                                                               |
> | preco_tabela            | Double      | Preço padrão do produto no momento da venda (campo “preco_tabela” da entidade Produto) ou caso tenha sido utilizada uma tabela de preço (tabela_preco_id diferente de null) será o valor da tabela de preço utilizada.                                                            |
> | preco_liquido           | Double      | Preço de venda do produto.                                                                                                                                                                                                                                                        |
> | cotacao_moeda           | Double      | Cotação da moeda, em caso de venda em moeda estrangeira.                                                                                                                                                                                                                          |
> | quantidade_grades       | List        | Lista com as grades de cores e tamanhos usadas, e suas respectivas quantidades. Caso o produto possua somente Cor, o Tamanho será null, e vice-versa. A soma das quantidades nesta lista será igual ao campo quantidade do item.cor String: 15tamanho String: 15quantidade Double |
> | descontos_do_vendedor   | List        | Lista com os descontos concedidos pelo vendedor ao item, em formato Double.                                                                                                                                                                                                       |
> | descontos_de_promocoes  | List        | Lista com os descontos de promoções aplicadas ao item, cada elemento da lista é um objeto no formato: ```{"regra_id": Integer, "desconto": Double}```                                                                                                                             |
> | descontos_de_politicas  | List        | Lista com os acréscimos ou descontos de políticas comerciais aplicadas ao item, cada elemento da lista é um objeto no formato: ```{"regra_id": Integer, "desconto": Double} ``` *Um acréscimo é identificado por um desconto com valor negativo.*                                                  |
> | observacoes             | String: 500 | Informações adicionais que o vendedor registrou no item.                                                                                                                                                                                                                          |
> | excluido                | Boolean     | Indica se o item está excluído.                                                                                                                                                                                                                                                   |
> | ipi                     | Double      | Valor do IPI do produto                                                                                                                                                                                                                                                           |
> | tipo_ipi                | Char        | Indica se o IPI é percentual P ou valor fixo V                                                                                                                                                                                                                                    |
> | st                      | Double      | Valor da ST (Substituição Tributária)                                                                                                                                                                                                                                             |
> | subtotal                | Double      | Subtotal final calculado                                                                                                                                                                                                                                                          |
> 
> #### Estrutura de Retorno de Campos extras do pedido
> 
> | Campo          | Tipo       | Descrição                           |
> |----------------|------------|-------------------------------------|
> | campo_extra_id | Integer    | Identificador único do campo extra. |
> | nome           | String: 50 | Nome do campo extra.                |
> | tipo | String| (“0”) Texto livre, (“1”) data, ("2") numérico, ("3") hora, ("4") Lista e ("5") Somente leitura. |
> | valor_texto    | String: 50 | Retorna um texto se o campo for do tipo texto ou somente leitura. |
> | valor_data     | String | Retorna uma data se o campo for do tipo data. |
> | valor_decimal  | Double | Retorna um Double se o campo for do tipo numérico. |
> | valor_hora     | String | Retorna uma hora o valor se o campo for do tipo texto. |
> | valor_lista    | List  | Retorna uma lista de Ids e valores dos itens da lista, ex: [[1, "sp"], [2, "sc"]]. |
> | valor          | | O tipo deste atributo depente do tipo do campo extra como descrito na tabela abaixo. |
> 
> | Tipo do campo extra | Tipo      | Formato|
> | --------------------| ----------|--------|
> | Texto simples("0") | String: 50| |
> | Data("1") | String | "yyyy-dd-mm", ex: "2018-21-02". |
> | Numérico("2") | Double | Valor máximo: 99999999.99999. |
> | Hora("3") | String | "HH:mm",  ex: "21:56".|
> | Lista("4") | List | Retorna uma lista de Ids e valores dos itens da lista, ex: [[1, "sp"], [2, "sc"]]. |
> | Somente leitura("5") | String: 50| |
> 
> #### Estrutura de Envio de Campos extras do pedido
> 
> Obs: os campos extras cadastrados que não forem enviados serão salvo como vazio.
> 
> | Campo          | Tipo       | Descrição                           |
> |----------------|------------|-------------------------------------|
> | id             | Integer    | Identificador único do campo extra. |
> | valor          |            | O tipo deste atributo depente do tipo do campo extra como descrito na tabela abaixo.|
> 
> | Tipo do campo extra | Tipo      | Formato|
> | --------------------| ----------|--------|
> | Texto simples("0") | String: 50| |
> | Data("1") | String | "yyyy-dd-mm", ex: "2018-21-02" |
> | Numérico("2") | Double | Valor máximo: 99999999.99999 |
> | Hora("3") | String | "HH:mm",  ex: "21:56"|
> | Lista("4") | List: int | Lista de ids dos itens selecionados, se atributo lista_multipla for verdadeiro pode ser enviado mais de 1 id na lista. |
> | Somente leitura("5") | String: 50| |
> 
> #### Estrutura de Retorno do Endereço de entrega
> 
> | Campo       | Tipo        | Descrição                                                                                       |
> |-------------|-------------|-------------------------------------------------------------------------------------------------|
> | id          | Integer     | Identificador único do endereço. Este identificador é o mesmo de endereço adicional de cliente. |
> | cep         | String: 8   | CEP da localização do endereço                                                                  |
> | endereco    | String: 200 | Endereço ou rua                                                                                 |
> | numero      | String: 100 | Número do local                                                                                 |
> | complemento | String: 200 | Complementos do endereço                                                                        |
> | bairro      | String: 200 | Bairro do endereço                                                                              |
> | cidade      | String: 200 | Cidade do endereço                                                                              |
> | estado      | String: 2   | Estado da cidade                                                                                |


```javascript
function getObterUmPedidoEspecFico1(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do Pedido no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterUmPedidoEspecFico1(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="create_incluir_um_pedido1"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createIncluirUmPedido1") createIncluirUmPedido1

> A entidade Pedidos engloba tanto pedidos realizados quanto orçamentos pendentes.
> 
> O que diferencia um orçamento de um pedido efetivado é a propriedade status, que pode ser consultado
> usando GET EX: *https://app.mercos.com/api/v2/pedidos/?alterado_apos=2019-03-01%2007:21:44&status=2*
> 
> ### O que mudou da v1 para a v2
> 
> **GET:**
> 
> - O campo "items" foi renomeado para "itens".
> 
> - O campo "descontos" foi removido.
> 
> - O campo "preco_bruto" foi renomeado para "preco_tabela".
> 
> - Nos campos "descontos_de_promocoes" e "descontos_de_politicas" é retornada uma lista contendo o ID da regra e o percentual de desconto.
> 
> **POST:**
> 
> - O campo "descontos" foi renomeado para "descontos_do_vendedor".
> 
> - Os campos "descontos_de_promocoes" e "descontos_de_politicas" foram acrescentados.
> 
> - O campo "preco_bruto" foi renomeado para "preco_tabela".
> 
> - Os IDs dos itens criados são retornados no corpo da resposta.
> 
> **PUT:**
> 
> - O campo "descontos" foi renomeado para "descontos_do_vendedor".
> 
> - Os campos "descontos_de_promocoes" e "descontos_de_politicas" foram acrescentados.
> 
> - O campo "preco_bruto" foi renomeado para "preco_tabela".
> 
> - Os IDs dos itens criados ou atualizados são retornados no corpo da resposta.
> 
> #### Estrutura de Retorno do Pedido
> 
> | Campo                      | Tipo        | Descrição                                                                                                            |
> |----------------------------|-------------|----------------------------------------------------------------------------------------------------------------------|
> | id                         | Integer     | Identificador único.                                                                                                 |
> | cliente_id                 | Integer     | Identificador único do cliente.                                                                                      |
> | cliente_razao_social       | String: 100 | Razão social do cliente                                                                                              |
> | cliente_nome_fantasia      | String: 100 | Nome fantasia do cliente                                                                                             |
> | cliente_cnpj               | String: 14  | CNPJ do cliente                                                                                                      |
> | cliente_inscricao_estadual | String: 30  | Inscrição estadual do cliente                                                                                        |
> | cliente_rua                | String: 100 | Rua do cliente                                                                                                       |
> | cliente_numero             | String: 100 | Número do endereço do cliente                                                                                                     |
> | cliente_complemento        | String: 50  | Complemento do cliente                                                                                               |
> | cliente_cep                | String: 8   | CEP do cliente                                                                                                       |
> | cliente_bairro             | String: 30  | Bairro do cliente                                                                                                    |
> | cliente_cidade             | String: 50  | Cidade do cliente                                                                                                    |
> | cliente_estado             | String: 2   | Estado do cliente                                                                                                    |
> | cliente_suframa            | String: 20  | Suframa do cliente                                                                                                   |
> | representada_id            | Integer     | ID da Representada                                                                                                   |
> | representada_nome_fantasia | String: 50  | Nome fantasia da Representada                                                                                        |
> | representada_razao_social  | String: 50  | Razão Social da Representada                                                                                         |
> | transportadora_id          | Integer     | Identificador único da transportadora.                                                                               |
> | criador_id                 | Integer     | Identificador único do vendedor que fez o pedido.                                                                    |
> | nome_contato               | String: 50  | Nome do contato do cliente.                                                                                          |
> | status                     | String: 1   | Status atual do pedido. 0 = Cancelado, 1 = Orçamento, 2 = Pedido.                                                    |
> | numero                     | Integer     | Número auto-incremental do pedido.                                                                                   |
> | total                      | Double      | Valor total do pedido.                                                                                               |
> | condicao_pagamento         | String: 100 | Condição de pagamento em formato texto livre.É usado apenas caso você não integre a entidade Condições de Pagamento. |
> | condicao_pagamento_id      | Integer     | Identificador único da condição de pagamento.É usado apenas caso você integre a entidade Condições de Pagamento.     |
> | tipo_pedido_id             | Integer     | Identificador único do tipo de pedido.É usado apenas caso você integre a entidade Tipo de Pedido.                    |
> | forma_pagamento_id         | Integer     | Identificador único da forma de pagamento.É usado apenas caso você integre a entidade Formas de Pagamento.           |
> | data_emissao               | Date        | Data de emissão do pedido. Pode ser null.                                                                            |
> | observacoes                | String: 500 | Informações adicionais que o vendedor registrou no pedido.
> | status_custom_id           | Integer     | Identificador único do status de pedido customizado. É usado apenas caso você integre a entidade Status de Pedido Customizado.|
> | status_b2b                 | Integer     | Status atual do pedido no B2b. null = Pedido não foi gerado com o B2B, 1 = Em aberto, 2 = Concluído.                 |
> 
> #### Estrutura de Retorno do Item do pedido
> 
> | Campo                   | Tipo        | Descrição                                                                                                                                                                                                                                                                         |
> |-------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                      | Integer     | Identificador único do item do pedido.                                                                                                                                                                                                                                                              |
> | produto_id              | Integer     | ID do produto na Mercos.                                                                                                                                                                                                                                                          |
> | produto_codigo          | String: 50  | Código do Produto na Mercos.                                                                                                                                                                                                                                                      |
> | produto_nome            | String: 100 | Nome do Produto na Mercos.                                                                                                                                                                                                                                                        |
> | tabela_preco_id         | Integer     | ID da tabela de preço na Mercos. Caso tenha sido utilizado o preço padrão (campo “preco_tabela” da entidade Produto), a tabela_preco_id será null.                                                                                                                                |
> | quantidade              | Double      | Quantidade vendida.                                                                                                                                                                                                                                                               |
> | preco_tabela            | Double      | Preço padrão do produto no momento da venda (campo “preco_tabela” da entidade Produto) ou caso tenha sido utilizada uma tabela de preço (tabela_preco_id diferente de null) será o valor da tabela de preço utilizada.                                                            |
> | preco_liquido           | Double      | Preço de venda do produto.                                                                                                                                                                                                                                                        |
> | cotacao_moeda           | Double      | Cotação da moeda, em caso de venda em moeda estrangeira.                                                                                                                                                                                                                          |
> | quantidade_grades       | List        | Lista com as grades de cores e tamanhos usadas, e suas respectivas quantidades. Caso o produto possua somente Cor, o Tamanho será null, e vice-versa. A soma das quantidades nesta lista será igual ao campo quantidade do item.cor String: 15tamanho String: 15quantidade Double |
> | descontos_do_vendedor   | List        | Lista com os descontos concedidos pelo vendedor ao item, em formato Double.                                                                                                                                                                                                       |
> | descontos_de_promocoes  | List        | Lista com os descontos de promoções aplicadas ao item, cada elemento da lista é um objeto no formato: ```{"regra_id": Integer, "desconto": Double}```                                                                                                                             |
> | descontos_de_politicas  | List        | Lista com os acréscimos ou descontos de políticas comerciais aplicadas ao item, cada elemento da lista é um objeto no formato: ```{"regra_id": Integer, "desconto": Double} ``` *Um acréscimo é identificado por um desconto com valor negativo.*                                                  |
> | observacoes             | String: 500 | Informações adicionais que o vendedor registrou no item.                                                                                                                                                                                                                          |
> | excluido                | Boolean     | Indica se o item está excluído.                                                                                                                                                                                                                                                   |
> | ipi                     | Double      | Valor do IPI do produto                                                                                                                                                                                                                                                           |
> | tipo_ipi                | Char        | Indica se o IPI é percentual P ou valor fixo V                                                                                                                                                                                                                                    |
> | st                      | Double      | Valor da ST (Substituição Tributária)                                                                                                                                                                                                                                             |
> | subtotal                | Double      | Subtotal final calculado                                                                                                                                                                                                                                                          |
> 
> #### Estrutura de Retorno de Campos extras do pedido
> 
> | Campo          | Tipo       | Descrição                           |
> |----------------|------------|-------------------------------------|
> | campo_extra_id | Integer    | Identificador único do campo extra. |
> | nome           | String: 50 | Nome do campo extra.                |
> | tipo | String| (“0”) Texto livre, (“1”) data, ("2") numérico, ("3") hora, ("4") Lista e ("5") Somente leitura. |
> | valor_texto    | String: 50 | Retorna um texto se o campo for do tipo texto ou somente leitura. |
> | valor_data     | String | Retorna uma data se o campo for do tipo data. |
> | valor_decimal  | Double | Retorna um Double se o campo for do tipo numérico. |
> | valor_hora     | String | Retorna uma hora o valor se o campo for do tipo texto. |
> | valor_lista    | List  | Retorna uma lista de Ids e valores dos itens da lista, ex: [[1, "sp"], [2, "sc"]]. |
> | valor          | | O tipo deste atributo depente do tipo do campo extra como descrito na tabela abaixo. |
> 
> | Tipo do campo extra | Tipo      | Formato|
> | --------------------| ----------|--------|
> | Texto simples("0") | String: 50| |
> | Data("1") | String | "yyyy-dd-mm", ex: "2018-21-02". |
> | Numérico("2") | Double | Valor máximo: 99999999.99999. |
> | Hora("3") | String | "HH:mm",  ex: "21:56".|
> | Lista("4") | List | Retorna uma lista de Ids e valores dos itens da lista, ex: [[1, "sp"], [2, "sc"]]. |
> | Somente leitura("5") | String: 50| |
> 
> #### Estrutura de Envio de Campos extras do pedido
> 
> Obs: os campos extras cadastrados que não forem enviados serão salvo como vazio.
> 
> | Campo          | Tipo       | Descrição                           |
> |----------------|------------|-------------------------------------|
> | id             | Integer    | Identificador único do campo extra. |
> | valor          |            | O tipo deste atributo depente do tipo do campo extra como descrito na tabela abaixo.|
> 
> | Tipo do campo extra | Tipo      | Formato|
> | --------------------| ----------|--------|
> | Texto simples("0") | String: 50| |
> | Data("1") | String | "yyyy-dd-mm", ex: "2018-21-02" |
> | Numérico("2") | Double | Valor máximo: 99999999.99999 |
> | Hora("3") | String | "HH:mm",  ex: "21:56"|
> | Lista("4") | List: int | Lista de ids dos itens selecionados, se atributo lista_multipla for verdadeiro pode ser enviado mais de 1 id na lista. |
> | Somente leitura("5") | String: 50| |
> 
> #### Estrutura de Retorno do Endereço de entrega
> 
> | Campo       | Tipo        | Descrição                                                                                       |
> |-------------|-------------|-------------------------------------------------------------------------------------------------|
> | id          | Integer     | Identificador único do endereço. Este identificador é o mesmo de endereço adicional de cliente. |
> | cep         | String: 8   | CEP da localização do endereço                                                                  |
> | endereco    | String: 200 | Endereço ou rua                                                                                 |
> | numero      | String: 100 | Número do local                                                                                 |
> | complemento | String: 200 | Complementos do endereço                                                                        |
> | bairro      | String: 200 | Bairro do endereço                                                                              |
> | cidade      | String: 200 | Cidade do endereço                                                                              |
> | estado      | String: 2   | Estado da cidade                                                                                |


```javascript
function createIncluirUmPedido1(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new IncluirUmPedidoRequest2({"key":"value"});

    controller.createIncluirUmPedido1(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="alterar_um_pedido1"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarUmPedido1") alterarUmPedido1

> A entidade Pedidos engloba tanto pedidos realizados quanto orçamentos pendentes.
> 
> O que diferencia um orçamento de um pedido efetivado é a propriedade status, que pode ser consultado
> usando GET EX: *https://app.mercos.com/api/v2/pedidos/?alterado_apos=2019-03-01%2007:21:44&status=2*
> 
> ### O que mudou da v1 para a v2
> 
> **GET:**
> 
> - O campo "items" foi renomeado para "itens".
> 
> - O campo "descontos" foi removido.
> 
> - O campo "preco_bruto" foi renomeado para "preco_tabela".
> 
> - Nos campos "descontos_de_promocoes" e "descontos_de_politicas" é retornada uma lista contendo o ID da regra e o percentual de desconto.
> 
> **POST:**
> 
> - O campo "descontos" foi renomeado para "descontos_do_vendedor".
> 
> - Os campos "descontos_de_promocoes" e "descontos_de_politicas" foram acrescentados.
> 
> - O campo "preco_bruto" foi renomeado para "preco_tabela".
> 
> - Os IDs dos itens criados são retornados no corpo da resposta.
> 
> **PUT:**
> 
> - O campo "descontos" foi renomeado para "descontos_do_vendedor".
> 
> - Os campos "descontos_de_promocoes" e "descontos_de_politicas" foram acrescentados.
> 
> - O campo "preco_bruto" foi renomeado para "preco_tabela".
> 
> - Os IDs dos itens criados ou atualizados são retornados no corpo da resposta.
> 
> #### Estrutura de Retorno do Pedido
> 
> | Campo                      | Tipo        | Descrição                                                                                                            |
> |----------------------------|-------------|----------------------------------------------------------------------------------------------------------------------|
> | id                         | Integer     | Identificador único.                                                                                                 |
> | cliente_id                 | Integer     | Identificador único do cliente.                                                                                      |
> | cliente_razao_social       | String: 100 | Razão social do cliente                                                                                              |
> | cliente_nome_fantasia      | String: 100 | Nome fantasia do cliente                                                                                             |
> | cliente_cnpj               | String: 14  | CNPJ do cliente                                                                                                      |
> | cliente_inscricao_estadual | String: 30  | Inscrição estadual do cliente                                                                                        |
> | cliente_rua                | String: 100 | Rua do cliente                                                                                                       |
> | cliente_numero             | String: 100 | Número do endereço do cliente                                                                                                     |
> | cliente_complemento        | String: 50  | Complemento do cliente                                                                                               |
> | cliente_cep                | String: 8   | CEP do cliente                                                                                                       |
> | cliente_bairro             | String: 30  | Bairro do cliente                                                                                                    |
> | cliente_cidade             | String: 50  | Cidade do cliente                                                                                                    |
> | cliente_estado             | String: 2   | Estado do cliente                                                                                                    |
> | cliente_suframa            | String: 20  | Suframa do cliente                                                                                                   |
> | representada_id            | Integer     | ID da Representada                                                                                                   |
> | representada_nome_fantasia | String: 50  | Nome fantasia da Representada                                                                                        |
> | representada_razao_social  | String: 50  | Razão Social da Representada                                                                                         |
> | transportadora_id          | Integer     | Identificador único da transportadora.                                                                               |
> | criador_id                 | Integer     | Identificador único do vendedor que fez o pedido.                                                                    |
> | nome_contato               | String: 50  | Nome do contato do cliente.                                                                                          |
> | status                     | String: 1   | Status atual do pedido. 0 = Cancelado, 1 = Orçamento, 2 = Pedido.                                                    |
> | numero                     | Integer     | Número auto-incremental do pedido.                                                                                   |
> | total                      | Double      | Valor total do pedido.                                                                                               |
> | condicao_pagamento         | String: 100 | Condição de pagamento em formato texto livre.É usado apenas caso você não integre a entidade Condições de Pagamento. |
> | condicao_pagamento_id      | Integer     | Identificador único da condição de pagamento.É usado apenas caso você integre a entidade Condições de Pagamento.     |
> | tipo_pedido_id             | Integer     | Identificador único do tipo de pedido.É usado apenas caso você integre a entidade Tipo de Pedido.                    |
> | forma_pagamento_id         | Integer     | Identificador único da forma de pagamento.É usado apenas caso você integre a entidade Formas de Pagamento.           |
> | data_emissao               | Date        | Data de emissão do pedido. Pode ser null.                                                                            |
> | observacoes                | String: 500 | Informações adicionais que o vendedor registrou no pedido.
> | status_custom_id           | Integer     | Identificador único do status de pedido customizado. É usado apenas caso você integre a entidade Status de Pedido Customizado.|
> | status_b2b                 | Integer     | Status atual do pedido no B2b. null = Pedido não foi gerado com o B2B, 1 = Em aberto, 2 = Concluído.                 |
> 
> #### Estrutura de Retorno do Item do pedido
> 
> | Campo                   | Tipo        | Descrição                                                                                                                                                                                                                                                                         |
> |-------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                      | Integer     | Identificador único do item do pedido.                                                                                                                                                                                                                                                              |
> | produto_id              | Integer     | ID do produto na Mercos.                                                                                                                                                                                                                                                          |
> | produto_codigo          | String: 50  | Código do Produto na Mercos.                                                                                                                                                                                                                                                      |
> | produto_nome            | String: 100 | Nome do Produto na Mercos.                                                                                                                                                                                                                                                        |
> | tabela_preco_id         | Integer     | ID da tabela de preço na Mercos. Caso tenha sido utilizado o preço padrão (campo “preco_tabela” da entidade Produto), a tabela_preco_id será null.                                                                                                                                |
> | quantidade              | Double      | Quantidade vendida.                                                                                                                                                                                                                                                               |
> | preco_tabela            | Double      | Preço padrão do produto no momento da venda (campo “preco_tabela” da entidade Produto) ou caso tenha sido utilizada uma tabela de preço (tabela_preco_id diferente de null) será o valor da tabela de preço utilizada.                                                            |
> | preco_liquido           | Double      | Preço de venda do produto.                                                                                                                                                                                                                                                        |
> | cotacao_moeda           | Double      | Cotação da moeda, em caso de venda em moeda estrangeira.                                                                                                                                                                                                                          |
> | quantidade_grades       | List        | Lista com as grades de cores e tamanhos usadas, e suas respectivas quantidades. Caso o produto possua somente Cor, o Tamanho será null, e vice-versa. A soma das quantidades nesta lista será igual ao campo quantidade do item.cor String: 15tamanho String: 15quantidade Double |
> | descontos_do_vendedor   | List        | Lista com os descontos concedidos pelo vendedor ao item, em formato Double.                                                                                                                                                                                                       |
> | descontos_de_promocoes  | List        | Lista com os descontos de promoções aplicadas ao item, cada elemento da lista é um objeto no formato: ```{"regra_id": Integer, "desconto": Double}```                                                                                                                             |
> | descontos_de_politicas  | List        | Lista com os acréscimos ou descontos de políticas comerciais aplicadas ao item, cada elemento da lista é um objeto no formato: ```{"regra_id": Integer, "desconto": Double} ``` *Um acréscimo é identificado por um desconto com valor negativo.*                                                  |
> | observacoes             | String: 500 | Informações adicionais que o vendedor registrou no item.                                                                                                                                                                                                                          |
> | excluido                | Boolean     | Indica se o item está excluído.                                                                                                                                                                                                                                                   |
> | ipi                     | Double      | Valor do IPI do produto                                                                                                                                                                                                                                                           |
> | tipo_ipi                | Char        | Indica se o IPI é percentual P ou valor fixo V                                                                                                                                                                                                                                    |
> | st                      | Double      | Valor da ST (Substituição Tributária)                                                                                                                                                                                                                                             |
> | subtotal                | Double      | Subtotal final calculado                                                                                                                                                                                                                                                          |
> 
> #### Estrutura de Retorno de Campos extras do pedido
> 
> | Campo          | Tipo       | Descrição                           |
> |----------------|------------|-------------------------------------|
> | campo_extra_id | Integer    | Identificador único do campo extra. |
> | nome           | String: 50 | Nome do campo extra.                |
> | tipo | String| (“0”) Texto livre, (“1”) data, ("2") numérico, ("3") hora, ("4") Lista e ("5") Somente leitura. |
> | valor_texto    | String: 50 | Retorna um texto se o campo for do tipo texto ou somente leitura. |
> | valor_data     | String | Retorna uma data se o campo for do tipo data. |
> | valor_decimal  | Double | Retorna um Double se o campo for do tipo numérico. |
> | valor_hora     | String | Retorna uma hora o valor se o campo for do tipo texto. |
> | valor_lista    | List  | Retorna uma lista de Ids e valores dos itens da lista, ex: [[1, "sp"], [2, "sc"]]. |
> | valor          | | O tipo deste atributo depente do tipo do campo extra como descrito na tabela abaixo. |
> 
> | Tipo do campo extra | Tipo      | Formato|
> | --------------------| ----------|--------|
> | Texto simples("0") | String: 50| |
> | Data("1") | String | "yyyy-dd-mm", ex: "2018-21-02". |
> | Numérico("2") | Double | Valor máximo: 99999999.99999. |
> | Hora("3") | String | "HH:mm",  ex: "21:56".|
> | Lista("4") | List | Retorna uma lista de Ids e valores dos itens da lista, ex: [[1, "sp"], [2, "sc"]]. |
> | Somente leitura("5") | String: 50| |
> 
> #### Estrutura de Envio de Campos extras do pedido
> 
> Obs: os campos extras cadastrados que não forem enviados serão salvo como vazio.
> 
> | Campo          | Tipo       | Descrição                           |
> |----------------|------------|-------------------------------------|
> | id             | Integer    | Identificador único do campo extra. |
> | valor          |            | O tipo deste atributo depente do tipo do campo extra como descrito na tabela abaixo.|
> 
> | Tipo do campo extra | Tipo      | Formato|
> | --------------------| ----------|--------|
> | Texto simples("0") | String: 50| |
> | Data("1") | String | "yyyy-dd-mm", ex: "2018-21-02" |
> | Numérico("2") | Double | Valor máximo: 99999999.99999 |
> | Hora("3") | String | "HH:mm",  ex: "21:56"|
> | Lista("4") | List: int | Lista de ids dos itens selecionados, se atributo lista_multipla for verdadeiro pode ser enviado mais de 1 id na lista. |
> | Somente leitura("5") | String: 50| |
> 
> #### Estrutura de Retorno do Endereço de entrega
> 
> | Campo       | Tipo        | Descrição                                                                                       |
> |-------------|-------------|-------------------------------------------------------------------------------------------------|
> | id          | Integer     | Identificador único do endereço. Este identificador é o mesmo de endereço adicional de cliente. |
> | cep         | String: 8   | CEP da localização do endereço                                                                  |
> | endereco    | String: 200 | Endereço ou rua                                                                                 |
> | numero      | String: 100 | Número do local                                                                                 |
> | complemento | String: 200 | Complementos do endereço                                                                        |
> | bairro      | String: 200 | Bairro do endereço                                                                              |
> | cidade      | String: 200 | Cidade do endereço                                                                              |
> | estado      | String: 2   | Estado da cidade                                                                                |


```javascript
function alterarUmPedido1(id, contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do Pedido no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new AlterarUmPedidoRequest2({"key":"value"});

    controller.alterarUmPedido1(id, contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="create_cancelar_um_pedido"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createCancelarUmPedido") createCancelarUmPedido

> Este endpoint permite realizar o cancelamento de pedidos.


```javascript
function createCancelarUmPedido(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do Pedido no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.createCancelarUmPedido(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="get_obter_todos_os_status"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodosOsStatus") getObterTodosOsStatus

> A entidade status de pedido permite incluir, alterar e excluir os status que os pedidos no Mercos poderão ter.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo        | Descrição                                                |
> |------------------|-------------|----------------------------------------------------------|
> | id               | Integer     | Identificador único                                      |
> | nome             | String: 100 | Nome do status                                           |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste status no Mercos |
> | excluido         | Boolean     | Indica se o status está excluído                         |


```javascript
function getObterTodosOsStatus(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodosOsStatus(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_status_espec_fico"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterStatusEspecFico") getObterStatusEspecFico

> A entidade status de pedido permite incluir, alterar e excluir os status que os pedidos no Mercos poderão ter.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo        | Descrição                                                |
> |------------------|-------------|----------------------------------------------------------|
> | id               | Integer     | Identificador único                                      |
> | nome             | String: 100 | Nome do status                                           |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste status no Mercos |
> | excluido         | Boolean     | Indica se o status está excluído                         |


```javascript
function getObterStatusEspecFico(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do Status no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterStatusEspecFico(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="create_cadastrar_status"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createCadastrarStatus") createCadastrarStatus

> A entidade status de pedido permite incluir, alterar e excluir os status que os pedidos no Mercos poderão ter.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo        | Descrição                                                |
> |------------------|-------------|----------------------------------------------------------|
> | id               | Integer     | Identificador único                                      |
> | nome             | String: 100 | Nome do status                                           |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste status no Mercos |
> | excluido         | Boolean     | Indica se o status está excluído                         |


```javascript
function createCadastrarStatus(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new CadastrarStatusRequest({"key":"value"});

    controller.createCadastrarStatus(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="alterar_um_status"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarUmStatus") alterarUmStatus

> A entidade status de pedido permite incluir, alterar e excluir os status que os pedidos no Mercos poderão ter.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo        | Descrição                                                |
> |------------------|-------------|----------------------------------------------------------|
> | id               | Integer     | Identificador único                                      |
> | nome             | String: 100 | Nome do status                                           |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste status no Mercos |
> | excluido         | Boolean     | Indica se o status está excluído                         |


```javascript
function alterarUmStatus(id, contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do Status no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new AlterarUmStatusRequest({"key":"value"});

    controller.alterarUmStatus(id, contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="alterar_status_de_um_pedido"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarStatusDeUmPedido") alterarStatusDeUmPedido

> A entidade status de pedido permite incluir, alterar e excluir os status que os pedidos no Mercos poderão ter.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo        | Descrição                                                |
> |------------------|-------------|----------------------------------------------------------|
> | id               | Integer     | Identificador único                                      |
> | nome             | String: 100 | Nome do status                                           |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste status no Mercos |
> | excluido         | Boolean     | Indica se o status está excluído                         |


```javascript
function alterarStatusDeUmPedido(id, contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do Pedido no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new AlterarStatusDeUmPedidoRequest({"key":"value"});

    controller.alterarStatusDeUmPedido(id, contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="get_obter_hist_rico_de_status_de_um_pedido"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterHistRicoDeStatusDeUmPedido") getObterHistRicoDeStatusDeUmPedido

> A entidade status de pedido permite incluir, alterar e excluir os status que os pedidos no Mercos poderão ter.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo        | Descrição                                                |
> |------------------|-------------|----------------------------------------------------------|
> | id               | Integer     | Identificador único                                      |
> | nome             | String: 100 | Nome do status                                           |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste status no Mercos |
> | excluido         | Boolean     | Indica se o status está excluído                         |


```javascript
function getObterHistRicoDeStatusDeUmPedido(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do Pedido no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterHistRicoDeStatusDeUmPedido(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_todos_os_tipos_de_pedido"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodosOsTiposDePedido") getObterTodosOsTiposDePedido

> A entidade tipo de pedido permite incluir, alterar e excluir os tipos de pedido.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo       | Descrição                                              |
> |------------------|------------|--------------------------------------------------------|
> | id               | Integer    | Identificador único                                    |
> | nome             | String: 50 | Nome do tipo de pedido                                 |
> | ultima_alteracao | DateTime   | Data e hora da última modificação deste tipo no Mercos |


```javascript
function getObterTodosOsTiposDePedido(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodosOsTiposDePedido(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_tipo_de_pedido_espec_fico"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTipoDePedidoEspecFico") getObterTipoDePedidoEspecFico

> A entidade tipo de pedido permite incluir, alterar e excluir os tipos de pedido.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo       | Descrição                                              |
> |------------------|------------|--------------------------------------------------------|
> | id               | Integer    | Identificador único                                    |
> | nome             | String: 50 | Nome do tipo de pedido                                 |
> | ultima_alteracao | DateTime   | Data e hora da última modificação deste tipo no Mercos |


```javascript
function getObterTipoDePedidoEspecFico(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do Tipo de pedido no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTipoDePedidoEspecFico(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="create_cadastrar_tipo_de_pedido"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createCadastrarTipoDePedido") createCadastrarTipoDePedido

> A entidade tipo de pedido permite incluir, alterar e excluir os tipos de pedido.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo       | Descrição                                              |
> |------------------|------------|--------------------------------------------------------|
> | id               | Integer    | Identificador único                                    |
> | nome             | String: 50 | Nome do tipo de pedido                                 |
> | ultima_alteracao | DateTime   | Data e hora da última modificação deste tipo no Mercos |


```javascript
function createCadastrarTipoDePedido(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new CadastrarTipoDePedidoRequest({"key":"value"});

    controller.createCadastrarTipoDePedido(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="alterar_um_tipo_de_pedido"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarUmTipoDePedido") alterarUmTipoDePedido

> A entidade tipo de pedido permite incluir, alterar e excluir os tipos de pedido.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo       | Descrição                                              |
> |------------------|------------|--------------------------------------------------------|
> | id               | Integer    | Identificador único                                    |
> | nome             | String: 50 | Nome do tipo de pedido                                 |
> | ultima_alteracao | DateTime   | Data e hora da última modificação deste tipo no Mercos |


```javascript
function alterarUmTipoDePedido(id, contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do Tipo de pedido no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new AlterarUmTipoDePedidoRequest({"key":"value"});

    controller.alterarUmTipoDePedido(id, contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="get_obter_todos_os_campos_extras"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodosOsCamposExtras") getObterTodosOsCamposExtras

> Os campos extras são utilizados para anotar no pedido informações relevantes para a empresa ou para o integrador, por exemplo, "data da entrega" e "tipo de frete". Os campos extras podem ser dos seguintes tipos: texto livre, data, hora ou número.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo | Tipo       | Descrição                           |
> |-------|------------|-------------------------------------|
> | id    | Integer    | Identificador único do campo extra. |
> | tipo  | String     | (“0”) Texto livre, (“1”) data, ("2") numérico, ("3") hora, ("4") Lista |
> | nome  | String: 50 | Nome do campo extra.                |
> | obrigatorio    | Boolean    | Indica obrigatoriedade do campo extra.  |
> | casas_decimais | Integer | Quantidade de casas decimais, valores suportados de 0 a 5. Esta informação será ignorada se o tipo do campo não for numérico. |
> | formato| String | ("0") sem formatação, ("1") monetário 'R$', ("2") porcentagem '%'. Esta informação será ignorada se o tipo do campo não for numérico. |
> | exibir_para_cliente | Boolean | Indica se o valor preenchido para o campo será exibido para o cliente na visualização do pedido. |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste registro no Mercos |
> | excluido         | Boolean    | Indica se o campo está excluído.
> | lista_multipla | Boolean | Indica se é uma lista simples ou múltipla. |
> | itens | List: 100 | Lista de itens |
> 
> #### Estrutura de retorno dos itens
> 
> | Campo | Tipo       | Descrição                           |
> |-------|------------|-------------------------------------|
> | id    | Integer    | Identificador único dos itens de campo extra. |
> | campo_custom_id | Integer | Identificador único do campo extra. |
> | ordem | Integer | Ordem do item na lista. |
> | valor | String: 100 | Valor do item. | 
> | selecionado | Boolean | Indica se esse item já vem pré-selecionado. |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste registro no Mercos |
> | excluido | Boolean    | Indica se o campo está excluído.


```javascript
function getObterTodosOsCamposExtras(contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'application/json';
    var applicationToken = '1413cea4-d18a-11e4-be31-f23c91df94d9';
    var companyToken = 'a77da094-9443-11e5-be32-f23c91df94d9';

    controller.getObterTodosOsCamposExtras(contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_um_campo_extra"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterUmCampoExtra") getObterUmCampoExtra

> Os campos extras são utilizados para anotar no pedido informações relevantes para a empresa ou para o integrador, por exemplo, "data da entrega" e "tipo de frete". Os campos extras podem ser dos seguintes tipos: texto livre, data, hora ou número.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo | Tipo       | Descrição                           |
> |-------|------------|-------------------------------------|
> | id    | Integer    | Identificador único do campo extra. |
> | tipo  | String     | (“0”) Texto livre, (“1”) data, ("2") numérico, ("3") hora, ("4") Lista |
> | nome  | String: 50 | Nome do campo extra.                |
> | obrigatorio    | Boolean    | Indica obrigatoriedade do campo extra.  |
> | casas_decimais | Integer | Quantidade de casas decimais, valores suportados de 0 a 5. Esta informação será ignorada se o tipo do campo não for numérico. |
> | formato| String | ("0") sem formatação, ("1") monetário 'R$', ("2") porcentagem '%'. Esta informação será ignorada se o tipo do campo não for numérico. |
> | exibir_para_cliente | Boolean | Indica se o valor preenchido para o campo será exibido para o cliente na visualização do pedido. |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste registro no Mercos |
> | excluido         | Boolean    | Indica se o campo está excluído.
> | lista_multipla | Boolean | Indica se é uma lista simples ou múltipla. |
> | itens | List: 100 | Lista de itens |
> 
> #### Estrutura de retorno dos itens
> 
> | Campo | Tipo       | Descrição                           |
> |-------|------------|-------------------------------------|
> | id    | Integer    | Identificador único dos itens de campo extra. |
> | campo_custom_id | Integer | Identificador único do campo extra. |
> | ordem | Integer | Ordem do item na lista. |
> | valor | String: 100 | Valor do item. | 
> | selecionado | Boolean | Indica se esse item já vem pré-selecionado. |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste registro no Mercos |
> | excluido | Boolean    | Indica se o campo está excluído.


```javascript
function getObterUmCampoExtra(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do Campo Extra no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterUmCampoExtra(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="create_incluir_um_campo_extra"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createIncluirUmCampoExtra") createIncluirUmCampoExtra

> Os campos extras são utilizados para anotar no pedido informações relevantes para a empresa ou para o integrador, por exemplo, "data da entrega" e "tipo de frete". Os campos extras podem ser dos seguintes tipos: texto livre, data, hora ou número.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo | Tipo       | Descrição                           |
> |-------|------------|-------------------------------------|
> | id    | Integer    | Identificador único do campo extra. |
> | tipo  | String     | (“0”) Texto livre, (“1”) data, ("2") numérico, ("3") hora, ("4") Lista |
> | nome  | String: 50 | Nome do campo extra.                |
> | obrigatorio    | Boolean    | Indica obrigatoriedade do campo extra.  |
> | casas_decimais | Integer | Quantidade de casas decimais, valores suportados de 0 a 5. Esta informação será ignorada se o tipo do campo não for numérico. |
> | formato| String | ("0") sem formatação, ("1") monetário 'R$', ("2") porcentagem '%'. Esta informação será ignorada se o tipo do campo não for numérico. |
> | exibir_para_cliente | Boolean | Indica se o valor preenchido para o campo será exibido para o cliente na visualização do pedido. |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste registro no Mercos |
> | excluido         | Boolean    | Indica se o campo está excluído.
> | lista_multipla | Boolean | Indica se é uma lista simples ou múltipla. |
> | itens | List: 100 | Lista de itens |
> 
> #### Estrutura de retorno dos itens
> 
> | Campo | Tipo       | Descrição                           |
> |-------|------------|-------------------------------------|
> | id    | Integer    | Identificador único dos itens de campo extra. |
> | campo_custom_id | Integer | Identificador único do campo extra. |
> | ordem | Integer | Ordem do item na lista. |
> | valor | String: 100 | Valor do item. | 
> | selecionado | Boolean | Indica se esse item já vem pré-selecionado. |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste registro no Mercos |
> | excluido | Boolean    | Indica se o campo está excluído.


```javascript
function createIncluirUmCampoExtra(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new IncluirUmCampoExtraRequest({"key":"value"});

    controller.createIncluirUmCampoExtra(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="create_incluir_um_campo_extra_do_tipo_lista"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createIncluirUmCampoExtraDoTipoLista") createIncluirUmCampoExtraDoTipoLista

> Os campos extras são utilizados para anotar no pedido informações relevantes para a empresa ou para o integrador, por exemplo, "data da entrega" e "tipo de frete". Os campos extras podem ser dos seguintes tipos: texto livre, data, hora ou número.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo | Tipo       | Descrição                           |
> |-------|------------|-------------------------------------|
> | id    | Integer    | Identificador único do campo extra. |
> | tipo  | String     | (“0”) Texto livre, (“1”) data, ("2") numérico, ("3") hora, ("4") Lista |
> | nome  | String: 50 | Nome do campo extra.                |
> | obrigatorio    | Boolean    | Indica obrigatoriedade do campo extra.  |
> | casas_decimais | Integer | Quantidade de casas decimais, valores suportados de 0 a 5. Esta informação será ignorada se o tipo do campo não for numérico. |
> | formato| String | ("0") sem formatação, ("1") monetário 'R$', ("2") porcentagem '%'. Esta informação será ignorada se o tipo do campo não for numérico. |
> | exibir_para_cliente | Boolean | Indica se o valor preenchido para o campo será exibido para o cliente na visualização do pedido. |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste registro no Mercos |
> | excluido         | Boolean    | Indica se o campo está excluído.
> | lista_multipla | Boolean | Indica se é uma lista simples ou múltipla. |
> | itens | List: 100 | Lista de itens |
> 
> #### Estrutura de retorno dos itens
> 
> | Campo | Tipo       | Descrição                           |
> |-------|------------|-------------------------------------|
> | id    | Integer    | Identificador único dos itens de campo extra. |
> | campo_custom_id | Integer | Identificador único do campo extra. |
> | ordem | Integer | Ordem do item na lista. |
> | valor | String: 100 | Valor do item. | 
> | selecionado | Boolean | Indica se esse item já vem pré-selecionado. |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste registro no Mercos |
> | excluido | Boolean    | Indica se o campo está excluído.*Obs: O cadastro dos itens respeita a ordem que foram enviados para gerar o retorno dos ids. O valor máximo de itens que podem ser carastrados é 100*


```javascript
function createIncluirUmCampoExtraDoTipoLista(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = {
        id : 21
    };

    controller.createIncluirUmCampoExtraDoTipoLista(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="alterar_um_campo_extra"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarUmCampoExtra") alterarUmCampoExtra

> Os campos extras são utilizados para anotar no pedido informações relevantes para a empresa ou para o integrador, por exemplo, "data da entrega" e "tipo de frete". Os campos extras podem ser dos seguintes tipos: texto livre, data, hora ou número.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo | Tipo       | Descrição                           |
> |-------|------------|-------------------------------------|
> | id    | Integer    | Identificador único do campo extra. |
> | tipo  | String     | (“0”) Texto livre, (“1”) data, ("2") numérico, ("3") hora, ("4") Lista |
> | nome  | String: 50 | Nome do campo extra.                |
> | obrigatorio    | Boolean    | Indica obrigatoriedade do campo extra.  |
> | casas_decimais | Integer | Quantidade de casas decimais, valores suportados de 0 a 5. Esta informação será ignorada se o tipo do campo não for numérico. |
> | formato| String | ("0") sem formatação, ("1") monetário 'R$', ("2") porcentagem '%'. Esta informação será ignorada se o tipo do campo não for numérico. |
> | exibir_para_cliente | Boolean | Indica se o valor preenchido para o campo será exibido para o cliente na visualização do pedido. |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste registro no Mercos |
> | excluido         | Boolean    | Indica se o campo está excluído.
> | lista_multipla | Boolean | Indica se é uma lista simples ou múltipla. |
> | itens | List: 100 | Lista de itens |
> 
> #### Estrutura de retorno dos itens
> 
> | Campo | Tipo       | Descrição                           |
> |-------|------------|-------------------------------------|
> | id    | Integer    | Identificador único dos itens de campo extra. |
> | campo_custom_id | Integer | Identificador único do campo extra. |
> | ordem | Integer | Ordem do item na lista. |
> | valor | String: 100 | Valor do item. | 
> | selecionado | Boolean | Indica se esse item já vem pré-selecionado. |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste registro no Mercos |
> | excluido | Boolean    | Indica se o campo está excluído.


```javascript
function alterarUmCampoExtra(id, contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do Campo Extra no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new AlterarUmCampoExtraRequest({"key":"value"});

    controller.alterarUmCampoExtra(id, contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="alterar_um_campo_extra_do_tipo_lista"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarUmCampoExtraDoTipoLista") alterarUmCampoExtraDoTipoLista

> Os campos extras são utilizados para anotar no pedido informações relevantes para a empresa ou para o integrador, por exemplo, "data da entrega" e "tipo de frete". Os campos extras podem ser dos seguintes tipos: texto livre, data, hora ou número.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo | Tipo       | Descrição                           |
> |-------|------------|-------------------------------------|
> | id    | Integer    | Identificador único do campo extra. |
> | tipo  | String     | (“0”) Texto livre, (“1”) data, ("2") numérico, ("3") hora, ("4") Lista |
> | nome  | String: 50 | Nome do campo extra.                |
> | obrigatorio    | Boolean    | Indica obrigatoriedade do campo extra.  |
> | casas_decimais | Integer | Quantidade de casas decimais, valores suportados de 0 a 5. Esta informação será ignorada se o tipo do campo não for numérico. |
> | formato| String | ("0") sem formatação, ("1") monetário 'R$', ("2") porcentagem '%'. Esta informação será ignorada se o tipo do campo não for numérico. |
> | exibir_para_cliente | Boolean | Indica se o valor preenchido para o campo será exibido para o cliente na visualização do pedido. |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste registro no Mercos |
> | excluido         | Boolean    | Indica se o campo está excluído.
> | lista_multipla | Boolean | Indica se é uma lista simples ou múltipla. |
> | itens | List: 100 | Lista de itens |
> 
> #### Estrutura de retorno dos itens
> 
> | Campo | Tipo       | Descrição                           |
> |-------|------------|-------------------------------------|
> | id    | Integer    | Identificador único dos itens de campo extra. |
> | campo_custom_id | Integer | Identificador único do campo extra. |
> | ordem | Integer | Ordem do item na lista. |
> | valor | String: 100 | Valor do item. | 
> | selecionado | Boolean | Indica se esse item já vem pré-selecionado. |
> | ultima_alteracao | DateTime    | Data e hora da última modificação deste registro no Mercos |
> | excluido | Boolean    | Indica se o campo está excluído.*Obs: Na alteração dos itens se não for enviado um id será criado um item novo, quando enviado id será alterado o item existente. A alteração dos itens respeita a ordem que foram enviados para gerar o retorno dos ids.*


```javascript
function alterarUmCampoExtraDoTipoLista(id, contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do Campo Extra no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = {
        id : 21
    };

    controller.alterarUmCampoExtraDoTipoLista(id, contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="create_faturar_um_pedido"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createFaturarUmPedido") createFaturarUmPedido

> Faturar um pedido, gerando assim comissão aos vendedores.
> OBS: Caso for necessário excluir o faturamento, deve ser enviado o campo excluido=true no json do PUT de alteração..
> 
> #### Parâmetros do JSON de envio
> 
> | Campo                         | Tipo                                 | Descrição                                                                                  |
> |-------------------------------|--------------------------------------|--------------------------------------------------------------------------------------------|
> | pedido_id(obrigatório)        | Integer                              | ID do pedido faturado. Este deve ser o ID cadastrado no Mercos, e não o ID do seu sistema. |
> | valor_faturado(obrigatório)   | Decimal: 9 dígitos, 2 casas decimais | Valor faturado do pedido.                                                                  |
> | data_faturamento(obrigatório) | String: “AAAA-MM-DD”                 | Data em que o faturamento foi realizado.                                                   |
> | numero_nf                     | String: 500                          | Número da nota fiscal.                                                                     |
> | informacoes_adicionais        | String: 500                          | Informações adicionais referente ao faturamento.                                           |


```javascript
function createFaturarUmPedido(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new FaturarUmPedidoRequest({"key":"value"});

    controller.createFaturarUmPedido(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="alterar_faturamento_do_pedido"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarFaturamentoDoPedido") alterarFaturamentoDoPedido

> Faturar um pedido, gerando assim comissão aos vendedores.
> OBS: Caso for necessário excluir o faturamento, deve ser enviado o campo excluido=true no json do PUT de alteração..
> 
> #### Parâmetros do JSON de envio
> 
> | Campo                         | Tipo                                 | Descrição                                                                                  |
> |-------------------------------|--------------------------------------|--------------------------------------------------------------------------------------------|
> | pedido_id(obrigatório)        | Integer                              | ID do pedido faturado. Este deve ser o ID cadastrado no Mercos, e não o ID do seu sistema. |
> | valor_faturado(obrigatório)   | Decimal: 9 dígitos, 2 casas decimais | Valor faturado do pedido.                                                                  |
> | data_faturamento(obrigatório) | String: “AAAA-MM-DD”                 | Data em que o faturamento foi realizado.                                                   |
> | numero_nf                     | String: 500                          | Número da nota fiscal.                                                                     |
> | informacoes_adicionais        | String: 500                          | Informações adicionais referente ao faturamento.                                           |


```javascript
function alterarFaturamentoDoPedido(id, contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do Faturamento no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new AlterarFaturamentoDoPedidoRequest({"key":"value"});

    controller.alterarFaturamentoDoPedido(id, contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="get_obter_todas_os_t_tulos_vencidos"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodasOsTTulosVencidos") getObterTodasOsTTulosVencidos

> Obs.: Títulos vencidos excluídos não serão exibidos em tela para o usuário.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo       | Descrição                                                |
> |------------------|------------|----------------------------------------------------------|
> | id               | Integer    | Identificador único do título.                           |
> | numero_documento | String: 18 | Número de documento do título. Ex: “123456789012/123”.   |
> | valor            | Double     | Valor do título. Valor máximo suportado: 9999999.99      |
> | data_vencimento  | Date       | Data de vencimento do título. Ex.: 2015-11-22            |
> | observacao       | String     | Observação do título.                                    |
> | cliente_id       | Integer    | ID do cliente associado ao título.                       |
> | excluido         | Boolean    | Indica se o título está excluído.                        |
> | ultima_alteracao | DateTime   | Data e hora da última modificação deste título no Mercos |


```javascript
function getObterTodasOsTTulosVencidos(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodasOsTTulosVencidos(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_um_t_tulo_vencido"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterUmTTuloVencido") getObterUmTTuloVencido

> Obs.: Títulos vencidos excluídos não serão exibidos em tela para o usuário.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo       | Descrição                                                |
> |------------------|------------|----------------------------------------------------------|
> | id               | Integer    | Identificador único do título.                           |
> | numero_documento | String: 18 | Número de documento do título. Ex: “123456789012/123”.   |
> | valor            | Double     | Valor do título. Valor máximo suportado: 9999999.99      |
> | data_vencimento  | Date       | Data de vencimento do título. Ex.: 2015-11-22            |
> | observacao       | String     | Observação do título.                                    |
> | cliente_id       | Integer    | ID do cliente associado ao título.                       |
> | excluido         | Boolean    | Indica se o título está excluído.                        |
> | ultima_alteracao | DateTime   | Data e hora da última modificação deste título no Mercos |


```javascript
function getObterUmTTuloVencido(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do Titulo Vencido no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterUmTTuloVencido(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="create_incluir_um_t_tulo"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createIncluirUmTTulo") createIncluirUmTTulo

> Obs.: Títulos vencidos excluídos não serão exibidos em tela para o usuário.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo       | Descrição                                                |
> |------------------|------------|----------------------------------------------------------|
> | id               | Integer    | Identificador único do título.                           |
> | numero_documento | String: 18 | Número de documento do título. Ex: “123456789012/123”.   |
> | valor            | Double     | Valor do título. Valor máximo suportado: 9999999.99      |
> | data_vencimento  | Date       | Data de vencimento do título. Ex.: 2015-11-22            |
> | observacao       | String     | Observação do título.                                    |
> | cliente_id       | Integer    | ID do cliente associado ao título.                       |
> | excluido         | Boolean    | Indica se o título está excluído.                        |
> | ultima_alteracao | DateTime   | Data e hora da última modificação deste título no Mercos |


```javascript
function createIncluirUmTTulo(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new IncluirUmTTuloRequest({"key":"value"});

    controller.createIncluirUmTTulo(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="alterar_um_t_tulo"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.alterarUmTTulo") alterarUmTTulo

> Obs.: Títulos vencidos excluídos não serão exibidos em tela para o usuário.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo            | Tipo       | Descrição                                                |
> |------------------|------------|----------------------------------------------------------|
> | id               | Integer    | Identificador único do título.                           |
> | numero_documento | String: 18 | Número de documento do título. Ex: “123456789012/123”.   |
> | valor            | Double     | Valor do título. Valor máximo suportado: 9999999.99      |
> | data_vencimento  | Date       | Data de vencimento do título. Ex.: 2015-11-22            |
> | observacao       | String     | Observação do título.                                    |
> | cliente_id       | Integer    | ID do cliente associado ao título.                       |
> | excluido         | Boolean    | Indica se o título está excluído.                        |
> | ultima_alteracao | DateTime   | Data e hora da última modificação deste título no Mercos |


```javascript
function alterarUmTTulo(id, contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do Titulo Vencido no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new AlterarUmTTuloRequest({"key":"value"});

    controller.alterarUmTTulo(id, contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 412 | Unexpected error in API call. See HTTP response body for details. |




### <a name="get_obter_todas_as_configura_es_de_icmsst"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodasAsConfiguraEsDeICMSST") getObterTodasAsConfiguraEsDeICMSST

> A entidade Configuração de ICMS-ST é utilizada para se configurar o cálculo do ICMS-ST no sistema Mercos. Para esta entidade não existe 
> a requisição de alteração *PUT*, caso tenha necessidade, deve ser deletado e incluído novamente a regra.
> 
> Obs.: Configurações excluídas não serão exibidas em tela para o usuário.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo               | Tipo       | Descrição                                                                                                                                                                   |
> |---------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                  | Integer    | Identificador único                                                                                                                                                         |
> | codigo_ncm          | String: 20 | Código NCM (Nomenclatura Comum do Mercosul) que identifica o(s) produto(s) sujeito(s) a esta configuração de ICMS-ST. Ex: “2201.10.00”.                                     |
> | nome_excecao_fiscal | String: 20 | Exceção fiscal que identifica o(s) cliente(s) sujeito(s) a esta configuração de ICMS-ST. Ex: “SIMPLES”.                                                                     |
> | estado_destino      | String: 2  | Unidade da federação cujos clientes estão sujeitos a esta configuração de ICMS-ST. Ex: “SC”.                                                                                |
> | tipo_st             | String     | Determina a fórmula que será utilizada para calcular a alíquota de ICMS-ST. Os valores válidos são “MVA” (Margem de Valor Agregado) e “PMC” (Preço Máximo ao Consumidor).   |
> | valor_mva           | Double     | A Margem de Valor Agregado (em percentual).                                                                                                                                 |
> | valor_pmc           | Double     | A base de cálculo do ICMS-ST quando este é tributado por PMC. Se houver redução de base ou qualquer outro fator incidente sobre a base já deve ser considerado neste valor. |
> | icms_credito        | Double     | Alíquota de ICMS de crédito (em percentual).                                                                                                                                |
> | icms_destino        | Double     | Alíquota de ICMS da UF de destino (em percentual).                                                                                                                          |
> | excluido            | Boolean    | Indica se a configuração está excluída.                                                                                                                                     |
> | ultima_alteracao    | DateTime   | Data e hora da última modificação desta configuração de ICMS-ST no Mercos.                                                                                                  |


```javascript
function getObterTodasAsConfiguraEsDeICMSST(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data.] |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodasAsConfiguraEsDeICMSST(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_uma_configura_o_de_icmsst_espec_fica"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterUmaConfiguraODeICMSSTEspecFica") getObterUmaConfiguraODeICMSSTEspecFica

> A entidade Configuração de ICMS-ST é utilizada para se configurar o cálculo do ICMS-ST no sistema Mercos. Para esta entidade não existe 
> a requisição de alteração *PUT*, caso tenha necessidade, deve ser deletado e incluído novamente a regra.
> 
> Obs.: Configurações excluídas não serão exibidas em tela para o usuário.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo               | Tipo       | Descrição                                                                                                                                                                   |
> |---------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                  | Integer    | Identificador único                                                                                                                                                         |
> | codigo_ncm          | String: 20 | Código NCM (Nomenclatura Comum do Mercosul) que identifica o(s) produto(s) sujeito(s) a esta configuração de ICMS-ST. Ex: “2201.10.00”.                                     |
> | nome_excecao_fiscal | String: 20 | Exceção fiscal que identifica o(s) cliente(s) sujeito(s) a esta configuração de ICMS-ST. Ex: “SIMPLES”.                                                                     |
> | estado_destino      | String: 2  | Unidade da federação cujos clientes estão sujeitos a esta configuração de ICMS-ST. Ex: “SC”.                                                                                |
> | tipo_st             | String     | Determina a fórmula que será utilizada para calcular a alíquota de ICMS-ST. Os valores válidos são “MVA” (Margem de Valor Agregado) e “PMC” (Preço Máximo ao Consumidor).   |
> | valor_mva           | Double     | A Margem de Valor Agregado (em percentual).                                                                                                                                 |
> | valor_pmc           | Double     | A base de cálculo do ICMS-ST quando este é tributado por PMC. Se houver redução de base ou qualquer outro fator incidente sobre a base já deve ser considerado neste valor. |
> | icms_credito        | Double     | Alíquota de ICMS de crédito (em percentual).                                                                                                                                |
> | icms_destino        | Double     | Alíquota de ICMS da UF de destino (em percentual).                                                                                                                          |
> | excluido            | Boolean    | Indica se a configuração está excluída.                                                                                                                                     |
> | ultima_alteracao    | DateTime   | Data e hora da última modificação desta configuração de ICMS-ST no Mercos.                                                                                                  |


```javascript
function getObterUmaConfiguraODeICMSSTEspecFica(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do ICMS-ST no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 186.546324159273;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterUmaConfiguraODeICMSSTEspecFica(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="delete_excluir_uma_configura_o_de_icmsst"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.deleteExcluirUmaConfiguraODeICMSST") deleteExcluirUmaConfiguraODeICMSST

> A entidade Configuração de ICMS-ST é utilizada para se configurar o cálculo do ICMS-ST no sistema Mercos. Para esta entidade não existe 
> a requisição de alteração *PUT*, caso tenha necessidade, deve ser deletado e incluído novamente a regra.
> 
> Obs.: Configurações excluídas não serão exibidas em tela para o usuário.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo               | Tipo       | Descrição                                                                                                                                                                   |
> |---------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                  | Integer    | Identificador único                                                                                                                                                         |
> | codigo_ncm          | String: 20 | Código NCM (Nomenclatura Comum do Mercosul) que identifica o(s) produto(s) sujeito(s) a esta configuração de ICMS-ST. Ex: “2201.10.00”.                                     |
> | nome_excecao_fiscal | String: 20 | Exceção fiscal que identifica o(s) cliente(s) sujeito(s) a esta configuração de ICMS-ST. Ex: “SIMPLES”.                                                                     |
> | estado_destino      | String: 2  | Unidade da federação cujos clientes estão sujeitos a esta configuração de ICMS-ST. Ex: “SC”.                                                                                |
> | tipo_st             | String     | Determina a fórmula que será utilizada para calcular a alíquota de ICMS-ST. Os valores válidos são “MVA” (Margem de Valor Agregado) e “PMC” (Preço Máximo ao Consumidor).   |
> | valor_mva           | Double     | A Margem de Valor Agregado (em percentual).                                                                                                                                 |
> | valor_pmc           | Double     | A base de cálculo do ICMS-ST quando este é tributado por PMC. Se houver redução de base ou qualquer outro fator incidente sobre a base já deve ser considerado neste valor. |
> | icms_credito        | Double     | Alíquota de ICMS de crédito (em percentual).                                                                                                                                |
> | icms_destino        | Double     | Alíquota de ICMS da UF de destino (em percentual).                                                                                                                          |
> | excluido            | Boolean    | Indica se a configuração está excluída.                                                                                                                                     |
> | ultima_alteracao    | DateTime   | Data e hora da última modificação desta configuração de ICMS-ST no Mercos.                                                                                                  |


```javascript
function deleteExcluirUmaConfiguraODeICMSST(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID do ICMS-ST no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 23.0416060509354;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.deleteExcluirUmaConfiguraODeICMSST(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | TODO: Add an error description |




### <a name="create_incluir_uma_configura_o_de_icmsst"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.createIncluirUmaConfiguraODeICMSST") createIncluirUmaConfiguraODeICMSST

> A entidade Configuração de ICMS-ST é utilizada para se configurar o cálculo do ICMS-ST no sistema Mercos. Para esta entidade não existe 
> a requisição de alteração *PUT*, caso tenha necessidade, deve ser deletado e incluído novamente a regra.
> 
> Obs.: Configurações excluídas não serão exibidas em tela para o usuário.
> 
> #### Estrutura de Retorno do GET
> 
> | Campo               | Tipo       | Descrição                                                                                                                                                                   |
> |---------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
> | id                  | Integer    | Identificador único                                                                                                                                                         |
> | codigo_ncm          | String: 20 | Código NCM (Nomenclatura Comum do Mercosul) que identifica o(s) produto(s) sujeito(s) a esta configuração de ICMS-ST. Ex: “2201.10.00”.                                     |
> | nome_excecao_fiscal | String: 20 | Exceção fiscal que identifica o(s) cliente(s) sujeito(s) a esta configuração de ICMS-ST. Ex: “SIMPLES”.                                                                     |
> | estado_destino      | String: 2  | Unidade da federação cujos clientes estão sujeitos a esta configuração de ICMS-ST. Ex: “SC”.                                                                                |
> | tipo_st             | String     | Determina a fórmula que será utilizada para calcular a alíquota de ICMS-ST. Os valores válidos são “MVA” (Margem de Valor Agregado) e “PMC” (Preço Máximo ao Consumidor).   |
> | valor_mva           | Double     | A Margem de Valor Agregado (em percentual).                                                                                                                                 |
> | valor_pmc           | Double     | A base de cálculo do ICMS-ST quando este é tributado por PMC. Se houver redução de base ou qualquer outro fator incidente sobre a base já deve ser considerado neste valor. |
> | icms_credito        | Double     | Alíquota de ICMS de crédito (em percentual).                                                                                                                                |
> | icms_destino        | Double     | Alíquota de ICMS da UF de destino (em percentual).                                                                                                                          |
> | excluido            | Boolean    | Indica se a configuração está excluída.                                                                                                                                     |
> | ultima_alteracao    | DateTime   | Data e hora da última modificação desta configuração de ICMS-ST no Mercos.                                                                                                  |


```javascript
function createIncluirUmaConfiguraODeICMSST(contentType, applicationToken, companyToken, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';
    var body = new IncluirUmaConfiguraODeICMSSTRequest({"key":"value"});

    controller.createIncluirUmaConfiguraODeICMSST(contentType, applicationToken, companyToken, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | TODO: Add an error description |




### <a name="get_obter_todas_as_promo_es"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodasAsPromoEs") getObterTodasAsPromoEs

> #### Estrutura de Retorno das promoções.
> 
> | Campo               | Tipo       | Descrição                                                                                                                                                                   |
> |---------------------|------------|---------------------------------------------------------------------------------|
> | id                  | Integer    | Identificador único.                                                            |
> | representada_id     | Integer    | Identificador único da representada.                                            |
> | nome                | String     | Nome da promoção.                                                               |
> | excluido            | boolean    | Indica se a promoção está excluída.                                             |
> | regras              | List       | Lista contendo os ids das regras desta promoção : ```[{"id_regra": Integer}]``` |
> | ultima_alteracao    | DateTime   | Data e hora da última modificação desta promoção.                               |


```javascript
function getObterTodasAsPromoEs(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodasAsPromoEs(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_uma_promo_o"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterUmaPromoO") getObterUmaPromoO

> #### Estrutura de Retorno das promoções.
> 
> | Campo               | Tipo       | Descrição                                                                                                                                                                   |
> |---------------------|------------|---------------------------------------------------------------------------------|
> | id                  | Integer    | Identificador único.                                                            |
> | representada_id     | Integer    | Identificador único da representada.                                            |
> | nome                | String     | Nome da promoção.                                                               |
> | excluido            | boolean    | Indica se a promoção está excluída.                                             |
> | regras              | List       | Lista contendo os ids das regras desta promoção : ```[{"id_regra": Integer}]``` |
> | ultima_alteracao    | DateTime   | Data e hora da última modificação desta promoção.                               |


```javascript
function getObterUmaPromoO(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID da promoção no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 23.0416060509354;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterUmaPromoO(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_todas_as_pol_ticas_comerciais"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterTodasAsPolTicasComerciais") getObterTodasAsPolTicasComerciais

> #### Estrutura de Retorno das políticas comerciais.
> 
> | Campo               | Tipo       | Descrição                                                                                                                                                                   |
> |---------------------|------------|-------------------------------------------------------------------------------------------|
> | id                  | Integer    | Identificador único.                                                                      |
> | representada_id     | Integer    | Identificador único da representada.                                                      |
> | nome                | String     | Nome da política comercial.                                                               |
> | excluido            | boolean    | Indica se a política comercial está excluída.                                             |
> | ativo               | boolean    | Indica se a política comercial está ativa.                                                |
> | ordem               | Integer    | Indica a ordem da política comercial.                                                     |
> | regras              | List       | Lista contendo os ids das regras desta política comercial : ```[{"id_regra": Integer}]``` |
> | ultima_alteracao    | DateTime   | Data e hora da última modificação desta política comercial.                               |


```javascript
function getObterTodasAsPolTicasComerciais(alteradoApos, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| alteradoApos |  ``` Required ```  | Retorna os registros que foram alterados após esta data. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var alteradoApos = date("D M d, Y G:i");
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterTodasAsPolTicasComerciais(alteradoApos, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



### <a name="get_obter_uma_pol_tica_comercial"></a>![Method: ](https://apidocs.io/img/method.png ".APIController.getObterUmaPolTicaComercial") getObterUmaPolTicaComercial

> #### Estrutura de Retorno das políticas comerciais.
> 
> | Campo               | Tipo       | Descrição                                                                                                                                                                   |
> |---------------------|------------|-------------------------------------------------------------------------------------------|
> | id                  | Integer    | Identificador único.                                                                      |
> | representada_id     | Integer    | Identificador único da representada.                                                      |
> | nome                | String     | Nome da política comercial.                                                               |
> | excluido            | boolean    | Indica se a política comercial está excluída.                                             |
> | ativo               | boolean    | Indica se a política comercial está ativa.                                                |
> | ordem               | Integer    | Indica a ordem da política comercial.                                                     |
> | regras              | List       | Lista contendo os ids das regras desta política comercial : ```[{"id_regra": Integer}]``` |
> | ultima_alteracao    | DateTime   | Data e hora da última modificação desta política comercial.                               |


```javascript
function getObterUmaPolTicaComercial(id, contentType, applicationToken, companyToken, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| id |  ``` Required ```  | ID da política comercial no sistema Mercos. |
| contentType |  ``` Required ```  | TODO: Add a parameter description |
| applicationToken |  ``` Required ```  | TODO: Add a parameter description |
| companyToken |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var id = 23.0416060509354;
    var contentType = 'Content-Type';
    var applicationToken = 'ApplicationToken';
    var companyToken = 'CompanyToken';

    controller.getObterUmaPolTicaComercial(id, contentType, applicationToken, companyToken, function(error, response, context) {

    
    });
```



[Back to List of Controllers](#list_of_controllers)



