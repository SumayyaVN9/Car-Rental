// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import "@/styles/results.css";

// type CarItem = {
//   id: number;
//   name: string;
//   brand: string;
//   car_type: string;
//   fuel: string;
//   price_per_day: number;
//   image_url: string;
//   pickup_address: string;
// };

// type CarsResponse = {
//   items: CarItem[];
//   total: number;
//   page: number;
//   page_size: number;
// };

// const PAGE_SIZE = 6;

// export default function ResultContent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const pickup = searchParams.get("pickup") || "";
//   const from = searchParams.get("from") || "";
//   const to = searchParams.get("to") || "";

//   const [carType, setCarType] = useState("all");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [page, setPage] = useState(1);

//   const [cars, setCars] = useState<CarItem[]>([]);
//   const [total, setTotal] = useState<number>(0);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

//   const buildApiUrl = () => {
//     const params = new URLSearchParams();

//     if (pickup) params.append("pickup", pickup);
//     if (from) params.append("from_date", from);
//     if (to) params.append("to_date", to);

//     if (carType !== "all") params.append("car_type", carType);
//     if (minPrice) params.append("min_price", minPrice);
//     if (maxPrice) params.append("max_price", maxPrice);

//     params.append("page", page.toString());
//     params.append("page_size", PAGE_SIZE.toString());

//     // return `http://127.0.0.1:8000/cars?${params.toString()}`;
//      return `https://car-rental-pfwk.onrender.com/cars?${params.toString()}`;
//   };

//   useEffect(() => {
//     const fetchCars = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const url = buildApiUrl();
//         const res = await fetch(url);
//         if (!res.ok) throw new Error(`API error: ${res.status}`);

//         const data: CarsResponse = await res.json();
//         setCars(data.items);
//         setTotal(data.total);
//       } catch (err) {
//         setError("Failed to load cars. Please try again.");
//         setCars([]);
//         setTotal(0);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCars();
//   }, [pickup, from, to, carType, minPrice, maxPrice, page]);

//   const goBack = () => router.push("/");

//   return (
//     <main className="results-page">
//       <header className="results-header">
//         <button className="back-btn" onClick={goBack}>← Modify search</button>

//         <div>
//           <h1>Available cars</h1>
//           <p className="results-subtitle">
//             {pickup && <span>Pickup: <strong>{pickup}</strong></span>}
//             {from && to && (
//               <>
//                 {" · "}
//                 <span>Dates: <strong>{from}</strong> to <strong>{to}</strong></span>
//               </>
//             )}
//           </p>
//         </div>
//       </header>

//       <section className="results-layout">
//         <aside className="filters">
//           <div className="filter-row">
//             <label>Car Type</label>
//             <select
//               value={carType}
//               onChange={(e) => {
//                 setPage(1);
//                 setCarType(e.target.value);
//               }}
//             >
//               <option value="all">All</option>
//               <option value="economy">Economy</option>
//               <option value="suv">SUV</option>
//               <option value="luxury">Luxury</option>
//               <option value="van">Van</option>
//             </select>
//           </div>

//           <div className="filter-row">
//             <label>Price per day</label>
//             <div className="price-inputs">
//               <input
//                 type="number"
//                 placeholder="Min"
//                 value={minPrice}
//                 onChange={(e) => setMinPrice(e.target.value)}
//               />
//               <span>–</span>
//               <input
//                 type="number"
//                 placeholder="Max"
//                 value={maxPrice}
//                 onChange={(e) => setMaxPrice(e.target.value)}
//               />
//             </div>
//           </div>

//           <button
//             className="clear-btn"
//             onClick={() => {
//               setCarType("all");
//               setMinPrice("");
//               setMaxPrice("");
//             }}
//           >
//             Clear filters
//           </button>
//         </aside>

//         <section className="results-content">
//           {loading && <div>Loading cars…</div>}
//           {error && <div className="error">{error}</div>}
//           {!loading && !error && cars.length === 0 && <div> No cars found.</div>}

//           <div className="cars-grid">
//             {cars.map((car) => (
//               <article key={car.id} className="car-card">
//                 <img src={car.image_url} alt={car.name} className="car-image" />

