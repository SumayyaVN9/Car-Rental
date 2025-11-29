// "use client";

// import "@/styles/searchcard.css";
// import { useState, useRef, useEffect } from "react";
// import { DateRange } from "react-date-range";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";

// type DateRangeItem = {
//   selection: {
//     startDate: Date;
//     endDate: Date;
//     key: string;
//   };
// };

// export default function SearchCard() {
//   const [openCal, setOpenCal] = useState(false);

//   const [range, setRange] = useState([
//     {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: "selection",
//     },
//   ]);

//   const [hasSelected, setHasSelected] = useState(false);   //contol placeholder

//   const popupRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
//         setOpenCal(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="search-card">
//       <h1>
//         Quick car hire,<br />No delays
//       </h1>

//       <div className="search-input">
//         <img src="/assets/map.png" className="input-icon" alt="map" />
//         <input type="text" placeholder="Enter pick up location" />
//       </div>

//       <div className="add-dropoff-wrapper">
//         <span className="vertical-line"></span>

//         <div className="add-dropoff">
//           <img src="/assets/add.png" className="add-icon" alt="add" />
//           Add Different Drop Off
//         </div>
//       </div>
//       <div className="date-row" onClick={() => setOpenCal(true)}>
//         <div className="date-box">
//           <img src="/assets/calendar.png" className="input-icon" alt="calendar" />
//           <input
//             type="text"
//             placeholder="Pickup"
//             value={
//               hasSelected ? range[0].startDate.toDateString() : ""
//             }
//             readOnly
//           />
//         </div>

//         <div className="date-box">
//           <img src="/assets/calendar.png" className="input-icon" alt="calendar" />
//           <input
//             type="text"
//             placeholder="Return"
//             value={
//               hasSelected ? range[0].endDate.toDateString() : ""
//             }
//             readOnly
//           />
//         </div>
//       </div>

//       {openCal && (
//         <div className="calendar-popup" ref={popupRef}>
//           <DateRange
//             ranges={range}
//             onChange={(item: DateRangeItem) => {
//               const { startDate, endDate } = item.selection;

//               setRange([item.selection]);

//               if (startDate && endDate && startDate !== endDate) {
//                 setHasSelected(true);  //display date instead place holder
//                 setOpenCal(false);
//               }
//             }}
//             moveRangeOnFirstSelection={false}
//             months={2}
//             direction="horizontal"
//           />
//         </div>
//       )}

//       <label className="alert-check">
//         <input type="checkbox" /> Alert me when price drops
//       </label>

//       <button className="search-btn">Search</button>
//     </div>
//   );
// }



"use client";

import "@/styles/searchcard.css";
import { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// --------------------
// TYPES
// --------------------
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
};

const LOCATIONS: LocationItem[] = [
  { name: "Heathrow Airport", city: "London", country: "United Kingdom", code: "LHR" },
  { name: "Gatwick Airport", city: "London", country: "United Kingdom", code: "LGW" },
  { name: "Manchester Airport", city: "Manchester", country: "UK", code: "MAN" },
  { name: "Dubai Airport", city: "Dubai", country: "UAE", code: "DXB" },
];

export default function SearchCard() {

  const [openCal, setOpenCal] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [hasSelected, setHasSelected] = useState(false);  //contol placeholder

  const popupRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setOpenCal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Location Search States

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationItem[]>([]);
  const [openLoc, setOpenLoc] = useState(false);

  const locRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locRef.current && !locRef.current.contains(event.target as Node)) {
        setOpenLoc(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle typing in location box
  const handleLocationChange = (value: string) => {
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      setOpenLoc(false);
      return;
    }

    const filtered = LOCATIONS.filter((loc) =>
      loc.name.toLowerCase().includes(value.toLowerCase()) ||
      loc.city.toLowerCase().includes(value.toLowerCase()) ||
      loc.code.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered);
    setOpenLoc(true);
  };

  // Select a location
  const selectLocation = (loc: LocationItem) => {
    setQuery(`${loc.name}, ${loc.city}`);
    setOpenLoc(false);
  };

  return (
    <div className="search-card">
      <h1>
        Quick car hire,<br />No delays
      </h1>

      {
      /* LOCATION AUTOCOMPLETE*/}

      <div className="search-input" ref={locRef}>
        <img src="/assets/map.png" className="input-icon" alt="map" />

        <input
          type="text"
          placeholder="Enter pick up location"
          value={query}
          onChange={(e) => handleLocationChange(e.target.value)}
          onClick={() => setOpenLoc(true)}
        />

        {/* <img src="/assets/arrow-down.png" className="dropdown-icon" /> */}
      </div>

      {/* DROPDOWN */}
      {openLoc && results.length > 0 && (
        <div className="location-dropdown">
          {results.map((loc, i) => (
            <div key={i} className="location-item" onClick={() => selectLocation(loc)}>
              <div className="left-side">
                <img src="/assets/plane.png" className="loc-icon" />
                <div className="loc-info">
                  <p className="loc-name">{loc.name}</p>
                  <p className="loc-sub">{loc.city}, {loc.country}</p>
                </div>
              </div>
              <div className="loc-code">{loc.code}</div>
            </div>
          ))}
        </div>
      )}

      {/* ADD DROPOFF */}
      <div className="add-dropoff-wrapper">
        <span className="vertical-line"></span>

        <div className="add-dropoff">
          <img src="/assets/add.png" className="add-icon" alt="add" />
          Add Different Drop Off
        </div>
      </div>

      {/* DATE ROW */}
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

      {/* CALENDAR POPUP */}
      {openCal && (
        <div className="calendar-popup" ref={popupRef}>
          <DateRange
            ranges={range}
            onChange={(item: DateRangeItem) => {
              const { startDate, endDate } = item.selection;

              setRange([item.selection]);

              if (startDate && endDate && startDate !== endDate) {
                setHasSelected(true); //display date instead place holder
                setOpenCal(false);
              }
            }}
            moveRangeOnFirstSelection={false}
            months={2}
            direction="horizontal"
          />
        </div>
      )}

      {/* CHECKBOX */}
      <label className="alert-check">
        <input type="checkbox" /> Alert me when price drops
      </label>

      {/* SEARCH BUTTON */}
      <button className="search-btn">Search</button>
    </div>
  );
}
