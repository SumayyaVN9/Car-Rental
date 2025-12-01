"use client";

import "@/styles/searchcard.css";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useRouter } from "next/navigation";

type DateRangeItem = {
  selection: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
};

type LocationItem = {
  name: string;
  city: string;
  country: string;
  code: string;
  address: string;
  lat: number | null;
  lng: number | null;
};

type ActiveField = "pickup" | "dropoff" | null;

export default function SearchCard() {
  /* ---------- DATE ---------- */
  const [openCal, setOpenCal] = useState(false);
  const [range, setRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [hasSelected, setHasSelected] = useState(false);

  /* ---------- LOCATION ---------- */
  const [pickupQuery, setPickupQuery] = useState("");
  const [dropoffQuery, setDropoffQuery] = useState("");

  const [results, setResults] = useState<LocationItem[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeField, setActiveField] = useState<ActiveField>(null);

  const [showDropoff, setShowDropoff] = useState(false);

  const router = useRouter();

  /* ---------- HELPERS ---------- */

  const formatLocationDisplay = (loc: LocationItem) => {
    if (loc.name && loc.city) return `${loc.name}, ${loc.city}`;
    if (loc.name) return loc.name;
    if (loc.city) return `${loc.city}, ${loc.country}`;
    return loc.address;
  };

  const fetchLocations = async (value: string) => {
    if (!value.trim()) {
      setResults([]);
      setOpenDropdown(false);
      return;
    }

    try {
      const res = await fetch(
        // `http://127.0.0.1:8000/locations?search=${encodeURIComponent(value)}`
        `https://car-rental-pfwk.onrender.com/locations?search=${encodeURIComponent(value )}`
      );
      const data = (await res.json()) as LocationItem[];
      setResults(data);
      setOpenDropdown(data.length > 0);
    } catch (err) {
      console.error("Failed to fetch locations:", err);
      setResults([]);
      setOpenDropdown(false);
    }
  };

  /* ---------- FIXED SEARCH FUNCTION ---------- */
  const handleSearch = () => {
    const pickup = encodeURIComponent(pickupQuery.trim());
    const from = range[0].startDate.toISOString().split("T")[0];
    const to = range[0].endDate.toISOString().split("T")[0];

    router.push(`/result?pickup=${pickup}&from=${from}&to=${to}`);

  };

  /* ---------- INPUT HANDLERS ---------- */

  const handlePickupChange = (value: string) => {
    setPickupQuery(value);
    setActiveField("pickup");
    fetchLocations(value);
  };

  const handleDropoffChange = (value: string) => {
    setDropoffQuery(value);
    setActiveField("dropoff");
    fetchLocations(value);
  };

  const selectLocation = (loc: LocationItem) => {
    const displayValue = formatLocationDisplay(loc);

    if (activeField === "pickup") setPickupQuery(displayValue);
    if (activeField === "dropoff") setDropoffQuery(displayValue);

    setOpenDropdown(false);
  };

 
  return (
    <div className="search-card">
      <h1>
        Quick car hire,
        <br />
        No delays
      </h1>

      <div className="search-input">
        <img src="/assets/map.png" className="input-icon" alt="map" />
        <input
          type="text"
          placeholder="Enter pick up location"
          value={pickupQuery}
          onChange={(e) => handlePickupChange(e.target.value)}
          onFocus={() => {
            setActiveField("pickup");
            if (results.length > 0) setOpenDropdown(true);
          }}
        />
      </div>

      {/* DROP-OFF FIELD */}
      {showDropoff && (
        <div className="search-input">
          <img src="/assets/map.png" className="input-icon" alt="map" />
          <input
            type="text"
            placeholder="Enter drop off location"
            value={dropoffQuery}
            onChange={(e) => handleDropoffChange(e.target.value)}
            onFocus={() => {
              setActiveField("dropoff");
              if (results.length > 0) setOpenDropdown(true);
            }}
          />
        </div>
      )}

      {/* ADD DROP-OFF */}
      {!showDropoff && (
        <div className="add-dropoff-wrapper">
          <span className="vertical-line"></span>
          <div className="add-dropoff" onClick={() => setShowDropoff(true)}>
            <img src="/assets/add.png" className="add-icon" alt="add" />
            Add Different Drop Off
          </div>
        </div>
      )}

      {/* DROPDOWN */}
      {openDropdown && results.length > 0 && (
        <div className="location-dropdown">
          {results.map((loc, i) => (
            <div
              key={i}
              className="location-item"
              onMouseDown={() => selectLocation(loc)}
            >
              <div className="left-side">
                <img src="/assets/plane.png" className="loc-icon" />
                <div className="loc-info">
                  <p className="loc-name">{loc.name || loc.address}</p>
                  <p className="loc-sub">
                    {loc.city}
                    {loc.city && loc.country && ", "}
                    {loc.country}
                  </p>
                </div>
              </div>
              <div className="loc-code">{loc.code}</div>
            </div>
          ))}
        </div>
      )}

      {/* DATE PICKERS */}
      <div className="date-row" onClick={() => setOpenCal(true)}>
        <div className="date-box">
          <img src="/assets/calendar.png" className="input-icon" alt="calendar" />
          <input
            type="text"
            placeholder="Pickup"
            value={hasSelected ? range[0].startDate.toDateString() : ""}
            readOnly
          />
        </div>

        <div className="date-box">
          <img src="/assets/calendar.png" className="input-icon" alt="calendar" />
          <input
            type="text"
            placeholder="Return"
            value={hasSelected ? range[0].endDate.toDateString() : ""}
            readOnly
          />
        </div>
      </div>

      {openCal && (
        <div className="calendar-popup">
          <DateRange
            ranges={range}
            onChange={(item: DateRangeItem) => {
              const { startDate, endDate } = item.selection;
              setRange([item.selection]);
              if (startDate && endDate && startDate !== endDate) {
                setHasSelected(true);
                setOpenCal(false);
              }
            }}
            moveRangeOnFirstSelection={false}
            months={2}
            direction="horizontal"
          />
        </div>
      )}

      {/* ALERT CHECKBOX */}
      <label className="alert-check">
        <input type="checkbox" /> Alert me when price drops
      </label>

      {/* SEARCH BUTTON */}
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
