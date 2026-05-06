import { useEffect, useState } from "react";
import "./App.css";

function Logo() {
  return (
    <div className="logo">
      <span className="logo-icon">▶</span>
      <span className="logo-text">Vidos-Ui</span>
    </div>
  );
}

export default function App() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/youtube/videos")
      .then((res) => res.json())
      .then((data) => {
        const list = data.data.data.map((item) => item.items).flat();
        setVideos(list);
      });
  }, []);

  const filtered = videos.filter((v) =>
    v?.snippet?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={dark ? "app dark" : "app light"}>

      <div className="galaxy"></div>

      {/* HEADER */}
      <header className="header">
        <Logo />

        <input
          className="search"
          placeholder="Search videos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="btn" onClick={() => setDark(!dark)}>
          {dark ? "Light" : "Dark"}
        </button>
      </header>

      {/* VIDEO GRID (FULL PAGE) */}
      <div className="grid">
        {filtered.map((video) => (
          <div
            className="card"
            key={video.id}
            onClick={() => setSelected(video)}
          >
            <div className="card__image">
              <img src={video.snippet.thumbnails.medium.url} />
            </div>

            <div className="card__content">
              <div className="card__title">
                {video.snippet.title}
              </div>
              <div className="card__description">
                {video.snippet.channelTitle}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VIDEO PLAYER */}
      {selected && (
        <div className="overlay">
          <div className="player">
            <button className="close" onClick={() => setSelected(null)}>
              ✖
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${selected.id}`}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}