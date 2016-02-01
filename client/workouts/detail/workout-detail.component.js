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
                        var workout = Workouts.findOne({ _id: $stateParams.workoutId });
                        var exercisesToFetch = [];
                        var dbExercisesList = [];
                        var dbExercise;

                        // first loops to fetch _ids for database fetch
                        angular.forEach(workout.exercises, function(superset){
                            angular.forEach(superset, function(exercise){
                                exercisesToFetch.push(exercise.exerciseId);
                            });
                        });

                        // fetch all the exercises in one go
                        dbExercisesList = Exercises.find({ _id: {$in: exercisesToFetch}}).fetch();

                        // second loops to apply the data
                        angular.forEach(workout.exercises, function(superset){
                            angular.forEach(superset, function(exercise){
                                dbExercise = _.findWhere(dbExercisesList, {_id: exercise.exerciseId});

                                exercise.name = dbExercise.name;
                                exercise.maxWeight = dbExercise.maxWeight;

                                exercise.repMin = exercise.reps[0] === 0 ? false : exercise.reps[0];
                                exercise.repMax = exercise.reps[1] === 0 ? false : exercise.reps[1];
                            });
                        });

                        return workout;
                    },
                    // fab toolbar
                    fabActions: {
                        isOpen: false,
                        count: 0
                    },
                });
            }
        }
    });
