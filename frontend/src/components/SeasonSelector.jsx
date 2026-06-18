import { useEffect, useState } from "react";
import API from "../services/api";
import "./SeasonSelector.css";

function SeasonSelector() {
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(
    localStorage.getItem("seasonId") || "2"
  );

  useEffect(() => {
    API.get("/seasons")
      .then((res) => setSeasons(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const seasonId = e.target.value;

    localStorage.setItem("seasonId", seasonId);
    setSelectedSeason(seasonId);

    window.location.reload();
  };

  return (
    <div className="season-selector">
      <span>Current Season</span>

      <select value={selectedSeason} onChange={handleChange}>
        {seasons.map((season) => (
          <option key={season.id} value={season.id}>
            {season.name} - {season.status}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SeasonSelector;