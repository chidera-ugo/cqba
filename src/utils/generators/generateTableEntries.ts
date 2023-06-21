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
      first: true,
      last: false,
      pageNumber: 0,
      totalPages: 6,
      content: entries,
      empty: !limit,
    },
  };
}
