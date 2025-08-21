import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Spin, Card, Descriptions, Alert } from "antd";
import { getSessionById } from "../../../common/api/sessionApi";

const DetailSessionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: session,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["session", id],
    queryFn: () => getSessionById(id!),
    enabled: !!id,
  });

  if (isLoading) return <Spin tip="Đang tải dữ liệu..." />;
  if (isError)
    return (
      <Alert
        message="Lỗi tải dữ liệu"
        description={String(error)}
        type="error"
      />
    );

  return (
    <Card
      title={`Chi tiết buổi học: ${session?.classId?.name || session?._id}`}
      bordered
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Môn học">
          {session?.classId?.subjectId?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Lớp">
          {session?.classId?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Giảng viên">
          {session?.classId?.teacherId?.fullname}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày">
          {new Date(session?.date).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Ca học">{session?.shift}</Descriptions.Item>
        <Descriptions.Item label="Phòng">{session?.room}</Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          {session?.status}
        </Descriptions.Item>
        <Descriptions.Item label="Ghi chú">
          {session?.note || "Không có"}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default DetailSessionPage;
