import { useEffect, useState } from "react";
import "./App.css";

const MATCHES = [
  {
    id: "rcb-csk-1",
    title: "Southern Derby",
    teams: ["RCB", "CSK"],
    date: "Apr 12, 2026",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    basePrice: 1200,
  },
  {
    id: "mi-kkr-2",
    title: "Evening Clash",
    teams: ["MI", "KKR"],
    date: "Apr 15, 2026",
    venue: "Wankhede Stadium, Mumbai",
    basePrice: 1000,
  },
  {
    id: "dc-srh-3",
    title: "Top-Order Showdown",
    teams: ["DC", "SRH"],
    date: "Apr 18, 2026",
    venue: "Arun Jaitley Stadium, Delhi",
    basePrice: 800,
  },
];

const STAND_OPTIONS = [
  { label: "General (1x)", value: "General", multiplier: 1 },
  { label: "Pavilion (1.8x)", value: "Pavilion", multiplier: 1.8 },
  { label: "VIP (3x)", value: "VIP", multiplier: 3 },
];

const TEAM_OPTIONS = ["ALL", "RCB", "CSK", "MI", "KKR", "DC", "SRH"];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <a href="#" className="logo">
        IPL 2026
      </a>
      <button
        type="button"
        className="hamburger"
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        ☰
      </button>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="#schedule" onClick={() => setMenuOpen(false)}>
          Schedule
        </a>
        <a href="#booking" onClick={() => setMenuOpen(false)}>
          Booking
        </a>
        <a href="#summary" onClick={() => setMenuOpen(false)}>
          Summary
        </a>
      </nav>
    </header>
  );
}

function Hero({ season = "IPL 2026", ctaText = "Browse Matches" }) {
  return (
    <section className="hero">
      <p className="hero-badge">{season} Official Ticketing</p>
      <h1>Book Stadium Seats Fast</h1>
      <p className="hero-subtitle">
        Pick your match, choose a stand category, and check your live ticket
        total before booking.
      </p>
      <a href="#schedule" className="hero-btn">
        {ctaText}
      </a>
    </section>
  );
}

function MatchCard({ match, onSelectMatch }) {
  const { id, title, teams, date, venue, basePrice } = match;

  return (
    <article className="match-card" data-match-id={id}>
      <div className="match-header">
        <span className="match-teams">{teams.join(" vs ")}</span>
        <span className="match-price">₹{basePrice.toLocaleString("en-IN")}</span>
      </div>
      <h3 className="match-title">{title}</h3>
      <p className="match-meta">
        {date} • {venue}
      </p>
      <button
        type="button"
        className="book-btn"
        onClick={() => onSelectMatch(match)}
      >
        Book Tickets
      </button>
    </article>
  );
}

function App() {
  const [selectedTeam, setSelectedTeam] = useState("ALL");
  const [isListView, setIsListView] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedMatchName, setSelectedMatchName] = useState("");
  const [standCategory, setStandCategory] = useState("");
  const [tickets, setTickets] = useState(1);

  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage("");
    }, 2500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const visibleMatches =
    selectedTeam === "ALL"
      ? MATCHES
      : MATCHES.filter((match) => match.teams.includes(selectedTeam));

  const matchedFixture = MATCHES.find(
    (m) => m.teams.join(" vs ") === selectedMatchName
  );
  const matchedStand = STAND_OPTIONS.find((s) => s.value === standCategory);

  const validTickets = Math.max(1, Math.min(10, Number(tickets) || 1));
  const totalPrice =
    matchedFixture && matchedStand
      ? Math.round(matchedFixture.basePrice * matchedStand.multiplier * validTickets)
      : 0;

  function handleSelectMatch(match) {
    const label = match.teams.join(" vs ");
    setSelectedMatchName(label);
    setToastMessage(`Selected ${label}`);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleMatchChange(e) {
    setSelectedMatchName(e.target.value);
    setToastMessage("Booking Summary updated!");
  }

  function handleStandChange(e) {
    setStandCategory(e.target.value);
    setToastMessage("Booking Summary updated!");
  }

  function handleTicketsChange(e) {
    setTickets(e.target.value);
    setToastMessage("Booking Summary updated!");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setToastMessage("Booking form submitted!");
  }

  return (
    <>
      <Navbar />

      <main className="container">
        <Hero />

        <section id="schedule">
          <div className="controls">
            <select
              aria-label="Filter by team"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              {TEAM_OPTIONS.map((team) => (
                <option key={team} value={team}>
                  {team === "ALL" ? "All Teams" : team}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setIsListView((prev) => !prev)}
            >
              {isListView ? "Grid View" : "Toggle List View"}
            </button>
          </div>

          <div className={`match-grid ${isListView ? "list-view" : ""}`}>
            {visibleMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onSelectMatch={handleSelectMatch}
              />
            ))}
          </div>
        </section>

        <section id="booking" className="box">
          <h2>Booking Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="match">Match</label>
              <select
                id="match"
                name="match"
                value={selectedMatchName}
                onChange={handleMatchChange}
                required
              >
                <option value="">-- Select Match --</option>
                {MATCHES.map((match) => {
                  const label = match.teams.join(" vs ");
                  return (
                    <option key={match.id} value={label}>
                      {label} (₹{match.basePrice.toLocaleString("en-IN")})
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="stand">Stand Category</label>
              <select
                id="stand"
                name="stand"
                value={standCategory}
                onChange={handleStandChange}
                required
              >
                <option value="">-- Select Stand Category --</option>
                {STAND_OPTIONS.map((stand) => (
                  <option key={stand.value} value={stand.value}>
                    {stand.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tickets">Tickets</label>
              <input
                type="number"
                id="tickets"
                name="tickets"
                min="1"
                max="10"
                value={tickets}
                onChange={handleTicketsChange}
                required
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </section>

        <section id="summary" className="box">
          <h2>Booking Summary</h2>
          <p>
            <strong>Match:</strong> {selectedMatchName || "Not selected"}
          </p>
          <p>
            <strong>Stand Category:</strong> {standCategory || "Not selected"}
          </p>
          <p>
            <strong>Tickets:</strong> {validTickets}
          </p>
          <p>
            <strong>Total Price:</strong> ₹{totalPrice.toLocaleString("en-IN")}
          </p>
        </section>
      </main>

      <div className={`toast ${toastMessage ? "show" : ""}`}>
        {toastMessage}
      </div>
    </>
  );
}

export default App;