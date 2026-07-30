export interface StaffDataType {
  /** 员工数量统计 */
  staffAmountList: {
    title: string;
    amount: number;
  }[];
  /** 性别分布-饼状图 */
  pieList: {
    title: string;
    renderList: any[]; // TODO: 这里补一下类型
  }[];
  /** 员工年龄段-柱状图 */
  columnList: {
    title: string;
    renderList: {
      xData: string[];
      yData: number[];
    };
    styleData: React.CSSProperties;
  }[];
  /** 工龄最大的10个人 */
  wordingYearsInfo: {
    title?: string;
    renderList?: {
      name: string; // 姓名
      department: string; // 部门
    }[];
    styleData?: React.CSSProperties;
  };
  isLoading: boolean;
  isError: boolean;
}
