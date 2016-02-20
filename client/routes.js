Workoutfit
    .config(function($urlRouterProvider, $stateProvider, $locationProvider){
    // set to single page app
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('workouts', {
            url: '/workouts',
            template: '<workout-list layout="column"></workout-list>'
        })
        .state('createWorkout', {
            url: '/workouts/create',
            template: '<create-workout></create-workout>'
        })
        .state('newSession', {
            url: '/workouts/:workoutId/new-session',
            template: '<new-session></new-session>'
        })
        // workout detail has to be last, or the route will be confused
        // as a param
        .state('workoutDetail', {
            url: '/workouts/:workoutId',
            template: '<workout-detail></workout-detail>'
        })


    $urlRouterProvider.otherwise('/workouts');
});
