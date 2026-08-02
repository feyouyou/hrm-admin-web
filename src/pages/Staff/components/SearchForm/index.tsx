import React from "react";
import { Button, Form, Input, Select, Space } from "antd";
import { debounce } from "lodash";
import { departmentList } from "@src/common/constants";
import { useDispatch } from "react-redux";
import { DispatchType } from "@src/store";
import { fetchStaffList } from "@src/store/slices/staffData";
import { StaffFormValues } from "../DrawerForm";

interface SearchFormProps {
  pageInfo: {
    pageNumber: number;
    pageSize: number;
  };
}

const SearchForm = (props: SearchFormProps) => {
  const { pageInfo } = props;

  const [form] = Form.useForm();
  const dispatch = useDispatch<DispatchType>();

  // 部门列表
  const departmentMapList = departmentList.map((item) => {
    return {
      label: item,
      value: item,
    };
  });

  // 防抖：500ms内多次触发只执行最后一次
  const debounceSearch = React.useCallback(
    debounce((searchParams) => {
      dispatch(
        fetchStaffList({
          pageSize: pageInfo.pageSize,
          searchParams,
        }),
      );
    }, 500),
    [],
  );

  const handleValuesChange = (
    _changeValues: Partial<StaffFormValues>,
    allValues: StaffFormValues,
  ) => {
    debounceSearch(allValues);
  };

  const handleClear = () => {
    form.resetFields();
    debounceSearch({});
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
      onValuesChange={handleValuesChange}
    >
      <Space size="large">
        <Form.Item name="userName" label="姓名">
          <Input placeholder="请输入姓名" style={{ width: 200 }} allowClear />
        </Form.Item>

        <Form.Item label="职位类型" name="level">
          <Select
            options={[
              { label: "正式", value: "正式" },
              { label: "外包", value: "外包" },
            ]}
            placeholder="请选择职位类型"
            style={{ width: 200 }}
            allowClear
          />
        </Form.Item>

        <Form.Item label="部门" name="department">
          <Select
            options={departmentMapList}
            placeholder="请选择部门"
            style={{ width: 200 }}
            allowClear
          />
        </Form.Item>
      </Space>

      {/* 按钮 */}
      <Button
        onClick={handleClear}
        style={{
          marginLeft: "20px",
        }}
      >
        清空
      </Button>
    </Form>
  );
};

export default SearchForm;
