import { Divider, Typography } from "antd";
import { UseGetallSubmissions } from "../../services/submissions.query";
import DynamicTable from "../../../../components/table/components/DynamicTabel";
import Loading from "../loading/loading";
const { Title } = Typography;
export default function SubmissionContainer() {
  const { data, isLoading } = UseGetallSubmissions();

  const isPending = isLoading || !data;
  return (
    <div>
      <Title level={3}>submissions</Title>
      <Divider />
      {isPending ? (
        <Loading />
      ) : (
        <DynamicTable pageSize={5} columns={data?.columns} data={data?.data} />
      )}
    </div>
  );
}
