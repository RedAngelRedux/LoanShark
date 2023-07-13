// CONTROLLER
function runSubmit() {

    resetResults();

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

function resetResults() {
   // Reset resultsDiv, inputAlert, and results table to invisible
    let summaryDiv = document.getElementById("summaryDiv");
    summaryDiv.innerHTML = "";
    let resultsDiv = document.getElementById("resultsDiv");
    resultsDiv.innerHTML = "";
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

    try {

        let amount = fields.loanAmount;
        let rate = fields.interestRate / 12 / 100;
        let months = fields.monthlyPayments;
    
        // Calculate the Monthly Payment
        let payment = amount * (rate / (1 - Math.pow(1 + rate,-months)));
        fields.payment = payment.toFixed(2);
    
        // Create object to hold payment details for one month
    
        // Create and populate an array of pmtDetails in fields.schedule[]
        let ttlInterest = Number("0.00");
        fields.schedule = [];
        let pmtDetails = {};
        pmtDetails.payment = fields.payment;
        pmtDetails.principal = 0.00;
        pmtDetails.interest = 0.00;
        pmtDetails.ttlInterest = 0.00;
        pmtDetails.balance = amount;
        fields.schedule.push(pmtDetails);
    
        for(let i = 1; i <= months; i++) {

            let pmtDetails = {};
            pmtDetails.payment = fields.payment;
            pmtDetails.interest = (amount * rate).toFixed(2);
            // TO-DO:  Invstigate why ttlInterest (pmtDetails.interest) becomes a string the second time into this loop
            // Casting pmtDetails.interest as a Number worked, but I consider that to be a temporary workaround until I figure it out
            // TO-DO:  Write a blog post on this once resolved.
            ttlInterest += Number(pmtDetails.interest);  
            pmtDetails.ttlInterest = ttlInterest.toFixed(2);
            pmtDetails.principal = (fields.payment - pmtDetails.interest).toFixed(2);
            pmtDetails.balance = (amount - pmtDetails.principal).toFixed(2);

            if(i == months && pmtDetails.balance != 0) {
                let adjustment = Number(Math.abs(pmtDetails.balance).toFixed(2));
                if( pmtDetails.balance < 0 ) {
                    pmtDetails.principal = (pmtDetails.principal -= adjustment).toFixed(2);
                    pmtDetails.payment = (pmtDetails.payment -= adjustment).toFixed(2);
                    pmtDetails.balance = 0;
                } else {
                    pmtDetails.principal = Number(pmtDetails.principal) + Number(adjustment);
                    pmtDetails.payment = Number(pmtDetails.payment) + Number(adjustment);
                    pmtDetails.balance = 0;
                }
            }
                

            amount = (amount -= pmtDetails.principal).toFixed(2);
            fields.schedule.push(pmtDetails);
        }
    
    }
    catch(e) {
        fields.valid = false;
        fields.errorMsg = e.message;
    }
    finally {
        return fields;
    }

}

// UI
function displayResults(fields) {

    // Create and Display Amortization Schedule

     // get handle to results div
    let resultsDiv = document.getElementById("resultsDiv");

    // get handle to table template
    let tableTemplate = document.getElementById("tableTemplate");
    
    // get handle to tbody tag via importNode
    let table = document.importNode(tableTemplate.content,true);
    let tbodyLoanShark = table.querySelector("tbody");

    // clear p tag
    tbodyLoanShark.innerHTML = "";

    // add all the rows to the table
    for (let index = 1; index < fields.schedule.length; index++) {
        
        // let tableRow = document.importNode(tbodyLoanShark.content,true);
        let tableRow = tbodyLoanShark.insertRow();
        
        // insert 5 cells
        for (let index = 0; index < 6; index++) {
            tableRow.insertCell();            
        }

        // grab just the td's and put them into an array
        let rowCols = tableRow.querySelectorAll("td");

        rowCols[0].textContent = index;

        rowCols[1].textContent = ToCurrency(fields.schedule[index].payment);

        rowCols[2].textContent = ToCurrency(fields.schedule[index].principal);

        rowCols[3].textContent = ToCurrency(fields.schedule[index].interest);

        rowCols[4].textContent = ToCurrency(fields.schedule[index].ttlInterest);

        rowCols[5].textContent = ToCurrency(fields.schedule[index].balance);

        tbodyLoanShark.appendChild(tableRow);
    }

        // document.getElementById("tableFizzBuzz").classList.remove("invisible");
    resultsDiv.appendChild(table);

    // get handle to relevant div's and templates
    let summaryDiv = document.getElementById("summaryDiv");
    let summaryTemplate = document.getElementById("summaryTemplate");
    let summary = document.importNode(summaryTemplate.content,true);
    let summaryFields = summary.querySelectorAll("div");

    // update values inside summary
    summaryFields[1].innerHTML = ToCurrency(fields.payment);
    summaryFields[5].innerHTML = ToCurrency(fields.loanAmount);
    summaryFields[9].innerHTML = ToCurrency(fields.schedule[fields.schedule.length-1].ttlInterest);
    summaryFields[13].innerHTML = ToCurrency(Number(fields.loanAmount) + Number(fields.schedule[fields.schedule.length-1].ttlInterest));

    // inject summary into summaryDiv
    summaryDiv.appendChild(summary);

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

function ToCurrency(amount) {
    return Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(amount);
}

// SUPPORT UI
function toggleViewCode() {
    
}
