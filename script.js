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

function travelTime(rooms) {
  let floors = rooms.map(r => Math.floor(r.roomNo / 100));
  let indices = rooms.map(r => r.roomNo % 100);

  let horizontal = Math.max(...indices) - Math.min(...indices);
  let vertical = (Math.max(...floors) - Math.min(...floors)) * 2;

  return horizontal + vertical;
}

function findSameFloor(k) {
  let best = null;

  for (let f in hotel) {
    let available = hotel[f].filter(r => !r.booked);
    if (available.length >= k) {
      for (let i = 0; i <= available.length - k; i++) {
        let slice = available.slice(i, i + k);
        let time = travelTime(slice);
        if (!best || time < best.time) {
          best = { rooms: slice, time };
        }
      }
    }
  }
  return best;
}

function findMultiFloor(k) {
  let all = [];
  for (let f in hotel) {
    hotel[f].forEach(r => {
      if (!r.booked) all.push(r);
    });
  }

  let best = null;
  for (let i = 0; i <= all.length - k; i++) {
    let slice = all.slice(i, i + k);
    let time = travelTime(slice);
    if (!best || time < best.time) {
      best = { rooms: slice, time };
    }
  }
  return best;
}

function book() {
  let k = Number(document.getElementById("roomCount").value);
  if (k < 1 || k > 5) return alert("Max 5 rooms");

  let result = findSameFloor(k) || findMultiFloor(k);
  if (!result) return alert("Not enough rooms");

  result.rooms.forEach(r => r.booked = true);
  renderHotel();
}

function randomFill() {
  for (let f in hotel) {
    hotel[f].forEach(r => {
      r.booked = Math.random() < 0.3;
    });
  }
  renderHotel();
}

function resetHotel() {
  initHotel();
  renderHotel();
}