//                 <div className="car-body">
//                   <h2>{car.name}</h2>
//                   <p className="car-meta">
//                     {car.brand} · {car.car_type?.toUpperCase()} · {car.fuel}
//                   </p>

//                   <div className="car-footer">
//                     <p className="car-price">
//                       ₹{car.price_per_day} <span>/day</span>
//                     </p>

//                     <button className="car-cta">View details</button>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>

//           {total > 0 && (
//             <nav className="pagination">
//               <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//                 Previous
//               </button>

//               <span>Page {page} of {totalPages}</span>

//               <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
//                 Next
//               </button>
//             </nav>
//           )}
//         </section>
//       </section>
//     </main>
//   );
// }




// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import "@/styles/results.css";

// type CarItem = {
//   id: number;
//   name: string;
//   brand: string;
//   car_type: string;
//   fuel: string;
//   price_per_day: number;
//   image_url: string;
//   pickup_address: string;
// };

// type CarsResponse = {
//   items: CarItem[];
//   total: number;
//   page: number;
//   page_size: number;
// };

// const PAGE_SIZE = 6;

// export default function ResultContent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const pickup = searchParams.get("pickup") || "";
//   const from = searchParams.get("from") || "";
//   const to = searchParams.get("to") || "";

//   const [carType, setCarType] = useState("all");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [page, setPage] = useState(1);

//   const [cars, setCars] = useState<CarItem[]>([]);
//   const [total, setTotal] = useState<number>(0);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

//   const buildApiUrl = () => {
//     const params = new URLSearchParams();

//     if (pickup) params.append("pickup", pickup);
//     if (from) params.append("from_date", from);
//     if (to) params.append("to_date", to);

//     if (carType !== "all") params.append("car_type", carType);
//     if (minPrice) params.append("min_price", minPrice);
//     if (maxPrice) params.append("max_price", maxPrice);

//     params.append("page", page.toString());
//     params.append("page_size", PAGE_SIZE.toString());

//     return `https://car-rental-pfwk.onrender.com/cars?${params.toString()}`;
//   };

//   useEffect(() => {
//     const fetchCars = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const res = await fetch(buildApiUrl());
//         if (!res.ok) throw new Error("API error");

//         const data: CarsResponse = await res.json();
//         setCars(data.items);
//         setTotal(data.total);
//       } catch (err) {
//         setError("Failed to load cars. Please try again.");
//         setCars([]);
//         setTotal(0);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCars();
//   }, [pickup, from, to, carType, minPrice, maxPrice, page]);

//   return (
//     <main className="results-page">
//       <header className="results-header">
//         <button className="back-btn" onClick={() => router.push("/")}>
//           ← Modify search
//         </button>

//         <div>
//           <h1>Available cars</h1>
//           <p className="results-subtitle">
//             {pickup && <span>Pickup: <strong>{pickup}</strong></span>}
//             {from && to && (
//               <>
//                 {" · "}
//                 <span>Dates: <strong>{from}</strong> to <strong>{to}</strong></span>
//               </>
//             )}
//           </p>
//         </div>
//       </header>

//       <section className="results-layout">
//         {/* Filters */}
//         <aside className="filters">
//           <div className="filter-row">
//             <label>Car Type</label>
//             <select
//               value={carType}
//               onChange={(e) => {
//                 setPage(1);
//                 setCarType(e.target.value);
//               }}
//             >
//               <option value="all">All</option>
//               <option value="economy">Economy</option>
//               <option value="suv">SUV</option>
//               <option value="luxury">Luxury</option>
//               <option value="van">Van</option>
//             </select>
//           </div>

//           <div className="filter-row">
//             <label>Price per day</label>
//             <div className="price-inputs">
//               <input
//                 type="number"
//                 placeholder="Min"
//                 value={minPrice}
//                 onChange={(e) => setMinPrice(e.target.value)}
//               />
//               <span>–</span>
//               <input
//                 type="number"
//                 placeholder="Max"
//                 value={maxPrice}
//                 onChange={(e) => setMaxPrice(e.target.value)}
//               />
//             </div>
//           </div>

