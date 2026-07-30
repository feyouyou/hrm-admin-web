import React from "react";
import ReactEChart from "echarts-for-react";

interface ColumnChartProps {
  title: string;
  renderList: any;
}

export default function ColumnChart(props: ColumnChartProps) {
  const { title, renderList } = props;
  const option = {
    title: { text: title, left: "left" },
    tooltip: { trigger: "axis" },
    yAxis: [{ type: "value", minInterval: 1 }], // minInterVal  展示整数
    xAxis: [
      {
        type: "category",
        data: renderList.xData,
      },
    ],
    series: [
      {
        name: "人数",
        type: "bar",
        data: renderList.yData,
        label: {
          show: true,
          precision: 1,
          position: "top",
          valueAnimation: true,
        },
      },
    ],
  };

  return (
    <div
      className="staff-amount-container"
      style={{ width: "49.3%", height: "350px" }}
    >
      <ReactEChart option={option} />
    </div>
  );
}
