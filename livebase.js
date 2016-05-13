(function() {
    angular.module('livebase', ['firebase']);
})();

(function() {
    "use strict";
    angular.module('livebase')
        //Config
        .provider('$livebase', function(){
            var fburl=false;
            return {
              url:function(val){
                  fburl=val;
              },
              $get: function () {
                return {
                      url:fburl
                };
              }
            };
        })
        //Controllers
        .controller('LivebaseCtrl', function($scope, Bot) {
            $scope.chats =Bot.all();
            $scope.lb.send = function() {
                if ($scope.lb.input) {
                    Bot.send($scope.lb.input);
                    $scope.lb.input = '';
                }
            }
            $scope.lb.enter = function($event) {
                if ($event.keyCode === 13 && $scope.lb.input) {
                    Bot.send($scope.lb.input);
                    $scope.lb.input = '';
                }
            }
        })

        //Directives
        .directive('livebase', function() {
            return {
                restrict: 'E',
                controller: 'LivebaseCtrl',
                controllerAs: 'lb',
                transclude:true,
                template: '<ng-transclude></ng-transclude>'
            }
        })
        .directive('lbInput', function(){
            return {
                require:"livebase",
                restrict:'E',
                replace:true,
                template:'<input type="text" ng-model="lb.input" ng-keydown="lb.enter($event)">'
            }
        })
        .directive('lbSend',function(){
            return{
                require:'livebase',
                restrict:'E',
                replace:true,
                template:'<button ng-click="lb.send()">Send</button>'
            }
        })
        //Services
        .service('Bot', function($http, $q, $firebaseArray, $livebase) {
            var chats=[];
            if(!localStorage.getItem('livebaseid')){
                localStorage.setItem('livebaseid', Date.now().toString()+(Math.floor(Math.random() * 100000) + 1));
            }
            var ref=new Firebase($livebase.url+localStorage.getItem('livebaseid'));
            chats=$firebaseArray(ref);
            return ({
                send: function(text) {
                    chats.$add({
                        id: Date.now().toString(),
                        text: text,
                        type: 'user'
                    });
                    var url = "https://samsungiotacademy.com/livebase/gui/plain/bot.php?format=json&submit=Go&say=" + text + localStorage.getItem('livebaseid');
                    $http.get(url)
                        .then(function(response) {
                            var res = response.data.botsay;
                            for (var script = /<script\b[^>]*>([\s\S]*?)<\/script>/gm, scriptCap = /<Script\b[^>]*>([\s\S]*?)<\/Script>/gm,
                                    scr; scr = script.exec(res);) res = res.split(scr[0]).join("").trim(), eval(scr[1]);
                            for (; scr = scriptCap.exec(res);) res = res.split(scr[0]).join("").trim(), eval(scr[1]);
                            chats.$add({
                                id: Date.now().toString(),
                                text: res,
                                type: 'bot'
                            });
                        });
                },
                all: function() {
                    return chats;
                }
            })
        })
    ;
})();
