# ResonateTakeHome

Design and implement a conversational AI chatbot for a dental practice that can effectively assist patients with their needs, guide them toward booking appointments, and seamlessly handle complex scenarios.


## First Time Setup

Before you start, you might need to install

```sh
npm install --global nx@latest
```

Next, navigate to the project directory, install dependencies

```sh
npm install
```

Update Env File in `apps/api-server/.env`

```sh
Rename apps/api-server/.env.template .env and add the OPENAI Key
```

To run the client dev server for your app, use:

```sh
npx nx serve chat-bot
```

To run the api dev server for your app, use:

```sh
npx nx serve api-server
```

To create a production bundle:

```sh
npx nx build chat-bot
```

To see all available targets to run for a project, run:

```sh
npx nx show project chat-bot
```
