# Livebase
Chat bot for Angular
## Installation
### Bower
1. Install from bower `bower install livebase`
2. Include Livebase module and configure your settings

`angular.module('App', ['livebase'])`

  `.config(function($livebaseProvider){`
  
    `$livebaseProvider.url(FIREBASE_URL);`
    
    `$livebaseProvider.tell([`
    
      `{ cmd:"Hello", reply:"Hello, may I know your name?" }`
    `]);`
### Direct
## Usage
TODO: Write usage instructions
## License
TODO: Write license
