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
    var loggedIn;
    
    userFactory.getList = function() {
        console.log("success");
        return $http.get('http://localhost:3000/user');
    };
    
    userFactory.register = function(name,password) {
        var data = {   
                name: name,
                pass: password         
            };
        console.log(data);
        var res = $http.post("http://localhost:3000/user", data);
            res.success(function(data, status, headers, config) {
                $scope.message = data;
            });
            res.error(function(data, status, headers, config){
                alert( "failure message: " + JSON.stringify({data: data}));
            })
    }
    
    userFactory.setUser = function(name) {
        username = name;
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
    
    lessonFact.getList = function() { //do an experiment later to see which modfact this is 
        return $http.get('http://localhost:3000/lesson');
    };
    
    return lessonFact;
}]);