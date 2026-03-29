import type { Constructor } from 'src/utilities/constructor.util'

export function PickClass<T, K extends keyof T>(
  Base: Constructor<T>,
  keys: K[]
): Constructor<Pick<T, K>> {
  return class {
    constructor() {}
  } as Constructor<Pick<T, K>>;
}