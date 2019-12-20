/**
  * @module APIDeIntegraOMercosLib
  *
  * A integração com o sistema Mercos é feita através de uma API em protocolo HTTP (modelo REST), e
  * os dados são comunicados em formato JSON. Apesar das siglas complicadas, o processo é muito
  * simples. Seu software poderá se comunicar com nossos servidores através de requisições HTTP, de
  * forma muito parecida com um navegador de internet.  O protocolo HTTP é utilizado pelos
  * navegadores para se comunicar com servidores web, através dos métodos GET, POST e PUT. Você irá
  * utilizar estes mesmos métodos para fazer leitura, cadastro e atualização de registros em nossa
  * API.  Utilizamos o protocolo HTTPS no ambiente produção e no ambiente de teste (sandbox).  É
  * possível desenvolver a integração em qualquer linguagem de programação. Os únicos componentes
  * que você irá precisar são:  * Uma biblioteca para realizar conexões HTTP: <a href="http:
  * //unirest.io/" target="_blank">Biblioteca Unirest para várias linguagens</a>  * Uma biblioteca
  * para leitura/escrita de dados em formato JSON: <a href="https://github.com/burningtree/awesome-
  * json#libraries" target="_blank">Veja a lista aqui</a>  A maioria das linguagens de programação
  * possuem bibliotecas nativas ou senão de terceiros (necessita baixar e instalar) para este tipo
  * de operação.  #Primeiros passos  Para começar a consumir a API do Mercos são necessários alguns
  * passos.  **1. Preecher o formulário de interesse**  - <a href="https://meuspedidos.com.
  * br/integracao-erp/" target="_blank">Formulário - Seja um parceiro da Mercos </a>  Assim
  * entraremos em contato e enviaremos as chaves de acesso.  **2. Ler as seguintes seções do Manual
  * para entender melhor como funciona a integração com Mercos**  *Como Funciona*  *Sincronizando
  * Dados na Prática*  *Autenticação e Segurança*  *Entidades Mercos*  <a href="http://api.
  * meuspedidos.com.br/criterios.pdf" target="_blank"> **Critérios de Homologação (Clique
  * aqui)**</a>  <a href="http://api.meuspedidos.com.br/CheckList.pdf" target="_blank"> **CheckList
  * (pdf) (Clique aqui)**</a>  -----  ### JSON  O formato JSON é antes de mais nada, um formato de
  * texto, ou seja, tanto a sua geração como leitura deve ser feita através de uma biblioteca
  * específica para sua linguagem de programação.  A utilização de uma biblioteca evita diversos
  * problemas, como:  - **Geração do conteúdo incorreto:** pode faltar uma vírgula, um colchetes,
  * uma aspas, e pode ocupar muito tempo para detectar esses problemas.  - **Lógica complexa:**
  * evita do programador criar uma lógica complexa para ler ou gerar o JSON, utilizando uma
  * biblioteca em poucas linhas é possível obter qualquer valor contido na estrutura JSON, ou
  * converter um vetor ou objeto em formato JSON.  - **Performance:** a maioria das bibliotecas
  * preza por desempenho na leitura ou geração do formato JSON, isso vem pronto para o programador.
  * - **Código pronto:** não é necessário perder tempo escrevendo código de algo que está pronto,
  * basta aprender como a biblioteca funciona, evitando ter que entender e implementar todas as
  * regras do formato JSON.  Para isso, utilize umas das bibliotecas disponíveis para sua linguagem
  * de programação:  - <a href="https://github.com/burningtree/awesome-json#libraries"
  * target="_blank">Lista de bibliotecas para interpretar JSON em várias linguagens</a>  -----  ###
  * HTTP  Os métodos do protocolo HTTP são amplamente utilizados por navegadores web, e também para
  * fazer chamadas em API REST, como a do Mercos.  Também existe uma imensidão de bibliotecas
  * nativas e de terceiros para se trabalhar com HTTP na sua linguagem de programação.  Geralmente
  * o programador pode utilizar a biblioteca que já é nativa com a linguagem de programação.  Caso
  * esta possua uma sintaxe muito complexa, indicamos utilizar a bibliteca HTTP Unirest:  - <a
  * href="http://unirest.io/" target="_blank">Biblioteca Unirest para várias linguagens</a>  -----
  * ### Testar chamadas  Existe uma extensão do Chrome chamada **Postman**, que permite executar
  * requisições GET, POST e PUT diretamente do navegador. É muito boa para fazer testes na API,
  * sugerimos sua utilização.  - <a href="https://chrome.google.
  * com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop" target="_blank">Extensão PostMan
  * para o navegador Chrome</a>  -----  ### Como funciona  Cada **entidade** (Pedidos, Clientes,
  * Produtos, etc) existente na Mercos é acessível através de uma URL. Para fazer a leitura,
  * cadastro e alteração destas entidades, você deverá executar alguns comandos HTTP nesta URL (os
  * comandos serão detalhados mais adiante).  Por exemplo, vamos analisar a entidade **Clientes**.
  * A URL que identifica os clientes é a seguinte: `https://app.mercos.com/api/v1/clientes/`.
  * Chamamos isto de **URL raíz** da entidade Clientes. Ela representa todos os clientes
  * cadastrados no sistema.  Cada registro individual também possui sua URL. Esta URL é sempre
  * composta da URL raíz da entidade, **seguida pelo ID do registro**.  Então, um cliente cujo ID
  * no banco de dados seja 123, será representado pela URL `https://app.mercos.
  * com/api/v1/clientes/123/`.  #### Buscando Registros  Para buscar os registros de uma entidade,
  * deve-se utilizar o comando HTTP **GET**.  Se você fizer um GET na URL raíz da entidade, será
  * retornada uma lista com todos os registros cadastrados.  Se você fizer GET na URL específica de
  * 1 registro, será retornado apenas aquele registro individual.  Por exemplo, para buscar todos
  * os clientes cadastrados, basta fazer um GET no endereço `https://app.mercos.
  * com/api/v1/clientes/`.  Para buscar o cliente 1001, basta fazer GET no endereço `https://app.
  * mercos.com/api/v1/clientes/1001`.  #### Criando Novos Registros  Para criar novos registros,
  * deve-se executar um comando HTTP POST na URL raíz da entidade. No corpo da requisição, você
  * deve enviar as informações do registro em formato JSON. Também deverá ser informado o header
  * “Content-Type” = “application/json” na requisição, saiba mais sobre Content-Type na seção
  * **"Informações adicionais"**.  Em caso de sucesso, será retornado o StatusCode `201 (CREATED)`.
  * Serão enviados 2 headers HTTP identificando o novo registro criado. São eles:  `MeusPedidosID`:
  * contém o ID do registro no banco de dados da Mercos.  `MeusPedidosURL`: contém a URL de acesso
  * ao registro. É sempre formada pela URL raíz, seguida do ID do registro.  Continuando o exemplo
  * dos clientes, caso você queira cadastrar um novo cliente, basta fazer **POST** na URL `https:
  * //app.mercos.com/api/v1/clientes/`. Digamos que o servidor salve este registro em nosso Banco
  * de Dados, e o ID gerado seja 456. Então, a API irá retornar os seguintes headers:
  * `MeusPedidosID`:`456`  `MeusPedidosURL`:`https://app.mercos.com/api/v1/clientes/456`  ####
  * Atualizando Registros  Para atualizar um registro já existente, basta executar um comando
  * **PUT** na URL do registro, enviando no corpo da requisição as informações em formato JSON.
  * (Este comando PUT não é utilizado pelos navegadores web, mas é um comando válido do protocolo
  * HTTP). Também deverá ser informado o header “Content-Type” = “application/json” na requisição.
  * Em caso de sucesso, será retornado o StatusCode `200 (OK)`. Nenhum header será enviado.
  * Importante ressaltar que a atualização de dados via API no sistema Mercos, não necessita o
  * envio do JSON completo. Apenas os campos obrigatórios e o campo a ser alterado.  #### Excluindo
  * Registros  Para preservar a integridade das informações, a Mercos trabalha com o conceito de
  * exclusão lógica de dados. Todos os registros possuem uma propriedade **excluido** para este fim.
  * Portanto, para realizar exclusão de dados, basta executar um **comando PUT**, informando o
  * valor `true` na propriedade **excluido** do registro.  #### Validação de Dados  Ao executar
  * comandos POST e PUT, a API irá validar os dados enviados, de acordo com a descrição da Entidade.
  * Em caso de erro de validação, será retornado o StatusCode 412 (Precondition Failed), e no
  * corpo da resposta será enviado um objeto JSON descrevendo os erros encontrados. O exemplo ao
  * lado mostra uma situação onde o campo nome da Entidade era obrigatório, mas não foi informado.
  * ```json     {         "erros": [             {                 "mensagem": "Este campo é
  * obrigatório.",                 "campo": "nome"             }         ]      } ```  ####
  * Informações adicionais  **O que é um Content-Type**  Um “Content-type” é simplesmente um
  * cabeçalho definido em muitos protocolos, como HTTP, que faz uso de tipos MIME para especificar
  * a natureza do arquivo que está sendo manipulado.  **O que é um tipo MIME**  MIME significa
  * “Multipurpose Internet Mail Extensions”, é um modo de identificar os arquivos na Internet, de
  * acordo com sua natureza e formato. Por exemplo, usando o valor de cabeçalho “Content-type”
  * definido em uma resposta HTTP, o navegador pode abrir o arquivo como HTML, ou ainda abrir o
  * aplicativo mais adequado para exibir o conteúdo.  **Mobile**  Para realizar testes nos
  * aplicativos, a instalação é realizada através das lojas, após a instalação basta pressionar por
  * 20s a logo da Mercos ou clicar 20 vezes para o Android.  -----  ### Na prática  ####
  * Sincronizando dados na prática  A API da Mercos trabalha com um mecanismo de sincronização
  * incremental, baseado na data de última alteração de cada registro. Desta forma, você **deve
  * buscar apenas os registros que foram cadastrados ou sofreram alteração na Mercos** (novos
  * pedidos, novos clientes) evitando o tráfego desnecessário de dados. Sem este mecanismo, a API
  * retornaria todos os registros cadastrados em toda requisição, o que tornaria processamento mais
  * demorado.  Cada registro da API possui um campo chamado **ultima_alteracao**. Como o próprio
  * nome indica, este campo guarda a hora exata em que o registro foi alterado dentro da Mercos,
  * apesar do header retornar horário UTC (https://tools.ietf.org/html/rfc7231#section-7.1.1.2), a
  * Mercos grava o horário de Brasília. Ao fazer um GET, você poderá enviar o parâmetro
  * **alterado_apos** na URL. Ao fazer isto, serão retornados apenas os registros cuja
  * **ultima_alteracao** seja superior ao **alterado_apos** que você enviou.  Exemplo:  GET `https:
  * //app.mercos.com/api/v1/clientes?alterado_apos=2014-02-28%2012:32:55`  Isto retornará os
  * clientes que sofreram alteração depois das 12:32:55 do dia 28 de Fevereiro de 2014 (detalhe: os
  * caracteres "%20" entre a Data e a Hora representam o espaço em branco no formato URL Encoding.
  * Referência: [Url encode Reference](http://www.w3schools.com/tags/ref_urlencode.asp)).  **OBS:**
  * Para testes feitos no apiary, em **alterado_apos** dentro de URI Parameters, você deve
  * preencher a data e o horário com um espaço entre eles. Exemplo: **2018-08-05 08:40:51**. Isso
  * fará com que seja convertida corretamente a informação da data para a URL.  #### Buscando
  * Informações: exemplo prático  A forma ideal de sincronizar os dados é manter uma tabela de
  * mapeamento para cada Entidade (clientes, produtos, pedidos, etc). Estas tabelas irão relacionar
  * os IDs do seu ERP aos IDs da Mercos. Também é importante que a tabela armazene o campo
  * **ultima_alteracao** dos registros da Mercos. Assim, antes de fazer um GET na API, você poderá
  * buscar o maior valor deste campo (ex: select max(ultima_alteracao) from mapeamento_pedidos), e
  * enviar este valor no parâmetro **alterado_apos**. A API irá retornar apenas os pedidos que
  * foram alterados depois da sua última requisição.  Digamos que você executou um GET em `https:
  * //app.mercos.com/api/v2/pedidos/` e foi retornado 1 único pedido, cujo ID na Mercos é 9876543 e
  * **ultima_alteracao** é "2014-03-01 07:21:44". Digamos que você salve este pedido no seu banco
  * de dados, gerando o ID 4312 no seu ERP. Em seguida, insira um registro na tabela de mapeamento
  * de pedidos, informando que o seu ID 4312 equivale ao ID 9876543 da Mercos. Salve também neste
  * registro o campo **ultima_alteracao** do pedido.  Na próxima vez que você buscar Pedidos,
  * selecione o maior valor da coluna **ultima_alteracao** na tabela de mapeamento de pedidos, e
  * envie este valor no parâmetro **alterado_apos** da API. Neste caso, ficaria: GET `https://app.
  * mercos.com/api/v2/pedidos/?alterado_apos=2014-03-01%2007:21:44`.  Caso aquele pedido ID 9876543
  * tenha sido alterado na Mercos, ele será enviado novamente pela API. Ao verificar a sua tabela
  * de mapeamento, você vai descobrir que ele já está cadastrado no seu ERP. Assim, poderá
  * atualizar o registro já existente, evitando a duplicação de Pedidos.  **Detalhe importante.**
  * Nestas operações GET, o servidor retorna um limite máximo de registros por requisição. Esse
  * limite pode variar dependendo da entidade para evitar longos processamentos no caso de bases
  * grandes. Portanto, sempre que você executar um GET e for retornado no header o parâmetro
  * `MEUSPEDIDOS_LIMITOU_REGISTROS = 1`, você deverá salvar os registros retornados e em seguida
  * executar uma nova operação GET (não esquecendo de atualizar o parâmetro **alterado_apos**). Os
  * registros retornados pelo servidor são ordenados pelo campo **ultima_alteracao**, portanto não
  * existe risco de perda de dados.  #### Enviando Informações: exemplo prático  Digamos que seu
  * usuário cadastrou um novo Produto, cujo ID é 1050 no seu ERP. Para cadastrar este produto na
  * Mercos, você faz um POST em `https://app.mercos.com/api/v1/produtos/` com os dados. Digamos que
  * o servidor retorne com sucesso, e informe o header MeusPedidosID=12345678. Neste momento, você
  * irá inserir um registro na sua tabela de mapeamento de produtos, informando que o seu produto
  * ID 1050 equivale ao produto ID 12345678 na Mercos. O campo **ultima_alteracao** deverá ser nulo,
  * para não interferir no processo de busca de dados.  No futuro, quando este produto ID 1050
  * sofrer alteração no seu sistema, você saberá que ele equivale ao ID 12345678 na Mercos. Então,
  * basta fazer um PUT no endereço `https://app.mercos.com/api/v1/produtos/12345678` com as novas
  * informações. Esta é a forma correta de manter os 2 sistemas sincronizados.  -----  ###
  * Autenticação e Segurança  A segurança dos seus dados é uma das nossas maiores prioridades. Por
  * isso nossa API possui um mecanismo de autenticação que impede que outros usuários tenham acesso
  * e façam qualquer tipo de alteração nas informações dos seus clientes.  Este mecanismo de
  * autenticação é baseado em tokens. Os tokens são parecidos com uma senha de acesso, mas com a
  * vantagem de serem únicos dentro do sistema. Eles são gerados automaticamente e nunca são
  * repetidos. Desta forma, garantimos que todos os clientes e todas as empresas parceiras possuem
  * um token exclusivo que as identifica.  Ao fazer qualquer operação na API, você deverá enviar 2
  * tokens nos headers do comando HTTP:  - `ApplicationToken`: Identifica a aplicação externa (por
  * exemplo, seu ERP) que está se conectando.  - `CompanyToken`: Identifica o cliente da aplicação
  * externa (os clientes da sua empresa) que está se conectando.  Ao receber estes tokens de acesso,
  * será sua responsabilidade guardar estas chaves em segurança, para garantir que ninguém fora da
  * sua empresa tenha acesso aos dados.  -----  ### Throttling  Para evitar uso excessivo da API
  * existe um mecanismo de throttling que **por company token** bloqueia qualquer requisição após
  * uma certa **quantidade total de requisições** seja ultrapassada. Quando isso acontecer em vez
  * do retorno normal da API será enviado uma resposta indicando bloqueio com **StatusCode** `429
  * (TOO MANY REQUESTS)`:  OBS: Caso tenha dificuldades para simular, solicite aos implanters que
  * diminua a quantidade de requisições para que você possa testar.  > Exemplo de Resposta com
  * Status 429  ```json {    "tempo_ate_permitir_novamente": 75,    "limite_de_requisicoes": 30 }
  * ```  **Toda requisição** deve tratar esse possível retorno, **sempre validando** o StatusCode.
  * Ao receber isso, o integrador **deve** ler o campo `tempo_ate_permitir_novamente` que indica
  * quanto tempo, em segundos, a integração dever **aguardar sem enviar novas requisições**. Todas
  * implementações devem levar isso em conta e não serão homologadas em caso contrário.  A
  * quantidade de requisições total e o intervalo de tempo para ser concedida um novo "lote" de
  * requisições é um valor que **pode ser alterado sem aviso prévio**, por isso é
  * **imprescindível** que o campo `tempo_ate_permitir_novamente` seja utilizado. No ambiente de
  * `sandbox` para facilitar os testes desse mecânismo temos um limite bem mais baixo do que o de
  * produção.  #### Exemplo de Funcionamento  Imagine que atualmente o limite seja **150
  * requisições** a cada **60 segundos**. No caso de você possuir 200 clientes para atualizar,
  * digamos que sua integração envie as primeiras 150 requisições em 20 segundos, a partir da
  * próxima requisição você receberá o retorno do bloqueio informando `limite_de_requisicoes: 150`
  * e com `tempo_ate_permitir_novamente: 40`. Qualquer outra tentativa nos **próximos 40 segundos**
  * resultará na mesma resposta, mas informando uma quantia de tempo menor. Após esse tempo a
  * integração conseguirá enviar as **50 requisições** restantes.  **Importante**, mesmo que novas
  * requisições sejam bloqueadas de qualquer forma as integrações **precisam** respeitar esse tempo,
  * caso contrário podem ocasionar **bloqueio permanente** da API. Lembre-se que uma integração
  * **corretamente implementada** deve enviar alterações **apenas quando elas ocorrem**, então
  * difícilmente o throttling irá prejudicar a comunicação entre os sistemas, na pior das hipóteses
  * só haverá um pequeno retardo no processo.  ----  ### Status Mercos  Para veridicar se nossos
  * serviços estão disponíveis   acesse o o endereço **https://status.mercos.com/**  -----  ###
  * Entidades da Mercos  Estão disponíveis na API quase todas as entidades presentes no sistema Web.
  * As entidades são formadas por diversas propriedades, e cada propriedade possui um tipo
  * específico. A API realiza a validação dos dados com base nestes tipos de dados, e recusa
  * operações que não estejam de acordo.  Os tipos aceitos são:  - `String`: sequência de
  * caracteres `utf-8`, envoltos em aspas duplas. Caso a quantidade de caracteres seja limitada,
  * também é informado a quantidade máxima aceita. Ex: (String: 30) significa que o campo aceita no
  * máximo 30 caracteres.  - `Boolean`: true ou false.  - `Integer`: número inteiro.  - `Double`:
  * número com casas decimais, utiliza o "." (ponto) como separador decimal.  - `Date`: data no
  * formato **yyyy-mm-dd**.  - `DateTime`: data e hora no formato **yyyy-mm-dd HH:mm:ss**.  ####
  * Entidades disponíveis  #### Relacionadas à Produtos  | Entidade                       | Obter
  * um ou mais registros | Incluir um registro | Atualizar um registro | | ---
  * |---                         |---                  |---     | | Produtos
  * | [GET]                      | [POST]              | [PUT]  | | Imagens do Produto
  * |                            | [POST]              |        | | Tabelas de Preço
  * | [GET]                      | [POST]              | [PUT]  | | Tabelas de Preço por Produto
  * | [GET]                      | [POST]              | [PUT]  | | Categorias de Produtos
  * | [GET]                      | [POST]              | [PUT]  | | Estoque
  * |                            |                     | [PUT]  ---  #### Relacionadas à Clientes
  * | Entidade                       | Obter um ou mais registros | Incluir um registro | Atualizar
  * um registro | | ---                            |---                         |---
  * |---                | | Clientes                       | [GET]                      | [POST]
  * | [PUT]             | | Condições Pagamento por Cliente|
  * |                     | [POST]            |
  * | | Categorias por Cliente         |                            |                     | [POST]
  * |                                                     | | Tabelas de Preço por
  * Cliente   |                            |                     | [POST]            |
  * | | Usuários (Vendedores)          | [GET]
  * |                     |                   |
  * | | Adicionar cliente à Carteira   | [GET]                      | [POST]              |
  * [PUT]             | | Segmento                       | [GET]                      | [POST]
  * | [PUT]             | | Rede                           | [GET]                      |
  * [POST]              | [PUT]             | | Tags                           | [GET]
  * | [POST]              | [PUT]             | | Tags por cliente               |
  * | [POST]              |                   |  ---  #### Relacionadas à Pedidos
  * | Entidade                       | Obter um ou mais registros | Incluir um registro |
  * Atualizar um registro | | ---                            |---                         |---
  * |---                    | | Transportadoras                | [GET]
  * | [POST]              | [PUT]                 | | Condições de Pagamento         | [GET]
  * | [POST]              | [PUT]                 | | Formas de Pagamento
  * | [GET]                      | [POST]              | [PUT]                 | | Pedidos
  * | [GET]                      | [POST]              | [PUT]                 | |
  * Campos Extras do Pedido        | [GET]                      | [POST]              | [PUT]
  * | | Faturamento de Pedido          |                            | [POST]
  * | [PUT]                 | | Títulos Vencidos               |                            |
  * [POST]              | [PUT]                 | | ICMS-ST                        | [GET]
  * | [POST]              | [PUT]                 | | Tipo de Pedido                 |
  * [GET]                      | [POST]              | [PUT]                 |       | Status do
  * Pedido               | [GET]                      | [POST]              | [PUT]
  * |  ----  ### Histórico de versões  Versão         | Data           | Descrição | --------------
  * | -------------- | -------------- 1.0            | 25/12/2018     | - Nova documentação Mercos.
  * 1.1            | 26/12/2018     | - Endereço de Entrega. 1.1            | 03/01/2019     | -
  * Rede de Clientes. 1.1            | 04/01/2019     | - APK Android Mercos 1.1            |
  * 01/02/2019     | - Volume de informações no retorno do GET. 1.1            | 02/02/2019     | -
  * Checklist de homologação 1.1            | 26/02/2019     | - Adicionado obrigatoriedade nos
  * campos extras 1.1            | 15/04/2019     | - Tags de Clientes 1.1            | 16/04/2019
  * | - Adicionado campos descontos_do_vendedor, descontos_de_promocoes e descontos_de_politicas
  * no GET de pedidos. 1.1            | 17/04/2019     | - Adicionado exibir_para_cliente nos
  * campos extras 1.1            | 23/04/2019     | - Adicionado itens e lista_multipla nos campos
  * extras 1.1            | 24/04/2019     | - Vincular Tags à Clientes 1.1            | 11/09/2019
  * | - Promoções 1.1            | 16/09/2019     | - Políticas comerciais 1.1            |
  * 06/11/2019     | - V2 do endpoint de pedidos
  */

