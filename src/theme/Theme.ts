export const Theme = {
  colors: {
    background: '#0F172A', // Deep slate for dark mode look
    surface: '#1E293B',
    surfaceHighlight: '#334155',
    primary: '#3B82F6', // Vibrant blue
    primaryHover: '#60A5FA',
    success: '#10B981',
    error: '#EF4444',
    text: '#F8FAFC',
    textMuted: '#94A3B8',
    border: '#334155',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  typography: {
    fontFamily: 'System',
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
    },
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    } as const,
  },
};
