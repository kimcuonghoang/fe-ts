import React from "react";
import { Table } from "antd";

const ManagerClassPage = () => {
  const dataSource = [
    { key: "1", name: "Lớp 10A1", subject: "Toán", teacher: "Thầy Nam" },
    { key: "2", name: "Lớp 11B2", subject: "Lý", teacher: "Cô Hương" },
  ];

  const columns = [
    { title: "Tên lớp", dataIndex: "name", key: "name" },
    { title: "Môn học", dataIndex: "subject", key: "subject" },
    { title: "Giáo viên", dataIndex: "teacher", key: "teacher" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý lớp học</h1>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default ManagerClassPage;
