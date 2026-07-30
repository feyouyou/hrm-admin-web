import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { DispatchType, StoreStateType } from "@src/store";
import StaffAmount from "./components/StaffAmount";
import OldStaffTable from "./components/OldStaffTable";
import { fetchStaffData } from "@src/store/slices/staffData";
import PieChart from "./components/PieChart";
import ColumnChart from "./components/ColumnChart";
import "./index.scss";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  const staffData = useSelector((state: StoreStateType) => state.staffData);

  const dispatch = useDispatch<DispatchType>();

  useEffect(() => {
    if (staffData.staffAmountList.length) {
      return;
    }
    (async () => {
      setLoading(true);
      await dispatch(fetchStaffData()).unwrap();
      setLoading(false);
    })();
  }, []);

  return (
    <Spin spinning={loading} style={{ height: "100%" }}>
      <div className="dashboard-container">
        {/* 员工数量 */}
        <div className="staff-amount">
          {staffData.staffAmountList.map((item, index) => {
            return (
              <StaffAmount
                key={index}
                title={item.title}
                amount={item.amount}
              />
            );
          })}
        </div>

        <div className="chart-wrapper">
          {/* 饼状图 员工性别分布 */}
          {staffData.pieList.map((item, index) => (
            <PieChart
              title={item.title}
              renderList={item.renderList}
              key={index}
            />
          ))}

          {/* 柱状图 员工年龄分布*/}
          {staffData.columnList.map((item, index) => (
            <ColumnChart key={index} {...item} />
          ))}
        </div>

        {/* 年龄最大的10名员工 */}
        {staffData.wordingYearsInfo.renderList?.length && (
          <OldStaffTable
            title={"工龄最久的10个员工"}
            data={staffData.wordingYearsInfo.renderList || []}
          />
        )}
      </div>
    </Spin>
  );
}
