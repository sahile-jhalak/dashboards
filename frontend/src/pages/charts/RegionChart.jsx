import React, { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import { useAppContext } from "../../contexts/ContextProvider";

const RegionChart = ({ height = 300 }) => {
  const { filteredData } = useAppContext();
  const ref = useRef();

  const data = useMemo(() => {
    const map = {};
    filteredData.forEach(d => {
      const k = d.region || "Unknown";
      map[k] = (map[k] || 0) + 1;
    });

    return Object.entries(map)
      .map(([key, value]) => ({ key, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 12); // only top 12 regions
  }, [filteredData]);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = ref.current.clientWidth || 400;
    const heightLocal = height;
    const radius = Math.min(width, heightLocal) / 2 - 10;

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${heightLocal / 2})`);

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const slices = g.selectAll("path")
      .data(pie(data))
      .enter();

    // PIE SLICES
    slices.append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i));

    // ADD LABELS INSIDE EACH SLICE
    slices.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("fill", "#fff")
      .text(d => d.data.key);

    // Title
    svg.append("text")
      .attr("x", 10)
      .attr("y", 16)
      .text("Records by Region")
      .style("font-weight", "600")
      .style("fill", "#ffffff");

  }, [data, height]);

  return <svg ref={ref} style={{ width: "100%", height: `${height}px` }} />;
};

export default RegionChart;
