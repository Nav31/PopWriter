app.config($stateProvider => {
    $stateProvider.state('editor', {
        url: '/editor/:id',
        templateUrl: '/js/editor/editor.html',
        controller: 'EditorController',
        resolve: {
            screenplay: function(ScreenplaysFactory, $stateParams){
                return ScreenplaysFactory.getOne($stateParams.id);
            }
        }
    });
})
.controller('EditorController', ($scope, screenplay, ScreenplaysFactory, EditorFactory) => {
    $scope.screenplay = screenplay;
    $scope.options = EditorFactory.editorOptions;
    $scope.text = scriptify(screenplay) || '<p class="header">START YOUR SCRIPT HERE</p>';
    $scope.components = ["header","action", "character", "dialogue"];
    $scope.selected = $scope.components[0];


    $scope.save = () => {
        // whatever();
        var toBeSaved = textToObj();
        console.log(toBeSaved);
        ScreenplaysFactory.updateScreenplay(screenplay._id, { scenes: toBeSaved })
        .then( screenplay => {
            // $scope.text= scriptify(screenplay);
            console.log('udpate screenplay', screenplay);
        })
    }



    $scope.check = () => {
        console.log(screenplay);
    }

    $scope.type = function(event) {
        if(event.code === 'Enter') {
            var currentElement = getSelectionStart();
            var toBeSaved = textToObj($scope.text);
            ScreenplaysFactory.updateScreenplay(screenplay._id, { scenes: toBeSaved })
                .then( screenplay => {
                   currentElement.id = getIdAndAssign(screenplay);
                 // $scope.text = scriptify(screenplay);
                // console.log(getIdAndAssign(screenplay));
                // console.log('udpate screenplay', screenplay);
            });

        }
        EditorFactory.setScopeKeyDown(event, $scope);
    };

    $scope.click = () => {
        EditorFactory.setScopeClick($scope);
    };

    // setInterval(()=>{
    //     var toBeSaved = textToObj($scope.text);
    //     ScreenplaysFactory.updateScreenplay(screenplay._id, { scenes: toBeSaved })
    //         .then( screenplay => {
    //     });
    // }, 10000);

});

