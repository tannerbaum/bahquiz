app.controller('SettingsCtrl', ['$scope', '$ionicModal','$state','userFactory', function($scope,$ionicModal,$state,userFactory) {

    $scope.status;
    $scope.topUsers;
    
    $scope.southpark = [
    {link: 'http://southparkstudios.mtvnimages.com/images/shows/south-park/episode-thumbnails/season-15/south-park-s15e02-funnybot_4x3.jpg' },
    {link: 'http://www.planearium.de/bilder/charaktere/char_stan10.jpg' }, 
    {link: 'http://images4.fanpop.com/image/photos/20300000/2x14-Chef-Aid-south-park-20374472-720-540.jpg' },    
    {link: 'http://vignette3.wikia.nocookie.net/southpark/images/2/28/Professor_Chaos.png' },    
    {link: 'http://2.images.southparkstudios.com/images/shows/south-park/episode-thumbnails/season-5/south-park-s05e13-kenny-dies_4x3.jpg?width=360&quality=0.8' },    
    {link: 'https://coubsecure-a.akamaihd.net/get/b6/p/coub/simple/cw_timeline_pic/11a5ca6defb/6c291fb837510b4598593/med_1411644530_1403421590_image.jpg' },    
    {link: 'http://cdn.pcwallart.com/images/south-park-cartman-angry-wallpaper-1.jpg' },    
    {link: 'https://pbs.twimg.com/profile_images/3699976496/f857ddf878d8982b63402c0696182faf.jpeg' },    
    {link: 'http://images4.fanpop.com/image/photos/19100000/2x01-Terrance-Phililp-in-Not-Without-My-Anus-south-park-19160726-720-540.jpg' },    
    {link: 'http://static.tvgcdn.net/mediabin/galleries/shows/s_z/si_sp/southpark/crops/south-park-kyle9.jpg' }];
    
    getUsers();
    
    function getUsers(){
        userFactory.getList()
            .then(function (response){
                $scope.topUsers = selectionSort(response.data.users);
            }, function (error){
                $scope.status = 'unable to load users in controller: ' + error.message;
            });       
    }
    
    
    function selectionSort(users){
        var maxIndex, temp;
        var len = users.length
        var workingArray = [len];
        var topTen = [10];
        
        for(var x = 0; x < len; x++){
            workingArray[x] = users[x];
        }
        
        
        for(var i = 0; i < len; i++){
            maxIndex = i;
            for(var j = (i+1); j < len; j++){
                if(workingArray[j].totalscore > workingArray[maxIndex].totalscore){
                    maxIndex = j;
                }
            }
            temp = workingArray[i];
            workingArray[i] = workingArray[maxIndex];
            workingArray[maxIndex] = temp;
        }
        
        for(var z = 0; z < 10; z++){
            topTen[z] = workingArray[z];
        }
        
        return topTen;
    }
    
}])