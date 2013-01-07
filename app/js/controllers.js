'use strict';

/* Controllers */
//The index controller is mainly used for logging all clicks. 
//Logging to Google Analytics and SingPath
function IndexController($scope,$resource,$window){
    
    $scope.log_event = function($event){
        $scope.clicked = $event.target.name;
        //Log event to Google Analytics
        //This will log from 127.0.0.1 but not local host. 
        $window._gaq.push(['_trackPageview', $scope.clicked]);
        //This is how you log to the SingPath backend.
        $scope.Log = $resource('/jsonapi/log_access');
        var item = new $scope.Log({"page":"index.html",
                                   "event":$scope.clicked,
                                   "date":1357529747177});
        $scope.item = item.$save(); 
    };

}


function PlayerController($scope,$resource){
        $scope.player = $resource('/jsonapi/player').get();
}

function InterfacesController($scope,$resource){
        $scope.interfaces = $resource('/jsonapi/interfaces').get();
}

//This could be used for development.
//Just create methods to pass in and set the model and id. 
function StoryController($scope,$resource,$window){
    
		$scope.StoryModel = $resource('/jsonapi/stories');
    
    $scope.story = {"name":"My Cool Story", 
                    "url": "http://www.youtube.com/12345"};  
		//A method to fetch a generic model and id. 
    $scope.fetch_stories = function(){
          $scope.StoryModel.query({}, function(response){
              $scope.stories = response;
              //alert("There are "+$scope.stories.length+" stories.");
          });
    };
    $scope.add = function(){
          //Wait for the response and then update phones.
          $scope.AddStory = $resource('/jsonapi/add_story');

          var new_story = new $scope.AddStory($scope.story);
          new_story.$save(function(response){
              //$scope.story = response;
              $scope.fetch_stories();
          });
    };
    $scope.fetch_stories();
}