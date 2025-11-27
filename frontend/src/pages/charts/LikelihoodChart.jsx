import React, { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import { useAppContext } from "../../contexts/ContextProvider";

const LikelihoodChart = ({ height=320 }) => {
  const { filteredData } = useAppContext();
  const ref = useRef();

  const data = useMemo(()=> {
    const map = {};
    filteredData.forEach(d=>{
      const t = d.topic || "Unknown";
      map[t] = map[t] || { sum:0, count:0 };
      map[t].sum += Number(d.likelihood) || 0;
      map[t].count += 1;
    });
    return Object.entries(map).map(([k,v])=>({ key:k, value: v.count? v.sum/v.count:0 })).sort((a,b)=>b.value-a.value).slice(0,12);
  }, [filteredData]);

  useEffect(()=>{
    const svg = d3.select(ref.current); svg.selectAll("*").remove();
    const width = ref.current.clientWidth || 700; const heightLocal = height;
    const margin = {top:20,right:20,bottom:120,left:60};
    const innerW = width - margin.left - margin.right; const innerH = heightLocal - margin.top - margin.bottom;
    const x = d3.scaleBand().domain(data.map(d=>d.key)).range([0,innerW]).padding(0.2);
    const y = d3.scaleLinear().domain([0, d3.max(data,d=>d.value)||0]).nice().range([innerH,0]);
    const g = svg.append("g").attr("transform",`translate(${margin.left},${margin.top})`);
    g.append("g").call(d3.axisLeft(y).ticks(5));
    g.append("g").attr("transform",`translate(0,${innerH})`).call(d3.axisBottom(x)).selectAll("text").attr("transform","rotate(-45)").style("text-anchor","end");
    g.selectAll("rect").data(data).join("rect").attr("x",d=>x(d.key)).attr("y",d=>y(d.value)).attr("width",x.bandwidth()).attr("height",d=>innerH-y(d.value)).attr("fill","#0891b2");
    svg.append("text").attr("x", margin.left).attr("y", 12).text("Avg Likelihood by Topic (Top 12)").style("font-weight","600").style("fill", "#ffffff").style("font-size", "16px").style("text-anchor", "start");
  }, [data]);

  return <svg ref={ref} style={{ width:"100%", height:`${height}px` }} />;
};

export default LikelihoodChart;
