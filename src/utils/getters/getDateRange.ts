import dayjs from 'dayjs';

export type DateRange = {
  dateStart?: Date;
  dateEnd?: Date;
  isoStart?: string;
  isoEnd?: string;
  start?: string;
  end?: string;
};

export const getDateRange = ({
  days,
  startDate,
  endDate,
  previous,
}: {
  days?: number;
  startDate?: Date;
  endDate?: Date;
  previous?: boolean;
}): DateRange => {
  const start = previous
    ? dayjs(startDate).subtract((days ?? 0) + (days ?? 1), 'day')
    : dayjs(startDate).subtract(days ?? 0, 'day');
  const end = previous
    ? dayjs(endDate).subtract((days ?? 0) + 1, 'day')
    : dayjs(endDate);

  return {
    dateStart: start.toDate(),
    dateEnd: end.toDate(),
    isoStart: start.toISOString(),
    isoEnd: end.toISOString(),
    start: start.format('YYYY-MM-DD'),
    end: end.format('YYYY-MM-DD'),
  };
};
