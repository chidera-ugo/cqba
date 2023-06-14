export function getDtoKeyListFromDtoEnum(dtoEnum: any) {
  return Object.keys(dtoEnum).filter((v) => isNaN(Number(v)));
}
