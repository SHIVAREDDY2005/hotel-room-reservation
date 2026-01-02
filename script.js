const FLOORS = 10;
const hotel = {};

initHotel();
renderHotel();

/* ---------------- INITIALIZE HOTEL ---------------- */
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

/* ---------------- RENDER HOTEL ---------------- */
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

/* ---------------- TRAVEL TIME ---------------- */
function travelTime(rooms) {
  let floors = rooms.map(r => Math.floor(r.roomNo / 100));
  let indexes = rooms.map(r => r.roomNo % 100);

  let horizontal = Math.max(...indexes) - Math.min(...indexes);
  let vertical = (Math.max(...floors) - Math.min(...floors)) * 2;

  return horizontal + vertical;
}

/* ---------------- SAME FLOOR BOOKING ---------------- */
function findSameFloor(k) {
  let best = null;

  for (let f in hotel) {
    let available = hotel[f].filter(r => !r.booked);

    if (available.length >= k) {
      for (let i = 0; i <= available.length - k; i++) {
        let group = available.slice(i, i + k);
        let time = travelTime(group);

        if (!best || time < best.time) {
          best = { rooms: group, time };
        }
      }
    }
  }
  return best;
}

/* ---------------- MULTI FLOOR BOOKING ---------------- */
function findMultiFloor(k) {
  let all = [];

  for (let f in hotel) {
    hotel[f].forEach(r => {
      if (!r.booked) all.push(r);
    });
  }

  let best = null;
  for (let i = 0; i <= all.length - k; i++) {
    let group = all.slice(i, i + k);
    let time = travelTime(group);

    if (!best || time < best.time) {
      best = { rooms: group, time };
    }
  }
  return best;
}

/* ---------------- BOOK BUTTON ---------------- */
function book() {
  let k = Number(document.getElementById("roomCount").value);

  if (k < 1 || k > 5) {
    alert("You can book 1 to 5 rooms only");
    return;
  }

  let result = findSameFloor(k) || findMultiFloor(k);

  if (!result) {
    alert("Not enough rooms available");
    return;
  }

  result.rooms.forEach(r => r.booked = true);
  renderHotel();
}

/* ---------------- RANDOM OCCUPANCY ---------------- */
function randomFill() {
  for (let f in hotel) {
    hotel[f].forEach(r => {
      r.booked = Math.random() < 0.3;
    });
  }
  renderHotel();
}

/* ---------------- RESET ---------------- */
function resetHotel() {
  initHotel();
  renderHotel();
}
