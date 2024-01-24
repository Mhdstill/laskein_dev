import { createTheme } from '@mui/material/styles';
import componentsOverride from './overrides';
import palette from './palette';
import shadows, { customShadows } from './shadows';
import typography from './typography';

export const themes = (customization: any) => {
  const themeOptions = {
    palette,
    shape: { ...customization },
    shadows,
    customShadows,
    typography,
  } as any;

  const themes = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  return themes;
};

export default themes;

/**
 * Add custom color in material ui
 *
 */
declare module '@mui/material/styles' {
  /* eslint-disable */
  interface PaletteColor {
    lightest?: string;
    lighter?: string;
    darker?: string;
  }

  interface PaletteOptions {
    accent: any;
    greymenu: any;
    gray: any;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    accent: any;
    greymenu: any;
    gray: any;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent: any;
    greymenu: any;
    gray: any;
  }
}
