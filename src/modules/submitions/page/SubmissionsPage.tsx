import DynamicTable from "../../../components/table/components/DynamicTabel";

const mockData = {
  columns: ["FullName", "Age", "Gender", "InsuranceType", "City"],
  data: [
    {
      id: "1",
      FullName: "John Doe",
      Age: 28,
      Gender: "Male",
      InsuranceType: "Health",
      City: "New York",
    },
    {
      id: "2",
      FullName: "Jane Smith",
      Age: 32,
      Gender: "Female",
      InsuranceType: "Home",
      City: "Los Angeles",
    },
    {
      id: "3",
      FullName: "Alice Brown",
      Age: 40,
      Gender: "Female",
      InsuranceType: "Car",
      City: "Chicago",
    },
  ],
};

export default function SubmissionsPage() {
  return (
    <div>
      <DynamicTable
        pageSize={5}
        columns={mockData.columns}
        data={mockData.data}
      />
    </div>
  );
}
