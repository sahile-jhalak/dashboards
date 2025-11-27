import React from "react";
import Filters from "../../components/Filters";
import IntensityChart from "../charts/IntensityChart";
import LikelihoodChart from "../charts/LikelihoodChart";
import RelevanceChart from "../charts/RelevanceChart";
import YearChart from "../charts/YearChart";
import RegionChart from "../charts/RegionChart";
import CountryChart from "../charts/CountryChart";
import TopicChart from "../charts/TopicChart";
import CityChart from "../charts/CityChart";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left filter column */}
      <div className="col-span-12 lg:col-span-3">
        <div className="sticky top-24">
          <Filters />
        </div>
      </div>

      {/* Charts area */}
      <div className="col-span-12 lg:col-span-9 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-4"><IntensityChart /></div>
          <div className="card p-4"><LikelihoodChart /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-4"><RelevanceChart /></div>
          <div className="card p-4"><YearChart /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-4"><RegionChart /></div>
          <div className="card p-4"><CountryChart /></div>
          <div className="card p-4"><TopicChart /></div>
        </div>

        <div className="card p-4"><CityChart /></div>
      </div>
    </div>
  );
};

export default Dashboard;
