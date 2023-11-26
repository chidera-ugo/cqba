export type PaginatedResponse<T> = PaginationDetails & {
  docs: T[];
};

export type PaginationDetails = {
  totalDocs?: number;
  limit?: number;
  totalPages?: number;
  page?: number;
  pagingCounter?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  prevPage?: number;
  nextPage?: number;
};
