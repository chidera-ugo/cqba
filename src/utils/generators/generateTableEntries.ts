import dayjs from 'dayjs';
import { PaginatedResponse } from 'types/Table';
import { generateUUID } from 'utils/generators/generateUUID';

export function generateTableEntries<T>(
  sampleEntry: T,
  limit?: number
): { data: PaginatedResponse<T> } {
  const entries: T[] = [];

  for (let i = 0; limit ? i < limit : i < 0; i++) {
    const entry = {
      ...sampleEntry,
      id: `Ref${generateUUID().split('-')[0]}`,
      createdAt: dayjs()
        .subtract(i % 2 === 0 ? i : 2 * i, 'days')
        .toISOString(),
    };

    entries.push(entry);
  }

  return {
    data: {
      hasPrevPage: false,
      hasNextPage: false,
      limit,
      page: 1,
      nextPage: 1,
      totalPages: 1,
      pagingCounter: 0,
      prevPage: 1,
      totalDocs: 1,
      docs: entries,
    },
  };
}
