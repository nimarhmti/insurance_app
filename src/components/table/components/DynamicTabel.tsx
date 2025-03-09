import { useState, useEffect } from "react";
import { Table, Select, Input, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataItem, dynamicTableProps, TableData } from "../types/tableTypes";

const DynamicTable = ({ columns, data, pageSize }: dynamicTableProps) => {
  const [tableData, setTableData] = useState<TableData>({
    columns: [],
    data: [],
  });
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data from API
  useEffect(() => {
    setTableData({
      columns: columns,
      data: data,
    });
    setSelectedColumns(columns);
  }, []);

  // Generate filtered data based on search
  const filteredData = tableData.data.filter((item) =>
    selectedColumns.some((column) =>
      String(item[column]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Generate table columns dynamically
  const generateColumns = (): ColumnsType<DataItem> => {
    return selectedColumns.map((column) => ({
      title: column,
      dataIndex: column,
      sorter: (a, b) => {
        const valA = a[column];
        const valB = b[column];
        if (typeof valA === "number" && typeof valB === "number") {
          return valA - valB;
        }
        return String(valA).localeCompare(String(valB));
      },
    }));
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Select
        mode="multiple"
        value={selectedColumns}
        onChange={setSelectedColumns}
        options={tableData.columns.map((col) => ({ label: col, value: col }))}
        style={{ width: "100%" }}
        placeholder="Select columns to display"
      />

      <Input
        placeholder="Search across all columns"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        allowClear
      />

      <Table
        columns={generateColumns()}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: pageSize }}
        bordered
        scroll={{ x: true }}
      />
    </Space>
  );
};

export default DynamicTable;
