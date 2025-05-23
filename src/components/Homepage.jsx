import { Link } from "react-router-dom";
import nbalogo from "../assets/NBAlogo.png";
import nhllogo from "../assets/NHLlogo.png";
import nfllogo from "../assets/NFllogo.png";
import nbaGames from '../mock/nbaGames.js';
import nflGames from '../mock/nflGames.js';
import nhlGames from '../mock/nhlGames.js'
import { useState, useEffect } from 'react';
import GameCard from "./GameCard.jsx";


function getFeaturedGames(games, count = 2) {
  //const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD" //TODO: Fix this to get the current date
  const today = "2025-05-22" // For testing purposes, set a fixed date
  const todayGames = games.filter(g => g.date === today);
  let featured = [...todayGames];

  if (featured.length < count) {
    // Get future games, sorted by date
    const futureGames = games
      .filter(g => g.date > today)
      .sort((a, b) => a.date.localeCompare(b.date));
    for (let i = 0; featured.length < count && i < futureGames.length; i++) {
      featured.push(futureGames[i]);
    }
  }

  // If still less than count, add recent past games
  if (featured.length < count) {
    const pastGames = games
      .filter(g => g.date < today)
      .sort((a, b) => b.date.localeCompare(a.date));
    for (let i = 0; featured.length < count && i < pastGames.length; i++) {
      featured.push(pastGames[i]);
    }
  }

  return featured.slice(0, count);
}

export default function Homepage() {
    const [nba, setNba] = useState([]);
    const [nfl, setNfl] = useState([]);
    const [nhl, setNhl] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            try {
                setNba(getFeaturedGames(nbaGames, 2));
                setNfl(getFeaturedGames(nflGames, 2));
                setNhl(getFeaturedGames(nhlGames, 2));
                setLoading(false);
            } catch (err) {
                setError("Failed to load featured games.");
                setLoading(false);
            }
        }, 100);
    }, []);

    if (loading) return <div className="p-6">Loading featured games...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="flex flex-col lg:flex-row justify-center gap-8 w-full max-w-6xl mx-auto px-4">
  {/* NBA Column */}
  <div className="flex-1 flex flex-col items-center">
    <Link
      to="/nba"
      className="flex flex-col items-center max-w[200px] transition-transform duration-200 hover:scale-125 rounded-lg shadow cursor-pointer p-2"
    >
      <div className="text-2xl mt-10 font-bold">NBA</div>

      
      <img src={nbalogo} alt="NBA Logo" className="w-40 h-40 mt-2 object-contain" />
    </Link>

    <div className="mt-45 w-full ">
      {nba.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  </div>
  {/* NHL Column */}
  <div className="flex-1 flex flex-col items-center">
    <Link
      to="/nhl"
      className="flex flex-col items-center max-w[200px] transition-transform duration-200 hover:scale-125 rounded-lg shadow cursor-pointer p-2"
    >
      <div className="text-2xl mt-10 font-bold">NHL</div>
      <img src={nhllogo} alt="NHL Logo" className="w-40 h-40 mt-2 object-contain" />
    </Link>
    {/* Featured Games Title */}
  <h2 className="text-3xl font-bold text-center mt-20 mb-6">Featured Games</h2>

    <div className="mt-10 w-full">
      {nhl.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  </div>

  {/* NFL Column */}
  <div className="flex-1 flex flex-col items-center">
    <Link
      to="/nfl"
      className="flex flex-col items-center max-w[200px] transition-transform duration-200 hover:scale-125 rounded-lg shadow cursor-pointer p-2"
    >
      <div className="text-2xl mt-10 font-bold">NFL</div>
      <img src={nfllogo} alt="NFL Logo" className="w-40 h-40 mt-2 object-contain" />
    </Link>
    <div className="mt-45 w-full">
      {nfl.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  </div>

</div>

    );
}