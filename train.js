$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDhikbbpakkJZxLuUA84Hin0MK-npCjAfQ",
    authDomain: "trainschedule-df5a1.firebaseapp.com",
    databaseURL: "https://trainschedule-df5a1.firebaseio.com",
    projectId: "trainschedule-df5a1",
    storageBucket: "trainschedule-df5a1.appspot.com",
    messagingSenderId: "51207158933"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

    $("#submit").on("click", function() {

      var trainName = $("#trainName").val().trim();
      var trainDest = $("#trainDestination").val().trim();
      var trainTime = $("#firstTrainTime").val().trim();
      var trainFreq = $("#frequency").val();
    
      var newTrain = {
          name: trainName,
          destination: trainDest,
          time: trainTime,
          frequency: trainFreq
      };
     
      database.ref().push(newTrain);
   
      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.time);
      console.log(newTrain.frequency);

      $("#trainName").val("");
      $("#trainDestination").val("");
      $("#firstTrainTime").val("");
      $("#frequency").val("");
      
    });




    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().time;
        var trainFreq = childSnapshot.val().frequency;
        // Train Info
        console.log(childSnapshot.val().trainName);
        console.log(childSnapshot.val().trainDest);
        console.log(childSnapshot.val().trainTime);
        console.log(childSnapshot.val().trainFreq);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm A"));

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(trainTime, "hh:mm A").subtract(1, "years");
        console.log(firstTimeConverted);
    
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
    
        // Time apart
        var tRemainder = diffTime % trainFreq;
        console.log(tRemainder);
    
        // Minute Until Train
        var tMinutesTillTrain = trainFreq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));

    
        $(".table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
        trainFreq + "</td><td>" + moment(nextTrain).format("hh:mm A") + "</td><td>" + tMinutesTillTrain + "</td><td>");
    });




//    var firstTimeConverted = moment(firsttrain, "hh:mm a").subtract(1, "years");
//    console.log("First Time Converted: " + firstTimeConverted);

//    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//    console.log("Difference in Time: " + diffTime);

//    var tRemainder = diffTime % frequency;
//    console.log(tRemainder);

//    var nextarrival = moment().add(minaway, "minutes");
//    console.log("Next Arrival: " + moment(nextarrival).format("hh:mm a"));

//    var minaway = frequency - tRemainder;
//    console.log("Minutes Until Next Train: " + minaway);


})     
     