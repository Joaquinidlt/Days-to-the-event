let events = [];
let arr = []; // esta variable uso para cargar mi informacion

const eventName = document.querySelector('#eventName'); // saco la referencia "eventName"
const eventDate = document.querySelector('#eventDate'); // saco la referencia "eventDate"
const buttonAdd = document.querySelector('#bAdd'); // saco la referencia "bAdd"
const eventContainer = document.querySelector('#eventsContainer'); // saco la referencia "eventsContainer"

document.querySelector('form').addEventListener('submit', (e) => { // saco la referencia a mi "form" y luego con "addEventListener" le dijo que cuando haga click em submit, ejecute la siguiente funcion.
    e.preventDefault();
    addEvent();

});

function addEvent() {
    if (eventName.value === "" || eventDate.value === "") { // corroboro que los input tengan informacion
        return; // si los dos input estan vacios, se acaba la funcion con el return.
    }

    if (dateDiff(eventDate.value) < 0) { // corroboro de que la diferencia de fechas de eventDate.value, es mayor o igual a 0
        return; // si es menor, no hace nada y solo retorna, por que la fecha ya paso.
    }

    const newEvent = {
        id: (Math.random() * 100).toString(36).slice(3),
        name: eventName.value,
        date: eventDate.value,
    }

    events.unshift(newEvent);

    eventName.value = "";

    renderEvents();
}

function dateDiff(d) { // esta funcion me regresa el numero de dias que falta desde la fecha actual a la fecha destin0
    const targetDate = new Date(d);
    const today = new Date();
    const difference = targetDate.getTime() - today.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days;
}

function renderEvents() {
    const eventsHTML = events.map(event => {
        return `
            <div class="event">
                <div class="days">
                    <span class="days-number">${dateDiff(event.date)}</span>
                    <span class="days-text">days</span>
                </div>

                <div class="event-name">${event.name}</div>
                <div class="event-date">${event.date}</div>
                <div class="actions">
                    <button class="bDelete" data-id="${event.id}">Eliminar</button>
                </div>

            </div>
        `;
    });
    eventContainer.innerHTML = eventsHTML.join("");
    document.querySelectorAll('.bDelete').forEach(button => {
        button.addEventListener('click', e => {
            const id = button.getAttribute('data-id');
            events = events.filter((event) => event.id !== id);

            renderEvents();
        });
    });
}