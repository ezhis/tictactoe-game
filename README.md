# Tic Tac Toe 
Simple tic-tac-toe game, implemented using React, Redux and Docker.
All actions are logged in separate backend. Backend project is available here: 

Logs are displayed under the game, and these logs are taken back from Backend using SSE (server send events). 

## Start application locally
```
# intall npm-modules
yarn install

# start application
yarn dev
```

## Build docker image
```
docker build -t <image-tag> .

# docker build -t tictactoe .
```

## Run docker image
Inside application default port is 8081.

```
docker run -p <port>:8081 -e API_URL='<backend-url>' tictactoe

# docker run -p 9000:8081 -e API_URL='http://localhost:8080' tictactoe
# application will awailable at http://localhost:9000 
```


## Whats left: 
- missing `dockerginore`. Now it copies whole client and server folders
- `docker-comspose` is not configured properly. It runs, but react app shuld be built at first. App is not updating itself on code change.