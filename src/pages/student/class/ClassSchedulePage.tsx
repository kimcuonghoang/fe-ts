import { useState, useMemo } from "react";
import { Table, Tag, DatePicker, Space, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/vi";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllSessionByClassId } from "../../../common/api/sessionApi";

dayjs.locale("vi");
const { Title } = Typography;

interface ClassSchedule {
  key: string;
  subject: string;
  teacher: string;
  day: string;
  date: string;
  time: string;
  room: string;
}

const ClassSchedulePage = () => {
  const { classId } = useParams();

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["SESSIONS", classId],
    queryFn: () => getAllSessionByClassId(classId!),
    enabled: !!classId,
  });

  const sortedSessions = useMemo(() => {
    return [...sessions].sort((a, b) => {
      return dayjs(a.sessionDates).valueOf() - dayjs(b.sessionDates).valueOf();
    });
  }, [sessions]);

  const apiData: ClassSchedule[] = useMemo(() => {
    return sortedSessions.map((s, index) => ({
      key: s._id || index.toString(),
      subjectId: s.classId?.subjectId?.name,
      teacherId: s.classId?.teacherId?.fullname,
      day: dayjs(s.sessionDates).format("dddd"),
      date: dayjs(s.sessionDates).format("YYYY-MM-DD"),
      room: s.classId?.room,
    }));
  }, [sortedSessions]);

  const className = sessions?.[0]?.classId?.name || "Chưa cập nhật";

  const columns: ColumnsType<ClassSchedule> = [
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
      render: (text) => <p>{text}</p>,
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
      title: "Phòng học",
      dataIndex: "room",
      key: "room",
    },
  ];

  const filteredData = apiData.filter((item) => item);

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Lịch học của lớp {className}</Title>

      {/* <Space style={{ marginBottom: 16 }}>
        <DatePicker
          format="YYYY-MM-DD"
          onChange={(date) => setSelectedDate(date)}
          placeholder="Chọn ngày để lọc"
        />
      </Space> */}

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        bordered
        loading={isLoading}
        locale={{ emptyText: "Không có buổi học nào" }}
      />
    </div>
  );
};

export default ClassSchedulePage;