'use strict';

const Configuration = require('./configuration');
const APIController = require('./Controllers/APIController');
const ObterTodosOsProdutosResponse = require('./Models/ObterTodosOsProdutosResponse');
const ObterUmProdutoEspecFicoResponse = require('./Models/ObterUmProdutoEspecFicoResponse');
const IncluirUmProdutoRequest = require('./Models/IncluirUmProdutoRequest');
const AlterarUmProdutoResponse = require('./Models/AlterarUmProdutoResponse');
const AjustarOEstoqueDeProdutoRequest = require('./Models/AjustarOEstoqueDeProdutoRequest');
const AjustarOEstoqueDeProdutoRequest1 = require('./Models/AjustarOEstoqueDeProdutoRequest1');
const IncluirUmaImagemRequest = require('./Models/IncluirUmaImagemRequest');
const IncluirUmaImagemRequest1 = require('./Models/IncluirUmaImagemRequest1');
const Erro = require('./Models/Erro');
const ObterTodasAsTabelasDePreOResponse = require('./Models/ObterTodasAsTabelasDePreOResponse');
const ObterUmaTabelaDePreOResponse = require('./Models/ObterUmaTabelaDePreOResponse');
const IncluirUmaTabelaDePreORequest = require('./Models/IncluirUmaTabelaDePreORequest');
const AlterarUmaTabelaDePreORequest = require('./Models/AlterarUmaTabelaDePreORequest');
const IncluirUmVNculoDeProdutoComTabelaDePreORequest =
  require('./Models/IncluirUmVNculoDeProdutoComTabelaDePreORequest');
