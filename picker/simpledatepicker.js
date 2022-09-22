class SimpleDatePicker{
    init(){
        this.cDayTbl = document.querySelector ("#simplepicker____days table tbody");

        
        console.table(Utility.getMonthDays());
    }
}

class Utility{
    static getMonthDays(year, month) {
        if(!year)
            year = new Date().getFullYear();
        if(!month)
            month = new Date().getMonth();
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() == month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }
}

