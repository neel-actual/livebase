# Livebase
Chat bot for Angular. Designed so that developer could focus on UI and personalization of the chat bot.
## Installation
#### 1. Install from bower `bower install livebase`
#### 2. Include Livebase module and configure your settings

```javascript
angular.module('App', ['livebase'])

  .config(function($livebaseProvider){
  
    $livebaseProvider.url(FIREBASE_URL);
    
    $livebaseProvider.tell([
    
      { cmd:"Hello", reply:"Hello, may I know your name?" }
      
    ]);
```

#### 3. Include livebase and its dependencies

```html
<!-- AngularJS -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script>
<!-- Firebase -->
<script src="https://cdn.firebase.com/js/client/2.4.0/firebase.js"></script>
<!-- AngularFire -->
<script src="https://cdn.firebase.com/libs/angularfire/1.2.0/angularfire.min.js"></script>
<!-- Livebase -->
<script src="bower_components/livebase/livebase.min.js"></script>
```

## Usage

```html
<livebase>
    <ul>
        <li ng-repeat="chat in chats">
            {{chat.type}} - {{chat.text}}
        </li>
    </ul>
    <lb-listen>Speak</lb-listen>
    <lb-input></lb-input>
    <lb-send>Send</lb-send>
</livebase>
```

![alt text](https://cloud.githubusercontent.com/assets/12211863/15270736/54366296-1a5c-11e6-9a7e-ce49250a15e5.PNG "Basic Usage")

## Example
![alt text](https://cloud.githubusercontent.com/assets/12211863/15270803/3fe29a00-1a5f-11e6-92a1-120a5c22a64f.png "Example")
