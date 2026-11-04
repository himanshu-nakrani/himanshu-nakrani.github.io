import { createContext, useContext } from 'react'

export const DisplayLocationContext = createContext(null)

export function useDisplayLocation() {
  return useContext(DisplayLocationContext)
}
