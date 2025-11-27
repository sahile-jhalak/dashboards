import React, { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import { useAppContext } from "../../contexts/ContextProvider";

const TopicChart = ({ height = 300 }) => {
  const { filteredData } = useAppContext();
  const ref = useRef();

  // Prepare data
  const data = useMemo(() => {
    const map = {};
    filteredData.forEach(d => {
      const key = d.topic || "Unknown";
      map[key] = (map[key] || 0) + 1;
    });

    return Object.entries(map)
      .map(([key, value]) => ({ key, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 12); // top 12 topics
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
    const color = d3.scaleOrdinal(d3.schemeSet2);

    const slices = g.selectAll("path").data(pie(data)).enter();

    // Draw slices
    slices
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i));

    // Add labels INSIDE slices
    slices
      .append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("fill", "#fff")
      .text(d => d.data.key);

    // Title
    svg
      .append("text")
      .attr("x", 10)
      .attr("y", 16)
      .text("Top Topics")
      .style("font-weight", "600")
      .style("fill", "#ffffff");
  }, [data, height]);

  return <svg ref={ref} style={{ width: "100%", height: `${height}px` }} />;
};

export default TopicChart;
