// CONTROLLER
function runSubmit() {

    // Reset alert & results table to invisible
    let resultsDiv = document.getElementById("resultsDiv");
    resultsDiv.innerHTML = "";

    // get handle to runtime span
    let runtimeSpan = document.getElementById("runtime");
    runtimeSpan.innerHTML = "";
    
    // obtain user values
    let firstNum = document.getElementById("numberInput").value;
    let variations = document.getElementsByName("rbVariation");
    let variation = "rbA";
    for( let i of variations) {
        variation = (i.checked) ? i.id : variation;
    }


    // validate input
    firstNum = parseInt(firstNum);

    let errorMsg = "";

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

}

// LOGIC
function generateResults(firstNum) {

    let results = ['A',firstNum,'A',firstNum]; 

    return results;

}

function generateResultsB(firstNum) {

    let results = ['B',firstNum,'B',firstNum]; 

    return results;

}

function generateResultsC(firstNum) {

    let results = ['C',firstNum,'C',firstNum]; 

    return results;

}

function generateResultsD(firstNum) {

    let results = ['D',firstNum,'D',firstNum]; 

    return results;

}

// UI
function displayResults(fbArray) {

    // get handle to results div
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
}

// SUPPORT LOGIC
function roundNumber(rnum, rlength) { 
    var newnumber = Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
    return newnumber;
}

// SUPPORT UI
function toggleViewCode() {
    
}
