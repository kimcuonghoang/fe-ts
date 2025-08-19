import { Select, Spin } from "antd";
import { debounce } from "lodash";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CSSProperties, useCallback, useRef, useState } from "react";
import { IResponse, Params } from "../../common/types/api";

type InfiniteSelectProps<T> = {
  value?: string;
  onChange?: (val: string) => void;
  fetchFn: (params: Params) => Promise<IResponse<T[]>>;
  queryKey: string[];
  labelDataIndex: keyof T;
  valueDataIndex: keyof T;
  placeholder?: string;
  pageSize?: number;
  debounceTime?: number;
  styles?: Partial<Record<"root", React.CSSProperties>> & {
    popup?: Partial<Record<"root", React.CSSProperties>>;
  };
  style?: CSSProperties;
  placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
  mode?: "multiple" | "tags";
};

export function InfiniteSelect<T>({
  value,
  onChange,
  fetchFn,
  labelDataIndex,
  valueDataIndex,
  placeholder = "Lựa chọn đi",
  pageSize = 10,
  queryKey,
  debounceTime = 500,
  placement,
  styles,
  style,
  mode,
}: InfiniteSelectProps<T>) {
  const [search, setSearch] = useState("");
  const scrollRef = useRef<HTMLElement | null>(null);

  const onChangeSearchInput = useCallback(
    debounce((text: string) => setSearch(text), debounceTime),
    [debounceTime]
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [...queryKey, search],
      queryFn: ({ pageParam = 1 }) =>
        fetchFn({ page: pageParam, limit: pageSize.toString(), search }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.data.length < pageSize ? undefined : allPages.length + 1,
      retry: 0,
    });

  const options =
    data?.pages.flatMap((page) =>
      page.data.map((item) => ({
        label: String(item[labelDataIndex]),
        value: String(item[valueDataIndex]),
      }))
    ) || [];

  return (
    <Select
      value={value}
      style={{ ...style }}
      styles={{ ...styles }}
      onChange={onChange}
      allowClear
      mode={mode}
      popupMatchSelectWidth={false}
      showSearch
      placement={placement}
      placeholder={placeholder}
      filterOption={false}
      onSearch={onChangeSearchInput}
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
  );
}
