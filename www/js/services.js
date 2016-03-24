app.service('questionService', function() { //Later to be replaced by service with http requests
    var questions = [
        {
            id: '1',
            question: "What kind of fire is shown in the video?",
            options: ["Tent Fire","Circle Fire", "A-Frame Fire","Campfire"], //A good solution would be to have these set to null. Don't know how the JSON file will show that though
            answer: 2
        },
        {
            id: '2',
            question: "What is an advantage of this type of fire, discussed in the video?",
            options: ["Large Smoke Signals","Ease of Cooking","Portability","Burns to Coals Quickly"],
            answer: 3
        },
        {
            id: '3',
            question: "How much magnesium should be used in starting the fire",
            options: ["A Quarter-sized Amount","A Handful","None"], 
            answer: 0
        },
        
    ];
    
    this.list = function (){
        return questions;
    }
    
    //Might need to replace this with JSON parsing
    this.getQuestion = function(id){
        if(id < questions.length){
            return questions[id];
        } else {
            return false;
        }
    }
})

app.factory('questionFactory', ['$http', function($http){
    function getById(id) {
        console.log("inside getbyID");
        var requestUrl = 'http://localhost:3000/quiz/' + id;
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
    
    modFact.getList = function() {
        console.log("success");
        return $http.get('http://localhost:3000/module');
    };
    
    return modFact;
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