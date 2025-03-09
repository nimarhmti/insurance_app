import DynamicTable from "../../../components/table/components/DynamicTabel";

import { Skeleton, Divider, Typography, Flex } from "antd";
import { UseGetallSubmissions } from "../services/submissions.query";

const { Title } = Typography;
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
export default function SubmissionContainer() {
  const { data, isLoading } = UseGetallSubmissions();
  return (
    <div>
      <Title level={3}>submissions</Title>
      <Divider />
      {isLoading ? (
        <Flex gap="middle" vertical>
          <Skeleton.Input block active></Skeleton.Input>
          <Skeleton.Input block active></Skeleton.Input>
          <Skeleton.Button
            active
            block
            style={{
              height: "400px",
            }}
          ></Skeleton.Button>
        </Flex>
      ) : (
        <DynamicTable
          pageSize={5}
          columns={mockData.columns}
          data={mockData.data}
        />
      )}
    </div>
  );
}
