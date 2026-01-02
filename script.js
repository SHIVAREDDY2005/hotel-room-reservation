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
function renderHotel() {
  const container = document.getElementById("hotel");
  container.innerHTML = "";

  for (let f = 10; f >= 1; f--) {
    let row = document.createElement("div");
    row.className = "floor";

    hotel[f].forEach(room => {
      let box = document.createElement("div");
      box.className = "room";
      if (room.booked) box.classList.add("booked");
      box.innerText = room.roomNo;
      row.appendChild(box);
    });

    container.appendChild(row);
  }
}
