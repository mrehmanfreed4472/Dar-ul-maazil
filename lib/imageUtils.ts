/**
 * Utility functions for handling image fallbacks and loading
 */

/**
 * Handle image error by setting fallback placeholder
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
  const img = event.currentTarget as HTMLImageElement;
  // Avoid infinite loop if placeholder also fails
  if (!img.src.includes('/placeholder.svg')) {
    img.src = '/placeholder.svg';
  }
};

/**
 * Preload an image to check if it's valid
 */
export const isImageValid = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

/**
 * Get fallback image URL
 */
export const getFallbackImage = (): string => '/placeholder.svg';

/**
 * Validate if URL is a valid image URL
 */
export const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    const parsedUrl = new URL(url);
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(parsedUrl.pathname);
  } catch {
    return false;
  }
};
