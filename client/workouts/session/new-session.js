Workoutfit
    .directive('newSession', function(){
        return {
            restrict: 'E',
            templateUrl: 'client/workouts/session/new-session.html',
            controllerAs: 'newSession',
            controller: function($scope, $stateParams, $reactive, $state, GetWorkoutFactory){
                $reactive(this).attach($scope);

                var newSession = this;

                this.helpers({
                    workout: GetWorkoutFactory($stateParams.workoutId)
                });
            }
        }
    });
