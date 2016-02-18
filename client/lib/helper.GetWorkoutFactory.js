Workoutfit
    .factory('GetWorkoutFactory', function(){

        var getWorkout = function(workoutId){
            var workout = Workouts.findOne({ _id: workoutId });
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
        };

        return getWorkout;
    });
