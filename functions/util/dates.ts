// Date utility functions
export function generateKey(): string {
  return 'key_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}