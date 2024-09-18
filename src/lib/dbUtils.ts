export function aggregateOneToMany<
   TRow extends Record<string, any>,
   TOne extends keyof TRow,
   TMany extends keyof TRow
>(
   rows: TRow[],
   one: TOne,
   many: TMany
): Array<
   Omit<TRow[TOne], TMany> & { [key in TMany]: NonNullable<TRow[TMany]>[] }
> {
   const map: Record<
      string,
      Omit<TRow[TOne], TMany> & { [key in TMany]: NonNullable<TRow[TMany]>[] }
   > = {};

   for (const row of rows) {
      const oneKey = row[one];
      const key =
         typeof oneKey === "object" ? JSON.stringify(oneKey) : String(oneKey);

      if (!map[key]) {
         map[key] = { ...row[one], [many]: [] } as Omit<TRow[TOne], TMany> & {
            [key in TMany]: NonNullable<TRow[TMany]>[];
         };
      }

      if (row[many] != null) {
         map[key][many].push(row[many] as NonNullable<TRow[TMany]>);
      }
   }

   return Object.values(map);
}
