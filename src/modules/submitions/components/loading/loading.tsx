import { Flex, Skeleton } from "antd";

export default function Loading() {
  return (
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
  );
}
