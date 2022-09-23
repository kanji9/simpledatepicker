class SimpleDatePicker{
    init(){
        this.DayTbl = document.querySelector ("#simplepicker____days table tbody");
        
        this.printTable(this.DayTbl);
    }

    printTable(ctbl, cYear, cMonth){
        if(!cYear)
            cYear = new Date().getFullYear();
        if(!cMonth)
            cMonth = new Date().getMonth();
        let today = new Date();

        let cDays = Utility.getMonthDays();
        console.log(cDays);

        let nDayIndex = 0;
        for (let i = 0; i < 6; i++) {
            let cRow = document.createElement("tr");
            for (let j = 0; j < 7; j++) {
                if(i === 0 && j < new Date(cDays[nDayIndex]).getDay() || nDayIndex >= cDays.length)
                {
                    let cCell = document.createElement("td");
                    cCell.innerHTML="";
                    // non necessary cell
                    cCell.classList.add("simplepicker____bg____unavailable");
                    cRow.appendChild(cCell);
                }
                else if(!isNaN(new Date(cDays[nDayIndex]).getDate()))
                {
                    let cCell = document.createElement("td");
                    cCell.innerHTML = new Date(cDays[nDayIndex]).getDate();
                    console.log(cDays[nDayIndex]);
                    cCell.classList.add("simplepicker____bg____available");

                    // is it today? 
                    if (new Date(new Date(cDays[nDayIndex])).getDate() === today.getDate() && cYear === today.getFullYear() && cMonth === today.getMonth()) 
                        cCell.classList.add("simplepicker____bg____today");

                    // append cell to the row
                    cRow.appendChild(cCell);
                    nDayIndex++;
                }
            }
            ctbl.appendChild(cRow);
        }

    }
}


class Utility{
    static getMonthDays(cYear, cMonth){
        if(!cYear)
            cYear = new Date().getFullYear();
        if(!cMonth)
            cMonth = new Date().getMonth();
        const date = new Date(cYear, cMonth, 1);
        const dates = [];
        while (date.getMonth() === cMonth) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return dates;
    }
}

