import { useQuery } from "@tanstack/react-query";
import { Button, Select, Space } from "antd";
import SearchInput from "../../../components/common/SearchInput";
import TableDisplay from "../../../components/common/TableDisplay";
import { useTable } from "../../../common/hooks/useTable";
import { Class } from "../../../common/types/class";
import { Link } from "react-router-dom";
import ClassColumn from "./components/ClassColumn";
import { getAllClass } from "../../../common/api/classApi";
import { RoomEnum, ShiftEnum } from "../../../common/types";

const { Option } = Select;

const ManagerClassPage = () => {
  const {
    resetFilter,
    onFilter,
    query,
    onChangeSearchInput,
    onSubmitSearch,
    getSorterProps,
    onSelectPaginateChange,
  } = useTable<Class>();

  const { data, isLoading } = useQuery({
    queryKey: ["CLASS", ...Object.values(query)],
    queryFn: () =>
      getAllClass({
        limit: "5",
        ...query,
      }),
  });

  const classData = data?.data;

  const pagination = data?.meta;
  return (
    <>
      <div>
        <h2 style={{ marginBottom: 16 }}>Quản lý người dùng</h2>
        <Space
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Space wrap>
            {/* Search */}
            <SearchInput
              onSearch={(value) => onSubmitSearch(value)}
              onChangeSeachInput={(value) =>
                onChangeSearchInput(value, { enableOnChangeSearch: true })
              }
              defaultValue={query.search}
              placeholder="Tìm kiếm theo tên lớp..."
              style={{ width: 250 }}
            />

            {/* Trạng thái */}
            <Select
              style={{ width: 140 }}
              allowClear
              value={query.isDeleted || ""}
              onChange={(e) => onFilter({ isDeleted: e })}
            >
              <Option value="">Tất cả trạng thái</Option>
              <Option value="false">Hoạt động</Option>
              <Option value="true">Đã xóa</Option>
            </Select>

            {/* Ca học */}
            <Select
              style={{ width: 140 }}
              allowClear
              value={query.shift || ""}
              onChange={(e) => onFilter({ shift: e.toString() })}
            >
              <Option value="">Tất cả ca học</Option>
              {Object.values(ShiftEnum).map((s) => (
                <Option key={s} value={s.toString()}>
                  {s}
                </Option>
              ))}
            </Select>

            {/* Phòng học */}
            <Select
              style={{ width: 140 }}
              allowClear
              value={query.room || ""}
              onChange={(e) => onFilter({ room: e.toString() })}
            >
              <Option value="">Tất cả phòng</Option>
              {Object.values(RoomEnum).map((r) => (
                <Option key={r} value={r.toString()}>
                  {r}
                </Option>
              ))}
            </Select>

            {/* Ngày bắt đầu */}
            {/* <RangePicker
          value={query.startDateRange}
          onChange={(dates) => {
            if (!dates) return onFilter({ startDateFrom: "", startDateTo: "" });
            onFilter({
              startDateFrom: dates[0]?.startOf("day").toISOString(),
              startDateTo: dates[1]?.endOf("day").toISOString(),
            });
          }}
        /> */}
          </Space>

          {/* Reset */}
          {Object.keys(query).some(
            (key) =>
              !["page", "limit"].includes(key) &&
              query[key] !== undefined &&
              query[key] !== ""
          ) && (
            <Button onClick={() => resetFilter({ keepPageAndLimit: true })}>
              Đặt lại bộ lọc
            </Button>
          )}
          <Link to={"/admin/classes/add"}>Thêm lớp học</Link>
        </Space>
        <TableDisplay<Class>
          columns={ClassColumn(getSorterProps)}
          currentPage={pagination?.page || 1}
          pageSize={pagination?.limit || 5}
          totalDocs={pagination?.total || 0}
          dataSource={classData}
          isLoading={isLoading}
          onFilter={onFilter}
          onSelectPaginateChange={onSelectPaginateChange}
        />
      </div>
    </>
  );
};

export default ManagerClassPage;
