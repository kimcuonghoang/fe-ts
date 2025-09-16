import React, { useState, useMemo } from "react";
import { Table, Tag, Typography, Progress, Pagination } from "antd";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllSessionByClassId } from "../../../common/api/sessionApi";
import { getStudentsByClassId } from "../../../common/api/classApi";
import { getAttendances } from "../../../common/api/attendanceApi";

import { formatDateLocaleVN } from "../../../common/utils/formatDate";
import dayjs from "dayjs";

const { Title } = Typography;

const AttendanceHistory = () => {
  const { classId } = useParams<{ classId: string }>();
  const [page, setPage] = useState(1);

  // Fetch dữ liệu
  const { data: studentsRes, isLoading: loadingStudents } = useQuery({
    queryKey: ["CLASS_STUDENTS", classId],
    queryFn: () => getStudentsByClassId(classId!),
    enabled: !!classId,
  });

  const { data: sessionsRes, isLoading: loadingSessions } = useQuery({
    queryKey: ["CLASS_SESSIONS", classId],
    queryFn: () => getAllSessionByClassId(classId!),
    enabled: !!classId,
  });

  const { data: attendanceRes, isLoading: loadingAttendance } = useQuery({
    queryKey: ["ATTENDANCES", classId],
    queryFn: () => getAttendances({ classId, limit: 1000 }),
    enabled: !!classId,
  });

  const students = studentsRes || [];
  const attendances = attendanceRes?.data || [];

  // Sort sessions theo ngày tăng dần
  const sortedSessions = useMemo(() => {
    return [...(sessionsRes?.data || [])].sort(
      (a: any, b: any) =>
        dayjs(a.sessionDates).valueOf() - dayjs(b.sessionDates).valueOf()
    );
  }, [sessionsRes]);

  // Map attendance
  const attendanceMap = new Map();
  attendances?.forEach((att: any) => {
    attendanceMap.set(`${att.studentId._id}-${att.sessionId._id}`, att.status);
  });

  // DataSource
  const dataSource = students?.map((stu: any) => {
    const attendanceForStu = sortedSessions.map((ses: any) => {
      const status = attendanceMap.get(`${stu._id}-${ses._id}`) || null;
      return { sessionId: ses._id, status };
    });
    return { ...stu, attendance: attendanceForStu };
  });

  // Chia sessions thành từng nhóm 12 buổi
  const sessionsGroups = useMemo(() => {
    const chunkSize = 12;
    const groups: any[][] = [];
    for (let i = 0; i < sortedSessions.length; i += chunkSize) {
      groups.push(sortedSessions.slice(i, i + chunkSize));
    }
    return groups;
  }, [sortedSessions]);

  const currentSessions = sessionsGroups[page - 1] || [];

  // Cột động theo buổi (tối đa 12 cột mỗi trang)
  const attendanceColumns = currentSessions.map(
    (session: any, idx: number) => ({
      title: `Buổi ${(page - 1) * 12 + idx + 1} (${formatDateLocaleVN(
        session.sessionDates
      )})`,
      key: `session-${session._id}`,
      align: "center" as const,
      width: 50,
      render: (_: any, record: any) => {
        const attend = record.attendance[(page - 1) * 12 + idx];

        if (!attend?.status) return <Tag>-</Tag>;
        return attend.status === "PRESENT" ? (
          <Tag color="blue" style={{ fontWeight: 600 }}>
            P
          </Tag>
        ) : (
          <Tag color="red" style={{ fontWeight: 600 }}>
            A
          </Tag>
        );
      },
    })
  );

  const columns = [
    {
      title: "Mã SV",
      dataIndex: "studentId",
      key: "studentId",
      align: "center" as const,
      width: 80,
      fixed: "left" as const,
      render: (_: any, record: any) => record.studentId || record.code,
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
        const total = record.attendance?.length || 0;
        const presentCount =
          record.attendance?.filter((a: any) => a.status === "PRESENT")
            ?.length || 0;
        const percent =
          total > 0 ? Math.round((presentCount / total) * 100) : 0;
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
        dataSource={dataSource}
        loading={loadingStudents || loadingSessions || loadingAttendance}
        bordered
        scroll={{ x: "max-content" }}
        pagination={false}
        rowKey="_id"
      />
      {sessionsGroups.length > 1 && (
        <div style={{ marginTop: 16, textAlign: "right" }}>
          <Pagination
            current={page}
            total={sortedSessions.length}
            pageSize={12}
            onChange={(p) => setPage(p)}
            showSizeChanger={false}
          />
        </div>
      )}
    </>
  );
};

export default AttendanceHistory;
