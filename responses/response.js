const MAX_TOTAL_NIGHTS = 7;
const MAX_TOTAL_ROOMS = 5;
module.exports = {
    sendResponse: (code,response) =>{
        return{
            statusCode:code,
            headers: {
                "ContentType": "application/json"
            },
            body: JSON.stringify(response)
        }
    },
    errorMessages:{
        peopleToHold: (totPeople,maxAllowedPeople) =>{ return `Total amount of people (${totPeople}) exceeds room capacity ${maxAllowedPeople}!`; },
        maxNumberOfNights: (totNights) =>{ return `Total amount of nights (${totNights}) exceeds hotel limit [${MAX_TOTAL_NIGHTS}]!`; },
        bookingMissingRooms: (roomsRequested) =>{ return `Booking failed. We dont have all the requested rooms available ${[roomsRequested]}!`; },
        maxNumberOfRooms: (totRooms) =>{ return `Total amount of rooms [${totRooms}] exceeds hotel limit [${MAX_TOTAL_ROOMS}]!`; },
        dateRange: (checkInDate,checkOutDate) => {return `Period ${checkInDate} - ${checkOutDate} exceeds max number of nights [${MAX_TOTAL_NIGHTS}]`},
        missingDates: () => {return "Parameters [ checkInDate=YYYY-MM-DD] or [ checkOutDate=YYYY-MM-DD ] is missing or contains invalid value."},
        missingUpdateParam: () => {return "Missing fields to update. At least one of [NumberOfGuests, CheckinDate, CheckOutDate or Rooms ] needs to be present, or at least be something else then already consists!";},
        bookingId: () => {return "ID does not match a booking in the system";},
        unExpectedRangeOfData: () => {return "Operation failed. Unexpected amounts of data to process! [ROOM_IDS]";}
    },
    constValues:{
        MAX_TOTAL_NIGHTS:MAX_TOTAL_NIGHTS,
        MAX_TOTAL_ROOMS:MAX_TOTAL_ROOMS,
    }
}