const AlterarUmVNculoDeProdutoComTabelaDePreORequest =
  require('./Models/AlterarUmVNculoDeProdutoComTabelaDePreORequest');
const IncluirUmClienteRequest = require('./Models/IncluirUmClienteRequest');
const Email = require('./Models/Email');
const Telefone = require('./Models/Telefone');
const Contato = require('./Models/Contato');
const EnderecosAdicionai = require('./Models/EnderecosAdicionai');
const AlterarUmClienteRequest = require('./Models/AlterarUmClienteRequest');
const EnderecosAdicionai2 = require('./Models/EnderecosAdicionai2');
const IncluirUmaNovaRedeRequest = require('./Models/IncluirUmaNovaRedeRequest');
const AlterarUmaRedeExistenteRequest = require('./Models/AlterarUmaRedeExistenteRequest');
const IncluirUmSegmentoRequest = require('./Models/IncluirUmSegmentoRequest');
const AlterarUmSegmentoExistenteRequest = require('./Models/AlterarUmSegmentoExistenteRequest');
const IncluirUmaTagRequest = require('./Models/IncluirUmaTagRequest');
const AlterarUmaTagExistenteRequest = require('./Models/AlterarUmaTagExistenteRequest');
const VincularClienteTagsRequest = require('./Models/VincularClienteTagsRequest');
const IncluirUmaNovaCategoriaRequest = require('./Models/IncluirUmaNovaCategoriaRequest');
const AlterarUmaCategoriaExistenteRequest = require('./Models/AlterarUmaCategoriaExistenteRequest');
const VincularClienteCategoriaRequest = require('./Models/VincularClienteCategoriaRequest');
const LiberarTodasAsCategoriasParaOClienteRequest =
  require('./Models/LiberarTodasAsCategoriasParaOClienteRequest');
