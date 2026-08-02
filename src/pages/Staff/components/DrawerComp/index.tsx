import React from "react";
import { Drawer } from "antd";
import "./index.scss";
import DrawerForm from "../DrawerForm";
import { GetStaffListRepsponse } from "@src/api/types";

interface DrawerComp {
  interfaceName: any;
  reloadList: any;
  isOpen: boolean;
  editingStaff?: GetStaffListRepsponse["staffList"][0];
  onClickClose: () => void;
}

const DrawerComp = (props: DrawerComp) => {
  const { isOpen, editingStaff, onClickClose } = props;

  //- 关闭弹窗
  const handleClose = () => {
    onClickClose();
  };

  return (
    <Drawer
      title={editingStaff ? `编辑 ${editingStaff?.userName} 信息` : "新增员工"}
      size={600}
      closable={{ placement: "end" }}
      open={isOpen}
      onClose={handleClose}
      keyboard={true}
    >
      <DrawerForm editingStaff={editingStaff} onSubmitSuccess={handleClose} />
    </Drawer>
  );
};

export default DrawerComp;
