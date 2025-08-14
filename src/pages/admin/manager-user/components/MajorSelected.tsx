import { useCallback, useRef, useState } from "react";
import { debounce } from "lodash";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllMajors } from "../../../../common/api/majorApi";
import { Select, Spin } from "antd";
type MajorSelectedProps = {
  value?: string;
  onChange?: (val: string) => void;
};

const MajorSelected = ({ value, onChange }: MajorSelectedProps) => {
  const [search, setSearch] = useState("");
  const scrollRef = useRef<HTMLElement | null>(null);
  const onChangeSearchInput = useCallback(
    debounce((text: string) => {
      setSearch(text);
    }, 500),
    []
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["majors", search],
      queryFn: ({ pageParam = 1 }) =>
        getAllMajors({ page: pageParam, limit: 10, search }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.data.length < 10 ? undefined : allPages.length + 1;
      },
      retry: 0,
    });

  const options =
    data?.pages.flatMap((page) =>
      page.data.map((m) => ({
        label: m.name,
        value: m._id,
      }))
    ) || [];
  return (
    <div>
      <Select
        value={value}
        onChange={onChange}
        showSearch
        placeholder="Chọn ngành học"
        filterOption={false}
        onSearch={(val) => onChangeSearchInput(val)}
        options={options}
        onPopupScroll={(e) => {
          const target = e.target as HTMLElement;
          scrollRef.current = target;
          const { scrollTop, clientHeight, scrollHeight } = target;
          if (
            scrollHeight - scrollTop <= clientHeight + 10 &&
            hasNextPage &&
            !isFetchingNextPage
          ) {
            const prevScrollTop = scrollTop;
            fetchNextPage().then(() => {
              if (scrollRef.current) {
                scrollRef.current.scrollTop = prevScrollTop;
              }
            });
          }
        }}
        notFoundContent={isFetchingNextPage ? <Spin size="small" /> : null}
      />
    </div>
  );
};

export default MajorSelected;