const VincularClienteTabelaDePreORequest = require('./Models/VincularClienteTabelaDePreORequest');
const LiberarTodasAsTabelasDePreOParaOClienteRequest =
  require('./Models/LiberarTodasAsTabelasDePreOParaOClienteRequest');
const IncluirUmaRegraDeLiberaORequest = require('./Models/IncluirUmaRegraDeLiberaORequest');
const IncluirUmaTransportadoraRequest = require('./Models/IncluirUmaTransportadoraRequest');
const AlterarUmaTransportadoraRequest = require('./Models/AlterarUmaTransportadoraRequest');
const IncluirUmaCondiODePagamentoRequest = require('./Models/IncluirUmaCondiODePagamentoRequest');
const AlterarUmaCondiODePagamentoRequest = require('./Models/AlterarUmaCondiODePagamentoRequest');
const VincularClienteCondiODePagamentoRequest =
  require('./Models/VincularClienteCondiODePagamentoRequest');
const LiberarTodasAsCondiEsDePagamentoParaOClienteRequest =
  require('./Models/LiberarTodasAsCondiEsDePagamentoParaOClienteRequest');
const IncluirUmaFormaDePagamentoRequest = require('./Models/IncluirUmaFormaDePagamentoRequest');
const AlterarUmaFormaDePagamentoRequest = require('./Models/AlterarUmaFormaDePagamentoRequest');
const IncluirUmPedidoResponse = require('./Models/IncluirUmPedidoResponse');
const Iten = require('./Models/Iten');
const IncluirUmPedidoRequest = require('./Models/IncluirUmPedidoRequest');
const Extra = require('./Models/Extra');
const Iten1 = require('./Models/Iten1');
const QuantidadeGrade = require('./Models/QuantidadeGrade');
const AlterarUmPedidoRequest = require('./Models/AlterarUmPedidoRequest');
const Extra2 = require('./Models/Extra2');
const IncluirUmPedidoRequest2 = require('./Models/IncluirUmPedidoRequest2');
const Iten6 = require('./Models/Iten6');
const DescontosDePromoco = require('./Models/DescontosDePromoco');
const DescontosDePolitica = require('./Models/DescontosDePolitica');
const AlterarUmPedidoResponse = require('./Models/AlterarUmPedidoResponse');
const AlterarUmPedidoRequest2 = require('./Models/AlterarUmPedidoRequest2');
const Iten9 = require('./Models/Iten9');
const CadastrarStatusRequest = require('./Models/CadastrarStatusRequest');
const AlterarUmStatusRequest = require('./Models/AlterarUmStatusRequest');
const AlterarStatusDeUmPedidoRequest = require('./Models/AlterarStatusDeUmPedidoRequest');
const CadastrarTipoDePedidoRequest = require('./Models/CadastrarTipoDePedidoRequest');
const AlterarUmTipoDePedidoRequest = require('./Models/AlterarUmTipoDePedidoRequest');
const IncluirUmCampoExtraResponse = require('./Models/IncluirUmCampoExtraResponse');
const IncluirUmCampoExtraRequest = require('./Models/IncluirUmCampoExtraRequest');
const IncluirUmCampoExtraDoTipoListaResponse =
  require('./Models/IncluirUmCampoExtraDoTipoListaResponse');
