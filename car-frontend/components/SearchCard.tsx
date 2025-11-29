"use client";

import "@/styles/searchcard.css";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function SearchCard(){
  const [openCal, setOpenCal] = useState(false);

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  type DateRangeItem = {
  selection: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
};


  return (
    <div className="search-card">

      <h1>
        Quick car hire,<br />No delays
      </h1>

      {/* PICKUP INPUT */}
      <div className="search-input">
        <img src="/assets/map.png" className="input-icon" alt="map" />
        <input type="text" placeholder="Enter pick up location" />
      </div>

      <p className="add-dropoff">+ Add Different Drop Off</p>

      {/* DATE SELECT */}
      <div className="date-row" onClick={() => setOpenCal(!openCal)}>
        <div className="date-box">
          <img src="/assets/calendar.png" className="input-icon" alt="calendar" />
          <input
            type="text"
            value={range[0].startDate.toDateString()}
            readOnly
          />
          <label>Pickup</label>
        </div>

        <div className="date-box">
          <img src="/assets/calendar.png" className="input-icon" alt="calendar" />
          <input
            type="text"
            value={range[0].endDate.toDateString()}
            readOnly
          />
          <label>Return</label>
        </div>
      </div>

      {/* CALENDAR POPUP */}
      {openCal && (
        <div className="calendar-popup">
          <DateRange
            ranges={range}
            onChange={(item: DateRangeItem) => setRange([item.selection])}
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
      <button className="search-btn">Search</button>
    </div>
  );
}
