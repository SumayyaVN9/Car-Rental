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

const DUMMY_LOCATIONS: LocationItem[] = [
  {
    name: "5905 W SAHARA AVE UNIT A",
    city: "Las Vegas",
    country: "USA",
    code: "LAS1",
    address: "5905 W SAHARA AVE UNIT A, LAS VEGAS, NV",
    lat: null,
    lng: null,
  },
  {
    name: "1 South Main Street",
    city: "Las Vegas",
    country: "USA",
    code: "LAS2",
    address: "1 South Main Street, Las Vegas, NV",
    lat: null,
    lng: null,
  },
  {
    name: "Mandalay Bay Resort",
    city: "Las Vegas",
    country: "USA",
    code: "LAS3",
    address: "3950 South Las Vegas Boulevard, Mandalay Bay Resort",
    lat: null,
    lng: null,
  },
  {
    name: "Circus Circus",
    city: "Las Vegas",
    country: "USA",
    code: "LAS4",
    address: "2880 South Las Vegas Boulevard, Circus Circus",
    lat: null,
    lng: null,
  },
  {
    name: "South Rainbow Boulevard",
    city: "Las Vegas",
    country: "USA",
    code: "LAS5",
    address: "2219 South Rainbow Boulevard",
    lat: null,
    lng: null,
  },
  {
    name: "Bellagio Resort And Casino",
    city: "Las Vegas",
    country: "USA",
    code: "LAS6",
    address: "3600 South Las Vegas Boulevard, Bellagio Resort And Casino",
    lat: null,
    lng: null,
  },
  {
    name: "Excalibur Hotel Casino",
    city: "Las Vegas",
    country: "USA",
    code: "LAS7",
    address: "3850 South Las Vegas Boulevard, Excalibur Hotel Casino",
    lat: null,
    lng: null,
  },
  {
    name: "UNIVERSITY CENTER DR",
    city: "Las Vegas",
    country: "USA",
    code: "LAS8",
    address: "4775 UNIVERSITY CENTER DR, Las Vegas, NV",
    lat: null,
    lng: null,
  },
];

export default function SearchCard() {
  
  const [openCal, setOpenCal] = useState(false);
  const [range, setRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [hasSelected, setHasSelected] = useState(false);

  const [pickupQuery, setPickupQuery] = useState("");
  const [dropoffQuery, setDropoffQuery] = useState("");

  const [results, setResults] = useState<LocationItem[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeField, setActiveField] = useState<ActiveField>(null);

  const [showDropoff, setShowDropoff] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();



  const formatLocationDisplay = (loc: LocationItem) => {
    if (loc.name && loc.city) return `${loc.name}, ${loc.city}`;
    if (loc.name) return loc.name;
    if (loc.city) return `${loc.city}, ${loc.country}`;
    return loc.address;
  };


  const fetchLocations = (value: string) => {
    const query = value.trim().toLowerCase();

    if (!query) {
      setResults([]);
      setOpenDropdown(false);
      return;
    }

    const filtered = DUMMY_LOCATIONS.filter((loc) => {
      const text =
        `${loc.name} ${loc.city} ${loc.country} ${loc.address}`.toLowerCase();
      return text.includes(query);
    });

    setResults(filtered);
    setOpenDropdown(filtered.length > 0);
  };

  const handleSearch = () => {
    if (!pickupQuery.trim()) {
      setErrorMsg("Please select a pickup location.");
      return;
    }

    if (!hasSelected) {
      setErrorMsg("Please select pickup and return dates.");
      return;
    }

    setErrorMsg("");

    const pickup = encodeURIComponent(pickupQuery.trim());
    const from = range[0].startDate.toISOString().split("T")[0];
    const to = range[0].endDate.toISOString().split("T")[0];

    router.push(`/result?pickup=${pickup}&from=${from}&to=${to}`);
  };


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

      {!showDropoff && (
        <div className="add-dropoff-wrapper">
          <span className="vertical-line"></span>
          <div className="add-dropoff" onClick={() => setShowDropoff(true)}>
            <img src="/assets/add.png" className="add-icon" alt="add" />
            Add Different Drop Off
          </div>
        </div>
      )}

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

      <label className="alert-check">
        <input type="checkbox" /> Alert me when price drops
      </label>

      {errorMsg && <p className="error-msg">{errorMsg}</p>}

      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