const AlterarUmCampoExtraResponse = require('./Models/AlterarUmCampoExtraResponse');
const AlterarUmCampoExtraRequest = require('./Models/AlterarUmCampoExtraRequest');
const AlterarUmCampoExtraDoTipoListaResponse =
  require('./Models/AlterarUmCampoExtraDoTipoListaResponse');
const FaturarUmPedidoRequest = require('./Models/FaturarUmPedidoRequest');
const AlterarFaturamentoDoPedidoRequest = require('./Models/AlterarFaturamentoDoPedidoRequest');
const IncluirUmTTuloRequest = require('./Models/IncluirUmTTuloRequest');
const AlterarUmTTuloRequest = require('./Models/AlterarUmTTuloRequest');
const IncluirUmaConfiguraODeICMSSTRequest = require('./Models/IncluirUmaConfiguraODeICMSSTRequest');
const AjustarOEstoqueDeProduto422ResponseException =
  require('./Exceptions/AjustarOEstoqueDeProduto422ResponseException');
const IncluirUmaImagem412ResponseException =
  require('./Exceptions/IncluirUmaImagem412ResponseException');
const IncluirUmVNculoDeProdutoComTabelaDePreO412ResponseException =
  require('./Exceptions/IncluirUmVNculoDeProdutoComTabelaDePreO412ResponseException');
