import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  createClass,
  getClassById,
  updateClass,
} from "../../../common/api/classApi";
import ClassForm from "./components/ClassForm";
import { Modal } from "antd";

const ClassFormPage = ({ mode }: { mode: "add" | "edit" }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // nếu là edit thì fetch data
  const { data: classData, isLoading } = useQuery({
    queryKey: ["class", id],
    queryFn: () => getClassById(id!),
    enabled: mode === "edit" && !!id,
  });

  const mutation = useMutation({
    mutationFn:
      mode === "add"
        ? (payload: any) => createClass(payload)
        : (payload: any) => updateClass(id!, payload),
    onSuccess: () => {
      navigate("/admin/classes");
      Modal.success({
        title: "Thành công",
        content: `Lớp đã được ${
          mode === "add" ? "tạo" : "cập nhật"
        } thành công`,
        centered: true,
      });
    },
    onError: (error: any) => {
      Modal.error({
        title: "Đã xảy ra lỗi",
        content: (
          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {error?.response?.data?.message || error.message}
          </div>
        ),
        width: 600,
        centered: true,
      });
    },
  });

  return (
    <div>
      <h2>{mode === "add" ? "Thêm lớp" : "Cập nhật lớp"}</h2>
      <ClassForm
        initialValues={classData}
        onSubmit={(values) => mutation.mutate(values)}
        loading={isLoading}
      />
    </div>
  );
};

export default ClassFormPage;
