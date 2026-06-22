const tracks = [
  {
    id: "letitgo",
    title: "Shall We Let It Go?",
    subtitle: "Single · Spotify",
    embed: "https://open.spotify.com/embed/track/2lDpGWYFNF25neKAI6aGUM?utm_source=generator&theme=0",
    link: "https://open.spotify.com/track/2lDpGWYFNF25neKAI6aGUM?si=eaa8ee0cb2c942ad",
    cover: "/assets/img/release-shall-we-let-it-go.jpg"
  },
  {
    id: "kangaroo-video",
    title: "Kangaroo Time (Video)",
    subtitle: "Music Video · YouTube",
    embed: "https://www.youtube.com/embed/RoSYO3fApEc?rel=0",
    link: "https://youtu.be/RoSYO3fApEc?si=8G5b-VzZRXEnHRef",
    cover: "/assets/img/release-el-doctor.jpg"
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
const miniOpen = document.getElementById("miniOpen");

function setSafeExternalAttrs(linkElement, href) {
  linkElement.href = href;
  linkElement.target = "_blank";
  linkElement.rel = "noopener noreferrer";
}

function loadTrack(track) {
  if (!track) return;

  frame.src = track.embed;
  titleEl.textContent = track.title;
  subEl.textContent = track.subtitle;
  setSafeExternalAttrs(openBtn, track.link);

  miniTitle.textContent = track.title;
  miniSub.textContent = track.subtitle;
  miniArt.src = track.cover;
  miniArt.alt = `${track.title} cover art`;
  setSafeExternalAttrs(miniOpen, track.link);

  document.querySelectorAll(".music-track-card").forEach((el) => {
    el.classList.toggle("active", el.dataset.id === track.id);
  });
}

function renderTracks() {
  grid.innerHTML = tracks.map((track) => `
    <button class="music-track-card" data-id="${track.id}" type="button" aria-label="Play ${track.title}">
      <img src="${track.cover}" alt="${track.title} cover art" loading="lazy">
      <div class="music-track-card-body">
        <h3>${track.title}</h3>
        <p>${track.subtitle}</p>
      </div>
    </button>
  `).join("");

  grid.querySelectorAll(".music-track-card").forEach((button) => {
    button.addEventListener("click", () => {
      const track = tracks.find((entry) => entry.id === button.dataset.id);
      loadTrack(track);
    });
  });
}

if (frame && titleEl && subEl && openBtn && grid && miniTitle && miniSub && miniArt && miniOpen) {
  renderTracks();
  loadTrack(tracks[0]);
}