//           <button
//             className="clear-btn"
//             onClick={() => {
//               setCarType("all");
//               setMinPrice("");
//               setMaxPrice("");
//             }}
//           >
//             Clear filters
//           </button>
//         </aside>

//         {/* Cars */}
//         <section className="results-content">
//           {loading && <div>Loading cars…</div>}
//           {error && <div className="error">{error}</div>}
//           {!loading && !error && cars.length === 0 && <div>No cars found.</div>}

//           <div className="cars-grid">
//             {cars.map((car) => (
//               <article key={car.id} className="car-card">
//                 <img src={car.image_url} alt={car.name} className="car-image" />

//                 <div className="car-body">
//                   <h2>{car.name}</h2>
//                   <p className="car-meta">
//                     {car.brand} · {car.car_type?.toUpperCase()} · {car.fuel}
//                   </p>

//                   <div className="car-footer">
//                     <p className="car-price">
//                       ₹{car.price_per_day} <span>/day</span>
//                     </p>
//                     <button className="car-cta">View details</button>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>

//           {total > 0 && (
//             <nav className="pagination">
//               <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//                 Previous
//               </button>

//               <span>Page {page} of {totalPages}</span>

//               <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
//                 Next
//               </button>
//             </nav>
//           )}
//         </section>
//       </section>
//     </main>
//   );
// }


// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import "@/styles/results.css";

// type CarItem = {
//   id: number;
//   name: string;
//   brand: string;
//   car_type: string;
//   fuel: string;
//   seats: number;
//   price_per_day: number;
//   image_url: string;
//   pickup_address: string;
// };

// type CarsResponse = {
//   items: CarItem[];
//   total: number;
//   page: number;
//   page_size: number;
// };

// const PAGE_SIZE = 6;

// export default function ResultContent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const pickup = searchParams.get("pickup") || "";
//   const from = searchParams.get("from") || "";
//   const to = searchParams.get("to") || "";


//   const [brand, setBrand] = useState("all");
//   const [fuel, setFuel] = useState("all");
//   const [seats, setSeats] = useState("all");
//   const [carType, setCarType] = useState("all");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   const [page, setPage] = useState(1);

//   const [cars, setCars] = useState<CarItem[]>([]);
//   const [total, setTotal] = useState<number>(0);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

//   const buildApiUrl = () => {
//     const params = new URLSearchParams();

//     if (pickup) params.append("pickup", pickup);
//     if (from) params.append("from_date", from);
//     if (to) params.append("to_date", to);

//     if (brand !== "all") params.append("brand", brand);
//     if (fuel !== "all") params.append("fuel", fuel);
//     if (seats !== "all") params.append("seats", seats);
//     if (carType !== "all") params.append("car_type", carType);

//     if (minPrice) params.append("min_price", minPrice);
//     if (maxPrice) params.append("max_price", maxPrice);

//     params.append("page", page.toString());
//     params.append("page_size", PAGE_SIZE.toString());

//     return `https://car-rental-pfwk.onrender.com/cars?${params.toString()}`;
//   };

//   useEffect(() => {
//     const fetchCars = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const res = await fetch(buildApiUrl());
//         if (!res.ok) throw new Error("API error");

//         const data: CarsResponse = await res.json();
//         setCars(data.items);
//         setTotal(data.total);
//       } catch (err) {
//         setError("Failed to load cars. Please try again.");
//         setCars([]);
//         setTotal(0);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCars();
//   }, [pickup, from, to, brand, fuel, seats, carType, minPrice, maxPrice, page]);

//   return (
//     <main className="results-page">
    
//       <header className="results-header">
//         <button className="back-btn" onClick={() => router.push("/")}>
//           ← Back
//         </button>

