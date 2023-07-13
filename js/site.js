// CONTROLLER
function runSubmit() {

    // Reset resultsDiv, inputAlert, and results table to invisible
    let summaryDiv = document.getElementById("summaryDiv");
    summaryDiv.innerHTML = "";
    let resultsDiv = document.getElementById("resultsDiv");
    resultsDiv.innerHTML = "";

    // obtain handles to input fields
    let fields = {};
    fields.fld_LoanAmount = document.getElementById("loanAmount");
    fields.fld_InterestRate = document.getElementById("interestRate");
    fields.fld_MonthlyPayments = document.getElementById("moPmts");

    // Reset input feilds to ready state
    fields.fld_LoanAmount.classList.remove("border-danger", "border-2");
    fields.fld_InterestRate.classList.remove("border-danger", "border-2");
    fields.fld_MonthlyPayments.classList.remove("border-danger", "border-2");

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
        fields.errorMsg += "Please enter a valid <b>LOAN AMOUNT</b> between <u><b>$1.00</b></u> and <u><b>$1,000,000,000</b></u><br>";
        fields.fld_LoanAmount.classList.add("border-danger", "border-2");
    }

    if( Number.isNaN(fields.monthlyPayments) || fields.monthlyPayments < 1 || fields.monthlyPayments > 1200 )  {
        fields.errorMsg += "Please enter a valid number of <b>MONTHLY PAYMENTS</b> between <b><u>1</u></b> and <b><u>1200</u></b><br>";
        fields.fld_MonthlyPayments.classList.add("border-danger", "border-2");
    }

    if( Number.isNaN(fields.interestRate) || fields.interestRate < 0 || fields.interestRate > 100 ) {
        fields.errorMsg += "Please enter a valid <b>INTEREST RATE</b> between <b><u>0.00%</u></b> and <u><b>100%</b></u><br>";
        fields.fld_InterestRate.classList.add("border-danger", "border-2");
    } 

    fields.valid = (fields.errorMsg != "") ? false : true;

    return fields;

}

// LOGIC
function generateResults(fields) {

    let amount = fields.loanAmount;
    let rate = fields.interestRate / 12 / 100;
    let months = fields.monthlyPayments;

    let payment = amount * (rate / (1 - Math.pow(1 + rate,-months)));

    fields.payment = payment.toFixed(2);

    return fields;

}

// UI
function displayResults(fields) {

    // get handle to relevant div's and templates
    let summaryDiv = document.getElementById("summaryDiv");
    let summaryTemplate = document.getElementById("summaryTemplate");
    let summary = document.importNode(summaryTemplate.content,true);
    let summaryFields = summary.querySelectorAll("p");

    // update values inside summary
    summaryFields[0].innerHTML = fields.payment;

    // inject summary into summaryDiv
    summaryDiv.appendChild(summary);


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

        // get handle to relevant divs and templates
        let summaryDiv = document.getElementById("summaryDiv");
        let alertTemplate = document.getElementById("alertTemplate");
        let summary = document.importNode(alertTemplate.content,true);

        // update summary with error message(s)
        let p = summary.querySelector("p");
        p.innerHTML = "";
        p.innerHTML = fields.errorMsg;

        // append template to results div
        summaryDiv.appendChild(summary);

}

// SUPPORT LOGIC
function roundNumber(rnum, rlength) { 
    var newnumber = Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
    return newnumber;
}

// SUPPORT UI
function toggleViewCode() {
    
}
