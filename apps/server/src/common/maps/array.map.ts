// Clears array from nullable or undefined values
export const mapArray = <T>(array: T[]): T[] =>
  (array ?? []).filter((item): item is T => item != null)
