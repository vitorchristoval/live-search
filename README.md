# Live Search with MovieDB API

Este é um projeto de **Live Search** que utiliza a API do **MovieDB** (The Movie Database) para buscar filmes em tempo real, à medida que o usuário digita. A aplicação foi configurada para rodar dentro de containers Docker, facilitando o setup e a execução.

## Requisitos

Antes de começar, verifique se você tem os seguintes pré-requisitos instalados:

- [Docker](https://www.docker.com/get-started)
- [Make](https://www.gnu.org/software/make/)

## Configuração

1. Clone este repositório:

    ```bash
    git clone https://github.com/vitorchristoval/live-search.git
    cd live-search
    ```

2. Crie um arquivo `.env.local` na raiz do projeto e adicione sua `API_KEY` do MovieDB:

    ```makefile
    API_KEY=your_movie_db_api_key
    ```

   Para obter sua API Key, registre-se no [MovieDB](https://www.themoviedb.org/) e gere uma chave de API.

3. Execute o setup do Docker utilizando o comando `make setup`:

    ```bash
    make setup
    ```

   Esse comando vai construir as imagens Docker necessárias para rodar a aplicação.

## Execução

Para rodar a aplicação, utilize o comando:

```bash
make run
```
O Docker irá iniciar os containers e a aplicação ficará disponível no seu navegador. O frontend irá se comunicar com a API do MovieDB e exibir resultados de busca enquanto você digita.

## Como funciona?
O projeto utiliza a API do MovieDB para realizar buscas por filmes em tempo real.

Ao digitar no campo de pesquisa, o frontend faz requisições para o backend, que consulta a API do MovieDB.

Os resultados são exibidos instantaneamente na interface.

## Estrutura do Projeto
backend: Responsável pela comunicação com a API do MovieDB.

frontend: Interface de usuário para realizar as buscas.

docker: Configuração do ambiente Docker.

Makefile: Automação de comandos para facilitar o setup e a execução do projeto.



