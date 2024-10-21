type Paging = {
  page: number;
  per_page: number;
  total_data: number;
};

type Pageable<T> = {
  data: Array<T>;
  pagging: Paging;
};
