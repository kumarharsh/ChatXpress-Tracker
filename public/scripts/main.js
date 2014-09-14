app = angular.module('ChatXpress', [])
app.controller('MainCtrl', function($scope, $window) {
  $scope.store = $window.localStorage || {
    getItem: function() {},
    setItem: function() {}
  }

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

  initApp = function() {
    $scope.loadData();
    $scope.calculateProgress();
  }


  $scope.addToList = function(newItem) {
    if (newItem) {
      $scope.track.list.push({
        name: newItem,
        completed: false
      });
      $scope.ui.newItem = ''
      $scope.calculateProgress();
      $scope.saveData();
    }
  };

  $scope.removeFromList = function(index) {
    $scope.track.list.splice(index, 1);
    $scope.calculateProgress();
    $scope.saveData();
    return
  };

  $scope.toggleStatus = function(item) {
    if (!item)
      return;
    // Toggle the completion flag
    if (item && item.completed != null) {
      item.completed = !item.completed;
    }
    $scope.calculateProgress();
    $scope.saveData();
    return
  };

  var listCount, completed_count, progress;
  $scope.calculateProgress = function() {
    // do a lot of calculation and modifications
    listCount = $scope.track.list.length
    completed_count = 0;
    for(var i = listCount - 1; i>=0; i--) {
      if ($scope.track.list[i].completed)
        completed_count++;
    }

    // calculate the progress %
    progress = $scope.ui.progress.value = (completed_count / listCount * 100) | 0
    if (!progress) {
      $scope.ui.progress.text = $scope.ui.motivators[0]
    } else {
      $scope.ui.progress.text = $scope.ui.motivators[
        Math.floor(progress/10) + 1
      ]
    }
  }

  $scope.loadData = function() {
    // Read data back from the localStorage
    //
    // angular.fromJson just mirrors angular.toJson
    list = angular.fromJson($scope.store.getItem('ChatXpress.list'));
    progress = angular.fromJson($scope.store.getItem('ChatXpress.list'));
    if (Object.prototype.toString.call(list) === '[object Array]')
      $scope.track.list = list
    if (Object.prototype.toString.call(progress) === '[object Object]')
      $scope.ui.progress = progress
    console.log('list is', list)
  }

  $scope.saveData = function() {
    // Save data to the localStorage
    //
    // angular.toJson is equal to JSON.stringify, but with one additional
    // function:
    //
    // angularjs adds it's own key ($$hashKey) to all the objects in the list,
    // which it then uses to iterate over the list in the ng-repeat in the html
    // when this $$hashKey is saved to the localStorage, and then later loaded
    // back, angular is confused if two objects have the same $$hashKey, and
    // throws an ugly error.
    // angular.toJson does not copy the $$hashKey into the stringified JSON.
    $scope.store.setItem('ChatXpress.list', angular.toJson($scope.track.list));
    $scope.store.setItem('ChatXpress.progress', angular.toJson($scope.ui.progress));
  }

  initApp();
})
