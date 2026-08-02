import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Avatar, Space, Modal, message } from "antd";
import { DispatchType, StoreStateType } from "@src/store";
import { ColumnsType } from "antd/es/table";
import { educationList } from "@src/common/constants";
import { DeleteStaff } from "@src/api/apis";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { fetchStaffList } from "@src/store/slices/staffData";
import { GetStaffListRepsponse } from "@src/api/types";

interface TableListProps {
  staffList: any[];
  pageInfo: {
    pageNumber: number;
    pageSize: number;
  };
  onClickEdit: (data: GetStaffListRepsponse["staffList"][0]) => void;
}

export default function TableList(props: TableListProps) {
  const { staffList, pageInfo, onClickEdit } = props;
  const staffData = useSelector((state: StoreStateType) => state.staffData);
  const dispatch = useDispatch<DispatchType>();

  const column: ColumnsType = [
    {
      title: "姓名",
      dataIndex: "userName",
      align: "center",
    },
    {
      title: "职位",
      dataIndex: "level",
      align: "center",
      render: (data: any) => (
        <Tag color={data.levelDescription === "正式" ? "blue" : "orange"}>
          {data.levelDescription || "--"}
        </Tag>
      ),
    },
    {
      title: "部门",
      dataIndex: "department",
      align: "center",
      render: (data: any) => data?.departmentName || "--",
    },
    {
      title: "部门负责人",
      dataIndex: "department",
      align: "center",
      render: (data: any) => data?.departmentLeader || "--",
    },
    {
      title: "学历",
      dataIndex: "education",
      render: (type) => <Tag> {educationList[type]}</Tag>,
      align: "center",
    },
    {
      title: "毕业院校",
      dataIndex: "graduatedSchool",
      align: "center",
    },
    {
      title: "联系电话",
      dataIndex: "mobile",
      align: "center",
    },
    {
      title: "头像",
      dataIndex: "avatar",
      align: "center",
      render: (img) => <Avatar src={img} />,
    },
    {
      title: "操作",
      align: "center",
      render: (data, record) => (
        <Space size="small">
          <a onClick={() => handleEdit(data)}>编辑</a>
          <a style={{ color: "red" }} onClick={() => handleDelete(data)}>
            删除
          </a>
        </Space>
      ),
    },
  ];

  const handleEdit = (data: GetStaffListRepsponse["staffList"][0]) => {
    onClickEdit(data);
  };

  const handleDelete = (data: GetStaffListRepsponse["staffList"][0]) => {
    Modal.confirm({
      title: `确认删除 ${data.userName} 吗？`,
      icon: <ExclamationCircleFilled />,
      okText: "确认",
      okType: "danger",
      cancelText: "取消",
      async onOk() {
        try {
          await DeleteStaff({ ids: [data.id] });
          dispatch(fetchStaffList({ pageSize: pageInfo.pageSize }));
          message.success("删除成功");
        } catch (error) {
          message.success("网络错误");
        }
      },
    });
  };

  return (
    <Table
      bordered
      scroll={{ x: true }}
      dataSource={staffList}
      pagination={false}
      rowKey={(record) => record.id}
      loading={staffData.isLoading}
      columns={column}
    />
  );
}
