import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, message, Modal } from "antd";
import React, {
  cloneElement,
  isValidElement,
  ReactElement,
  useState,
} from "react";
import { Subject } from "../../../../common/types/subject";
import {
  createSubject,
  updateSubject,
} from "../../../../common/api/subjectApi";

const FormSubject = ({
  children,
  subjectEdit,
}: {
  children: React.ReactNode;
  subjectEdit?: Subject;
}) => {
  const [modelOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createSubject,
    onSuccess: () => {
      message.success("Thêm môn học thành công");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      setModalOpen(false);
      form.resetFields();
    },
    onError: () => message.error("Thêm môn học thất bại"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Subject> }) =>
      updateSubject(id, payload),
    onSuccess: () => {
      message.success("Cập nhật môn học thành công");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      setModalOpen(false);
      form.resetFields();
    },
    onError: () => message.error("Cập nhật môn học thất bại"),
  });

  const handleEdit = (subject: Subject) => {
    setModalOpen(true);
    form.setFieldsValue(subject);
  };

  const handleAdd = () => {
    setModalOpen(true);
  };
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (subjectEdit) {
        console.log("update");
        updateMutation.mutate({ id: subjectEdit._id, payload: values });
      } else {
        console.log("create");
        createMutation.mutate(values);
      }
    });
  };
  return (
    <>
      {isValidElement(children)
        ? cloneElement(children as ReactElement, {
            onClick: () =>
              subjectEdit ? handleEdit(subjectEdit) : handleAdd(),
          })
        : children}
      <Modal
        title={subjectEdit ? "Cập nhật môn học" : "Thêm môn học"}
        open={modelOpen}
        onOk={handleOk}
        onCancel={() => {
          setModalOpen(false);
          form.resetFields();
        }}
        okText={subjectEdit ? "Cập nhật" : "Thêm mới"}
        cancelText="Hủy"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ name: "", englishName: "", description: "" }}
        >
          <Form.Item
            label="Tên môn học"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên môn học" }]}
          >
            <Input placeholder="VD: Toán Cao Cấp" />
          </Form.Item>
          <Form.Item
            label="Tên tiếng Anh"
            name="englishName"
            rules={[{ required: true, message: "Vui lòng nhập tên tiếng Anh" }]}
          >
            <Input placeholder="VD: Advanced Mathematics" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea
              placeholder="Nhập mô tả môn học (tùy chọn)"
              rows={3}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FormSubject;
