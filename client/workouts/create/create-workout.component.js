Workoutfit
    .directive('createWorkout', function(){
        return {
            restrict: 'E',
            templateUrl: 'client/workouts/create/create-workout.html',
            controllerAs: 'createWorkout',
            controller: function($scope, $stateParams, $reactive, $state){
                $reactive(this).attach($scope);

                this.cancelCreate = function(){
                    resetTempExercise();
                    $state.transitionTo('workouts');
                };

                this.isWorkoutNameUnique = function(){

                    var newWorkoutName;
                    var dbWorkoutName;
                    var matches;

                    if (this.workout.name){
                        newWorkoutName = this.workout.name.toLowerCase();
                        matches = _.filter(this.workoutsList, function(dbWorkout){
                            return newWorkoutName === dbWorkout.name.toLowerCase();
                        });
                    }

                    return _.isEmpty(matches);
                };

                this.canAddExercise = function(){
                    return !!this.tempExercise.exerciseId;
                };

                this.canSaveWorkout = function(){
                    if (!this.workout.name){
                        return false;
                    }
                    if (_.isEmpty(this.workout.exercises)){
                        return this.canAddExercise(); //proxy for if the tempExercise is filled
                    }
                    return true;
                };

                this.addExercise = function(){
                    processExerciseToWorkout();
                };

                this.saveWorkout = function() {
                    this.addExercise();
                };

                function getExerciseName(exerciseId){
                    var exercise = _.findWhere(this.exerciseList, {_id: exerciseId});

                    if (!!exercise){
                        return exercise.name;
                    } else {
                        console.log('exercise not found');
                        return '';
                    }
                };

                function resetTempExercise(){
                    var ex = this.tempExercise;

                    ex.exerciseId = '';
                    ex.sets = '';
                    ex.repsMin = '';
                    ex.repsMax = '';
                    ex.defaultWeight = '';
                }

                function processExerciseToWorkout(){
                    var exerciseModel;
                    var repsMin;
                    var repsMax;

                    if (!!this.tempExercise && !!this.tempExercise.exerciseId){
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
                        resetTempExercise();
                    }
                };

                this.helpers({
                    tempExercise: () => {
                        return {}
                    },
                    workout: () => {
                        return {
                            name: '',
                            exercises: []
                        }
                    },
                    workoutsList: () => {
                        return Workouts.find({});
                    },
                    exerciseList: () => {
                        return Exercises.find({});
                    }
                });
            }
        }
    });
