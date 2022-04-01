**VS Code settings.json**

```json
 "[javascript]": {
   "editor.codeActionsOnSave": {
     "source.fixAll.eslint": true
   }
 },
 "[javascriptreact]": {
   "editor.codeActionsOnSave": {
     "source.fixAll.eslint": true
   }
 },
 "[typescript]": {
   "editor.codeActionsOnSave": {
     "source.fixAll.eslint": true
   }
 },
 "[typescriptreact]": {
   "editor.codeActionsOnSave": {
     "source.fixAll.eslint": true
   }
 }
```

**Plugins ESLint**
https://github.com/sindresorhus/eslint-plugin-unicorn
https://github.com/SonarSource/eslint-plugin-sonarjs
https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin
https://airbnb.io/javascript/

NÃO habilitar o prettier como formatter default

Adicionar ESLint config

## Prisma

Sistema ORM que vai fazer a abstração do nosso banco de dados do Postgres para o nosso código em TypeScript. A documentação oficial pode ser encontrada [aqui](https://www.prisma.io/).

### Schema

Esse ORM faz a abstração das tabelas através de um arquivo que contém um schema (`/prisma/schema.prisma`), dessa forma nosso banco de dados estará totalmente representado em um sistema de entidades/modelos acessíveis como objetos no código. Sendo assim, qualquer alteração feita no nesse schema, resultará em uma alteração nas propriedades acessíveis pelo TypeScript.

### Introspection

Acontece que como o nosso banco de dados já existe, foi feito o processo de _Introspection_ que cria esse schema a partir dos dados existentes (ao contrário de um procedimento usual).
A funcionalidade é executada através do seguinte comando:

```bash
npx prisma db pull
```

Com esse comando, o Prisma irá se conectar ao banco de dados, ler as tabelas e criar um schema correspondente. Algumas alterações manuais podem ser necessárias a fim de corrigir ou mapear formatos de nomes de colunas e variáveis.

Após isso, para futuras mudanças, essas devem ser criadas manualmente no schema, que por sua vez criará uma migrations correspondente para poder ser feito a atualização do banco e o versionamento da alteração.

### Migrations

Sistema de geração de código SQL que é executado contra o banco de dados criando alteração estruturais - execução de DDLs.

#### Migration Inicial

Como o nosso banco de dados passou pelo processo de _Introspection_, isso significa que o schema foi gerado a partir do banco e não ao contrário como se espera em um processo normal. Isso faz com que a gente precise sincronizar as migrations para que as futuras alterações não conflitem com o que já temos no banco.
Para isso, logo após corrigir o **schema** gerado pelo `npx prisma db pull` é preciso criar uma migration que represente esse estado atual, mas sem executar, uma vez que o banco já se encontra com a estrutura. Sendo assim, vamos executar o comando:

```bash
npx prisma migrate dev --name initial-migration --create-only
```

Esse comando vai gerar uma migration contendo um SQL que vai representar todo o **schema** e consequentemente a estrutura do banco de dados. A flag `--name` configura o nome da migration e a flag `--create-only` faz com que as migrations seja criada mas não executada.

##### Para ignorar a migration inicial de um projeto em andamento

Para que essa migration que representa o seu banco em estado atual não seja executada, e portanto não sobrescreva os dados já existentes, é preciso executar o seguinte comando:

```bash
npx prisma migrate resolve --applied nome_da_pasta_que_armazena_a_migration
```

Com isso essa migration vai ser inserida na tabela de migrations executas, porém sem ser executada de fato contra o banco de dados

#### Nova migration / Alterações no schema

Caso seja necessário fazer alguma alteração estrutural do banco de dados, é necessário fazer uma migration nova para executar essa alteração no banco e registrar no histórico de alterações. Para isso basta fazer a alteração no arquivo do `/prisma/schema.prisma` e então rodar o comando:

```bash
prisma migrate dev --name added_job_title
```

Esse comando irá criar uma nova migrations dentro da pasta `/prisma/migrations` e irá rodar o seu conteúdo contra o banco de dados

#### Migration para recursos NÃO suportados nos schema do Prisma

Alguns recursos utilizados em banco de dados não são representados no conceito de `schema` do Prisma, tais como _stored procedures, triggers, views, partial index, etc._ porém ainda é possível criá-los pelos sistema de migrations (altamente recomendado para poder ser ter um histórico de formação do banco de dados).

Para isso basta executar o comando:

```bash
npx prisma migrate --name migration-name --create-only
```

Vai ser criado uma nova migration na pasta `/prisma/migrations` onde você pode incluir os seus recursos, por exemplo:

```sql
CREATE UNIQUE INDEX tests_success_constraint ON posts (subject, target)
WHERE success;
```

Você vai aplicar essa migration utilizando o comando normal

```bash
npx prisma migrate dev
```

#### Considerações sobre Migrations

<b style="color:#FF0000">NUNCA ALTERE UMA MIGRATION QUE JÁ FOI EXECUTADA.</b> Caso você perceba que cometeu um erro na sua migration, é preciso entender o ambiente em que esse erro foi identificado (desenvolvimento ou produção) e corrigir de acordo, mas em nenhuma hipótese a migration executada deve ser alterada.

Caso você tenha alterado o `schema.prisma` e queria verificar o SQL antes de rodar a migration, basta seguir esse procedimento do `Migration para recursos NÃO suportados nos schema do Prisma`

O conceito de Migrations é para manter um versionamento do banco de dados, e não para desenvolvimento/prototipação. Para prototipação de novas estruturas de banco de dados, consultar essa [documentação](https://www.prisma.io/docs/guides/database/prototyping-schema-db-push)

<u>Em um ambiente de desenvolvimento</u>, seja ele considerando um banco de dados local (Docker), ou núvem (importante que esse banco não contenha dados utilizados em produção), pode acontecer de o **schema** do Prisma e do banco entrem em conflito devido a alterações e/ou procedimentos realizados de forma inadequada. Nessas situações o Prisma recomenda que todo banco de dados seja reiniciado e que todas as migrations sejam executadas novamente. (Oh shit :scream: What about my data?)

Documentação detalhada do [Prisma Migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate)

### Seed

Sistema que insere dados "aleatórios" no banco de dados a fim de preencher as tabelas para que se tenha algum insumo para testes e outras coisas. É uma ferramenta para ser utilizada exclusivamente para o ambiente de desenvolvimento.

As alterações devem ser executas pelo arquivo `/prisma/seed.ts` colocando os dados que devem ser inseridos. Para executar a funcionalidade basta rodar o comando

```bash
npx prisma db seed
```

O sistema de seed roda automaticamente nas seguintes situações:

- Ao rodar o comando `npx prima migrate reset` (<b style="color:#FF0000">NUNCA USE ESSE COMANDO EM AMBIENTE DE PRODUÇÃO</b> viu Laura)
- Ao rodar o comando `npx prisma migrate dev` e este comando interativamente resetar o banco de dados - acontece quando há uma diferença, ou conflito entre banco de dados e o histórico de migrations
  
_OBS: Para evitar este comportamento automático, basta rodar os comandos acima juntamente com a opção `--skip-seed`_

Documentação detalhada do [Prisma Seed](https://www.prisma.io/docs/guides/database/seed-database)
