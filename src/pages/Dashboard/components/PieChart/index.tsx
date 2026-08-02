import React from "react";
import ReactEChart, { EChartsOption } from "echarts-for-react";

interface PieChartProps {
  title: string;
  renderList: any[];
}

export default function PieChart(props: PieChartProps) {
  const { title, renderList } = props;

  const option: EChartsOption = {
    title: { text: title, left: "left" },
    tooltip: { trigger: "item" },
    legend: { left: "center" },
    series: {
      name: title,
      type: "pie",
      radius: "50%",
      data: renderList,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, .0.5)",
        },
        normal: {
          label: { show: true, formatter: "{b} ({d}%)" },
          labelLine: { show: true },
        },
      },
    },
  };
  return (
    <div
      className="staff-amount-container"
      style={{ width: "49.3%", height: "350px" }}
    >
      <ReactEChart className="react_for_echarts" option={option} />
    </div>
  );
}
