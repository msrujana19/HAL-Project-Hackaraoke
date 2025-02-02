document.addEventListener("DOMContentLoaded", function () {
    const calendarTitle = document.getElementById("calendar-title");
    const calendarGrid = document.getElementById("calendar-grid");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    

    let currentDate = new Date();
    let selectedDates = JSON.parse(localStorage.getItem("selectedDates")) || {}; // Load saved selections

    function generateCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const monthKey = `${year}-${month}`; // Unique key for each month

        calendarTitle.innerText = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        calendarGrid.innerHTML = "";

        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement("div");
            dayElement.classList.add("day", "header");
            dayElement.innerText = day;
            calendarGrid.appendChild(dayElement);
        });

        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add("day");
            calendarGrid.appendChild(emptyDay);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement("div");
            dayElement.classList.add("day");
            dayElement.innerText = day;

            const dateKey = `${year}-${month + 1}-${day}`;
            if (selectedDates[monthKey] && selectedDates[monthKey].includes(day)) {
                dayElement.classList.add("selected");
            }

            // Add click event to mark/unmark dates
            dayElement.addEventListener("click", function () {
                if (!selectedDates[monthKey]) {
                    selectedDates[monthKey] = [];
                }

                if (selectedDates[monthKey].includes(day)) {
                    // Remove the day from the selected dates
                    selectedDates[monthKey] = selectedDates[monthKey].filter(d => d !== day);
                    dayElement.classList.remove("selected");
                } else {
                    // Add the day to the selected dates
                    selectedDates[monthKey].push(day);
                    dayElement.classList.add("selected");

                    // Show alert when the date is selected
                    alert("Your period has arrived! 🌸Remember, you’re stronger than you think. Take it easy and treat yourself with care today!");
                }

                localStorage.setItem("selectedDates", JSON.stringify(selectedDates)); // Save to localStorage
            });

            calendarGrid.appendChild(dayElement);
        }
    }

    prevMonthBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate);
    });

    nextMonthBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate);
    });

    generateCalendar(currentDate);
});