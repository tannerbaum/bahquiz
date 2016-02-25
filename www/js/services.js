app.service('questionService', function() { //Later to be replaced by service with http requests
    var questions = [
        {
            id: '1',
            question: "True or False? Rick would never give you up, and would never let you down",
            options: ["True","False"], //A good solution would be to have these set to null. Don't know how the JSON file will show that though
            answer: 0
        },
        {
            id: '2',
            question: "True or False? Rick would never make you cry or say goodbye",
            options: ["True","False"], 
            answer: 0
        },
        {
            id: '3',
            question: "How long have you and Rick known each other",
            options: ["Who?","Just Met","So Long","A few weeks"],
            answer: 2
        }
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
    return $http.get('JSONFILE HERE')
        .success(function(data){
            return data;
        })
        .error(function(err) {
            return err;
        });
}]);