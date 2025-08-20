import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  createClass,
  getClassById,
  updateClass,
} from "../../../common/api/classApi";
import ClassForm from "./components/ClassForm";

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