const AlterarUmVNculoDeProdutoComTabelaDePreO412ResponseException =
  require('./Exceptions/AlterarUmVNculoDeProdutoComTabelaDePreO412ResponseException');
const IncluirUmCliente412ResponseException =
  require('./Exceptions/IncluirUmCliente412ResponseException');
const AlterarUmCliente412ResponseException =
  require('./Exceptions/AlterarUmCliente412ResponseException');
const IncluirUmaNovaRede412ResponseException =
  require('./Exceptions/IncluirUmaNovaRede412ResponseException');
const AlterarUmaRedeExistente412ResponseException =
  require('./Exceptions/AlterarUmaRedeExistente412ResponseException');
const IncluirUmSegmento412ResponseException =
  require('./Exceptions/IncluirUmSegmento412ResponseException');
const AlterarUmSegmentoExistente412ResponseException =
  require('./Exceptions/AlterarUmSegmentoExistente412ResponseException');
const IncluirUmaTag412ResponseException = require('./Exceptions/IncluirUmaTag412ResponseException');
const AlterarUmaTagExistente412ResponseException =
  require('./Exceptions/AlterarUmaTagExistente412ResponseException');
const VincularClienteTags412ResponseException =
  require('./Exceptions/VincularClienteTags412ResponseException');
const IncluirUmaNovaCategoria412ResponseException =
  require('./Exceptions/IncluirUmaNovaCategoria412ResponseException');
