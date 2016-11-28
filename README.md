
## Linkedin Profile Parser
Tool to parse Linkedin profiles and save for later use.


## Prerequisites

- Node.js with NPM
- gulp
- Docker
- Docker Compose

## Deploy

    npm run build-docker
    npm run test-docker
    npm run start-docker
    
    
## Stop
    npm run stop-docker
    
## Deploy Without Docker
    npm install
    gulp build

Edit `config.json` to meet your configuration, then:

    npm test
    npm start

On another terminal run (to run the parsing worker in the background):

    npm run profile-fetcher

Now you may go to: <http://localhost:80>

## API documentation
    /docs
    
    
### Tested on Chrome 56