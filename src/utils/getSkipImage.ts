const skipImages = import.meta.glob('../assets/*.jpg', { eager: true, import: 'default' });

export const getSkipImage = (size: number): string => {
  return (skipImages[`../assets/${size}-yarder-skip.jpg`] as string) || '/fallback.png';
};