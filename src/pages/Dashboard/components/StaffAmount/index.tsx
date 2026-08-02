import React from "react";
import "./index.scss";

interface StaffAmountProps {
  title: string;
  amount: number;
}

export default function StaffAmount(props: StaffAmountProps) {
  const { title, amount } = props;

  return (
    <div
      className="staff-amount-container"
      style={{
        width: "24%",
        height: "170px",
      }}
    >
      <div className="title">{title}</div>
      <div className="content">
        <div className="number">{amount}</div>
        <div className="text"> &nbsp;人</div>
      </div>
    </div>
  );
}
