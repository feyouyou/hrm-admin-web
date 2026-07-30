import { List, Typography } from "antd";
import React from "react";

interface OldStaffTableProps {
  title: string;
  data: any[];
  styleData?: React.CSSProperties;
}

export default function OldStaffTable(props: OldStaffTableProps) {
  let { title, data, styleData } = props;

  data = [{ name: "姓名", department: "部门" }, ...data];

  return (
    <List
      header={<div style={{ fontWeight: "bold" }}>{title}</div>}
      bordered
      style={{
        width: "49.3%",
        height: "350px",
        overflow: "scroll",
        backgroundColor: "#fff",
      }}
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <Typography.Text mark={index === 0}>{item.name}</Typography.Text>
          <Typography.Text mark={index === 0}>
            {item.department}
          </Typography.Text>
        </List.Item>
      )}
    />
  );
}
