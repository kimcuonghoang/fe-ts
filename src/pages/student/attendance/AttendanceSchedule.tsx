import { useState, useMemo } from "react";
import { Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/vi";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllSessionByClassId } from "../../../common/api/sessionApi";
import { getAttendances } from "../../../common/api/attendanceApi";

dayjs.locale("vi");
const { Title } = Typography;

interface AttendanceSchedule {
  key: string;
  subjectId: string;
  teacherId: string;
  day: string;
  date: string;
  status: "PRESENT" | "ABSENT" | null;
}

const AttendanceSchedulePage = () => {
  const { classId } = useParams();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const { data: sessionRes, isLoading } = useQuery({
    queryKey: ["SESSIONS", classId],
    queryFn: () => getAllSessionByClassId(classId!),
    enabled: !!classId,
  });

  const { data: attendanceRes, isLoading: loadingAttendance } = useQuery({
    queryKey: ["ATTENDANCES", classId],
    queryFn: () => getAttendances({ classId }),
    enabled: !!classId,
  });

  const apiData: AttendanceSchedule[] = useMemo(() => {
    if (!sessionRes?.data) return [];

    // lấy đúng mảng attendances
    const attendances = attendanceRes?.data || [];

    return sessionRes.data
      .map((s: any, index: number) => {
        const attendance = attendances.find(
          (a: any) => a.sessionId._id === s._id
        );

        return {
          key: s._id || index.toString(),
          subjectId: s.classId?.subjectId?.name || "N/A",
          teacherId: s.classId?.teacherId?.fullname || "N/A",
          day: dayjs(s.sessionDates).format("dddd"),
          date: new Date(s.sessionDates).toLocaleDateString("vi-VN"),
          rawDate: new Date(s.sessionDates), // thêm rawDate để sort
          status: attendance?.status || null, // PRESENT | ABSENT | null
        };
      })
      .sort(
        (a: { rawDate: Date }, b: { rawDate: Date }) =>
          a.rawDate.getTime() - b.rawDate.getTime()
      ); // tăng dần theo ngày
  }, [sessionRes, attendanceRes]);

  const columns: ColumnsType<AttendanceSchedule> = [
    {
      title: "Môn học",
      dataIndex: "subjectId",
      key: "subjectId",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Giảng viên",
      dataIndex: "teacherId",
      key: "teacherId",
    },
    {
      title: "Thứ",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Điểm danh",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "PRESENT") {
          return (
            <Tag color="blue" style={{ fontWeight: 600 }}>
              Có mặt
            </Tag>
          );
        }
        if (status === "ABSENT") {
          return (
            <Tag color="red" style={{ fontWeight: 600 }}>
              Vắng mặt
            </Tag>
          );
        }
        return <Tag color="default">Chưa điểm danh</Tag>;
      },
    },
  ];

  const filteredData = selectedDate
    ? apiData.filter((item) => dayjs(item.date).isSame(selectedDate, "day"))
    : apiData;

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Điểm danh của lớp</Title>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        bordered
        loading={isLoading || loadingAttendance}
        locale={{ emptyText: "Không có buổi học nào" }}
      />
    </div>
  );
};

export default AttendanceSchedulePage;
