export const upsertMany = async <
  // eslint-disable-next-line @typescript-eslint/ban-types
  T extends Function,
  P extends { id?: string | number }
>(
  upsertFunc: T,
  entities: P[]
) => {
  for (const entity of entities) {
    await upsertFunc({
      where: { id: entity.id },
      create: entity,
      update: entity,
    });
  }
};
