const AVAILABLE_CLASSNAME="simplepicker____bg____available";
const NON_AVAILABLE_CLASSNAME="simplepicker____bg____unavailable";
const TODAY_CLASSNAME="simplepicker____bg____today";
const DATA_ATTRIBUTE="data-day";
const SELECT_YEAR="simplepicker____years";
const SELECT_MONTH="simplepicker____months";


class SimpleDatePicker{

    constructor(onSelect, selector) {  
        this.OnSelect = onSelect;
        this.Selector = selector;

        if(!this.SelectedYear){
            this.SelectedYear = new Date().getFullYear();
        }
        if(!this.SelectedMonth){
            this.SelectedMonth = new Date().getMonth();
        }
    }

    init(){
        document.querySelector(this.Selector).innerHTML = this.generateHtml();
        this.DayTbl = document.querySelector ("#simplepicker____days table tbody");
        this.printTable(this.DayTbl, this.SelectedYear, this.SelectedMonth);

        // click on day
        document.addEventListener('click', (e)=>{
            if(e.target && e.target.classList.contains(AVAILABLE_CLASSNAME))
            this.OnSelect(e.target.getAttribute(DATA_ATTRIBUTE));
        });

        // select defaults
        document.getElementById(SELECT_YEAR).value = this.SelectedYear;
        document.getElementById(SELECT_MONTH).value = this.SelectedMonth;

        // select year or month
        document.addEventListener('change', (e)=>{
            if(e.target && e.target.id == SELECT_YEAR){
                this.SelectedYear = parseInt(e.target.value);
                this.printTable(this.DayTbl, this.SelectedYear, this.SelectedMonth);
            }

            if(e.target && e.target.id == SELECT_MONTH){
                this.SelectedMonth = parseInt(e.target.value);
                this.printTable(this.DayTbl, this.SelectedYear, this.SelectedMonth);
            }
        });
    }

    generateHtml(){
        let cTable = `
            <div id="____simplepicker">
                <div id="simplepicker____top_controls">
                    <select id="simplepicker____months">
                        ${this.printMonths().join("<br/>")}
                    </select>
                    <select id="simplepicker____years">
                        ${this.printYears().join("<br/>")}
                    </select>
                </div>
                <div id="simplepicker____days">
                    <table >
                        <thead>
                            <tr>
                                <th>Sun</th>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                    <div id="simplepicker____footer">
                        <button>Ok</button>
                        <button>Cancel</button>
                    </div>
                </div>
            </div>
        `;
        return cTable;
    }

    printMonths(){
        let cMonths = ["Gen", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let cMonthOpt = new Array();
        cMonths.forEach((e,i)=> { cMonthOpt.push(`<option value="${i}">${e}</option>`); });
        return cMonthOpt;
    }

    printYears(){
        let nStart = 1900;
        let cYears = new Array();
        for(let i=0;i<200;i++)
            cYears.push(nStart++);
        let cYearsOpt = new Array();
        cYears.forEach(e=> cYearsOpt.push(`<option value="${e}">${e}</option>`));
        return cYearsOpt;
    }

    printTable(ctbl, cYear, cMonth){
        let today = new Date();
        ctbl.innerHTML = "";
        let cDays = Utility.getMonthDays(cYear, cMonth);

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

