const tracks = [
  {
    id: "ep",
    title: "Yours Academically",
    subtitle: "EP · Spotify",
    embed: "https://open.spotify.com/embed/album/0NcO0Jz1X2wlkedPjB7IZL?utm_source=generator&theme=0",
    link: "https://open.spotify.com/album/0NcO0Jz1X2wlkedPjB7IZL",
    cover: "/assets/img/release-el-doctor.jpg"
  },
  {
    id: "kangaroo",
    title: "Kangaroo Time (Original Edit)",
    subtitle: "Single · Spotify",
    embed: "https://open.spotify.com/embed/track/3IDcuKMd6lErGPzaSS2oVx?utm_source=generator&theme=0",
    link: "https://open.spotify.com/track/3IDcuKMd6lErGPzaSS2oVx?si=4d4ef6596169468f",
    cover: "/assets/img/release-kangaroo-time.jpg"
  },
  {
    id: "goat",
    title: "Cabra da Peste (G.O.A.T.)",
    subtitle: "Single · Spotify",
    embed: "https://open.spotify.com/embed/track/6j1Zkij6ETgFgmJkqxfPux?utm_source=generator&theme=0",
    link: "https://open.spotify.com/track/6j1Zkij6ETgFgmJkqxfPux?si=af049e27021441e7",
    cover: "/assets/img/release-el-doctor.jpg"
  },
  {
    id: "kangaroo-video",
    title: "Kangaroo Time (Video)",
    subtitle: "Music Video · YouTube",
    embed: "https://www.youtube.com/embed/RoSYO3fApEc?rel=0",
    link: "https://youtu.be/RoSYO3fApEc?si=8G5b-VzZRXEnHRef",
    cover: "/assets/img/release-kangaroo-time.jpg"
  }
];

const frame = document.getElementById("musicFrame");
const titleEl = document.getElementById("musicTitle");
const subEl = document.getElementById("musicSub");
const openBtn = document.getElementById("musicOpen");
const grid = document.getElementById("musicTrackGrid");
const miniTitle = document.getElementById("miniTitle");
const miniSub = document.getElementById("miniSub");
const miniArt = document.getElementById("miniArt");

function loadTrack(track) {
  frame.src = track.embed;
  titleEl.textContent = track.title;
  subEl.textContent = track.subtitle;
  openBtn.href = track.link;
  miniTitle.textContent = track.title;
  miniSub.textContent = track.subtitle;
  miniArt.src = track.cover;

  document.querySelectorAll(".music-track-card").forEach(el => {
    el.classList.toggle("active", el.dataset.id === track.id);
  });
}

function renderTracks() {
  grid.innerHTML = tracks.map(t => `
    <button class="music-track-card" data-id="${t.id}">
      <img src="${t.cover}" alt="${t.title}">
      <div class="music-track-card-body">
        <h3>${t.title}</h3>
        <p>${t.subtitle}</p>
      </div>
    </button>
  `).join("");

  grid.querySelectorAll(".music-track-card").forEach(btn => {
    btn.addEventListener("click", () => {
      const track = tracks.find(t => t.id === btn.dataset.id);
      if (track) loadTrack(track);
    });
  });
}

renderTracks();
loadTrack(tracks[0]);
