import DynamicTable from "../../../components/table/components/DynamicTabel";

import { Skeleton, Divider, Typography, Flex } from "antd";
import { UseGetallSubmissions } from "../services/submissions.query";

const { Title } = Typography;

export default function SubmissionContainer() {
  const { data, isLoading } = UseGetallSubmissions();

  // if (!data) return <>....</>;
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
          columns={data?.columns ?? []}
          data={data?.data ?? []}
        />
      )}
    </div>
  );
}
