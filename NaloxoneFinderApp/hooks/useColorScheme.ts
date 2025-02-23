import { useColorScheme } from 'react-native';

export function useThemeColor(
  colors: { light?: string; dark?: string },
  colorName: keyof typeof colors
) {
  const theme = useColorScheme(); // Detect system theme

  return theme === 'dark' ? colors.dark ?? 'black' : colors.light ?? 'white';
}
