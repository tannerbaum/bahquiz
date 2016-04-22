app.factory('questionFactory', ['$http', function($http){
    function getById(id) {
        
        var getUrl = 'http://localhost:3000/question?lessonId=';
        getUrl = getUrl + id;
        return $http.get(getUrl); 
    }
    
    return {
        getById: getById //? 
    };
}]);

app.factory('modFact', ['$http', function($http){
    var modFact = {};
    
    modFact.getList = function() {
        return $http.get('http://localhost:3000/module');
    };
    
    return modFact;
}]);

app.factory('userFactory', ['$http', function($http){
    var userFactory = {};
    var username;
    var password; //not secure I know
    var score;
    var loggedIn;
    var message;
    
    userFactory.getList = function() {
        return $http.get('http://localhost:3000/user');
    };
    
    userFactory.register = function(name,password) {
        var data = {   
                name: name,
                pass: password,
                totalscore: 0         
            };

        username = name;
        password = password;
        score = 0;
        loggedIn = true;
        
        var res = $http.post("http://localhost:3000/user", data);
            res.success(function(data, status, headers, config) {
                message = data;
                // return message; // There has to be a better way to send a response
            });
            res.error(function(data, status, headers, config){
                alert( "failure message: " + JSON.stringify({data: data}));
            })
    }
    
    userFactory.setUser = function(name,pass, savedScore) {
        username = name;
        password = pass;
        score = savedScore;
        loggedIn = true;
    }
    
    userFactory.getUser = function() {
        if(username != null){
            return username;
        }
    }
    
    userFactory.logoutUser = function(){
        username = null;
        loggedIn = false;
    }
    
    userFactory.getLoggedIn = function(){
        return loggedIn;
    }
    
    return userFactory;
}]);

app.factory('quizIndexFactory', [function(){
    var data = {
        quizIndex: 0,
        moduleId: 0,
        first: 1
    };
    return{
        getQuizIndex: function(){
            return data.quizIndex;
        },
        setQuizIndex: function(number){
            data.quizIndex = number;
        },
        stopUser: function(){
            data.first = 0;
        },
        checkUser:function(){
            return data.first;
        },
        setModule: function(id){
            data.moduleId = id;
        },
        getModule: function(){
            return data.moduleId;
        }
    };
}]);

app.factory('lessonFact', ['$http', function($http){
    var lessonFact = {};
    
    lessonFact.getList = function() {
        return $http.get('http://localhost:3000/lesson');
    };
    
    lessonFact.getLesson = function(id){
        var getUrl = 'http://localhost:3000/lesson?id=';
        getUrl = getUrl + id;
        return $http.get(getUrl); 
    };
    
    lessonFact.filter = function(lessons){
        
    }
    
    return lessonFact;
}]);

app.factory('scoreFact', ['$http','userFactory', function($http,userFactory){
    var scoreFact = {};
    var message;
    var userPost = userFactory.getUser();
    scoreFact.getList = function() { 
        return $http.get('http://localhost:3000/score');
    };
    
    scoreFact.updateScore = function(mod, less, value){
        var data = {   
            user_name: userPost,
            module_id: mod,
            lesson_id: less, 
            score: value       
        };

        var res = $http.post("http://localhost:3000/score", data);
            res.success(function(data, status, headers, config) {
                message = data;
            });
            res.error(function(data, status, headers, config){
                alert( "failure message: " + JSON.stringify({data: data}));
            })
    }
    
    return scoreFact;
}]);