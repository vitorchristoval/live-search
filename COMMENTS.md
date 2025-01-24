# Comentários do Projeto

Estarei iniciando organizando as pastas, arquivos, e verificando todas as partes obrigatórias para o projeto.

Análisando a documentação do  [https://developer.themoviedb.org/reference/intro/getting-started](https://developer.themoviedb.org/reference/intro/getting-started) para entender quais funções mais se adequam ao projeto.

Escolhi a utilizando do [https://tailwindcss.com/docs](https://tailwindcss.com/docs) TailwindCSS para diminuir a escrita de arquivos CSS e poupar tempo.

Como vou possuír dados de apis como API Key e etc, estarei utilizando um arquivo .env para garantir não subir para o GITHUB/REPOSITÓRIO esses dados mais sensíveis.

Resolvi iniciar o desenvolvimento pelos componentes visuais, começando pelo SearchInput e após isso o SuggestionsList. 
Após a finalização dos componentes iniciarei a parte de integração com API. Penso em criar um arquivo de API com o axios e ja criando um base para não precisar ficar repetindo a URL nem tokens/api-key


Após finalizar os componentes visuais criei um hooks para as chamadas de API chamado useApiServices.tsx aonde iniciailizei o axios com parametro de url e apikey pré definidos.

Resolvi usar tipagem para garantir os dados que estou recebendo da API, e manter mais organizado as inforamções que eu tenho nos retornos.