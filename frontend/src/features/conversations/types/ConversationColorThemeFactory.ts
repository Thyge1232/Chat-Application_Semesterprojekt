import type { IColorThemeConversation } from "./iColorThemes";
import { ThemeBlue, ThemeDarkMode, ThemeEdgeLord } from "./ConversationThemes";

export class ConversationColorThemeFactory {
  static createTheme(themeNumber: number): IColorThemeConversation {
    switch (themeNumber) {
      case 1:
        return new ThemeBlue();

      case 2:
        return new ThemeDarkMode();

      case 3:
        return new ThemeEdgeLord();

      default:
        return new ThemeBlue();
    }
  }

  static createThemeFromString(
    themeName: string | null | undefined
  ): IColorThemeConversation {
    if (!themeName) return this.createTheme(1); //default theme

    const avaiableTheme = this.getAvailableThemes();
    const found = avaiableTheme.find(
      (t) => t.label.toLowerCase() === themeName.toLowerCase()
    );
    return found ? this.createTheme(found.id) : this.createTheme(1);
  }

  // Dynamisk liste af tilgængelige temaer
  static getAvailableThemes(): { id: number; label: string }[] {
    return [
      { id: 1, label: "Blå" },
      { id: 2, label: "Dark Mode" },
      { id: 3, label: "Edgelord Theme" },
    ];
  }
}
