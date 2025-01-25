# Comentários do Projeto

Estarei iniciando organizando as pastas, arquivos, e verificando todas as partes obrigatórias para o projeto.

Análisando a documentação do  [https://developer.themoviedb.org/reference/intro/getting-started](https://developer.themoviedb.org/reference/intro/getting-started) para entender quais funções mais se adequam ao projeto.

Escolhi a utilizando do [https://tailwindcss.com/docs](https://tailwindcss.com/docs) TailwindCSS para diminuir a escrita de arquivos CSS e poupar tempo.

Como vou possuír dados de apis como API Key e etc, estarei utilizando um arquivo .env para garantir não subir para o GITHUB/REPOSITÓRIO esses dados mais sensíveis.

Resolvi iniciar o desenvolvimento pelos componentes visuais, começando pelo SearchInput e após isso o SuggestionsList. 
Após a finalização dos componentes iniciarei a parte de integração com API. Penso em criar um arquivo de API com o axios e ja criando um base para não precisar ficar repetindo a URL nem tokens/api-key


Após finalizar os componentes visuais criei um hooks para as chamadas de API chamado useApiServices.tsx aonde iniciailizei o axios com parametro de url e apikey pré definidos.

Resolvi usar tipagem para garantir os dados que estou recebendo da API, e manter mais organizado as inforamções que eu tenho nos retornos.

Esqueci de commitar as primeiras coisas que fiz, deixei para commitar agora.. Vou assegurar que os próximos commits sejam mais pontuais para conseguirmos acompanhar a linha do tempo.

Notei que as buscas podem trazer filmes com o mesmo nome, e meu suggestionList estava destacando mais que um filme. Estou pensando em separar o item exato que foi encontrado do resto da listagem, até para garantir que ele seja exibido primeiro. No momento atual ele pode ser exibido no meio da lista.

A separação funcionou, usei uma abordagem para encontrar o primeiro elemento que da match utilizando o find.

Encontrei um outro problema que me incomodou também, a recomendação de auto preencher que fiz pega o primeiro item de retorno da api, que não necessáriamente começa com a letra que foi inserida. Estou pensando em ordenar o retorno da API, ou testar se um delay para buscar o que foi digitado resolveria.


Fiz a implementação do delay para busca da query, porém não resolveu o problema de diferenciação do que foi escrito pro q foi retornado como autocomplete. Vou tentar fazer a ordenração, e manterei o delay na busca para uma usuabilidade melhor.

Um sort de a - b funcionou para ordenar o retorno da api e garantir que o autocomplete siga o que tem como próxima opcão.

Percebi que meu componente está com códigos demais para um componente, preciso organizar isso, mas vou deixar para fazer quando finalizar tudo.

Estava analisando o layout do figma, para ajustar algumas coisas no projeto que não estão finalizadas e esbarrei no problema de que o filme em destaque traz o genero escrito, enquanto no search que utilizei os generos veem em formato de id. 
Vou olhar melhor a api, mas acredito que vou seguir umas das opções : Fazer um get dos detalhes do filme destaque, que trazem essa informação escrita. Ou criar uma lista com todas os generos/id.

Dentro da api encontrei um get com a listagem de generos e seus ids. É uma lista pequena de 19 generos, pensei em criar um arquivo e fazer a consulta localmente, porém pensando em um sistema que não quebre, criei um contexto que faz essa chamada uma vez ao iniciar para que sempre esteja a lista atualizada e caso sejam criados novos generos, o sistema não quebre.

Percebi que as tipagens direto nos arquivos estavam me incomodando, e por se repetir em alguns componentes, resolvi separar em uma pasta de types. 

Comecei a adicionar icones que havia esquecido, percebi que não tenho acesso para exportar as imagens do figma, pensei em utilizar o  [https://heroicons.com/](https://heroicons.com/) Heroicons que possui SVGs próximos ao do layout. 

Percebi que meu search busca apenas filmes, existe um endpoint para buscar TV Shows e Filmes dentro da api, porém o retorno vem com um objeto diferente. 

Parece que quando é filme retorna o nome dentro de um title:'nome' e quando é uma série/tv show o objeto traz como name:'nome'. Não sei como vou resolver isso ainda. Vou pensar mais pra frente.

Preciso adicionar os icones de favorito. Ainda não pensei como vou fazer a interação para adicionar o favorito e manter salvo. Meu primeiro pensamento mais óbvio foi o LocalStorage, mas não sei se vou manter isso. Posso criar uma sessão para esse usuario através da api do moviedb. Vou pensar nisso mais pra frente.


Novo dia, novos focos. Hoje acordei pensando em fazer a páginação dos filmes, conforme o usuário scrolla a lista. Meu primeiro pesamento foi usar o useRef do react para criar uma referencia dessa lista e controlar através de um useEffect medindo o scroll que foi feito, o tamanho do scroll e calcualr se chegou no fim. Provavelmente vou seguir nessa ideia. 

a ideia do useRef funcionou muito bem, pensei em adicionar um loading no final do scroll para não ficar esse gap de apenas carregar mais objetos sem nenhum aviso pro usuario. 

Percebi que não tinha visto que o projeto precisava estar configurado com o docker, então vou fazer aqui uma configuração para seguir o pedido. 

Apeasr de nunca ter configurado um docker, após ler algumas docs achei super tranquilo. Docker configurado!

