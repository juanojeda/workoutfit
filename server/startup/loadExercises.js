Meteor.startup(function(){
    if (Exercises.find().count() === 0){
        for (var i = 0; i < exercisesFixture.length; i++){
            Exercises.insert(exercisesFixture[i]);
        }
    }
});
