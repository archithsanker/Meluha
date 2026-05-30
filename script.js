let selectedDate = "";

document.addEventListener("DOMContentLoaded", async () => {

    const response = await fetch("bookings.json");
    const data = await response.json();

    const bookedDates = data.booked.map(date => ({
        title: "Booked",
        start: date,
        allDay: true,
        color: "#b22222"
    }));

    const calendarEl = document.getElementById("calendar");

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",

        events: bookedDates,

        dateClick: function(info) {

            const clickedDate = info.dateStr;

            const isBooked = data.booked.includes(clickedDate);

            if(isBooked){
                alert("This date is already booked.");
                return;
            }

            selectedDate = clickedDate;

            document.getElementById("selectedDate").innerText =
                "Selected Date: " + clickedDate;

            document
                .getElementById("bookingForm")
                .scrollIntoView({
                    behavior: "smooth"
                });
        }
    });

    calendar.render();
});

function sendWhatsApp() {

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const eventType = document.getElementById("eventType").value;
    const guests = document.getElementById("guests").value;

    if(!selectedDate){
        alert("Please select a date first.");
        return;
    }

    const message =
`Hi Meluha,

Name: ${name}

Phone: ${phone}

Event Type: ${eventType}

Guests: ${guests}

Preferred Date: ${selectedDate}

Please let me know availability and pricing.`;

    const whatsappURL =
    "https://wa.me/919037421985?text=" +
    encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
}