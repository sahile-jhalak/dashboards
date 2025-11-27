import React, { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import { useAppContext } from "../../contexts/ContextProvider";

const RelevanceChart = ({ height=300 })=>{
  const { filteredData } = useAppContext();
  const ref = useRef();
  const data = useMemo(()=>{
    const map = {};
    filteredData.forEach(d=>{
      const y = d.end_year || "Unknown";
      map[y] = map[y] || { sum:0, count:0 };
      map[y].sum += Number(d.relevance) || 0;
      map[y].count += 1;
    });
    return Object.entries(map).map(([k,v])=>({ key:k, value: v.count? v.sum/v.count:0 })).sort((a,b)=>{
      if(a.key==="Unknown") return 1;
      if(b.key==="Unknown") return -1;
      return Number(a.key)-Number(b.key);
    });
  }, [filteredData]);

  useEffect(()=>{
    const svg = d3.select(ref.current); svg.selectAll("*").remove();
    const width = ref.current.clientWidth || 700; const heightLocal = height;
    const margin = {top:20,right:20,bottom:50,left:50};
    const innerW = width - margin.left - margin.right; const innerH = heightLocal - margin.top - margin.bottom;
    const x = d3.scalePoint().domain(data.map(d=>d.key)).range([0,innerW]);
    const y = d3.scaleLinear().domain([0, d3.max(data,d=>d.value)||0]).nice().range([innerH,0]);
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    g.append("g").call(d3.axisLeft(y).ticks(5));
    g.append("g").attr("transform",`translate(0,${innerH})`).call(d3.axisBottom(x).tickValues(x.domain().filter((d,i)=> i%Math.ceil(x.domain().length/10) ===0))).selectAll("text").attr("transform","rotate(-40)").style("text-anchor","end");
    const line = d3.line().x(d=>x(d.key)).y(d=>y(d.value)).curve(d3.curveMonotoneX);
    g.append("path").datum(data).attr("fill","none").attr("stroke","#0b7285").attr("stroke-width",2).attr("d",line);
    g.selectAll("circle").data(data).join("circle").attr("cx",d=>x(d.key)).attr("cy",d=>y(d.value)).attr("r",3).attr("fill","#0b7285");
    svg.append("text").attr("x", margin.left).attr("y", 12).text("Avg Relevance by Year").style("font-weight","600").style("fill", "#ffffff").style("font-size", "16px").style("text-anchor", "start");
  }, [data]);

  return <svg ref={ref} style={{ width:"100%", height:`${height}px` }} />;
};

export default RelevanceChart;
