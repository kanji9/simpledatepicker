const CONTAINER ="____simplepickercontainer";
const AVAILABLE_CLASSNAME="simplepicker____bg____available";
const NON_AVAILABLE_CLASSNAME="simplepicker____bg____unavailable";
const NON_AVAILABLE_BEFORE_CLASSNAME="simplepicker____bg____unavailable_before";
const NON_AVAILABLE_AFTER_CLASSNAME="simplepicker____bg____unavailable_after";
const TODAY_CLASSNAME="simplepicker____bg____today";
const DATA_ATTRIBUTE="data-day";
const SELECT_YEAR="simplepicker____years";
const SELECT_MONTH="simplepicker____months";

// to params
const START_YEAR = 1900;
const RANGE_YEAR = 200;

// to internationalize
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Gen", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

class SimpleDatePicker{

    constructor(onSelect, selector) {  
        this.OnSelect = onSelect;
        this.Selector = selector;
        if(!this.SelectedYear)
            this.SelectedYear = new Date().getFullYear();
        if(!this.SelectedMonth)
            this.SelectedMonth = new Date().getMonth();
    }

    show(){
        if(document.querySelector ("#____simplepickercontainer")){
            document.querySelector ("#____simplepickercontainer").remove();
            this.IsOpen = false;
            return;
        }
        this.IsOpen = true;

        let csTableHtml = this.generateHtml();
        let cTemplate = document.createElement("template");
        cTemplate.innerHTML= csTableHtml.trim();
        let cElem = cTemplate.content.firstChild;
        document.querySelector(this.Selector).appendChild(cElem);

        // if picker already in document, remove it
        this.DayTbl = document.querySelector ("#simplepicker____days table tbody");
        this.printTable(this.DayTbl, this.SelectedYear, this.SelectedMonth);

        // click on day
        document.addEventListener('click', (e)=>{
            if(e.target && e.target.classList.contains(AVAILABLE_CLASSNAME))
                this.OnSelect(e.target.getAttribute(DATA_ATTRIBUTE));
            if(e.target && e.target.id == CONTAINER)
                this.show();
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
            <div id="____simplepickercontainer">
                <div id="____simplepicker">
                    <div id="simplepicker____top_controls">
                        <select id="simplepicker____months">
                            ${MONTHS.map((e, i)=> `<option value="${i}">${e}</option>`).join("")}
                        </select>
                        <select id="simplepicker____years">
                            ${[START_YEAR, ...Array.from({ length:RANGE_YEAR }, (_, i) => START_YEAR + i)].map((e, i)=> `<option value="${e}">${e}</option>`).join("")}
                        </select>
                    </div>
                    <div id="simplepicker____days">
                        <table >
                            <thead>
                                <tr>
                                    ${DAYS.map(p=> `<th>${p}</th>`).join("")}
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
            </div>
        `;
        return cTable;
    }

    printTable(ctbl, cYear, cMonth){
        let today = new Date();
        ctbl.innerHTML = "";

        let cPrevMonth = cMonth > 0 && cMonth < 11 ? cMonth - 1 : 11;
        let cNextMonth = cMonth < 12 && cMonth > 0 ? cMonth + 1 : 0;
        let cCurrMonthDays = Utility.getMonthDays(cYear, cMonth, true);
        let cPrevMonthDays = Utility.getMonthDays(cYear, cPrevMonth, false);
        let cNextMonthDays = Utility.getMonthDays(cYear, cNextMonth, false);

        // add last N element form prev month
        cPrevMonthDays = cPrevMonthDays.slice(-(cCurrMonthDays[0].date.getDay()));
        cCurrMonthDays = cPrevMonthDays.concat(cCurrMonthDays);

        // add next month
        cCurrMonthDays = cCurrMonthDays.concat(cNextMonthDays);

        let nDayIndex = 0;
        for (let i = 0; i < 6; i++) {
            let cRow = document.createElement("tr");
            for (let j = 0; j < 7; j++) {
                if(!isNaN(new Date(cCurrMonthDays[nDayIndex].date).getDate()))
                {
                    let cCell = document.createElement("td");
                    cCell.innerHTML = new Date(cCurrMonthDays[nDayIndex].date).getDate();
                    cCell.setAttribute(DATA_ATTRIBUTE, Date.parse(cCurrMonthDays[nDayIndex].date));
                    if(cCurrMonthDays[nDayIndex].valid)
                        cCell.classList.add(AVAILABLE_CLASSNAME);
                    else
                        cCell.classList.add(NON_AVAILABLE_CLASSNAME);

                    // is it today? 
                    let cCurrDate = new Date(cCurrMonthDays[nDayIndex].date);
                    if (cCurrDate.getDate() === today.getDate() && cCurrDate.getMonth() === today.getMonth() && cCurrDate.getFullYear() === today.getFullYear())
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
    static getMonthDays(cYear, cMonth, valid){
        if(!cYear)
            cYear = new Date().getFullYear();
        if(!cMonth)
            cMonth = new Date().getMonth();
        const date = new Date(cYear, cMonth, 1);
        const dates = [];
        while (date.getMonth() === cMonth) {
            dates.push({ date: new Date(date), valid });
            date.setDate(date.getDate() + 1);
        }
        return dates;
    }
}

