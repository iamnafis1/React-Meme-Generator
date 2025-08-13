import React from "react";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "One does not simply",
    bottomText: "walk into Mordor",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = React.useState([]);

  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  function getMemeImage(e) {
    e.preventDefault(); // prevent page reload on button click
    if (allMemes.length === 0) return; // safeguard for API delay
    const randomIndex = Math.floor(Math.random() * allMemes.length);
    const newUrl = allMemes[randomIndex].url;
    setMeme((prev) => ({ ...prev, randomImage: newUrl }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <main style={{ fontFamily: "Arial, sans-serif", maxWidth: 400, margin: "2rem auto", textAlign: "center" }}>
      <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
          placeholder="Top text"
          style={{ padding: "8px", fontSize: "1rem", borderRadius: 6, border: "1px solid #ccc" }}
        />
        <input
          type="text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
          placeholder="Bottom text"
          style={{ padding: "8px", fontSize: "1rem", borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button
          onClick={getMemeImage}
          style={{
            padding: "10px",
            backgroundColor: "#A626D3",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Get a new meme image 📸
        </button>
      </form>
      <div style={{ position: "relative", marginTop: "2rem" }}>
        <img
          src={meme.randomImage}
          alt="meme"
          style={{ width: "100%", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
        />
        <h2
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            textShadow: "2px 2px 6px black",
            fontSize: "1.5rem",
            userSelect: "none",
          }}
        >
          {meme.topText}
        </h2>
        <h2
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            textShadow: "2px 2px 6px black",
            fontSize: "1.5rem",
            userSelect: "none",
          }}
        >
          {meme.bottomText}
        </h2>
      </div>
    </main>
  );
}
