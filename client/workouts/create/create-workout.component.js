Workoutfit
    .directive('createWorkout', function(){
        return {
            restrict: 'E',
            templateUrl: 'client/workouts/create/create-workout.html',
            controllerAs: 'createWorkout',
            controller: function($scope, $stateParams, $reactive, $state){
                $reactive(this).attach($scope);

                this.cancelCreate = function(){
                    $state.transitionTo('workouts');
                };

                this.canAddExercise = function(){
                    return !!this.tempExercise.exerciseId;
                };

                this.canSubmit = function(){
                    if (_.isEmpty(this.workout.exercises)){
                        return this.canAddExercise();
                    } else {
                        return true;
                    };
                };

                this.getExerciseName = function(exerciseId){
                    var exercise = _.findWhere(this.exerciseList, {_id: exerciseId});

                    if (!!exercise){
                        return exercise.name;
                    } else {
                        console.log('exercise not found');
                        return '';
                    }
                };

                this.resetTempExercise = function(){
                    var ex = this.tempExercise;

                    ex.exerciseId = '';
                    ex.sets = '';
                    ex.repsMin = '';
                    ex.repsMax = '';
                    ex.defaultWeight = '';
                };

                this.processExerciseToWorkout = function(){
                    var exerciseModel;
                    var repsMin;
                    var repsMax;

                    if (!!this.tempExercise){
                        exercise = this.tempExercise;
                        repsMin = !!exercise.repsMin ? parseInt(exercise.repsMin, 10) : 0;
                        repsMax = !!exercise.repsMax ? parseInt(exercise.repsMax, 10) : 0;
                        exerciseModel = {
                            exerciseId: exercise.exerciseId, //this is the only mandatory field, so it can't be empty
                            sets: exercise.sets ? parseInt(exercise.sets, 10) : 0,
                            reps: [repsMin, repsMax],
                            defaultWeight: exercise.defaultWeight ? parseInt(exercise.defaultWeight, 10) : 0
                        };
                    }

                    if (!!exerciseModel){
                        this.workout.exercises.push(exerciseModel);
                        this.resetTempExercise();
                    }
                };

                this.addExercise = function(){
                    this.processExerciseToWorkout();
                };

                this.saveWorkout = function() {
                    this.addExercise();
                };

                this.helpers({
                    tempExercise: () => {
                        return {}
                    },
                    workout: () => {
                        return {
                            name: '',
                            exercises: []
                            // {
                            //  exerciseId: '',
                            //  sets: #
                            //  reps: [#, #] // min, max
                            //  defaultWeight: # // based on
                            //
                            // }
                        }
                    },
                    exerciseList: () => {
                        return Exercises.find({});
                    }
                });
            }
        }
    });
