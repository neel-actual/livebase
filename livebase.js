(function(){
   angular.module('livebase', []);
})();

(function(){
 "use strict";
  angular.module('livebase')
    .controller('myctrl', ['dep1', function(dep1){
      //..
    }])
    .service('myservice', ['dep2', function(dep2){
    //...
    }]);
})();
