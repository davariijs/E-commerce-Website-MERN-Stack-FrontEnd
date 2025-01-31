const today = new Date();

    // Arrays for day names and month names
    const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    // Function to get the formatted date
    function getFormattedDate(date: Date): string {
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayNumber = date.getDate();
    return `${dayName}, ${monthName} ${dayNumber}`;
    }

    // Get the next 5 days (including today)
    export const nextFiveDays : string[] = []; 
    for (let i = 0; i < 6; i++) {
    const nextDate = new Date(today); // Create a copy of today's date
    nextDate.setDate(today.getDate() + i); // Increment the day by `i`
    nextFiveDays.push(getFormattedDate(nextDate)); // Add the formatted date to the array
    }


    export const formatDate = (isoDate: string): string => {
        const options: Intl.DateTimeFormatOptions = {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        };
        return new Intl.DateTimeFormat("en-US", options).format(new Date(isoDate));
      };