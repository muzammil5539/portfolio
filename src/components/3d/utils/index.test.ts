import { describe, it, expect } from 'vitest';
import { clamp } from './index';

describe('clamp utility', () => {
  it('should return the value if it is between min and max', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(0, -10, 10)).toBe(0);
    expect(clamp(9.9, 0, 10)).toBe(9.9);
  });

  it('should return the min value if the value is less than min', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(-20, -10, 10)).toBe(-10);
    expect(clamp(-0.1, 0, 10)).toBe(0);
  });

  it('should return the max value if the value is greater than max', () => {
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(20, -10, 10)).toBe(10);
    expect(clamp(10.1, 0, 10)).toBe(10);
  });

  it('should handle boundaries correctly (value equals min or max)', () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
    expect(clamp(-10, -10, 10)).toBe(-10);
  });

  it('should handle negative numbers correctly', () => {
    expect(clamp(-5, -10, -1)).toBe(-5);
    expect(clamp(-15, -10, -1)).toBe(-10);
    expect(clamp(0, -10, -1)).toBe(-1);
  });

  it('should handle edge case where min equals max', () => {
    expect(clamp(5, 10, 10)).toBe(10);
    expect(clamp(15, 10, 10)).toBe(10);
    expect(clamp(10, 10, 10)).toBe(10);
  });
});
