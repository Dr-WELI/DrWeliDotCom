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
    title: "Kangaroo Time",
    subtitle: "Single · Spotify",
    embed: "https://open.spotify.com/embed/track/0oifq4mMHGsCjEcLfPwy47?utm_source=generator&theme=0",
    link: "https://open.spotify.com/track/0oifq4mMHGsCjEcLfPwy47",
    cover: "/assets/img/release-kangaroo-time.jpg"
  },
  {
    id: "doctor",
    title: "El Doctor",
    subtitle: "Single · Spotify",
    embed: "https://open.spotify.com/embed/track/4JmFwCmHASS4WkujMTPHWs?utm_source=generator&theme=0",
    link: "https://open.spotify.com/track/4JmFwCmHASS4WkujMTPHWs",
    cover: "/assets/img/release-el-doctor.jpg"
  },
  {
    id: "live",
    title: "Live Performance",
    subtitle: "YouTube",
    embed: "https://www.youtube.com/embed/MeugaprjwGk?rel=0",
    link: "https://www.youtube.com/watch?v=MeugaprjwGk",
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
