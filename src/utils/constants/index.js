import dayjs from 'dayjs';
import { capitalize } from 'lodash';

export const AUTH_MESSAGES = {
  login: 'Login successful.',
  invalidLogin: 'Invalid credentials.',
  forgotPassword: 'Reset password link sent to your email.',
  resetPassword: 'Your password has been reset successfully.',
  createPassword: 'Password created successfully.',
  logout: 'You have been logged out.',
  session: 'Your session has been expired.',
  emailVerificationSent: 'Verification email sent. Check inbox.',
  verificationLinkExpired: 'Verification link has expired.',
};

export const ERROR_MESSAGES = {
  400: 'Invalid request. Please try again.',
  401: 'Please log in to continue.',
  403: 'Access denied.',
  404: 'The content does not exist.',
  408: 'Request took too long. Try again.',
  422: 'Invalid input. Please try again.',
  500: 'Oops! Something went wrong. Try later.',
  502: 'Connection issue. Try later.',
  503: 'Service is down. Try later.',
  504: 'Server took too long. Try again.',
  common: 'Oops! Something went wrong. Try later.',
};

export const VALIDATION_MESSAGES = {
  required: field => `${capitalize(field)} is required.`,
  minLength: (field, length) =>
    `${capitalize(field)} must be at least ${length} characters.`,
  maxLength: (field, length) =>
    `${capitalize(field)} must be at most ${length} characters.`,
  invalid: field => `Invalid ${field}.`,
  passwordUppercase: 'Password must contain uppercase letters.',
  passwordLowercase: 'Password must contain lowercase letters.',
  passwordNumber: 'Password must contain numbers.',
  passwordSpecialChar: 'Password must contain special characters.',
  passwordsDoNotMatch: 'Passwords do not match.',
};

export const PLACEHOLDER_MESSAGES = {
  default: field => `Enter your ${field}`,
  common: field => `Enter ${field}`,
  select: field => `Select ${field}`,
  filter: field => `Filter by ${field}`,
  search: 'Search here...',
};

export const DEACTIVATION_REASONS = [
  'User requested deactivation',
  'Terms of Service violation',
  'Suspicious or abusive activity (e.g., spamming, API misuse)',
  'Multiple failed login attempts',
  'Admin-initiated (e.g., org-level action)',
];

export const DATE_FORMAT = {
  date: date => (date ? dayjs(date).format('DD/MM/YYYY') : '-'),
  dateTime: date => (date ? dayjs(date).format('DD/MM/YYYY h:mm A') : '-'),
};

export const ACTION_MESSAGES = {
  update: field => `${capitalize(field)} updated successfully.`,
  delete: field => `${capitalize(field)} deleted successfully.`,
  deactivated: field => `${capitalize(field)} deactivated successfully.`,
  activated: field => `${capitalize(field)} activated successfully.`,
  add: field => `${capitalize(field)} added successfully.`,
  sync: field => `${capitalize(field)} synced successfully.`,
  invite: 'Invitation sent successfully.',
};

export const STATUS_OPTIONS = [
  { value: 'true', label: 'Active' },
  { value: 'false', label: 'Inactive' },
];

export const LOCAL_STORAGE_KEY = 'sales_representative';
export const CACHED_URL_LOCAL_STORAGE_KEY = 'cached-redirect-url';
