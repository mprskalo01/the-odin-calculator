import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Calculator } from './Calculator';
class MockHTMLElement {
  textContent: string | null = '';
  classList = { add: vi.fn(), remove: vi.fn() };
  disabled: boolean = false;
}

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add', () => {
    it('should correctly add two numbers', () => {
      expect(calculator['add'](5, 3)).toBe(8);
    });
  });

  describe('subtract', () => {
    it('should correctly subtract two numbers', () => {
      expect(calculator['subtract'](5, 3)).toBe(2);
    });
  });

  describe('multiply', () => {
    it('should correctly multiply two numbers', () => {
      expect(calculator['multiply'](5, 3)).toBe(15);
    });
  });

  describe('divide', () => {
    it('should correctly divide two numbers', () => {
      expect(calculator['divide'](6, 3)).toBe(2);
    });
  });

  describe('modulus', () => {
    it('should correctly calculate the modulus of two numbers', () => {
      expect(calculator['modulus'](5, 3)).toBe(2);
    });
  });

  describe('toFixedIfNecessary', () => {
    it('should correctly format numbers to a fixed precision if necessary', () => {
      expect(calculator['toFixedIfNecessary'](1.123456789)).toBe(1.123457);
      expect(calculator['toFixedIfNecessary'](1.1)).toBe(1.1);
    });
  });

  describe('operate', () => {
    it('should correctly add numbers when operator is "+"', () => {
      calculator['firstNum'] = 5;
      calculator['operator'] = '+';
      calculator['display'].textContent = '3';
      calculator['operate']();
      expect(calculator['display'].textContent).toBe('8');
    });

    it('should correctly handle division by zero', () => {
      calculator['firstNum'] = 5;
      calculator['operator'] = '/';
      calculator['display'].textContent = '0';
      calculator['operate']();
    });

    it('should reset operator and previous number after operation', () => {
      calculator['firstNum'] = 5;
      calculator['operator'] = '*';
      calculator['display'].textContent = '3';
      calculator['operate']();
      expect(calculator['operator']).toBe('');
      expect(calculator['previousNumber'].textContent).toBe('');
    });
  });
});
