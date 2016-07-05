# Node.js + Docker + Google Cloud Platform + Heroku

## Install Tools

### iTerm2 (for Mac)

1. Download [iTerm2](https://www.iterm2.com/)
2. Install (Extract Zip and Drag to Application)


### Docker Toolbox (Kitematic)

- Download [Docker Toolbox](https://www.docker.com/products/docker-toolbox)
- Install
- Open Docker Toolbox
- Open Docker CLI
- Check Docker

> Command
> 
```shell
docker -v
```
----
> Output
> 
```Docker version 1.11.2, build b9f10c9```


### Docker Toolbox (Docker for Mac and Windows)

- Download [Docker for Mac](https://docs.docker.com/docker-for-mac/)
- Install
- Open Docker
- Open Docker CLI
- Check Docker

> Command
> 
```shell
docker -v
```
----
> Output
> 
```Docker version 1.12.0-rc2, build 906eacd, experimental```


### Node.js & NPM

- Download Node.js (Select One)
  - Download the [Macintosh Installer](https://nodejs.org/en/#download)
  - Use [Homebrew](http://brew.sh/)
    - ```brew install node``` 

- Check Node.js

> Command
> 
```shell
node -v
```
----
> Output
> 
```v6.2.2```

- Check NPM

> Command
> 
```shell
npm -v
```
----
> Output
> 
```3.9.5```


# Node.js

## Create Node.js Project

- Create Project

> Command
> 
```shell
mkdir jstest
cd jstest
npm init --yes
```

- Check ```package.json```

> Command
> 
```shell
vi package.json
```
----
> View
> 
```json
{
  "name": "jstest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```


## Make and Run

- Edit

> Commad
> 
```shell
vi index.js
```
----
> Edit
> 
```node
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
server.listen(port, hostname, () => {
  console.log('Server running at http://${hostname}:${port}/');
});
```

- Run

> Command
>
```shell
node index.js &
```
----
> Output
> 
```Server running at http://127.0.0.1:3000/```

- Check

> Command
>
```shell
open http://127.0.0.1:3000
```
----
> Output
> 
```
Hello World!
```


## Install Module (Express)

- Install Express

> Command
>
```shell
npm install express --save
```

- Check ```package.json```

> Command
>
```shell
vi package.json
```
----
> View
>
```json
{
  "name": "jstest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.14.0"
  }
}
```

- Edit
> Command
> 
```shell
vi index.js
```
----
> Edit
> 
```node
var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 3000));
app.get('/', function (req, res) {
  res.end('Hello World from Express!');
});
app.listen(app.get('port'), function () {
  console.log('Example app listening on port', app.get('port'));
});
```

- Run

> Command
> 
```shell
node index.js &
```
----
> Output
> 
```Example app listening on port 3000!```

- Check

> Command
> 
```shell
open http://127.0.0.1:3000
```
----
> Output
> 
```
Hello World from Express!
```


# Docker

## Create And Run Docker Image

- Open **Docker CLI**

- Create Dockerfile

> Command
> 
```shell
vi Dockerfile
```
----
> Edit
> 
```
FROM node:4-onbuild
EXPOSE 8888
```

- REF: [node:4-onbuild](https://github.com/docker-library/docs/blob/master/node/tag-details.md#node4-onbuild)

- Build Image

> Command
> 
```shell
docker build -t jstest .
```

- Check Image

> Command
> 
```shell
docker images
```
----
> Output
> 
```
REPOSITORY          TAG                 IMAGE ID            CREATED              SIZE
jstest              latest              822b6bc5446d        About a minute ago   661.3 MB
node                4-onbuild           b4daab8aa78d        8 days ago           656.8 MB
```

- Run Docker

> Command
> 
```shell
docker run -it --rm --name jstest jstest
```
----
> Output
> 
```
npm info it worked if it ends with ok
npm info using npm@2.15.5
npm info using node@v4.4.5
npm ERR! Linux 4.4.12-boot2docker
npm ERR! argv "/usr/local/bin/node" "/usr/local/bin/npm" "start"
npm ERR! node v4.4.5
npm ERR! npm  v2.15.5
npm ERR! missing script: start
npm ERR!
npm ERR! If you need help, you may report this error at:
npm ERR!     <https://github.com/npm/npm/issues>
npm ERR! Please include the following file with any support request:
npm ERR!     /usr/src/app/npm-debug.log
```

- Troubleshooting

> Command
> 
```shell
vi package.json
```
----
> Edit
> 
```json
{
  "name": "jstest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.14.0"
  }
}
```

- Build and Run Docker

> Command
> 
```shell
docker build -t jstest .
docker run -it --rm --name jstest jstest
```
----
> Output
> 
```
npm info it worked if it ends with ok
npm info using npm@2.15.5
npm info using node@v4.4.5
npm info prestart jstest@1.0.0
npm info start jstest@1.0.0
> jstest@1.0.0 start /usr/src/app
> node index.js
Example app listening on port 3000!
```

- Check

> Command
> 
```shell
open http://127.0.0.1:3000
```
----
> Output
> 
```
127.0.0.1 拒絕連線。
```

- Troubleshooting

> Command
> 
```shell
docker run -it --rm -p 8888:3000 --name jstest jstest
```
----
> Output
>
```
Hello World!
```

- With npm

> Command
> 
```shell
vi package.json
```
----
> Edit
> 
```json
{
  "name": "jstest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js",
    "build": "docker build -t jstest .",
    "local": "docker run -it --rm -p 8888:3000 --name jstest jstest"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.14.0"
  }
}
```


## Google Cloud Platform

### Tools

- Download [Google Cloud SDK](https://cloud.google.com/sdk/docs/quickstart-mac-os-x)

- Extract

- Install

> Command
> 
```shell
./google-cloud-sdk/install.sh
```

- Initialize

> Command
> 
```shell
gcloud init
```

- Login (Optional)

> Command
>
```shell
gcloud auth login
```

- Logout (Optional)

> Command
> 
```shell
gcloud auth revoke
```

- Google App Engine Setting File

> Command
> 
```shell
vi app.yaml
```
----
> Edit
> 
```
runtime: custom
vm: true
```

- Deploy

> Command
> 
```shell
gcloud preview app deploy --project PROJECT-NAME
```


- With npm

> Command
> 
```shell
vi package
```
----
> Edit
> 
```json
{
  "name": "jstest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js",
    "build": "docker build -t jstest .",
    "local": "docker run -it --rm -p 8888:3000 --name jstest jstest",
    "deploy": "gcloud preview app deploy --project PROJECT-NAME"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.14.0"
  }
}
```

- Run

> Command
> 
```shell
npm run deploy
```

- Check

> Command
> 
```shell
open http://PROJECT-NAME.appspot.com
```
----
> Output
> 
```
Hello World!
```


## Heroku

### Install

- Download [Heroku Toolbelt](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

- Install

> Command
> 
```shell
heroku login
```
----
> Output
> 
```
heroku-toolbelt/3.43.2 (x86_64-darwin10.8.0) ruby/1.9.3
heroku-cli/5.2.21-1a1f0bc (darwin-amd64) go1.6.2
```

- Login to Heroku

> Command
> 
```shell
heroku login
```

- Initial Git

> Command
> 
```shell
git init
wget https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore
mv Node.gitignore .gitignore
git add .
git commit -m "Init"
```

- Create Project

> Command
> 
```shell
heroku create
```
----
> Output
> 
```
Heroku CLI submits usage information back to Heroku. If you would like to disable this, set `skip_analytics: true` in /Users/litsungyi/.heroku/config.json
Creating app... done, ⬢ gentle-garden-39042
https://gentle-garden-39042.herokuapp.com/ | https://git.heroku.com/gentle-garden-39042.git
```

- Deploy

> Command
> 
```shell
git push heroku master
```

