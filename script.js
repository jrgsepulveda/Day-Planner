$(document).ready(function() {
  
    // get times from moment
    var now = moment().format("MMMM Do YYYY");
  
    var nowHour24 = moment().format("H");
    // did not use
    var nowHour12 = moment().format("h");
  
  
    var $dateHeading = $("#navbar-subtitle");
    $dateHeading.text(now);
    
    // Get stored todos from localStorage
    // Parsing the JSON string to an object
    var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  
    // If plans were retrieved from localStorage, update the plan array to it
    if (storedPlans !== null) {
      planTextArr = storedPlans;
    } else {
      planTextArr = new Array(9);
    }
  
    // set variable referencing planner element
    var $plannerDiv = $("#plannerContainer");
    $plannerDiv.empty();
     
    // build calendar by row for fix set of hours
    for (var hour = 9; hour <= 17; hour++) {
      var index = hour - 9;
      var $rowDiv = $("<div>");
      $rowDiv.addClass("row");
      $rowDiv.addClass("plannerRow");
      $rowDiv.attr("hour-index",hour);
    
      // Start building Time box portion of row
      var $col2TimeDiv = $("<div>");
      $col2TimeDiv.addClass("col-md-2");
    
      var $timeBoxSpn = $("<span>");
      $timeBoxSpn.attr("class","timeBox");
           
      // format hours for display
      var displayHour = hour;
      var ampm = "am";
      if (hour >= 12 ) { 
          if(hour > 12){
            displayHour = hour - 12;
          }
          ampm = "pm";
        }
      
      // populate timeBox with time
      $timeBoxSpn.text(`${displayHour} ${ampm}`);
      $rowDiv.append($col2TimeDiv);
      $col2TimeDiv.append($timeBoxSpn);
  
      // START building input portion of row
      // build row components
      var $dailyPlanSpn = $('<input>');
  
      $dailyPlanSpn.attr("id",`input-${index}`);
      $dailyPlanSpn.attr("hour-index",index);
      $dailyPlanSpn.attr("type","text");
      $dailyPlanSpn.attr("class","dailyPlan");
      $dailyPlanSpn.val( planTextArr[index] );
      var $col9IptDiv = $("<div>");
      $col9IptDiv.addClass("col-md-9");
      $rowDiv.append($col9IptDiv);
      $col9IptDiv.append($dailyPlanSpn);
  
      // START building save portion of row
      var $col1SaveDiv = $("<div>");
      $col1SaveDiv.addClass("col-md-1");
  
      var $saveBtn = $("<i>");
      $saveBtn.attr("id",`saveid-${index}`);
      $saveBtn.attr("save-id",index);
      $saveBtn.attr("class","far fa-save saveIcon");
      
      $rowDiv.append($col1SaveDiv);
      $col1SaveDiv.append($saveBtn);
  
      // set row color based on time
      updateRowColor($rowDiv, hour);
      
      // add row to planner container
      $plannerDiv.append($rowDiv);
    };
  
    // function to update row color
    function updateRowColor ($hourRow,hour) { 
      if ( hour < nowHour24) {
        $hourRow.css("background-color","lightgrey")
      } else if ( hour > nowHour24) {
        $hourRow.css("background-color","lightgreen")
      } else {
        $hourRow.css("background-color","#f78888")
      }
    };
  
    // saves to local storage
    // onclick function to listen for user clicks on plan area
    $(document).on("click","i", function(event) {
      event.preventDefault();  
      var $index = $(this).attr("save-id");
      var inputId = "#input-"+$index;
      var $value = $(inputId).val();
      planTextArr[$index] = $value;
      $(`#saveid-${$index}`).removeClass("shadowPulse");
      localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
      alert("Daily Planer Has Been Updated")
    });  
    
    // function to color save button on change of input
    $(document).on("change","input", function(event) {
      event.preventDefault();  
      var i = $(this).attr("hour-index");
      $(`#saveid-${i}`).addClass("shadowPulse");
    });

    // clears the entire page
    // on click function to listen for a user clicks on clear
    $("#clear-BTN").on("click", function(event){
        localStorage.clear();
        location.reload();
    }); 
  });