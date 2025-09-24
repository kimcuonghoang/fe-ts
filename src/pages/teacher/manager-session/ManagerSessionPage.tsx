import { useState, useMemo } from "react";
import { Card, Table, Space, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { getAllSessionByClassId } from "../../../common/api/sessionApi";
import { Link, useParams } from "react-router-dom";
import { useTable } from "../../../common/hooks/useTable";
import { Session } from "../../../common/types/session";

const ManagerSessionPage = () => {
  const { classId } = useParams();
  const {
    resetFilter,
    onFilter,
    query,
    onChangeSearchInput,
    onSubmitSearch,
    getSorterProps,
    onSelectPaginateChange,
  } = useTable<Session>();
  const { data, isLoading } = useQuery({
    queryKey: ["SESSIONS", classId, ...Object.values(query)],
    queryFn: () => getAllSessionByClassId(classId!, query),
    enabled: !!classId,
  });
  console.log(data);
  const sessions = data ?? [];

  // Sort tăng dần theo sessionDates trước khi truyền vào Table
  const sortedSessions = useMemo(() => {
    return [...sessions].sort((a: any, b: any) => {
      const aTime = dayjs(a.sessionDates).valueOf() || 0;
      const bTime = dayjs(b.sessionDates).valueOf() || 0;
      return aTime - bTime; // tăng dần
    });
  }, [sessions]);

  const columns = [
    {
      title: "Ngày học",
      dataIndex: "sessionDates",
      key: "sessionDates",
      render: (sessionDates: string) =>
        dayjs(sessionDates).format("DD/MM/YYYY"),
      ...getSorterProps("sessionDates"),
    },
    {
      title: "Lớp",
      dataIndex: "classId",
      key: "classId",
      render: (_: any, record: any) => record.classId?.name || "Chưa cập nhật",
    },
    {
      title: "Giảng viên",
      dataIndex: "teacherId",
      key: "teacherId",
      render: (_: any, record: any) =>
        record.classId?.teacherId?.fullname || "Chưa cập nhật",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Link to={`/teachers/attendance/${record._id}`}>Điểm danh</Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Bảng danh sách buổi học */}
      <Card title="Danh sách buổi học">
        <Table
          columns={columns}
          dataSource={sortedSessions}
          loading={isLoading}
          onChange={onFilter}
          rowKey="_id"
          pagination={{
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} buổi học`,
          }}
        />
      </Card>
    </div>
  );
};

export default ManagerSessionPage;
