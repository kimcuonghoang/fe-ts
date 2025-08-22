import {
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useState,
} from "react";

import { Button, Descriptions, DescriptionsProps, Modal, Tag } from "antd";
import { TextCell } from "../../../../components/common/TextCell";
import { formatDateLocaleVN } from "../../../../common/utils/formatDate";

import { Class } from "../../../../common/types/class";

const ModalDetailClass = ({
  children,
  classInfo,
}: {
  children: ReactNode;
  classInfo: Class;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Chuyên ngành",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={classInfo.majorId?.name || "Chưa cập nhật"}
        />
      ),
    },
    {
      key: "2",
      span: "filled",
      label: "Tên lớp",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={classInfo.name || "Chưa cập nhật"}
        />
      ),
    },
    {
      key: "3",
      span: "filled",
      label: "Bộ môn",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={classInfo.subjectId?.name || "Chưa cập nhật"}
        />
      ),
    },
    {
      key: "4",
      span: "filled",
      label: "Giảng viên",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={classInfo.teacherId?.fullname || "Chưa cập nhật"}
        />
      ),
    },
    {
      key: "5",
      span: "filled",
      label: "Ca học",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={classInfo.shift || "Chưa cập nhật"}
        />
      ),
    },
    {
      key: "6",
      span: "filled",
      label: "Phòng",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={classInfo.room || "Chưa cập nhật"}
        />
      ),
    },
    {
      key: "7",
      span: "filled",
      label: "Tổng số học viên",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={classInfo.studentIds.length || "Chưa cập nhật"}
        />
      ),
    },
    {
      key: "8",
      span: "filled",
      label: "Số lượng học viên tối đa",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={classInfo.maxStudents || "Chưa cập nhật"}
        />
      ),
    },
    {
      key: "9",
      span: "filled",
      label: "Ngày bắt đầu",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={
            classInfo.startDate
              ? formatDateLocaleVN(classInfo.startDate)
              : "Chưa cập nhật"
          }
        />
      ),
    },
    {
      key: "10",
      span: "filled",
      label: "Số buổi học",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={classInfo.totalSessions || "Chưa cập nhật"}
        />
      ),
    },
    {
      key: "11",
      span: "filled",
      label: "Ngày tạo",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={
            classInfo.createdAt
              ? formatDateLocaleVN(classInfo.createdAt)
              : "Chưa cập nhật"
          }
        />
      ),
    },
    {
      key: "12",
      span: "filled",
      label: "Ngày cập nhật gần nhất",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={
            classInfo.startDate
              ? formatDateLocaleVN(classInfo.updatedAt)
              : "Chưa cập nhật"
          }
        />
      ),
    },
  ];
  return (
    <>
      {isValidElement(children)
        ? cloneElement(children as ReactElement, {
            onClick: () => setIsOpen(true),
          })
        : children}

      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <p style={{ margin: 0 }}>Chi tiết {classInfo.name}</p>
            {classInfo.deletedAt ? (
              <Tag color="red">Đã xóa</Tag>
            ) : (
              <Tag color="green">Hoạt động</Tag>
            )}
          </div>
        }
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={<Button onClick={() => setIsOpen(false)}>Đóng</Button>}
        cancelText="Hủy"
        destroyOnHidden
        width={"60vw"}
      >
        <Descriptions
          styles={{}}
          style={{ marginTop: 16 }}
          bordered
          items={items}
        />
      </Modal>
    </>
  );
};

export default ModalDetailClass;
