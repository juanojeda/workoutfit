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
                    workout: GetWorkoutFactory($stateParams.workoutId),
                    workoutCurrentState: 0,
                    totalWorkoutLength: 0,
                    workoutProgress: function(){
                        var progress = 0;
                        if (newSession.workoutCurrentState > 0){
                            progress = (newSession.workoutCurrentState / newSession.totalWorkoutLength) * 100;
                        }
                        return progress;
                    },
                    workoutComplete: function(){
                        return newSession.workoutProgress >= 100;
                    }
                });

                newSession.incrementWorkout = function(){
                    newSession.workoutCurrentState++;
                };

                // set newSession.totalWorkoutLength
                _.each(newSession.workout.exercises, function(superset){
                    _.each(superset, function(exercise){
                        newSession.totalWorkoutLength += exercise.sets;
                    });
                })

                // TODO: remove this
                console.log("%c %s %s", "color: #c0ffee; background: #323266", "Hey Juan! ", "newSession.workout, newSession.totalWorkoutLength!", newSession.workout, newSession.totalWorkoutLength);
            }
        }
    });
