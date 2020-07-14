# Chat App - React, Node, MySql

![Chat app preview](chat-flow.gif)

## Created by: Orit Kozolin

<hr>

## App requirenments

## Flow Design

Take a closer look
[here](https://miro.com/app/board/o9J_kpPhOIM=/)

![Chat app UX flow](chat-app-ux-flow.png)
![Chat app socket flow](chat-app-socket-flow.png)

## Tech Stack

- Client: React + Material UI
- Server: Express (Node)
- DB: MySql with ORM (Sequelize)

<hr>

## Getting Started

### <b>Development mode</b>

```bash
cd server-chat-app
npm run dev
```

The script above will automaticly run both client and server, using the 'concurrently' package. Alternatively you can run them seperatly by the following scripts:

- For the Client

```bash
npm run client
```

- For the Server

```bash
npm start
```

- ports

Client: http://localhost:3000

Server: http://localhost:3002

### <b>Production mode</b>

Deployed on Heruko
