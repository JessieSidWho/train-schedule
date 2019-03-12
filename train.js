$(document).ready(function() {

      // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDhikbbpakkJZxLuUA84Hin0MK-npCjAfQ",
    authDomain: "trainschedule-df5a1.firebaseapp.com",
    databaseURL: "https://trainschedule-df5a1.firebaseio.com",
    projectId: "trainschedule-df5a1",
    storageBucket: "",
    messagingSenderId: "51207158933"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

    var currentTime = moment().format();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm A"));



    $("#submit-btn").on("click", function() {

      var trainName = $("#trainName").val().trim();
      var trainDest = $("#trainDestination").val().trim();
      var trainTime = moment($("#firstTrainTime").val().trim(), "HH:mm").format("X");
      var trainFreq = $("#frequency").val();
      // Creates local "temporary" object for holding train data
      var newTrain = {
          name: trainName,
          destination: trainDest,
          time: trainTime,
          frequency: trainFreq
      };
      // Uploads train data to the database
      database.ref().push(newTrain);
      // Logs everything to console
      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.time);
      console.log(newTrain.frequency);

      $("#trainName").val("");
      $("#trainDestination").val("");
      $("#firstTrainTime").val("");
      $("#frequency").val("");
      
    });


    

   var firstTimeConverted = moment(firsttrain, "hh:mm a").subtract(1, "years");
   console.log("First Time Converted: " + firstTimeConverted);

   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   console.log("Difference in Time: " + diffTime);

   var tRemainder = diffTime % frequency;
   console.log(tRemainder);

   var nextarrival = moment().add(minaway, "minutes");
   console.log("Next Arrival: " + moment(nextarrival).format("hh:mm a"));

   var minaway = frequency - tRemainder;
   console.log("Minutes Until Next Train: " + minaway);



   $(".table").find("tbody").append($("<tr>")
      .append($("<td>").text(trainname))
      .append($("<td>").text(destination))
      .append($("<td>").text(frequency))
      .append($("<td>").text((nextarrival).format("hh:mm A")))
      .append($("<td>").text(minaway)))


})     
     