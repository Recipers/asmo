const common = {
  PURPLE_200: '#882791',
  PURPLE_400: '#882791',
  PURPLE_500: '#b858c1',
  PURPLE_700: '#882791',
  BLUE_500: '#0D8AFF',
  RED_500: '#FF5F5F',
  RED_300: '#FFB4B4',
  BLUE_400: '#B4E0FF',
  GREEN_400: '#CCE6BA',
  YELLOW_400: '#FFE594',
  YELLOW_500: '#FACC15',
  UNCHANGE_WHITE: '#FFF',
  UNCHANGE_BLACK: '#000',
};

const colors = {
  WHITE: '#FFF',
  GRAY_100: '#F8F8F8',
  GRAY_200: '#E7E7E7',
  GRAY_300: '#D8D8D8',
  GRAY_500: '#8E8E8E',
  GRAY_700: '#575757',
  BLACK: '#161616',
  ...common,
} as const;

const colorHex = {
  RED: colors.PURPLE_400,
  BLUE: colors.BLUE_400,
  GREEN: colors.GREEN_400,
  YELLOW: colors.YELLOW_400,
  PURPLE: colors.PURPLE_400,
} as const;

export {colors, colorHex};