//         <div>
//           <h1>Available cars</h1>
//           <p className="results-subtitle">
//             {pickup && <span>Pickup: <strong>{pickup}</strong></span>}
//             {from && to && (
//               <>
//                 {" · "}
//                 <span>Dates: <strong>{from}</strong> to <strong>{to}</strong></span>
//               </>
//             )}
//           </p>
//         </div>
//       </header>

     
//       <section className="results-layout">

      
//         <aside className="filters">

         
//           <div className="filter-row">
//             <label>Brand</label>
//             <select value={brand} onChange={(e) => { setPage(1); setBrand(e.target.value); }}>
//               <option value="all">All</option>
//               <option value="Toyota">Toyota</option>
//               <option value="Honda">Honda</option>
//               <option value="BMW">BMW</option>
//               <option value="Audi">Audi</option>
//               <option value="Mercedes">Mercedes</option>
//               <option value="Tesla">Tesla</option>
//             </select>
//           </div>

          
//           <div className="filter-row">
//             <label>Fuel</label>
//             <select value={fuel} onChange={(e) => { setPage(1); setFuel(e.target.value); }}>
//               <option value="all">All</option>
//               <option value="Petrol">Petrol</option>
//               <option value="Diesel">Diesel</option>
//               <option value="Electric">Electric</option>
//               <option value="Hybrid">Electric</option>
//             </select>
//           </div>

        
//           <div className="filter-row">
//             <label>Seats</label>
//             <select value={seats} onChange={(e) => { setPage(1); setSeats(e.target.value); }}>
//               <option value="all">All</option>
//               <option value="2">2 Seats</option>
//               <option value="4">4 Seats</option>
//               <option value="5">5 Seats</option>
//               <option value="7">7 Seats</option>
//             </select>
//           </div>

         
//           <div className="filter-row">
//             <label>Car Type</label>
//             <select value={carType} onChange={(e) => { setPage(1); setCarType(e.target.value); }}>
//               <option value="all">All</option>
//               <option value="economy">Economy</option>
//               <option value="suv">SUV</option>
//               <option value="luxury">Luxury</option>
//               <option value="van">COMPACT</option>
//             </select>
//           </div>

          
//           <div className="filter-row">
//             <label>Price</label>
//             <div className="price-inputs">
//               <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
//               <span>–</span>
//               <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
//             </div>
//           </div>

          
//           <button
//             className="clear-btn"
//             onClick={() => {
//               setBrand("all");
//               setFuel("all");
//               setSeats("all");
//               setCarType("all");
//               setMinPrice("");
//               setMaxPrice("");
//             }}>
//             Clear 
//           </button>
//         </aside>

      
//         <section className="results-content">
//           {loading && <div>Loading cars…</div>}
//           {error && <div className="error">{error}</div>}
//           {!loading && !error && cars.length === 0 && <div>No cars found.</div>}

//           <div className="cars-grid">
//             {cars.map((car) => (
//               <article key={car.id} className="car-card">
//                 <img src={car.image_url} alt={car.name} className="car-image" />

//                 <div className="car-body">
//                   <h2>{car.name}</h2>

//                   <p className="car-meta">
//                     {car.brand} · {car.car_type?.toUpperCase()} · {car.fuel} · {car.seats} Seats
//                   </p>

//                   <div className="car-footer">
//                     <p className="car-price">
//                       ₹{car.price_per_day} <span>/day</span>
//                     </p>
//                     <button className="car-cta">View details</button>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>

          
//           {total > 0 && (
//             <nav className="pagination">
//               <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
//               <span>Page {page} of {totalPages}</span>
//               <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
//             </nav>
//           )}
//         </section>
//       </section>
//     </main>
//   );
// }



"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@/styles/results.css";

type CarItem = {
  id: number;
  name: string;
  brand: string;
  car_type: string;
  fuel: string;
  seats: number;
  price_per_day: number;
  image_url: string;
  pickup_address: string;
};

type CarsResponse = {
  items: CarItem[];
  total: number;
  page: number;
  page_size: number;
};

const PAGE_SIZE = 6;

