app = angular.module('ChatXpress', [])
app.controller('MainCtrl', function($scope) {
  $scope.ui = {
    app: 'ChatXpress Tracker',
    newItem: '',
    progress: {
      value: 0,
      text: ''
    },
    motivators: [
      "Are Start to Kar",                                 // 0%
      "Don't stop until you finish atleast 3 tasks",      // 1%
      "OK! Keep Going",                                   // 11%
      "Getting the hang of it?",                          // 21%
      "Easy, isn't it?",                                  // 31%
      "Nice! Also, keep pushing!",                        // 41%
      "Good.",                                            // 51%
      "Good.",                                            // 61%
      "Excellent!",                                       // 71%
      "Excellent!!",                                      // 81%
      "Excellent!!! Nearly There!",                       // 91%
      "Aha! Great!!! (Now add more tasks to the todo!)"   // 100%
    ]
  };
  $scope.track = {
    list: []
  };
  $scope.addToList = function(newItem) {
    if (newItem) {
      $scope.track.list.push({
        name: newItem,
        completed: false
      });
      $scope.calculateProgress();
      $scope.ui.newItem = ''
    }
  };
  $scope.removeFromList = function(index) {
    $scope.track.list.splice(index, 1);
    $scope.calculateProgress();
    return
  }
  $scope.toggleStatus = function(item) {
    if (!item)
      return;
    // Toggle the completion flag
    if (item && item.completed != null) {
      item.completed = !item.completed;
    }
    $scope.calculateProgress();
  };

  var listCount, completed, progress;
  $scope.calculateProgress = function() {
    // do a lot of calculation and modifications
    listCount = $scope.track.list.length
    completed = 0;
    for(var i = listCount - 1; i>=0; i--) {
      if ($scope.track.list[i].completed)
        completed++;
    }

    progress = $scope.ui.progress.value = (completed / listCount * 100) | 0
    if (!progress) {
      $scope.ui.progress.text = $scope.ui.motivators[0]
    } else {
      $scope.ui.progress.text = $scope.ui.motivators[
        Math.floor(progress/10) + 1
      ]
    }
  }
})
