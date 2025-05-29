export const colors = {
  // Primary Colors (Blue shades)
  primary: '#2196F3',        // Main blue
  primaryDark: '#1976D2',    // Darker blue for shadows
  primaryLight: '#64B5F6',   // Lighter blue for accents

  // Secondary Colors
  secondary: '#4CAF50',      // Green for success
  secondaryDark: '#388E3C',  // Darker green
  secondaryLight: '#81C784', // Lighter green

  // Accent Colors
  accent: '#FF9800',         // Orange for accents
  accentDark: '#F57C00',     // Darker orange
  accentLight: '#FFB74D',    // Lighter orange

  // Status Colors
  success: '#4CAF50',        // Green for success
  error: '#F44336',          // Red for errors
  warning: '#FF9800',        // Orange for warnings
  info: '#2196F3',           // Blue for info

  // Background Colors
  background: '#FFFFFF',     // White background
  backgroundLight: '#F5F5F5', // Light gray background
  card: '#FFFFFF',           // Card background
  surface: '#FFFFFF',        // Surface elements

  // Text Colors
  textPrimary: '#212121',    // Dark text
  textSecondary: '#757575',  // Secondary text
  textDisabled: '#BDBDBD',   // Disabled text
  textInverse: '#FFFFFF',    // White text for dark backgrounds

  // Border Colors
  border: '#E0E0E0',         // Default border
  borderLight: '#EEEEEE',    // Light border
  borderDark: '#BDBDBD',     // Dark border

  // State Colors
  active: '#2196F3',         // Active state
  inactive: '#BDBDBD',       // Inactive state
  placeholder: '#BDBDBD',    // Placeholder text
  disabled: '#BDBDBD',       // Disabled elements

  // Loading Colors
  loadingPrimary: '#2196F3', // Primary loading indicator
  loadingSecondary: '#4CAF50', // Secondary loading indicator

  // Offline/Network Colors
  online: '#4CAF50',         // Green for online
  offline: '#F44336',        // Red for offline
  pending: '#FF9800',        // Orange for pending
  synced: '#4CAF50',         // Green for synced

  // Shadow Colors
  shadow: '#000000',         // Base shadow
  shadowLight: 'rgba(0, 0, 0, 0.1)', // Light shadow
  shadowDark: 'rgba(0, 0, 0, 0.2)',  // Dark shadow

  // Gradients
  gradientPrimary: [
    '#2196F3',               // Start color
    '#1976D2',               // End color
  ],
  gradientSecondary: [
    '#4CAF50',               // Start color
    '#388E3C',               // End color
  ],

  // Semantic Colors
  workout: '#2196F3',        // Workout related
  exercise: '#4CAF50',       // Exercise related
  progress: '#FF9800',       // Progress tracking
  stats: '#9C27B0',          // Statistics
} as const;
