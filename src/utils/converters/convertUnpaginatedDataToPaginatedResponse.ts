import { PaginatedResponse } from 'types/Table';

export function convertUnpaginatedDataToPaginatedResponse<T>(
  data: T[]
): PaginatedResponse<T> {
  return {
    limit: 50,
    page: 0,
    totalDocs: 50,
    docs: data,
    totalPages: 10,
    hasNextPage: false,
    hasPrevPage: false,
  };
}
