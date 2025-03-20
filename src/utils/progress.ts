/**
 * Print a progress bar
 * @param current - The current progress value
 * @param total - The total value to reach
 * @param type - The type of progress (optional)
 */
export const printProgress = (
  current: number,
  total: number,
  type: string = '',
) => {
  const barLength = 50;
  const progress = current / total;
  const filledLength = Math.round(barLength * progress);
  const bar = '█'.repeat(filledLength) + '-'.repeat(barLength - filledLength);
  const percentage = (progress * 100).toFixed(1);

  process.stdout.write(
    `\r${type} Sync Progress: [${bar}] ${current}/${total} (${percentage}%)`,
  );
};