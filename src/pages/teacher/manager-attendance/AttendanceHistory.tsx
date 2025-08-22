import { Table, Tag, Typography, Progress } from "antd";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllSessionByClassId } from "../../../common/api/sessionApi";
import { getStudentsByClassId } from "../../../common/api/classApi";

const { Title } = Typography;
// Tạo cột động cho 12 buổi học
const attendanceColumns = Array.from({ length: 12 }, (_, i) => ({
  title: `Buổi ${i + 1}`,
  dataIndex: ["attendance", i],
  key: `session-${i + 1}`,
  align: "center" as const,
  width: 100,
  render: (val: "PRESENT" | "ABSENT") =>
    val === "PRESENT" ? (
      <Tag color="blue" style={{ fontWeight: 600 }}>
        P
      </Tag>
    ) : (
      <Tag color="red" style={{ fontWeight: 600 }}>
        A
      </Tag>
    ),
}));

const AttendanceHistory = () => {
  const { classId } = useParams();
  console.log(classId);
  const { data: studentsList, isLoading } = useQuery({
    queryKey: ["CLASS_STUDENTS", classId],
    queryFn: () => getStudentsByClassId(classId!),
    enabled: !!classId,
  });

  const columns = [
    {
      title: "Mã SV",
      dataIndex: "studentId",
      key: "studentId",
      align: "center" as const,
      width: 100,
      fixed: "left" as const,
    },
    {
      title: "Tên học sinh",
      dataIndex: "fullname",
      key: "fullname",
      align: "left" as const,
      width: 150,
      fixed: "left" as const,
    },
    ...attendanceColumns,
    {
      title: "Tỉ lệ tham gia",
      key: "attendanceRate",
      align: "center" as const,
      width: 150,
      fixed: "right" as const,
      render: (_: any, record: any) => {
        const total = record.attendance?.length;
        const presentCount = record.attendance?.filter(
          (a: string) => a === "PRESENT"
        )?.length;
        const percent = Math.round((presentCount / total) * 100);
        return (
          <Progress
            percent={percent}
            size="small"
            strokeColor={percent >= 75 ? "#1677ff" : "#ff4d4f"}
          />
        );
      },
    },
  ];
  return (
    <>
      <Title level={3}>Lịch sử điểm danh</Title>
      <Table
        columns={columns}
        dataSource={studentsList}
        loading={isLoading}
        bordered
        scroll={{ x: 1200 }}
        pagination={false} // hiển thị gọn, không phân trang
      />
    </>
  );
};

export default AttendanceHistory;
