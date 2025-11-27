import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchAllData } from "../services/api";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const normalizeStr = (v) => {
  if (v === null || v === undefined) return "";
  return String(v).trim().toLowerCase();
};

const getCityFromCountry = (country) => {
  if (!country) return "unknown city";
  const map = {
    "united states of america": "New York",
    india: "Delhi",
    mexico: "Mexico City",
    nigeria: "Lagos",
    russia: "Moscow",
    lebanon: "Beirut",
    "saudi arabia": "Riyadh",
    egypt: "Cairo",
    angola: "Luanda",
    "south africa": "Johannesburg"
  };
  return map[normalizeStr(country)] || "Unknown City";
};

export const ContextProvider = ({ children }) => {
  const [rawData, setRawData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    topic: [],
    sector: [],
    region: [],
    country: [],
    city: [],
    pestle: [],
    source: [],
    swot: [],
    end_year: "",
    minIntensity: "",
    maxIntensity: "",
    minLikelihood: "",
    maxLikelihood: "",
    minRelevance: "",
    maxRelevance: ""
  });

  useEffect(() => {
    let mounted = true;
    fetchAllData()
      .then((data) => {
        if (!mounted) return;
        const parsed = (data || []).map((d) => {
          const countryVal = d.country || "";
          const cityAuto = getCityFromCountry(countryVal);
          return {
            __raw: d,
            topic: normalizeStr(d.topic),
            topic_display: d.topic || "",
            sector: normalizeStr(d.sector),
            sector_display: d.sector || "",
            region: normalizeStr(d.region),
            region_display: d.region || "",
            country: normalizeStr(countryVal),
            country_display: countryVal || "",
            city: normalizeStr(cityAuto),
            city_display: cityAuto,
            pestle: normalizeStr(d.pestle),
            pestle_display: d.pestle || "",
            source: normalizeStr(d.source),
            source_display: d.source || "",
            swot: normalizeStr(d.swot),
            swot_display: d.swot || "",
            end_year: d.end_year ? String(d.end_year) : "",
            intensity: d.intensity === "" ? null : Number(d.intensity),
            likelihood: d.likelihood === "" ? null : Number(d.likelihood),
            relevance: d.relevance === "" ? null : Number(d.relevance)
          };
        });
        setRawData(parsed);
        setLoadingData(false);
      })
      .catch((err) => {
        setError(err?.message || "Failed to fetch data");
        setLoadingData(false);
      });
    return () => (mounted = false);
  }, []);

  const lists = useMemo(() => {
    const make = (arr, key, display) => {
      const map = new Map();
      arr.forEach((r) => {
        const n = r[key]; const d = r[display];
        if (n && !map.has(n)) map.set(n, d);
      });
      return Array.from(map).map(([norm, disp]) => ({ norm, disp }));
    };
    return {
      topics: make(rawData, "topic", "topic_display"),
      sectors: make(rawData, "sector", "sector_display"),
      regions: make(rawData, "region", "region_display"),
      countries: make(rawData, "country", "country_display"),
      cities: make(rawData, "city", "city_display"),
      pestles: make(rawData, "pestle", "pestle_display"),
      sources: make(rawData, "source", "source_display"),
      swots: make(rawData, "swot", "swot_display"),
      endYears: [...new Set(rawData.map((r) => r.end_year).filter(Boolean))].sort()
    };
  }, [rawData]);

  const filteredData = useMemo(() => {
    const f = filters;
    const matchMulti = (arr, value) => (Array.isArray(arr) && arr.length > 0 ? arr.includes(value) : true);
    const inRange = (val, min, max) => {
      if (min !== "" && (val === null || val === undefined || Number(val) < Number(min))) return false;
      if (max !== "" && (val === null || val === undefined || Number(val) > Number(max))) return false;
      return true;
    };
    return rawData.filter((r) => {
      if (!matchMulti(f.topic, r.topic)) return false;
      if (!matchMulti(f.sector, r.sector)) return false;
      if (!matchMulti(f.region, r.region)) return false;
      if (!matchMulti(f.country, r.country)) return false;
      if (!matchMulti(f.city, r.city)) return false;
      if (!matchMulti(f.pestle, r.pestle)) return false;
      if (!matchMulti(f.source, r.source)) return false;
      if (!matchMulti(f.swot, r.swot)) return false;
      if (f.end_year && String(r.end_year) !== String(f.end_year)) return false;
      if (!inRange(r.intensity ?? 0, f.minIntensity, f.maxIntensity)) return false;
      if (!inRange(r.likelihood ?? 0, f.minLikelihood, f.maxLikelihood)) return false;
      if (!inRange(r.relevance ?? 0, f.minRelevance, f.maxRelevance)) return false;
      return true;
    });
  }, [rawData, filters]);

  const debug = () => {
    console.log({ lists, filters, sampleRaw: rawData.slice(0, 5), filteredLength: filteredData.length });
  };

  return (
    <AppContext.Provider value={{ rawData, filteredData, lists, filters, setFilters, loadingData, error, debug }}>
      {children}
    </AppContext.Provider>
  );
};
