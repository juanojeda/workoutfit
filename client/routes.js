Workoutfit
    .config(function($urlRouterProvider, $stateProvider, $locationProvider){
    // set to single page app
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('workouts', {
            url: '/workouts',
            template: '<workout-list></workout-list>'
        })
        .state('workoutDetail', {
            url: '/workouts/:workoutId',
            template: '<workout-detail></workout-detail>'
        })

    $urlRouterProvider.otherwise('/workouts');
});
