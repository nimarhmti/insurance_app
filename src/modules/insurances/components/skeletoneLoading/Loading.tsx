import { Flex, Skeleton } from "antd";

export default function Loading() {
  return (
    <Flex gap="middle" vertical>
      <Skeleton.Button
        active
        block
        style={{
          height: "140px",
        }}
      ></Skeleton.Button>
      <Skeleton.Button
        active
        block
        style={{
          height: "140px",
        }}
      ></Skeleton.Button>
      <Skeleton.Button
        active
        block
        style={{
          height: "140px",
        }}
      ></Skeleton.Button>
      <Skeleton.Button
        active
        block
        style={{
          height: "140px",
        }}
      ></Skeleton.Button>
    </Flex>
  );
}
