export interface DataItem {
  id: string;
  [key: string]: string | number;
}

export interface TableData {
  columns: string[];
  data: DataItem[];
}

export interface dynamicTableProps extends TableData {
  pageSize: number;
}
