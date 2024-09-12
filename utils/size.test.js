const { calculateSize } = require('./size');

const mockStat = jest.fn();
jest.mock('node:fs/promises', () => ({
  ...jest.requireActual('node:fs/promises'),
  stat: async () => mockStat(),
}));

describe('size', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should return size in pretty string format', async () => {
    mockStat.mockReturnValue({ size: 100 });
    const v1 = await calculateSize('path');
    expect(v1).toBe('100.0 bytes');
    mockStat.mockClear();
    mockStat.mockReturnValue({ size: 1200 });
    const v2 = await calculateSize('path');
    expect(v2).toBe(`${(1200 / 1024).toFixed(1)} kb`);
    mockStat.mockClear();
    mockStat.mockReturnValue({ size: 1200 * 1200 });
    const v3 = await calculateSize('path');
    expect(v3).toBe(`${((1200 * 1200) / (1024 * 1024)).toFixed(1)} mb`);
    mockStat.mockClear();
    mockStat.mockReturnValue({ size: 1200 * 1200 * 1200 });
    const v4 = await calculateSize('path');
    expect(v4).toBe(
      `${((1200 * 1200 * 1200) / (1024 * 1024 * 1024)).toFixed(1)} gb`,
    );
  });
});
