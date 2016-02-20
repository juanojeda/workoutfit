Workoutfit
    .directive('workoutDetail', function(){
        return {
            restrict: 'E',
            templateUrl: 'client/workouts/detail/workout-detail.html',
            controllerAs: 'workoutDetail',
            controller: function($scope, $stateParams, $reactive, GetWorkoutFactory){
                $reactive(this).attach($scope);

                this.helpers({
                    workout: GetWorkoutFactory($stateParams.workoutId),
                    // fab toolbar
                    fabActions: {
                        isOpen: false,
                        count: 0
                    },
                });
            }
        }
    });
