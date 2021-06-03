acesse https://tatakae-backend.herokuapp.com/scheduler/search

#INSTALAÇÃO POSTGRES

É necessário ter uma instancia do postgres rodando, no meu caso a mesma esta rodando na aws e foi instalada utilizando o compose do docker.

- Crie uma instancia grátis utilizando ubuntu 20.04 com a t2.micro na aws, ou a que estiver atualmente gratis, caso voce nao tenha crie um conteiner docker apenas e rode localmente ou pague uma instancia.

- Docker Install

sudo apt-get update
sudo apt install docker.io
sudo systemctl enable docker
sudo systemctl start docker

- Docker-compose Install

sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

- crie o arquivo .env com as variavels de ambiente que contem a configuração do seu postgres.
  EX:
  POSTGRES_USER=dbuser
  POSTGRES_PASSWORD=1234
  POSTGRES_DB=dbname
  POSTGRES_HOSTNAME=postgres

- voce tera que habilitar o firewall e as portas necessárias.

ufw enable
ufw allow ssh
ufw allow 5432

- libere as portas de segurança na sua instancia e adicione um ip estático a mesma(ip fixo), isso vai ficar por sua conta :).

- se conecte a esta instancia remotamente com ssh e utilize uma ferramenta para se conectar ao banco postgres, eu recomendo dbeaver.

#API

- antes de inicializar a api voce deve criar as entidades no banco de dados, apenas rode o comando npm run migration:run e voce terá todos as tabelas configuradas.

- para iniciar a api apenas rode npm run dev ou npm dev dependendo da sua versão do npm.

Rotas:

- acesse a rota /scheduler/downloadAll para inicializar o download de todos os torrents até o ano de 2020, verifique no seu banco de dados se as informações estão la em Animes/Torrents.
