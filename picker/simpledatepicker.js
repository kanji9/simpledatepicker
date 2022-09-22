class SimpleDatePicker{
    init(){
        this.DayTbl = document.querySelector ("#simplepicker____days table tbody");
        //this.Days = Utility.getMonthDays();
        this.printTable(this.DayTbl);
    }

    printTable(ctbl, cYear, cMonth){
        if(!cYear)
            cYear = new Date().getFullYear();
        if(!cMonth)
            cMonth = new Date().getMonth();
        let today = new Date();
        
        // first day of week in the month
        let nFirstDayOfWeek = (new Date(cYear, cMonth)).getDay();
        //generate number of days in "this month" (if september = 32th is 1 october)
        let nDaysInMonth = 32 - new Date(cYear, cMonth, 32).getDate();
        ctbl.innerHTML = "";

        // init first day day
        let nDate = 1;

        // build matrix
        // Weeks in "month slice"
        for (let i = 0; i < 6; i++) {
            let cRow = document.createElement("tr");

            // cycle days of week
            for (let j = 0; j < 7; j++) {

                // Fill the first "empty" cells
                if (i === 0 && j < nFirstDayOfWeek || nDate > nDaysInMonth) 
                {
                    let cCell = document.createElement("td");
                    cCell.innerHTML="";

                    // non necessary cell
                    cCell.classList.add("simplepicker____bg____unavailable");

                    cRow.appendChild(cCell);
                }
                // Fill days cells
                else 
                {
                    let cCell = document.createElement("td");
                    cCell.innerHTML = nDate;

                    // is it today? 
                    if (nDate === today.getDate() && cYear === today.getFullYear() && cMonth === today.getMonth()) 
                        cCell.classList.add("simplepicker____bg____today");

                    // append cell to the row
                    cRow.appendChild(cCell);
                    nDate++;
                }
            }

            ctbl.appendChild(cRow);
        }
    }
}

