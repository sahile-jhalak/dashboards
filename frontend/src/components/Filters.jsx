import React from "react";
import { useAppContext } from "../contexts/ContextProvider";

const MultiSelectList = ({ list, selected, onChange }) => {
  const toggle = (norm) => {
    if (selected.includes(norm)) onChange(selected.filter((s) => s !== norm));
    else onChange([...selected, norm]);
  };
  return (
    <div className="border rounded p-2 max-h-44 overflow-auto bg-white dark:bg-gray-800">
      {list.map((it) => (
        <div key={it.norm} onClick={() => toggle(it.norm)} className={`p-2 rounded cursor-pointer mb-1 ${selected.includes(it.norm) ? "bg-primary text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
          {it.disp}
        </div>
      ))}
    </div>
  );
};

const Filters = () => {
  const { lists, filters, setFilters, debug } = useAppContext();
  const set = (k) => (v) => setFilters((p) => ({ ...p, [k]: v }));

  return (
    <div className="card p-4">
      <h3 className="font-semibold mb-3">Filters</h3>

      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="text-sm font-medium">Topic</label>
          <MultiSelectList list={lists.topics} selected={filters.topic} onChange={set("topic")} />
        </div>

        <div>
          <label className="text-sm font-medium">Sector</label>
          <MultiSelectList list={lists.sectors} selected={filters.sector} onChange={set("sector")} />
        </div>

        <div>
          <label className="text-sm font-medium">Region</label>
          <MultiSelectList list={lists.regions} selected={filters.region} onChange={set("region")} />
        </div>

        <div>
          <label className="text-sm font-medium">Country</label>
          <MultiSelectList list={lists.countries} selected={filters.country} onChange={set("country")} />
        </div>

        <div>
          <label className="text-sm font-medium">City</label>
          <MultiSelectList list={lists.cities} selected={filters.city} onChange={set("city")} />
        </div>

        <div>
          <label className="text-sm font-medium">PESTLE</label>
          <MultiSelectList list={lists.pestles} selected={filters.pestle} onChange={set("pestle")} />
        </div>

        <div>
          <label className="text-sm font-medium">Source</label>
          <MultiSelectList list={lists.sources} selected={filters.source} onChange={set("source")} />
        </div>

        {lists.swots?.length > 0 && (
          <div>
            <label className="text-sm font-medium">SWOT</label>
            <MultiSelectList list={lists.swots} selected={filters.swot} onChange={set("swot")} />
          </div>
        )}

        <div>
          <label className="text-sm font-medium">End Year</label>
          <select className="w-full border rounded p-2 bg-white dark:bg-gray-800" value={filters.end_year} onChange={(e) => setFilters((p)=>({...p, end_year: e.target.value}))}>
            <option value="">Any</option>
            {lists.endYears.map((y)=> <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3 w-full">
          <input
            placeholder="min intensity"
            type="number"
            className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 dark:text-gray-200"
            value={filters.minIntensity}
            onChange={(e) =>
            setFilters((p) => ({ ...p, minIntensity: e.target.value }))}
          />

          <input
            placeholder="max intensity"
            type="number"
            className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 dark:text-gray-200"
            value={filters.maxIntensity}
            onChange={(e) =>
            setFilters((p) => ({ ...p, maxIntensity: e.target.value }))}
          />

          <input
            placeholder="min likelihood"
            type="number"
            className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 dark:text-gray-200"
            value={filters.minLikelihood}
            onChange={(e) =>
            setFilters((p) => ({ ...p, minLikelihood: e.target.value }))}
          />

          <input
            placeholder="max likelihood"
            type="number"
            className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 dark:text-gray-200"
            value={filters.maxLikelihood}
            onChange={(e) =>
            setFilters((p) => ({ ...p, maxLikelihood: e.target.value }))}
          />

          <input
            placeholder="min relevance"
            type="number"
            className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 dark:text-gray-200"
            value={filters.minRelevance}
            onChange={(e) =>
            setFilters((p) => ({ ...p, minRelevance: e.target.value }))}
          />

          <input
            placeholder="max relevance"
            type="number"
            className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 dark:text-gray-200"
            value={filters.maxRelevance}
            onChange={(e) =>
            setFilters((p) => ({ ...p, maxRelevance: e.target.value }))}
          />
        </div>


        <div className="flex gap-2 mt-2">
          <button className="px-3 py-2 rounded bg-red-500 text-white" onClick={()=> setFilters({
            topic:[],sector:[],region:[],country:[],city:[],pestle:[],source:[],swot:[],end_year:"",minIntensity:"",maxIntensity:"",minLikelihood:"",maxLikelihood:"",minRelevance:"",maxRelevance:""
          })}>Reset</button>
        </div>
      </div>
    </div>
  );
};
export default Filters;
