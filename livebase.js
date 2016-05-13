(function() {
    angular.module('livebase', ['firebase']);
})();

(function() {
    "use strict";
    angular.module('livebase')
        //Config
        .provide('livebase', function(){
            var db;
            return {
              setDb: function (value) {
                db = value;
              },
              $get: function () {
                return {
                  db: 'firebase'
                };
              }
            };
        })
        //Controllers
        .controller('LivebaseCtrl', function($scope, Bot) {
            $scope.lb.chats =Bot.all();
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
        .service('Bot', function($http, $q, $firebaseArray) {
            var chats=[];
            return ({
                send: function(text) {
                    var livebaseId = "";
                    chats.push({
                        id: Date.now().toString(),
                        text: text,
                        type: 'user'
                    });
                    if (localStorage.getItem("livebaseId")) {
                        livebaseId = "&convo_id=" + localStorage.getItem("livebaseId");
                    }
                    var url = "https://samsungiotacademy.com/livebase/gui/plain/bot.php?format=json&submit=Go&say=" + text + livebaseId;
                    $http.get(url)
                        .then(function(response) {
                            if (!livebaseId) {
                                localStorage.setItem("livebaseId", response.data.convo_id);
                            }
                            var res = response.data.botsay;
                            for (var script = /<script\b[^>]*>([\s\S]*?)<\/script>/gm, scriptCap = /<Script\b[^>]*>([\s\S]*?)<\/Script>/gm,
                                    scr; scr = script.exec(res);) res = res.split(scr[0]).join("").trim(), eval(scr[1]);
                            for (; scr = scriptCap.exec(res);) res = res.split(scr[0]).join("").trim(), eval(scr[1]);
                            chats.push({
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
