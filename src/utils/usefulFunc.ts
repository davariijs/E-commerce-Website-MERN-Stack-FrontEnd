const today = new Date();

    // Arrays for day names and month names
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    // Function to get the formatted date
    function getFormattedDate(date) {
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayNumber = date.getDate();
    return `${dayName}, ${monthName} ${dayNumber}`;
    }

    // Get the next 5 days (including today)
    export const nextFiveDays = [];
    for (let i = 0; i < 6; i++) {
    const nextDate = new Date(today); // Create a copy of today's date
    nextDate.setDate(today.getDate() + i); // Increment the day by `i`
    nextFiveDays.push(getFormattedDate(nextDate)); // Add the formatted date to the array
    }


    export const formatDate = (isoDate) => {
        const options = {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        };
        return new Intl.DateTimeFormat("en-US", options).format(new Date(isoDate));
      };