const AlterarUmaCategoriaExistente412ResponseException =
  require('./Exceptions/AlterarUmaCategoriaExistente412ResponseException');
const VincularClienteCategoria412ResponseException =
  require('./Exceptions/VincularClienteCategoria412ResponseException');
const LiberarTodasAsCategoriasParaOCliente412ResponseException =
  require('./Exceptions/LiberarTodasAsCategoriasParaOCliente412ResponseException');
const VincularClienteTabelaDePreO412ResponseException =
  require('./Exceptions/VincularClienteTabelaDePreO412ResponseException');
const LiberarTodasAsTabelasDePreOParaOCliente412ResponseException =
  require('./Exceptions/LiberarTodasAsTabelasDePreOParaOCliente412ResponseException');
const IncluirUmaRegraDeLiberaO412ResponseException =
  require('./Exceptions/IncluirUmaRegraDeLiberaO412ResponseException');
const IncluirUmaTransportadora412ResponseException =
  require('./Exceptions/IncluirUmaTransportadora412ResponseException');
const AlterarUmaTransportadora412ResponseException =
  require('./Exceptions/AlterarUmaTransportadora412ResponseException');
const IncluirUmaCondiODePagamento412ResponseException =
  require('./Exceptions/IncluirUmaCondiODePagamento412ResponseException');
const AlterarUmaCondiODePagamento412ResponseException =
  require('./Exceptions/AlterarUmaCondiODePagamento412ResponseException');
const VincularClienteCondiODePagamento412ResponseException =
  require('./Exceptions/VincularClienteCondiODePagamento412ResponseException');
const LiberarTodasAsCondiEsDePagamentoParaOCliente412ResponseException =
  require('./Exceptions/LiberarTodasAsCondiEsDePagamentoParaOCliente412ResponseException');
const IncluirUmaFormaDePagamento412ResponseException =
  require('./Exceptions/IncluirUmaFormaDePagamento412ResponseException');
const AlterarUmaFormaDePagamento412ResponseException =
  require('./Exceptions/AlterarUmaFormaDePagamento412ResponseException');
const IncluirUmPedido412ResponseException =
  require('./Exceptions/IncluirUmPedido412ResponseException');
const AlterarUmPedido412ResponseException =
  require('./Exceptions/AlterarUmPedido412ResponseException');
const IncluirUmPedido412Response1Exception =
  require('./Exceptions/IncluirUmPedido412Response1Exception');
const AlterarUmPedido412Response1Exception =
  require('./Exceptions/AlterarUmPedido412Response1Exception');
const CancelarUmPedido412ResponseException =
  require('./Exceptions/CancelarUmPedido412ResponseException');
const CadastrarStatus412ResponseException =
  require('./Exceptions/CadastrarStatus412ResponseException');
const AlterarUmStatus412ResponseException =
  require('./Exceptions/AlterarUmStatus412ResponseException');
const AlterarStatusDeUmPedido412ResponseException =
  require('./Exceptions/AlterarStatusDeUmPedido412ResponseException');
const CadastrarTipoDePedido412ResponseException =
  require('./Exceptions/CadastrarTipoDePedido412ResponseException');
const AlterarUmTipoDePedido412ResponseException =
  require('./Exceptions/AlterarUmTipoDePedido412ResponseException');
const IncluirUmCampoExtra412ResponseException =
  require('./Exceptions/IncluirUmCampoExtra412ResponseException');
const IncluirUmCampoExtraDoTipoLista412ResponseException =
  require('./Exceptions/IncluirUmCampoExtraDoTipoLista412ResponseException');
const AlterarUmCampoExtra412ResponseException =
  require('./Exceptions/AlterarUmCampoExtra412ResponseException');
const AlterarUmCampoExtraDoTipoLista412ResponseException =
  require('./Exceptions/AlterarUmCampoExtraDoTipoLista412ResponseException');
const FaturarUmPedido412ResponseException =
  require('./Exceptions/FaturarUmPedido412ResponseException');
const AlterarFaturamentoDoPedido412ResponseException =
  require('./Exceptions/AlterarFaturamentoDoPedido412ResponseException');
const IncluirUmTTulo412ResponseException =
  require('./Exceptions/IncluirUmTTulo412ResponseException');
const AlterarUmTTulo412ResponseException =
  require('./Exceptions/AlterarUmTTulo412ResponseException');
const APIException = require('./Exceptions/APIException');


