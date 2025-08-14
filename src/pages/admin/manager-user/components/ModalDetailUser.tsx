import {
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import { User } from "../../../../common/api/userApi";
import { Button, Descriptions, DescriptionsProps, Modal, Tag } from "antd";
import { TextCell } from "../../../../components/common/TextCell";
import { formatDateLocaleVN } from "../../../../common/utils/formatDate";
import { translateRoles } from "../../../../components/TranslateRole";

const ModalDetailUser = ({
  children,
  userInfo,
}: {
  children: ReactNode;
  userInfo: User;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Mã học sinh",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={userInfo.studentId || "Chưa cập nhật"}
        />
      ),
    },
    {
      key: "2",
      span: "filled",
      label: "Năm học",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={userInfo.schoolYear || "Chưa cập nhật"}
        />
      ),
    },
    {
      key: "3",
      span: "filled",
      label: "Tên người dùng",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={userInfo.username || "Chưa cập nhật"}
        />
      ),
    },
    {
      key: "4",
      span: "filled",
      label: "Họ và tên",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={userInfo.fullname || "Chưa cập nhật"}
        />
      ),
    },
    {
      key: "5",
      span: "filled",
      label: "Email",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={userInfo.email || "Chưa cập nhật"}
        />
      ),
    },
    {
      key: "6",
      span: "filled",
      label: "Chuyên ngành",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={
            typeof userInfo?.majorId === "object" && userInfo?.majorId !== null
              ? userInfo.majorId.name
              : "Chưa cập nhật"
          }
        />
      ),
    },
    {
      key: "7",
      span: "filled",
      label: "Số điện thoại",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={userInfo.phone || "Chưa cập nhật"}
        />
      ),
    },
    {
      key: "8",
      span: "filled",
      label: "Ngày tạo",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={
            userInfo.createdAt
              ? formatDateLocaleVN(userInfo.createdAt)
              : "Chưa cập nhật"
          }
        />
      ),
    },
    {
      key: "8",
      span: "filled",
      label: "Lần cập nhật cuối cùng",
      children: (
        <TextCell
          style={{ fontWeight: 500 }}
          text={
            userInfo.updatedAt
              ? formatDateLocaleVN(userInfo.updatedAt)
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
            <p style={{ margin: 0 }}>
              Chi tiết {translateRoles(userInfo.role)?.toLowerCase()}
              {""}
              {userInfo.username}
            </p>
            {userInfo.isBlocked ? (
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

export default ModalDetailUser;
