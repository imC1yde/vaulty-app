import type { Nullable } from '@src/common/utilities/nullable.util.ts'
import { type RefObject, useEffect } from 'react'

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<Nullable<T>>,
  handler: (event: MouseEvent | TouchEvent) => void
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current
      const target = event.target as Element
      if (!el || el.contains(target) || target.closest('[data-select-portal]')) return

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ ref, handler ])
}