const initializer = {
    // functional components of APIDeIntegraOMercosLib
    Configuration,
    // controllers of APIDeIntegraOMercosLib
    APIController,
    // models of APIDeIntegraOMercosLib
    ObterTodosOsProdutosResponse,
    ObterUmProdutoEspecFicoResponse,
    IncluirUmProdutoRequest,
    AlterarUmProdutoResponse,
    AjustarOEstoqueDeProdutoRequest,
    AjustarOEstoqueDeProdutoRequest1,
    IncluirUmaImagemRequest,
    IncluirUmaImagemRequest1,
    Erro,
    ObterTodasAsTabelasDePreOResponse,
    ObterUmaTabelaDePreOResponse,
    IncluirUmaTabelaDePreORequest,
    AlterarUmaTabelaDePreORequest,
    IncluirUmVNculoDeProdutoComTabelaDePreORequest,
    AlterarUmVNculoDeProdutoComTabelaDePreORequest,
    IncluirUmClienteRequest,
    Email,
    Telefone,
    Contato,
    EnderecosAdicionai,
    AlterarUmClienteRequest,
    EnderecosAdicionai2,
    IncluirUmaNovaRedeRequest,
    AlterarUmaRedeExistenteRequest,
    IncluirUmSegmentoRequest,
    AlterarUmSegmentoExistenteRequest,
    IncluirUmaTagRequest,
    AlterarUmaTagExistenteRequest,
    VincularClienteTagsRequest,
    IncluirUmaNovaCategoriaRequest,
    AlterarUmaCategoriaExistenteRequest,
    VincularClienteCategoriaRequest,
    LiberarTodasAsCategoriasParaOClienteRequest,
    VincularClienteTabelaDePreORequest,
    LiberarTodasAsTabelasDePreOParaOClienteRequest,
    IncluirUmaRegraDeLiberaORequest,
    IncluirUmaTransportadoraRequest,
    AlterarUmaTransportadoraRequest,
    IncluirUmaCondiODePagamentoRequest,
    AlterarUmaCondiODePagamentoRequest,
    VincularClienteCondiODePagamentoRequest,
    LiberarTodasAsCondiEsDePagamentoParaOClienteRequest,
    IncluirUmaFormaDePagamentoRequest,
    AlterarUmaFormaDePagamentoRequest,
    IncluirUmPedidoResponse,
    Iten,
    IncluirUmPedidoRequest,
    Extra,
    Iten1,
    QuantidadeGrade,
    AlterarUmPedidoRequest,
    Extra2,
    IncluirUmPedidoRequest2,
    Iten6,
    DescontosDePromoco,
    DescontosDePolitica,
    AlterarUmPedidoResponse,
    AlterarUmPedidoRequest2,
    Iten9,
    CadastrarStatusRequest,
    AlterarUmStatusRequest,
    AlterarStatusDeUmPedidoRequest,
    CadastrarTipoDePedidoRequest,
    AlterarUmTipoDePedidoRequest,
    IncluirUmCampoExtraResponse,
    IncluirUmCampoExtraRequest,
    IncluirUmCampoExtraDoTipoListaResponse,
    AlterarUmCampoExtraResponse,
    AlterarUmCampoExtraRequest,
    AlterarUmCampoExtraDoTipoListaResponse,
    FaturarUmPedidoRequest,
    AlterarFaturamentoDoPedidoRequest,
    IncluirUmTTuloRequest,
    AlterarUmTTuloRequest,
    IncluirUmaConfiguraODeICMSSTRequest,
    // exceptions of APIDeIntegraOMercosLib
    AjustarOEstoqueDeProduto422ResponseException,
    IncluirUmaImagem412ResponseException,
    IncluirUmVNculoDeProdutoComTabelaDePreO412ResponseException,
    AlterarUmVNculoDeProdutoComTabelaDePreO412ResponseException,
    IncluirUmCliente412ResponseException,
    AlterarUmCliente412ResponseException,
    IncluirUmaNovaRede412ResponseException,
    AlterarUmaRedeExistente412ResponseException,
    IncluirUmSegmento412ResponseException,
    AlterarUmSegmentoExistente412ResponseException,
    IncluirUmaTag412ResponseException,
    AlterarUmaTagExistente412ResponseException,
    VincularClienteTags412ResponseException,
    IncluirUmaNovaCategoria412ResponseException,
    AlterarUmaCategoriaExistente412ResponseException,
    VincularClienteCategoria412ResponseException,
    LiberarTodasAsCategoriasParaOCliente412ResponseException,
    VincularClienteTabelaDePreO412ResponseException,
    LiberarTodasAsTabelasDePreOParaOCliente412ResponseException,
    IncluirUmaRegraDeLiberaO412ResponseException,
    IncluirUmaTransportadora412ResponseException,
    AlterarUmaTransportadora412ResponseException,
    IncluirUmaCondiODePagamento412ResponseException,
    AlterarUmaCondiODePagamento412ResponseException,
    VincularClienteCondiODePagamento412ResponseException,
    LiberarTodasAsCondiEsDePagamentoParaOCliente412ResponseException,
    IncluirUmaFormaDePagamento412ResponseException,
    AlterarUmaFormaDePagamento412ResponseException,
    IncluirUmPedido412ResponseException,
    AlterarUmPedido412ResponseException,
    IncluirUmPedido412Response1Exception,
    AlterarUmPedido412Response1Exception,
    CancelarUmPedido412ResponseException,
    CadastrarStatus412ResponseException,
    AlterarUmStatus412ResponseException,
    AlterarStatusDeUmPedido412ResponseException,
    CadastrarTipoDePedido412ResponseException,
    AlterarUmTipoDePedido412ResponseException,
    IncluirUmCampoExtra412ResponseException,
    IncluirUmCampoExtraDoTipoLista412ResponseException,
    AlterarUmCampoExtra412ResponseException,
    AlterarUmCampoExtraDoTipoLista412ResponseException,
    FaturarUmPedido412ResponseException,
    AlterarFaturamentoDoPedido412ResponseException,
    IncluirUmTTulo412ResponseException,
    AlterarUmTTulo412ResponseException,
    APIException,
};

module.exports = initializer;
