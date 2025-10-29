import type { IColorThemeConversation } from "./iColorThemes";
import { ThemeBlue, ThemeDarkMode, ThemeEdgeLord } from "./ConversationThemes";

//Factoryclass: return a colortheme for conversationpage based on a number from User.ThemeNumber (db)
//Husk: se ui komponenter igennem for hardcoded styling /
//Husk: Tilføj + ændre i Conversationpage /

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

  //Er attributten en string i db ellers blot brug ;
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
