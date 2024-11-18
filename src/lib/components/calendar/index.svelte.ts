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

    showAdjacentMonths: boolean = $state(true);

    constructor() {
        this.today = new Date();
        this.days = this.calculateDays();
        this.selectedDate = this.today;
        
        this.selectedMonth = this.today.getMonth();
        this.selectedYear = this.today.getFullYear();
        
        this.rangeStart = null;
        this.rangeEnd = null;
    }

    calculateDays(): Date[] {
        const firstDayOfMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
        const dayOfWeek = (firstDayOfMonth.getDay() - this.startDayOfWeek + 7) % 7;
        const firstDate = new Date(this.today.getFullYear(), this.today.getMonth(), 1 - dayOfWeek);

        const daysInMonth = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0).getDate();
        const totalDays = this.showAdjacentMonths ? 42 : daysInMonth;

        return Array.from({ length: totalDays }, (_, i) => this.createDay(firstDate, i))
            .filter(day => this.showAdjacentMonths || (day.getMonth() === this.today.getMonth()));
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
            return day.toDateString() === this.selectedDate.toDateString();
        }
    }

    isInactive(day: Date): boolean {
        return day < this.firstDayOfMonth || day > this.lastDayOfMonth;
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
        return day.toDateString() === this.rangeStart.toDateString();
    }

    isRangeEnd(day: Date): boolean {
        if (this.rangeEnd === null) return false;
        return day.toDateString() === this.rangeEnd.toDateString();
    }

    prevMonth() {
        if (this.selectedDate === null) return;

        this.selectedMonth = this.selectedMonth === null ? null : this.selectedMonth - 1;
  
    }

    nextMonth() {
        if (this.selectedDate === null) return;

        this.selectedMonth = this.selectedMonth === null ? null : this.selectedMonth + 1;
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