export default function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pickup = searchParams.get("pickup") || "";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  const [brand, setBrand] = useState("all");
  const [fuel, setFuel] = useState("all");
  const [seats, setSeats] = useState("all");
  const [carType, setCarType] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);

  const [cars, setCars] = useState<CarItem[]>([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  
  const buildApiUrl = () => {
    const params = new URLSearchParams();

    if (pickup) params.append("pickup", pickup);
    if (from) params.append("from_date", from);
    if (to) params.append("to_date", to);

    // if (brand !== "all") params.append("brand", brand);
    if (fuel !== "all") params.append("fuel", fuel);
    if (seats !== "all") params.append("seats", seats);
    if (carType !== "all") params.append("car_type", carType);

    if (minPrice) params.append("min_price", minPrice);
    if (maxPrice) params.append("max_price", maxPrice);

    params.append("page", page.toString());
    params.append("page_size", PAGE_SIZE.toString());

    return `https://car-rental-pfwk.onrender.com/cars?${params.toString()}`;
  };

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(buildApiUrl());
        if (!res.ok) throw new Error("API error");

        const data: CarsResponse = await res.json();
        setCars(data.items);
        setTotal(data.total);
      } catch (err) {
        setError("Failed to load cars. Please try again.");
        setCars([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
   }, [pickup, from, to, fuel, seats, carType, minPrice, maxPrice, page]);



  return (
    <main className="results-page">
      <header className="results-header">
        <button className="back-btn" onClick={() => router.push("/")}>
          ← Back
        </button>

        <div>
          <h1>Available cars</h1>

          <p className="results-subtitle">
            {pickup && <span>Pickup: <strong>{pickup}</strong></span>}
            {from && to && (
              <>
                {" · "}
                <span>Dates: <strong>{from}</strong> to <strong>{to}</strong></span>
              </>
            )}
          </p>
        </div>
      </header>

      <section className="results-layout">
        <aside className="filters">

         


          
          <div className="filter-row">
            <label>Fuel</label>
            <select 
                value={fuel} 
                onChange={(e) => { setPage(1); setFuel(e.target.value.toLowerCase()); }}
              >
                <option value="all">All</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>

          </div>

      
          <div className="filter-row">
            <label>Seats</label>
            <select value={seats} onChange={(e) => { setPage(1); setSeats(e.target.value); }}>
              <option value="all">All</option>
              <option value="2">2 Seats</option>
              <option value="4">4 Seats</option>
              <option value="5">5 Seats</option>
              <option value="7">7 Seats</option>
            </select>
          </div>

          
          <div className="filter-row">
            <label>Car Type</label>
            <select value={carType} onChange={(e) => { setPage(1); setCarType(e.target.value); }}>
              <option value="all">All</option>
              <option value="economy">Economy</option>
              <option value="compact">Compact</option>
              <option value="intermediate">Intermediate</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
              <option value="suv">SUV</option>
            </select>
          </div>

          
          <div className="filter-row">
            <label>Price</label>
            <div className="price-inputs">
              <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
              <span>–</span>
              <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
          </div>

          <button
            className="clear-btn"
            onClick={() => {
              setBrand("all");
              setFuel("all");
              setSeats("all");
              setCarType("all");
              setMinPrice("");
              setMaxPrice("");
            }}>
            Clear
          </button>

        </aside>

        {/* RESULTS */}
        <section className="results-content">
          {loading && <div>Loading cars…</div>}
          {error && <div className="error">{error}</div>}
          {!loading && !error && cars.length === 0 && <div>No cars found.</div>}

          <div className="cars-grid">
            {cars.map((car) => (
              <article key={car.id} className="car-card">
                <img src={car.image_url} alt={car.name} className="car-image" />

                <div className="car-body">
                  <h2>{car.name}</h2>
                  <p className="car-meta">
                    {car.brand} · {car.car_type?.toUpperCase()} · {car.fuel} · {car.seats} Seats
                  </p>

                  <div className="car-footer">
                    <p className="car-price">
                      ₹{car.price_per_day} <span>/day</span>
                    </p>
                   <button
                      className="car-cta"
                      onClick={() => router.push(`/cars/${car.id}`)}
                    >
                      View details
                    </button>

                  </div>
                </div>
              </article>
            ))}
          </div>

          {total > 0 && (
            <nav className="pagination">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                Next
              </button>
            </nav>
          )}
        </section>
      </section>
    </main>
  );
}
