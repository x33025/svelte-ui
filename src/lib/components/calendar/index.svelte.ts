export const DaysOfWeek = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
} as const;

export class Calendar {

    today: Date = $state(new Date());

    days: Date[] = $state([]);

    selectedDate: Date | null = $state(null);

    rangeStart: Date | null = $state(null);
    rangeEnd: Date | null = $state(null);

    selectedMonth: number | null = $state(null);
    selectedYear: number | null = $state(null);
   
    startDayOfWeek: number = DaysOfWeek.Monday;

    showAdjacentMonths: boolean = true;

    constructor() {
        this.today = new Date();
        this.days = this.calculateDays();
        this.selectedDate = this.today;
        
        this.selectedMonth = this.today.getMonth();
        this.selectedYear = this.today.getFullYear();
        
        this.rangeStart = null;
        this.rangeEnd = null;

        this.calculateDays = this.calculateDays.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
    }

    calculateDays(): Date[] {
        const year = this.selectedYear ?? this.today.getFullYear();
        const month = this.selectedMonth ?? this.today.getMonth();
        console.log(`Calculating days for Month: ${month}, Year: ${year}`);
        const firstDayOfMonth = new Date(year, month, 1);
        const dayOfWeek = (firstDayOfMonth.getDay() - this.startDayOfWeek + 7) % 7;
        const firstDate = new Date(year, month, 1 - dayOfWeek);

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const totalDays = this.showAdjacentMonths ? 42 : daysInMonth;

        return Array.from({ length: totalDays }, (_, i) => this.createDay(firstDate, i))
            .filter(day => this.showAdjacentMonths || (day.getMonth() === month));
    }

    createDay(startDate: Date, offset: number): Date {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + offset);
        return currentDate;
    }

    isToday(day: Date): boolean {
        return day.getDate() === this.today.getDate() &&
               day.getMonth() === this.today.getMonth() &&
               day.getFullYear() === this.today.getFullYear();
    }

    isSelected(day: Date): boolean {
        if (!this.selectedDate) {
            return false;
        } else {
            const isSelected = day.toDateString() === this.selectedDate.toDateString();
            if (isSelected) {
                console.log(`Selected Date: ${day.toDateString()}`);
            }
            return isSelected;
        }
    }

    isInactive(day: Date): boolean {
        const month = this.selectedMonth ?? this.today.getMonth();
        return day.getMonth() !== month;
    }
    isInRange(day: Date): boolean {
        if (!this.rangeStart || !this.rangeEnd) return false;
        
        // Ensure that range works forward and backward
        const [start, end] = this.rangeStart < this.rangeEnd
            ? [this.rangeStart, this.rangeEnd]
            : [this.rangeEnd, this.rangeStart];

        return day >= start && day <= end;
    }

    isRangeStart(day: Date): boolean {
        if (this.rangeStart === null) return false;
        const isRangeStart = day.toDateString() === this.rangeStart.toDateString();
        if (isRangeStart) {
            console.log(`Range Start Date: ${day.toDateString()}`);
        }
        return isRangeStart;
    }

    isRangeEnd(day: Date): boolean {
        if (this.rangeEnd === null) return false;
        const isRangeEnd = day.toDateString() === this.rangeEnd.toDateString();
        if (isRangeEnd) {
            console.log(`Range End Date: ${day.toDateString()}`);
        }
        return isRangeEnd;
    }

    prevMonth() {
        if (this.selectedMonth === null) return;

        console.log(`Current Month: ${this.selectedMonth}, Year: ${this.selectedYear}`);
        this.selectedMonth -= 1;
        if (this.selectedMonth < 0) {
            this.selectedMonth = 11;
            this.selectedYear = this.selectedYear === null ? null : this.selectedYear - 1;
        }
        console.log(`Updated to Previous Month: ${this.selectedMonth}, Year: ${this.selectedYear}`);
        this.days = this.calculateDays();
    }

    nextMonth() {
        if (this.selectedMonth === null) return;

        console.log(`Current Month: ${this.selectedMonth}, Year: ${this.selectedYear}`);
        this.selectedMonth += 1;
        if (this.selectedMonth > 11) {
            this.selectedMonth = 0;
            this.selectedYear = this.selectedYear === null ? null : this.selectedYear + 1;
        }
        console.log(`Updated to Next Month: ${this.selectedMonth}, Year: ${this.selectedYear}`);
        this.days = this.calculateDays();
    }

    get firstDayOfMonth(): Date {
        const date = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
        return date;
    }

    get lastDayOfMonth(): Date {
        const date = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
        return date;
    }

    toggleAdjacentMonths() {
        this.showAdjacentMonths = !this.showAdjacentMonths;
    }

}



export const calendar = new Calendar();