import { isString } from './typeGuards'

describe('isString', () => {
  it('returns true for a string value', () => {
    expect(isString('hello')).toBe(true)
  })

  it('returns false for an undefined value', () => {
    expect(isString(undefined)).toBe(false)
  })

  it('returns false for a number value', () => {
    expect(isString(123 as any)).toBe(false)
  })

  it('returns false for a boolean value', () => {
    expect(isString(true as any)).toBe(false)
  })

  it('returns false for an object value', () => {
    expect(isString({} as any)).toBe(false)
  })

  it('returns false for an array value', () => {
    expect(isString([] as any)).toBe(false)
  })
})
