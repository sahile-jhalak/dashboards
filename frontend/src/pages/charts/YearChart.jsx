import React, { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import { useAppContext } from "../../contexts/ContextProvider";

const YearChart = ({ height=300 })=>{
  const { filteredData } = useAppContext();
  const ref = useRef();
  const data = useMemo(()=>{
    const map = {};
    filteredData.forEach(d=>{ const k = d.end_year || "Unknown"; map[k] = (map[k]||0)+1; });
    return Object.entries(map).map(([k,v])=>({ key:k, value:v }));
  }, [filteredData]);

  useEffect(()=>{
    const svg = d3.select(ref.current); svg.selectAll("*").remove();
    const width = ref.current.clientWidth || 400; const heightLocal = height;
    const radius = Math.min(width, heightLocal)/2 - 10;
    const g = svg.append("g").attr("transform", `translate(${width/2},${heightLocal/2})`);
    const pie = d3.pie().value(d=>d.value);
    const arc = d3.arc().innerRadius(radius*0.45).outerRadius(radius);
    const color = d3.scaleOrdinal(d3.schemeTableau10);
    const arcs = g.selectAll("arc").data(pie(data)).join("g");
    arcs.append("path").attr("d", arc).attr("fill",(d,i)=>color(i));
    arcs.append("text").attr("transform", d=>`translate(${arc.centroid(d)})`).text(d=>d.data.key).style("font-size","10px").style("text-anchor","middle");
    svg.append("text").attr("x",10).attr("y",16).text("Records by End Year").style("font-weight","600").style("fill", "#ffffff").style("font-size", "16px").style("text-anchor", "start");
  }, [data]);

  return <svg ref={ref} style={{ width:"100%", height:`${height}px` }} />;
};

export default YearChart;
