// src/pages/attendance/AttendanceTracking.tsx
import { useEffect, useMemo, useState } from "react";
import {
  Card,
  Table,
  Checkbox,
  Button,
  Space,
  Typography,
  Tag,
  message,
  Switch,
} from "antd";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

import {
  checkAttendanceStatus,
  createAttendance,
  getAttendances,
  updateAttendance,
} from "../../common/api/attendanceApi";
import { getAllSessionByClassId } from "../../common/api/sessionApi";
import { getStudentsByClassId } from "../../common/api/classApi";
import TextArea from "antd/es/input/TextArea";

type RowItem = {
  key: string;
  _id?: string;
  studentId: string; // _id của user
  code?: string; // studentId (mã SV) nếu có
  fullname: string;
  email: string;
  status: "PRESENT" | "ABSENT";
};

const { Title, Text } = Typography;

const AttendanceTracking = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const queryClient = useQueryClient();

  // 1) Trạng thái buổi học đã điểm danh chưa
  const { data: statusData, isLoading: loadingStatus } = useQuery({
    queryKey: ["ATT_STATUS", sessionId],
    queryFn: () => checkAttendanceStatus(sessionId!),
    enabled: !!sessionId,
  });

  // 2) Lấy thông tin session (để hiển thị & biết classId)
  const { data: sessionDetail, isLoading: loadingSession } = useQuery({
    queryKey: ["SESSION_DETAIL", sessionId],
    queryFn: () => getAllSessionByClassId(sessionId!),
    enabled: !!sessionId,
  });
  console.log(sessionDetail);

  const hasAttendance = statusData?.data?.hasAttendance ?? false;
  const classId = statusData?.data?.classId;
  const sessionDateStr = sessionDetail?.data?.sessionDates
    ? dayjs(sessionDetail.data.sessionDates).format("DD/MM/YYYY")
    : "";
  console.log(sessionDateStr);
  // 3) Nếu đã có attendance ⇒ lấy danh sách để cập nhật
  const { data: attendanceList, isLoading: loadingAttendances } = useQuery({
    queryKey: ["ATT_LIST", sessionId],
    queryFn: () => getAttendances(sessionId!),
    enabled: !!sessionId && hasAttendance,
  });

  // 4) Nếu chưa có attendance ⇒ lấy danh sách SV theo class để tạo mới
  const { data: studentsList, isLoading: loadingStudents } = useQuery({
    queryKey: ["CLASS_STUDENTS", classId],
    queryFn: () => getStudentsByClassId(classId!),
    enabled: !!classId,
  });

  // 5) State table
  const [rows, setRows] = useState<RowItem[]>([]);

  // 6) Map dữ liệu vào table rows theo 2 nhánh
  useEffect(() => {
    if (hasAttendance && attendanceList?.data?.data?.length !== 0) {
      const mapped: RowItem[] = attendanceList?.data?.data?.map((a) => ({
        key: a.studentId._id,
        _id: a._id,
        studentId: a.studentId._id,
        code: a.studentId.studentId,
        fullname: a.studentId.fullname,
        email: "Not updated",
        status: a.status,
      }));
      setRows(mapped);
    } else if (!hasAttendance && studentsList) {
      const mapped: RowItem[] = studentsList?.map((s: any) => ({
        key: s._id,
        studentId: s._id,
        code: s.studentId,
        fullname: s.fullname,
        email: s.email,
        status: "ABSENT",
      }));
      setRows(mapped);
    }
  }, [hasAttendance, attendanceList, studentsList]);

  // 7) Actions
  const setAll = (status: RowItem["status"]) => {
    setRows((prev) => prev.map((r) => ({ ...r, status })));
  };

  const setOne = (studentId: string, status: RowItem["status"]) => {
    setRows((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, status } : r))
    );
  };

  // 8) Mutations
  const mutateCreate = useMutation({
    mutationFn: () => {
      const convertPayload = {
        sessionId: sessionId as string,
        attendances: rows.map((item) => ({
          studentId: item.studentId,
          status: item.status,
          note: "",
        })),
      };
      return createAttendance(convertPayload);
    },
    onSuccess: async () => {
      message.success("Điểm danh thành công");
      await queryClient.invalidateQueries({
        queryKey: ["ATT_STATUS", sessionId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["ATT_LIST", sessionId],
      });
    },
    onError: () => message.error("Lỗi khi điểm danh"),
  });

  const mutateUpdate = useMutation({
    mutationFn: () => {
      const convertPayload = {
        sessionId: sessionId as string,
        attendances: rows.map((item) => ({
          studentId: item.studentId,
          status: item.status,
          note: "",
        })),
      };

      return updateAttendance(sessionId!, convertPayload);
    },
    onSuccess: async () => {
      message.success("Cập nhật điểm danh thành công");
      await queryClient.invalidateQueries({
        queryKey: ["ATT_LIST", sessionId],
      });
    },
    onError: () => message.error("Lỗi khi cập nhật điểm danh"),
  });

  const loading =
    loadingStatus || loadingSession || loadingAttendances || loadingStudents;

  const columns = useMemo(
    () => [
      {
        title: "Họ tên",
        dataIndex: "fullname",
        key: "fullname",
        ellipsis: true,
      },
      {
        title: "Mã SV",
        dataIndex: "code",
        key: "code",
        render: (val: string) => val || <Tag>Chưa có mã</Tag>,
      },
      {
        title: "Note",
        dataIndex: "note",
        key: "note",
        render: (val: string) => val || <TextArea rows={1} />,
      },
      {
        title: "Điểm danh",
        key: "status",
        width: 160,
        render: (_: any, record: RowItem) => {
          return (
            <Switch
              checked={record.status === "PRESENT"}
              onChange={(checked) =>
                setOne(record.studentId, checked ? "PRESENT" : "ABSENT")
              }
              style={{
                backgroundColor:
                  record.status === "PRESENT" ? "#1677ff" : "#ff4d4f",
              }}
            />
          );
        },
      },
    ],
    []
  );
  return (
    <div className="space-y-6">
      <Space direction="vertical" size={4}>
        <Title level={4} className="m-0">
          Điểm danh buổi học
        </Title>
        <Text>
          Lớp: <b>{sessionDetail?.data?.classId?.name || "—"}</b> • Ngày học:{" "}
          <b>{sessionDateStr || "—"}</b> • Trạng thái:{" "}
          {hasAttendance ? (
            <Tag color="green">Đã khởi tạo</Tag>
          ) : (
            <Tag>Chưa khởi tạo</Tag>
          )}
        </Text>
        <Text type="secondary">
          <Link to={`/teachers/sessions-detail/${sessionId}`}>
            Xem chi tiết buổi học
          </Link>
        </Text>
      </Space>

      <Card
        title="Danh sách sinh viên"
        extra={
          <Space>
            <Button onClick={() => setAll("PRESENT")}>Tất cả có mặt</Button>
            <Button onClick={() => setAll("ABSENT")}>Tất cả vắng</Button>
            {hasAttendance ? (
              <Button
                type="primary"
                onClick={() => mutateUpdate.mutate()}
                loading={mutateUpdate.isPending}
                disabled={loading || rows?.length === 0}
              >
                Cập nhật
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => mutateCreate.mutate()}
                loading={mutateCreate.isPending}
                disabled={loading || rows.length === 0}
              >
                Lưu điểm danh
              </Button>
            )}
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={rows}
          rowKey="key"
          loading={loading}
          pagination={{ pageSize: 10, showSizeChanger: false }}
        />
      </Card>
    </div>
  );
};

export default AttendanceTracking;
