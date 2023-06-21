export type PaginatedResponse<T> = PaginationDetails & {
  content: T[];
};

export type PaginationDetails = {
  first?: boolean;
  last?: boolean;
  empty?: boolean;
  totalPages?: number;
  pageNumber?: number;
};
