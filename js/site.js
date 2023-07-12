// CONTROLLER
function runSubmit() {

    // Reset alert & results table to invisible
    let resultsDiv = document.getElementById("resultsDiv");
    resultsDiv.innerHTML = "";

    // obtain handles to necessary form fields
    let fields = {};
    fields.fld_LoanAmount = document.getElementById("loanAmount");
    fields.fld_InterestRate = document.getElementById("interestRate");
    fields.fld_MonthlyPayments = document.getElementById("moPmts");

    if(validatefields(fields).valid && generateResults(fields).valid) {
        displayResults(fields);
    } else {
        // Display Input Error, highlight each invalid field, select first invalid field
        displayErrors(fields);
    }


/*     let errorMsg = "";

    if(!Number.isInteger(firstNum)) {
        errorMsg += `${errorMsg} The value you entered is not a valid integer<br>`;
    }

    if( errorMsg == "") {

        let results = [];

        const start = performance.now();
        switch(variation) {
            case "rbA": {
                results = generateResults(firstNum);
                break;
            }
            case "rbB": {
                results = generateResultsB(firstNum);
                break;
            }
            case "rbC": {
                results = generateResultsC(firstNum);
                break;
            }
            case "rbD": {
                results = generateResultsD(firstNum);
                break;
            }
        }
        const end = performance.now();

        runtimeSpan.innerHTML = `Execution time for solution selected was ${roundNumber(end-start,4)} ms`;

        displayResults(results);

    } else {

        // get handle to template
        let alertTemplate = document.getElementById("alertTemplate");

        // get handle to p tag via importNode
        let template = document.importNode(alertTemplate.content,true);
        let p = template.querySelector("p");

        // clear p tag
        p.innerHTML = "";

        // add new message
        p.innerHTML = errorMsg;

        // append template to results div
        resultsDiv.appendChild(template);
        
    }
 */

}

function validatefields(fields) {

    fields.loanAmount = parseFloat(fields.fld_LoanAmount.value);
    fields.interestRate = parseFloat(fields.fld_InterestRate.value);
    fields.monthlyPayments = parseFloat(fields.fld_MonthlyPayments.value);

    fields.errorMsg = "";
    fields.valid = true;

    if( Number.isNaN(fields.loanAmount) || fields.loanAmount < 1 || fields.loanAmount > 1000000000)   {
        fields.errorMsg = "Please enter a valid loan amount greater between $1.00 and $1,000,000,000.";
        fields.fld_LoanAmount.classList.add("border-danger");
    }

    if( Number.isNaN(fields.monthlyPayments) || fields.monthlyPayments < 1 || fields.monthlyPayments > 1200 )  {
        fields.errorMsg = "Please enter a valid number of monthly payments between 1 and 1200";
        fields.fld_MonthlyPayments.classList.add("border-danger");       
    }

    if( Number.isNaN(fields.interestRate) || fields.interestRate < 0 || fields.interestRate > 100 ) {
        fields.errorMsg = "Please enter a valid interest rate between 0% and 100%";
        fields.fld_InterestRate.classList.add("border-danger");
    }

    fields.valid = (fields.errorMsg != "") ? false : true;

    return fields;

}

// LOGIC
function generateResults(fields) {

    return fields;

}

// UI
function displayResults(fields) {

    alert("Results Displayed");

/*     // get handle to results div
    let resultsDiv = document.getElementById("resultsDiv");

    // get handle to table template
    let tableTemplate = document.getElementById("tableTemplate");
    
    // get handle to tbody tag via importNode
    let table = document.importNode(tableTemplate.content,true);
    let tbodyFizzBuzz = table.querySelector("tbody");

    // clear p tag
    tbodyFizzBuzz.innerHTML = "";

    // add all the rows to the table
    for (let index = 0; index < fbArray.length; index += 5) {
        
        // let tableRow = document.importNode(tbodyFizzBuzz.content,true);
        let tableRow = tbodyFizzBuzz.insertRow();
        
        // insert 5 cells
        for (let index = 0; index < 5; index++) {
            tableRow.insertCell();            
        }

        // grab just the td's and put them into an array
        let rowCols = tableRow.querySelectorAll("td");

        rowCols[0].textContent = fbArray[index];
        rowCols[0].classList.add(fbArray[index]);

        rowCols[1].textContent = fbArray[index+1];
        rowCols[1].classList.add(fbArray[index+1]);

        rowCols[2].textContent = fbArray[index+2];
        rowCols[2].classList.add(fbArray[index+2]);

        rowCols[3].textContent = fbArray[index+3];
        rowCols[3].classList.add(fbArray[index+3]);

        rowCols[4].textContent = fbArray[index+4];
        rowCols[4].classList.add(fbArray[index+4]);

        tbodyFizzBuzz.appendChild(tableRow);
    }

        // document.getElementById("tableFizzBuzz").classList.remove("invisible");
    resultsDiv.appendChild(table);
 */
}

function displayErrors(fields) {
    alert("Errors Displayed");
}

// SUPPORT LOGIC
function roundNumber(rnum, rlength) { 
    var newnumber = Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
    return newnumber;
}

// SUPPORT UI
function toggleViewCode() {
    
}
