

app.config(function ($stateProvider) {
    $stateProvider.state('analytics', {
        url: '/analytics',
        templateUrl: 'js/analytics/analytics.html',
        controller: 'analytics'
    })
    .state('analytics.pieChart', {
    	url: '/pieChart',
    	templateUrl: 'js/analytics/pieChart.html'
    })
    .state('analytics.barChart', {
		url: '/barChart',
		templateUrl: 'js/analytics/barChart.html'
    })
    .state('analytics.horizontalChart', {
		url: '/horizontalChart',
		templateUrl: 'js/analytics/horizontalChart.html'
    })
	.state('analytics.donutChart', {
		url: '/donutChart',
		templateUrl: 'js/analytics/donutChart.html'
	})
	.state('analytics.lineChart', {
		url: '/lineChart',
		templateUrl: 'js/analytics/lineChart.html',
		controller: function($scope, lineChartData) {
				console.log('linechart');
				$scope.options = lineChartOptions
				$scope.data = lineChartData
		},
		resolve: {
        	lineChartData: (AnalyticsFactory, selectedScreenplay) => {
        		console.log(selectedScreenplay);
       			return AnalyticsFactory.getSentiment(selectedScreenplay)
        		.then(sentiment => {
					var sentimentHolder = [{
						color: "#337ab7",
						key: "Sentiment",
						values: sentiment
					}]
					return sentimentHolder;
				})
        	}
        }
	})
});

app.controller('analytics', function($scope, ScreenplaysFactory, AnalyticsFactory, $state){

		AnalyticsFactory.getScreenPlays()
		.then(screenplays => $scope.scripts = screenplays)
	
		// AnalyticsFactory.getSentiment($scope.value)
		// .then(screenplay => )
		$scope.changeChart = (spId) => $state.go('analytics.lineChart', {id: spId})

		$scope.pieChartOptionsToggle = () => {
			$scope.options = pieChartOptions;
			$scope.data = pieData;
		}; 

		$scope.donutChartOptionsToggle = () => {
			$scope.options = donutChartOptions;
			$scope.data = pieData;
		};

		$scope.horizontalChartOptionsToggle = () => {
			$scope.options = horizontalChartOptions
			$scope.data = someData;
		}

		$scope.barChartOptionsToggle = () => {
			$scope.options = barChartOptions
			$scope.data = generateData();
		}

		$scope.lineChartOptionsToggle = () => {
			console.log('tf')
		}
    });

