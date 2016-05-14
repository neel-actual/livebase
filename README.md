# Livebase
Chat bot for Angular
## Installation
### Bower
1. Install from bower `bower install livebase angularfire`
2. Include Livebase module and configure your settings

```javascript
angular.module('App', ['livebase'])
  .config(function($livebaseProvider){
    $livebaseProvider.url(FIREBASE_URL);
    $livebaseProvider.tell([
      { cmd:"Hello", reply:"Hello, may I know your name?" }
    ]);
```
3. Include libraries

```html
<script src="https://cdn.firebase.com/js/client/2.4.0/firebase.js"></script>
```

### Direct
## Usage
TODO: Write usage instructions
## License
TODO: Write license
