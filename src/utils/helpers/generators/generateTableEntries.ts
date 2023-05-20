import dayjs from 'dayjs';
import { PaginatedResponse } from 'types/core/Table';
import { generateUUID } from 'utils/helpers/generators/generateUUID';

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
        .subtract(i % 2 === 0 ? 1 * i : 2 * i, 'days')
        .toISOString(),
    };

    entries.push(entry);
  }

  return {
    data: {
      first: true,
      last: false,
      number: 0,
      hasContent: true,
      numberOfElements: 50,
      size: 50,
      totalElements: 268,
      totalPages: 6,
      content: entries,
      empty: !!limit ? false : true,
    },
  };
}
