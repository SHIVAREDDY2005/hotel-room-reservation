const FLOORS = 10;
const hotel = {};

function initHotel() {
  for (let f = 1; f <= FLOORS; f++) {
    hotel[f] = [];
    let rooms = f === 10 ? 7 : 10;
    for (let r = 1; r <= rooms; r++) {
      hotel[f].push({
        roomNo: f * 100 + r,
        booked: false
      });
    }
  }
}
