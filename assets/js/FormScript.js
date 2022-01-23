var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
var questionlist = [];

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  document.getElementById("results").style.display = "none";
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  
}

function validateForm(){
  var x, y, valid = false;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");

  for (const radioButton of y) {
    if(radioButton.checked){
      valid = true;
      break;
    }
  }
  return valid
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  if(!validateForm()) return false;
  // Exit the function if any field in the current tab is invalid:
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    
    
    // ... the form gets submitted:
    //document.getElementById("regForm").submit();
    const formData = new FormData(document.querySelector('form'))
    for (var pair of formData.entries()) {
      questionlist.push(parseInt(pair[1]))
    }
    console.log(questionlist)
    injectFile('assets/js/modelScript.js')
    document.getElementById("regForm").style.display = "none";
    return false;
  }
  
  document.getElementById("questionNumber").innerHTML = currentTab + 1 + "/42"
  showTab(currentTab);
}

function injectFile(filePath) {
  var newScript = document.createElement('script');
  newScript.type = 'text/javascript';
  newScript.src = filePath;
  document.getElementsByTagName('head')[0].appendChild(newScript);
}

