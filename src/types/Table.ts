export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  offset: number;
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PaginatedResponse<T> {
  totalPages: number;
  totalElements: number;
  size: number;
  content: T[];
  number: number;
  sort?: Sort;
  pageable?: Pageable;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
  hasContent: boolean;
}

export interface PaginationDetails {
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
  hasContent?: boolean;
  numberOfElements?: number;
  first?: boolean;
  last?: boolean;
}
