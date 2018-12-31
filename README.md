# Projet API NodeJS

Projet d'API sous NodeJS avec SQLite donné en cours à Ynov Informatique.

## Installation

Cloner ce dépot avec [git](https://git-scm.com/downloads)

```bash
git clone https://github.com/AxelPariss/nodejs-api-ynov
```

Installer les packages utilisés
```bash
npm install
```

## Données

Les données sont stockées dans une base de données SQLite nommée **api.db**. Pour parcourir cette base de données :

```bash
sqlite3 api.db
```

Vous trouverez 2 tables :

### Users
**userId** | firstname | lastname | username | password | email | password | createdAt | updatedAt
--- | --- | --- | --- | --- | --- | --- | --- | ---
Interger (AI) | Varchar | Varchar | Varchar | Varchar | Varchar | Varchar | Datetime | Datetime

### Todos
***userId*** | name |completion | created_at | updated_at
--- | --- | --- | --- | ---
Integer | String | Integer | Datetime | Datetime

## API

Vous pouvez utiliser tous ces verbes HTTP en acceptant du HTML ou du JSON. Pour accepter du JSON, ajouter dans vos headers le header suivant:
```
Accept: application/json
```

### Users

- **[<code>GET</code> users](localhost:3000/users)**
- **[<code>GET</code> users/:id](localhost:3000/users/{id})**
- **[<code>POST</code> users](localhost:3000/users)**
- **[<code>PUT</code> users/:id](localhost:3000/users/{id})**
- **[<code>DELETE</code> users/:id](localhost:3000/users/{id})**
- **[<code>GET</code> users/add](localhost:3000/users/add)**
- **[<code>DELETE</code> users/:id/edit](localhost:3000/users/{id}/edit)**
- **[<code>DELETE</code> users/:id/todos](localhost:3000/users/{id}/todos)**

### Todos

- **[<code>GET</code> todos](localhost:3000/todos)**
- **[<code>GET</code> todos/:id](localhost:3000/todos/{id})**
- **[<code>POST</code> todos](localhost:3000/todos)**
- **[<code>PUT</code> todos/:id](localhost:3000/todos/{id})**
- **[<code>DELETE</code> todos/:id](localhost:3000/todos/{id})**
- **[<code>GET</code> todos/add](localhost:3000/todos/add)**
- **[<code>DELETE</code> todos/:id/edit](localhost:3000/todos/{id}/edit)**

## License
[MIT](https://choosealicense.com/licenses/mit/)