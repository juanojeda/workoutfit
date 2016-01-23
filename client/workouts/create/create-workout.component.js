Workoutfit
    .directive('createWorkout', function(){
        return {
            restrict: 'E',
            templateUrl: 'client/workouts/create/create-workout.html',
            controllerAs: 'createWorkout',
            controller: function($scope, $stateParams, $reactive, $state){
                $reactive(this).attach($scope);

                var createWorkout = this;

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
                    Workouts.insert(this.workout);
                    this.cancelCreate();
                };

                this.getExerciseNames = function(set){

                    if (!_.isArray(set)){
                        set = [set];
                    }

                    var ids = getExercisePropFromSet(set, 'exerciseId');
                    var dbExercises = createWorkout.exerciseList;
                    var exerciseNamesList = [];
                    var exercise;

                    _.each(ids, function(id){

                        exercise = _.findWhere(dbExercises, {_id: id});

                        if (!!exercise){
                            exerciseNamesList.push(exercise.name);
                        } else {
                            console.warn('exercise ' + id + ' not found');
                        }
                    });

                    if (_.isEmpty(exerciseNamesList)){
                        console.warn('no exercises found');
                        return '';
                    }

                    return exerciseNamesList.join(', ');

                };


                function getExercisePropFromSet(set, prop){
                    if (_.isArray(set)){
                        return _.pluck(set, prop);
                    } else {
                        console.warn('set is not an array');
                        return '';
                    }
                };

                function resetTempExercise(){
                    var ex = createWorkout.tempExercise;

                    ex.exerciseId = '';
                    ex.sets = '';
                    ex.repsMin = '';
                    ex.repsMax = '';
                    ex.defaultWeight = '';
                };

                function processExerciseToWorkout(){
                    var workoutExercises = createWorkout.workout.exercises;
                    var addToLastSuperset = createWorkout.tempExercise.isSuperset;
                    var exerciseModel;
                    var repsMin;
                    var repsMax;

                    if (!!createWorkout.tempExercise && !!createWorkout.tempExercise.exerciseId){
                        exercise = createWorkout.tempExercise;
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
                        if (addToLastSuperset){
                            workoutExercises[workoutExercises.length-1].push(exerciseModel);
                        } else {
                            workoutExercises.push([exerciseModel]);
                        }
                        resetTempExercise();
                    }
                };
            }
        }
    });
