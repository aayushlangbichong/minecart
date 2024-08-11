// utils/classNames.js
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes, resolving conflicts, and handling conditional classes.
 * @param  {...any} classes - The classes to be merged.
 * @returns {string} - A string of merged class names.
 */
export function cn(...classes) {
  return twMerge(clsx(...classes));
}
