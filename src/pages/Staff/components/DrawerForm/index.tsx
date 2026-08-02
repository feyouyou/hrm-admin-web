import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Radio, Select, Upload } from "antd";
import { departmentList, educationList } from "@src/common/constants";
import { getRandom } from "@src/common/utils";
import { CreateStaff, UpdateStaff } from "@src/api/apis";
import { GetStaffListRepsponse } from "@src/api/types";
import { fetchStaffList } from "@src/store/slices/staffData";
import { useDispatch } from "react-redux";
import { DispatchType } from "@src/store";

interface DrawerFormProps {
  pageInfo: {
    pageNumber: number;
    pageSize: number;
  };
  editingStaff?: GetStaffListRepsponse["staffList"][0];
  onSubmitSuccess?: () => void;
}

export interface StaffFormValues {
  userName: string;
  level: string;
  department: string;
  departmentManager: string;
  education: number;
  graduatedSchool: string;
  mobile: string;
  avatar?: any[];
}

export default function DrawerForm(props: DrawerFormProps) {
  const { editingStaff, pageInfo, onSubmitSuccess } = props;
  // 是否正在提交中，加载使用
  const [isSubmiting, setIsSubmiting] = useState(false);

  const [form] = Form.useForm<StaffFormValues>();

  const dispatch = useDispatch<DispatchType>();

  // 部门列表
  const departmentMapList = departmentList.map((item) => {
    return {
      label: item,
      value: item,
    };
  });

  // 学历列表
  const educationListMap = educationList.map((item, index) => {
    return {
      label: item,
      value: index,
    };
  });

  // 提交表单
  const handleFinish = async (values: StaffFormValues) => {
    setIsSubmiting(true);
    if (editingStaff) {
      // 编辑
      try {
        await UpdateStaff({
          userName: values.userName,
          level: values.level,
          department: values.department,
          departmentManager: values.departmentManager,
          education: values.education,
          graduatedSchool: values.graduatedSchool,
          mobile: values.mobile,
          avatar: values.avatar,
        });
        message.success("修改成功");
        onSubmitSuccess?.();
        dispatch(fetchStaffList({ pageSize: pageInfo.pageSize }));
      } catch (error) {
        message.error("修改失败");
      }
    } else {
      // 新增
      try {
        await CreateStaff({
          userName: values.userName,
          level: values.level,
          department: values.department,
          departmentManager: values.departmentManager,
          education: values.education,
          graduatedSchool: values.graduatedSchool,
          mobile: values.mobile,
          avatar: values.avatar,
        });
        message.success("添加成功");
        onSubmitSuccess?.();
        dispatch(fetchStaffList({ pageSize: pageInfo.pageSize }));
      } catch (error) {
        message.error("添加失败");
      }
    }
    setIsSubmiting(false);
  };

  // 重置表单
  const handleReset = () => {
    form.resetFields();
  };

  //  表单回填逻辑
  useEffect(() => {
    if (!editingStaff) {
      form.resetFields();
      return;
    }

    const formData: StaffFormValues = {
      userName: editingStaff.userName,
      level: editingStaff.level.levelDescription,
      department: editingStaff.department.departmentName,
      departmentManager: editingStaff.department.departmentLeader,
      education: editingStaff.education,
      graduatedSchool: editingStaff.graduatedSchool,
      mobile: editingStaff.mobile,
    };

    // 处理头像回填：后端url字符串 → Upload需要的fileList数组
    if (editingStaff.avatar) {
      formData.avatar = [
        {
          uid: "-1", // 固定负数uid区分新上传文件
          name: "头像",
          status: "done",
          url: editingStaff.avatar,
        },
      ];
    } else {
      formData.avatar = [];
    }

    form.setFieldsValue(formData);
  }, [editingStaff, form]);

  return (
    <>
      <Form<StaffFormValues>
        form={form}
        onFinish={handleFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item
          label="姓名"
          name="userName"
          required
          rules={[{ required: true, message: "请输入姓名" }]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          label="职位类型"
          name="level"
          required
          rules={[{ required: true, message: "请选择职位类型" }]}
        >
          <Radio.Group>
            <Radio value="正式">正式</Radio>
            <Radio value="外包">外包</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="部门"
          name="department"
          required
          rules={[{ required: true, message: "请选择部门" }]}
        >
          <Select options={departmentMapList} placeholder="请选择部门" />
        </Form.Item>
        <Form.Item
          label="部门负责人"
          name="departmentManager"
          required
          rules={[{ required: true, message: "请输入部门负责人" }]}
        >
          <Input placeholder="请输入部门负责人" />
        </Form.Item>
        <Form.Item
          label="学历"
          name="education"
          required
          rules={[{ required: true, message: "请选择学历" }]}
        >
          <Select options={educationListMap} placeholder="请选择学历" />
        </Form.Item>
        <Form.Item
          label="毕业院校"
          name="graduatedSchool"
          required
          rules={[{ required: true, message: "请输入毕业院校" }]}
        >
          <Input placeholder="请输入毕业院校" />
        </Form.Item>
        <Form.Item
          label="联系电话"
          name="mobile"
          required
          rules={[
            { required: true, message: "请输入联系电话" },
            { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的11位手机号" },
          ]}
        >
          <Input
            placeholder="请输入手机号"
            maxLength={11}
            onChange={(e) => {
              // 限制只能输入数字
              const realVal = e.target.value.replace(/[^\d]/g, "");
              form.setFieldsValue({ mobile: realVal });
            }}
          />
        </Form.Item>
        <Form.Item
          label="头像"
          name="avatar"
          valuePropName="fileList"
          getValueFromEvent={(e: any) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
        >
          <Upload
            listType="picture-card"
            accept="image/*"
            maxCount={3}
            customRequest={(options) => {
              const { file, onSuccess } = options;
              setTimeout(
                () => {
                  // 模拟后端返回
                  const mockRes = {
                    code: 0,
                    msg: "上传成功",
                    data: {
                      url: URL.createObjectURL(file as File),
                    },
                  };
                  onSuccess?.(mockRes);
                },
                getRandom(500, 2000),
              );
            }}
            onChange={(info) => {
              if (info.file.status === "done") {
                message.success("上传成功");
              }
              if (info.file.status === "error") {
                message.error("上传失败");
              }
            }}
          >
            <PlusOutlined />
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 4, span: 14 }}
          style={{ textAlign: "center" }}
        >
          <Button type="primary" htmlType="submit" disabled={isSubmiting}>
            提交
          </Button>
          <Button onClick={handleReset} style={{ marginLeft: "30px" }}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
