import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import { DispatchType, StoreStateType } from "@src/store";
import { fetchStaffList } from "@src/store/slices/staffData";
import { GetStaffListRepsponse } from "@src/api/types";
import TableList from "./components/TableList";
import DrawerComp from "./components/DrawerComp";
import SearchForm from "./components/SearchForm";
import "./index.scss";

export default function Staff() {
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 1,
    pageSize: 10,
  });

  /** 编辑抽屉是否打开 */
  const [isOpen, setIsOpen] = useState(false);

  /** 当前正在被编辑的用户 */
  const [editingStaff, setEdtingStaff] =
    useState<GetStaffListRepsponse["staffList"][0]>();

  const staffData = useSelector((state: StoreStateType) => state.staffData);

  const dispatch = useDispatch<DispatchType>();

  /** 换页 */
  const handleChangePage = (newPage: number, showSize: number) => {
    if (pageInfo.pageSize !== showSize) {
      return;
    }
    setPageInfo({
      ...pageInfo,
      pageNumber: newPage,
    });
    dispatch(fetchStaffList({ pageSize: pageInfo.pageSize }));
  };

  /** 换每页容量 */
  const handleChangeShowSize = (_currentPage: number, showSize: number) => {
    setPageInfo({
      pageNumber: 1,
      pageSize: showSize,
    });
    dispatch(fetchStaffList({ pageSize: showSize }));
  };

  /** 点击编辑按钮 */
  const handleClickEdit = (data: GetStaffListRepsponse["staffList"][0]) => {
    setIsOpen(true);
    setEdtingStaff(data);
  };

  useEffect(() => {
    dispatch(fetchStaffList({ pageSize: pageInfo.pageSize }));
  }, []);

  return (
    <div className="staff-container">
      <SearchForm pageInfo={pageInfo} />
      <TableList
        staffList={staffData.staffList || []}
        pageInfo={pageInfo}
        onClickEdit={handleClickEdit}
      />
      <div className="pagination-wrapper">
        <Pagination
          total={staffData.staffTotal}
          showTotal={(total) => `总共 ${total} 条`}
          current={pageInfo.pageNumber}
          pageSize={pageInfo.pageSize}
          onChange={handleChangePage}
          onShowSizeChange={handleChangeShowSize}
        />
      </div>

      <DrawerComp
        interfaceName={undefined}
        editingStaff={editingStaff}
        reloadList={undefined}
        isOpen={isOpen}
        pageInfo={pageInfo}
        onClickClose={() => setIsOpen(false)}
      />
    </div>
  );
}
