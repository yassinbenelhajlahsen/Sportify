import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/favicon.png';

export default function Navbar() {
  const [query, setQuery] = useState('');

  return (
    <nav className="bg-zinc-900 text-white flex flex-col sm:flex-row items-center justify-between px-6 py-4 shadow-md gap-4">
      {/* Logo & Name */}
      <div className="flex items-center gap-2">
       <Link to="/">
          <img src={logo} alt="Logo" className="w-10 h-10" /
        ></Link>
      
      <div className="text-2xl font-bold hover:text-orange-400 transition">
        
        <Link to="/">Sportify</Link>
      </div>
      </div>

      {/* Search bar TODO: DOESNT WORK ATM!!*/}
      <div className="relative w-full sm:w-auto max-w-sm flex-grow">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search teams, games, players..."
          className="w-full px-4 py-2 rounded-full bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
        />
      </div>

      {/* Nav links */}
      <div className="flex gap-4">
        <Link to="/nba" className="hover:text-orange-400 transition">NBA</Link>
        <Link to="/nfl" className="hover:text-orange-400 transition">NFL</Link>
        <Link to="/nhl" className="hover:text-orange-400 transition">NHL</Link>
        <Link to="/about" className="hover:text-orange-400 transition">About</Link>
      </div>
    </nav>
  );
}
