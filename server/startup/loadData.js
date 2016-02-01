Meteor.startup(function(){

    var exercisesFixture;
    var workoutsFixture;

    if (Exercises.find().count() === 0){
        exercisesFixture = [
            {
                name: 'Standing Dumbbell Press',
                maxWeight: 0
            },
            {
                name: 'Rear Delt Fly',
                maxWeight: 0
            },
            {
                name: 'Lateral Raises',
                maxWeight: 0
            },
            {
                name: 'Front Shoulder Raises',
                maxWeight: 0
            },
            {
                name: 'Barbell High Pull',
                maxWeight: 0
            },
            {
                name: 'Pull Ups',
                maxWeight: 0
            },
            {
                name: 'Barbell Behind Neck Press',
                maxWeight: 0
            },
            {
                name: 'Bench Press',
                maxWeight: 0
            },
            {
                name: 'Barbell Bicep Curls',
                maxWeight: 0
            },
            {
                name: 'Dumbbell Skull Crushers',
                maxWeight: 0
            },
            {
                name: 'Dumbbell Hammer Curls',
                maxWeight: 0
            },
            {
                name: 'Dumbbell Tricep Extensions',
                maxWeight: 0
            },
            {
                name: 'Pushups',
                maxWeight: 0
            },
            {
                name: 'Abdominal Crunches',
                maxWeight: 0
            },
            {
                name: 'Barbell Squats',
                maxWeight: 0
            },
            {
                name: 'Hip Raises',
                maxWeight: 0
            },
            {
                name: 'Barbell Bulgarian Lunges',
                maxWeight: 0
            },
            {
                name: 'Oblique Crunches',
                maxWeight: 0
            },
            {
                name: 'Surrenders',
                maxWeight: 0
            },
        ];

        for (var i = 0; i < exercisesFixture.length; i++){
            Exercises.insert(exercisesFixture[i]);
        }
    }

    if (Workouts.find().count() === 0 && Exercises.find().count() > 0){
        workoutsFixture = [
            {
                name: 'Shoulders',
                exercises: [ // each array item is a superset
                    [
                        { // Standing DB Press
                            exerciseId: Exercises.findOne({name: 'Standing Dumbbell Press'})['_id'],
                            sets: 3,
                            reps: [8, 10],
                            defaultWeight: 0
                        },
                        { // Rear Delt Fly
                            exerciseId: Exercises.findOne({name: 'Rear Delt Fly'})['_id'],
                            sets: 3,
                            reps: [8, 10],
                            defaultWeight: 0
                        }
                    ],
                    [
                        { // Lat Raises
                            exerciseId: Exercises.findOne({name: 'Lateral Raises'})['_id'],
                            sets: 3,
                            reps: [8, 10],
                            defaultWeight: 0
                        },
                        { // Front Shoulder Raises
                            exerciseId: Exercises.findOne({name: 'Front Shoulder Raises'})['_id'],
                            sets: 3,
                            reps: [8, 10],
                            defaultWeight: 0
                        }
                    ],
                    [
                        { // High Pull
                            exerciseId: Exercises.findOne({name: 'Barbell High Pull'})['_id'],
                            sets: 3,
                            reps: [8, 10],
                            defaultWeight: 0
                        },
                        { // Pull Ups
                            exerciseId: Exercises.findOne({name: 'Pull Ups'})['_id'],
                            sets: 3,
                            reps: [8,10],
                            defaultWeight: 0
                        }
                    ],
                    [
                        { // Barbell Behind Neck Press
                            exerciseId: Exercises.findOne({name: 'Barbell Behind Neck Press'})['_id'],
                            sets: 3,
                            reps: [8, 10],
                            defaultWeight: 0
                        }
                    ],
                ],
                workoutHistory: [],
            },
            {
                name: 'Chest, Biceps, Triceps',
                exercises: [
                    [
                        { // Bench Press
                            exerciseId: Exercises.findOne({name: 'Bench Press'})['_id'],
                            sets: 4,
                            reps: [6, 8],
                            defaultWeight: 0
                        }
                    ],
                    [
                        { // Barbell Bicep Curls
                            exerciseId: Exercises.findOne({name: 'Barbell Bicep Curls'})['_id'],
                            sets: 3,
                            reps: [8, 10],
                            defaultWeight: 0
                        },
                        { // Dumbbell Skull Crushers
                            exerciseId: Exercises.findOne({name: 'Dumbbell Skull Crushers'})['_id'],
                            sets: 3,
                            reps: [8, 10],
                            defaultWeight: 0
                        }
                    ],
                    [
                        { // Dumbbell Hammer Curls
                            exerciseId: Exercises.findOne({name: 'Dumbbell Hammer Curls'})['_id'],
                            sets: 3,
                            reps: [8, 10],
                            defaultWeight: 0
                        },
                        { // Dumbbell Tricep Extensions
                            exerciseId: Exercises.findOne({name: 'Dumbbell Tricep Extensions'})['_id'],
                            sets: 3,
                            reps: [8, 10],
                            defaultWeight: 0
                        }
                    ],
                    [
                        { // Mixed Pushups
                            exerciseId: Exercises.findOne({name: 'Pushups'})['_id'],
                            sets: 3,
                            reps: [0, 20],
                            defaultWeight: 0
                        },
                        { // Mixed Ab Crunches
                            exerciseId: Exercises.findOne({name: 'Abdominal Crunches'})['_id'],
                            sets: 3,
                            reps: [0, 20],
                            defaultWeight: 0
                        }
                    ],
                ],
                workoutHistory: [],
            },
            {
                name: 'Abs and Glutes',
                exercises: [
                    [
                        { // Heavy Squats
                            exerciseId: Exercises.findOne({name: 'Barbell Squats'})['_id'],
                            sets: 4,
                            reps: [6, 8],
                            defaultWeight: 0
                        }
                    ],
                    [
                        { // Glute Raises
                            exerciseId: Exercises.findOne({name: 'Hip Raises'})['_id'],
                            sets: 3,
                            reps: [12, 15],
                            defaultWeight: 0
                        },
                        { // Weighted Crunches
                            exerciseId: Exercises.findOne({name: 'Abdominal Crunches'})['_id'],
                            sets: 3,
                            reps: [12, 15],
                            defaultWeight: 0
                        }
                    ],
                    [
                        { // Bulgarian Lunges
                            exerciseId: Exercises.findOne({name: 'Barbell Bulgarian Lunges'})['_id'],
                            sets: 3,
                            reps: [12, 15],
                            defaultWeight: 0
                        },
                        { // Oblique Crunches
                            exerciseId: Exercises.findOne({name: 'Oblique Crunches'})['_id'],
                            sets: 3,
                            reps: [12, 15],
                            defaultWeight: 0
                        }
                    ],
                    [
                        { // Weighted Surrenders
                            exerciseId: Exercises.findOne({name: 'Surrenders'})['_id'],
                            sets: 3,
                            reps: [12, 15],
                            defaultWeight: 0
                        }
                    ],
                ],
                workoutHistory: []
            },

        ];

        for (var i = 0; i < workoutsFixture.length; i++){
            Workouts.insert(workoutsFixture[i]);
        }
    }
});
