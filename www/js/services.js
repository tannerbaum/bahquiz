app.factory('questionFactory', ['$http', function($http){
    function getById(id) {
        console.log("inside getbyID");
        // var requestUrl = 'http://localhost:3000/quiz/' + id;
        var requestUrl = 'http://localhost:3000/question';
        return $http.get(requestUrl)
        .success(function(data){
            console.log("success");
            return data;
        })
        .error(function(err) {
            console.log("fail");
            return err;
        });
    }
    
    return {
        getById: getById //? 
    };
}]);

app.factory('modFact', ['$http', function($http){
    var modFact = {};
    
    modFact.getList = function() { //do an experiment later to see which modfact this is 
        return $http.get('http://localhost:3000/module');
    };
    
    return modFact;
}]);

app.factory('userFactory', ['$http', function($http){
    var userFactory = {};
    var username;
    var score;
    var loggedIn;
    
    userFactory.getList = function() {
        return $http.get('http://localhost:3000/user');
    };
    
    userFactory.register = function(name,password) {
        var data = {   
                name: name,
                pass: password,
                totalscore: 0         
            };

        var res = $http.post("http://localhost:3000/user", data);
            res.success(function(data, status, headers, config) {
                $scope.message = data;
            });
            res.error(function(data, status, headers, config){
                alert( "failure message: " + JSON.stringify({data: data}));
            })
    }
    
    userFactory.setUser = function(name, savedScore) {
        username = name;
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
        console.log("halfway there");
    }
    
    userFactory.getLoggedIn = function(){
        return loggedIn;
    }
    
    userFactory.addPoints = function(points){
        //function to add points (with scoreFactory)
        score = score + points;
        //post request to update score
    }
    
    return userFactory;
}]);

app.factory('quizIndexFactory', [function(){
    var data = {
        quizIndex: 0
    };
    console.log("inside quizindexfactory");
    return{
        getQuizIndex: function(){
            return data.quizIndex;
        },
        setQuizIndex: function(number){
            data.quizIndex = number;
        }
    };
}]);

app.factory('lessonFact', ['$http', function($http){
    var lessonFact = {};
    var get;
    
    lessonFact.getList = function() { // add ID function for group of lessons
        return $http.get('http://localhost:3000/lesson');
    };
    
    lessonFact.getLesson = function(id){ // add ID functino for specific lesson
        return $http.get('http://localhost:3000/lesson'); 
    };
    
    
    return lessonFact;
}]);

app.factory('scoreFact', ['$http','userFactory', function($http,userFactory){
    var scoreFact = {};
    
    scoreFact.getList = function() { 
        return $http.get('http://localhost:3000/score'); // this will be specific call to users
    };
    
    scoreFact.updateScore = function(mod, less, value){
        var data = {   
            user_name: userFactory.getUser,
            module_id: mod,
            lesson_id: less, 
            score: value       
        };
        // console.log(data);
        var res = $http.post("http://localhost:3000/score", data);
            res.success(function(data, status, headers, config) {
                $scope.message = data;
            });
            res.error(function(data, status, headers, config){
                alert( "failure message: " + JSON.stringify({data: data}));
            })
    }
    //total score function here
    
    return scoreFact;
}]);