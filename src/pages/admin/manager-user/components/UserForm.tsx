import {
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import { createUser, updateUserRole } from "../../../../common/api/userApi";
import { Form, Input, message, Modal, Select } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import User from "../../../../common/types/user";
import MajorSelected from "./MajorSelected";

const { Option } = Select;

interface UserFormProps {
  children: ReactNode;
  userEdit?: User;
}

const UserForm = ({ children, userEdit }: UserFormProps) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      message.success("Thêm người dùng thành công");
      queryClient.invalidateQueries({ queryKey: ["USER"] });
      setOpen(false);
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<User> }) =>
      updateUserRole(id, payload),
    onSuccess: () => {
      message.success("Cập nhật vai trò người dùng thành công");
      queryClient.invalidateQueries({ queryKey: ["USER"] });
      setOpen(false);
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (userEdit) {
        updateRoleMutation.mutate({ id: userEdit._id, payload: values });
      } else {
        createMutation.mutate(values);
      }
    });
  };
  const handleEdit = (user: User) => {
    setOpen(true);
    form.setFieldsValue({ role: user.role });
  };

  const handleAdd = () => {
    setOpen(true);
    form.resetFields();
  };
  const selectedRole = Form.useWatch("role", form);
  return (
    <>
      {isValidElement(children)
        ? cloneElement(children as ReactElement, {
            onClick: () => (userEdit ? handleEdit(userEdit) : handleAdd()),
          })
        : children}

      <Modal
        title={userEdit ? "Cập nhật vai trò" : "Thêm người dùng"}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleOk}
        okText={userEdit ? "Cập nhật" : "Thêm mới"}
        cancelText="Hủy"
        destroyOnHidden
      >
        <Form form={form} layout="vertical">
          {!userEdit && (
            <>
              <Form.Item
                label="Họ tên"
                name="fullname"
                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
              >
                <Input placeholder="VD: Nguyễn Văn A" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Email",
                    type: "email",
                  },
                ]}
              >
                <Input placeholder="VD: nguyenvana@example.com" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập họ tên" },
                  {
                    pattern:
                      /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/,
                    message: "Số điện thoại không hợp lệ",
                  },
                ]}
              >
                <Input placeholder="VD: 0866789345" />
              </Form.Item>
              <Form.Item
                label="Vai trò"
                name="role"
                rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
              >
                <Select placeholder="Chọn vai trò của người dùng">
                  <Option value="teacher">Giảng viên</Option>
                  <Option value="student">Học sinh</Option>
                  <Option value="admin">Quản trị viên</Option>
                </Select>
              </Form.Item>
              {selectedRole === "student" && !userEdit && (
                <Form.Item
                  label="Chuyên ngành"
                  name="majorId"
                  rules={[
                    { required: true, message: "Vui lòng chọn chuyên ngành" },
                  ]}
                >
                  <MajorSelected />
                </Form.Item>
              )}
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default UserForm;
