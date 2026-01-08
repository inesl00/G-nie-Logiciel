export const eventList = [];

export const eventStore = {
    addEvent(event) {
        eventList.push(event);
        console.log(eventList);
    },
}