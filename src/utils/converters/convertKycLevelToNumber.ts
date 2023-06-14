export function convertKycLevelToNumber(query: any) {
  if (!query) return 0;

  const levels = {
    three: 3,
    two: 2,
    one: 1,
  } as Record<string, any>;

  return levels[String(query?.toLowerCase().split('tier_')?.[1])] ?? 0;
}
