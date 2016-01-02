Workoutfit
    .directive('workoutDetail', function(){
        return {
            restrict: 'E',
            templateUrl: 'client/workouts/detail/workout-detail.html',
            controllerAs: 'workoutDetail',
            controller: function($scope, $stateParams, $reactive){
                $reactive(this).attach($scope);

                this.helpers({
                    workout: () => {
                        return Workouts.findOne({ _id: $stateParams.workoutId });
                    },
                });

                angular.forEach(this.workout.exercises, function(superset){
                    angular.forEach(superset, function(exercise){
                        var dbExercise = Exercises.findOne({ _id: exercise.exerciseId });

                        exercise.name = dbExercise.name;
                        exercise.maxWeight = dbExercise.maxWeight;

                        exercise.repMin = exercise.reps[0] === 0 ? false : exercise.reps[0];
                        exercise.repMax = exercise.reps[1] === 0 ? false : exercise.reps[1];
                    });
                });

            }
        }
    });
