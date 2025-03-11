export interface DataItem {
  id: string;
  [key: string]: unknown;
}

export interface TableData {
  columns: string[];
  data: DataItem[] | [];
}

export interface dynamicTableProps extends TableData {
  pageSize: number;
}
