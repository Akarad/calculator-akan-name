function validateForm(){
  var date = document.getElementById('date').value;
  var month = document.getElementById('month').value;
  var year = document.getElementById('year').value;
  var male = document.getElementById("male");
  var female = document.getElementById("female");

  if(date.length == 0 || month.length == 0 || year == 0)
  {
    alert("No blank values allowed");
    return false;
  }
  else
  {
   true;
  }

  var intDate = parseInt(date);
  var intMonth = parseInt(month);
  var validDate = checkDate(intDate);
  var validMonth = checkMonth(intMonth);

  if(validDate == false){
    alert("Date should be between 1 and 31");
  }

  if(validMonth == false){
    alert("Month should be between 1 and 12");
  }

  //Calculate the akan name using the formula:
  //akanName = (yearcode + monthcode + centurycode + date - leapyearcode) % 7
  calculateAkan(intDate, intMonth, year);
}

function checkDate(date){
  if(date > 31){
    return false;
  } else {
    return true;
  }
}

function checkMonth(month){
  if(month > 12){
    return false;
  } else{
    return true;
  }
}

//Checking for Leap YEAR
function checkLeap(year){
  var divideBy4 = year%4;
  var divideBy100 = year%100;
  var divideBy400 = year%400;
  validLeap = false;

  if(divideBy4 != 0){

    //not a leap year
    return validLeap = false;

  } else if(divideBy100 != 0){

    //is a leap year
    return validLeap = true;

  } else if(divideBy400 != 0){

    // is not a leap year
    return validLeap = false;

  } else{
    //not a leap year
    return validLeap = true;
  }
}

function calculateAkan(date,month,year,gender){
  var dd = parseInt(date);
  var mm = parseInt(month);
  var cc = parseInt(year.slice(0,2));
  var yy = parseInt(year.slice(1,3));
  var yearCode = 0;
  var monthCode = 0;
  var centuryCode = 0;
  var leapYearCode = 0;
  var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var femaleAkan = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];
  var maleAkan = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
  var monthListArray = ["0","3","3","6","1","4","6","2","5","0","3","5"];
  var checkLeapYear = checkLeap(year);

  if(yy == 0){
    yearCode = 0;
  }else{
    yearCode = (yy + (yy/4))%7;
  }

  //adjust month to align with array index.
  mm--;

  //determine month code
  monthCode = parseInt(monthListArray[mm]);

  //determine century code
  if( cc == 17 || cc == 21){
    centuryCode = 4;
  }

  if( cc == 18 || cc == 22){
    centuryCode = 2;
  }

  if( cc == 19 || cc == 23){
    centuryCode = 0;
  }

  if( cc == 20){
    centuryCode = 6;
  }

  //determine Leap year code
  if((checkLeapYear == true) && (monthCode == 0 || monthCode == 1)){
    leapYearCode = 1;
  }

  //calculate formula before returning the akan day
  var subCalculation = Math.floor(yearCode) + monthCode + parseInt(centuryCode) + dd - parseInt(leapYearCode);

  //determine the actual day which is an integer
  var dayInteger = parseInt(subCalculation % 7);

  //get the akan name from the Array
  var dayBorn = weekDays[dayInteger];

  //Select the name based on the gender selected.
  if(male.checked == true){
    var akanName = maleAkan[dayInteger];
  }

  if(female.checked == true){
    var akanName = femaleAkan[dayInteger];
  }

  alert("You were born on a " + dayBorn + " so your Akan name is " + akanName);
}
