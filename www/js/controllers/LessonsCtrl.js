app.controller('LessonsCtrl', ['$scope','lessonFact','scoreFact','quizIndexFactory','userFactory','$http', function($scope, lessonFact,scoreFact, quizIndexFactory, userFactory, $http){
    
    $scope.lessonSet;
    $scope.scoreSet;
    // $scope.moduleSet;
    $scope.status;
    $scope.scoreArray
    
    getLessons();
    // getScores();
    // getModules();
    
    function getLessons(){
        lessonFact.getList()
            .then(function (response) {
                $scope.lessonSet = response.data.lessons;        
                getScores();
            }, function (error) {
                $scope.status = 'unable to load lessons in controller: ' + error.message;
            });
    }
    
    function getScores(){
        scoreFact.getList()
            .then(function (response) {
                $scope.scoreSet = response.data.scores;
                buildArray();
            }, function (error) {
                $scope.status = 'unable to load lessons in controller: ' + error.message;
            });
    }
    
    function checkScore(id){
        return $scope.scoreArray(id);
    }
    
    function buildArray(){
        var items;
        var user = userFactory.getUser();
        console.log("hello?");
        $scope.scoreArray = [$scope.lessonSet.length];
        for(var i = 0; i < $scope.lessonSet.length; i++){
            $scope.scoreArray[i] = -1;
            for(var j = 0; j < $scope.scoreSet.length; j++){
                if($scope.scoreSet[j].lesson_id == (i + 1) && $scope.scoreSet[j].user_name == user){
                    $scope.scoreArray[i] = $scope.scoreSet[j].score;
                    break;
                }
            }
        }
        
        items = document.getElementsByClassName("lessonCard");
        for(var j=0; j < items.length; j++ ){
            var x = items[j].getElementsByClassName("scoreDisplay")[0];
            console.log(x);
            // if(x.getElementsByTagName('span')[0].innerHTML == -1 || x.innerHTML == "Not Attempted Yet!"){
            //     x.innerHTML = "Not Attempted Yet!";
            //     console.log("first");
            // }else if(x.getElementsByTagName('span')[0].innerHTML >= 0 ){
            //     console.log("second");
            //     var anchor = items[j].getElementsByTagName('a')[0]
            //     anchor.setAttribute("href","#");
            //     anchor.setAttribute("ng-click","");
            // }
            if(x.getElementsByTagName('span')[0].innerHTML == -1){
                x.style.display = 'none';
            }
            // else if(x.getElementsByTagName('span')[0].innerHTML >= 0){
            //     var anchor = items[j].getElementsByTagName('a')[0]
            //     anchor.setAttribute("href","#");
            //     anchor.setAttribute("ng-click","");                
            // }
        }
    }
    
    // function disableCompletes(){
    //     var items;
    //     items = document.getElementsByClassName("lessonCard");
    //     for(var j=0; j < items.length; j++ ){
    //         var x = items[j].getElementsByClassName("scoreDisplay")[0];
    //         console.log(x);
    //         if(x.innerHTML == "Not Attempted Yet!"){
    //             console.log("works");
    //         }else{
    //             console.log("nope");
    //         //     var anchor = items[j].getElementsByTagName('a')[0]
    //         //     anchor.setAttribute("href","#");
    //         //     anchor.setAttribute("ng-click","");
    //         }
            
    //         // if(x.innerHTML == "Not Attempted Yet!"){
    //         //     console.log("check");
    //         // } else{
    //         //     console.log("why?");
    //         //     console.log(x.innerHTML);
    //         //     var anchor = items[j].getElementsByTagName('a')[0]
    //         //     anchor.setAttribute("href","#");
    //         //     anchor.setAttribute("ng-click","");
    //         // }
            
    //         // if(x.getElementsByTagName('span')[0].innerHTML != -1 && x.innerHTML != "Not Attempted Yet!"){
    //         //     var anchor = items[j].getElementsByTagName('a')[0]
    //         //     anchor.setAttribute("href","#");
    //         //     anchor.setAttribute("ng-click","");
                
    //         // }
    //     }
    // }
    
    // function getModules(){
    //     lessonFact.getList()
    //         .then(function (response) {
    //             $scope.moduleSet = response.data.lessons;
    //         }, function (error) {
    //             $scope.status = 'unable to load lessons in controller: ' + error.message;
    //         });
    // }
    
    $scope.openQuiz = function(lessonID){
        //replace with a JSON parse of the selected module ID
        // You will need to use a value attr to attach each module with its ID, and then grab the
        // data in the value attr and put it here. You will have some problems isolating the module
        console.log("open quiz" + lessonID);
        
        if($scope.scoreArray[lessonID-1] > -1){
            quizIndexFactory.stopUser();
            console.log("STOP!");
        }else{
            quizIndexFactory.setQuizIndex(lessonID);
        }
        
    }
}]);