const AVAILABLE_CLASSNAME="simplepicker____bg____available";
const NON_AVAILABLE_CLASSNAME="simplepicker____bg____unavailable";
const TODAY_CLASSNAME="simplepicker____bg____today";
const DATA_ATTRIBUTE="data-day";

class SimpleDatePicker{
    init(){
        this.DayTbl = document.querySelector ("#simplepicker____days table tbody");
        this.printTable(this.DayTbl);
        document.addEventListener('click',function(e){
            if(e.target && e.target.classList.contains(AVAILABLE_CLASSNAME)){
                  // date is selected!
             }
         });
    }

    printTable(ctbl, cYear, cMonth){
        if(!cYear)
            cYear = new Date().getFullYear();
        if(!cMonth)
            cMonth = new Date().getMonth();
        let today = new Date();

        let cDays = Utility.getMonthDays();

        let nDayIndex = 0;
        for (let i = 0; i < 6; i++) {
            let cRow = document.createElement("tr");
            for (let j = 0; j < 7; j++) {
                if(i === 0 && j < new Date(cDays[nDayIndex]).getDay() || nDayIndex >= cDays.length)
                {
                    let cCell = document.createElement("td");
                    cCell.innerHTML="";
                    // non necessary cell
                    cCell.classList.add(NON_AVAILABLE_CLASSNAME);
                    cRow.appendChild(cCell);
                }
                else if(!isNaN(new Date(cDays[nDayIndex]).getDate()))
                {
                    let cCell = document.createElement("td");
                    cCell.innerHTML = new Date(cDays[nDayIndex]).getDate();
                    cCell.setAttribute(DATA_ATTRIBUTE, Date.parse(cDays[nDayIndex]));

                    console.log(cDays[nDayIndex]);
                    cCell.classList.add(AVAILABLE_CLASSNAME);
                    // is it today? 
                    if (new Date(new Date(cDays[nDayIndex])).getDate() === today.getDate() && cYear === today.getFullYear() && cMonth === today.getMonth())
                        cCell.classList.add(TODAY_CLASSNAME);
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

