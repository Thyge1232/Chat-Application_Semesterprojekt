import type { IColorThemeConversation } from "../../types/iColorThemes";
import { ThemeBlue, ThemeDarkMode } from "./Theme1";

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

      //case + 3

      default:
        return new ThemeBlue();
    }
  }

  // Dynamisk liste af tilgængelige temaer
  static getAvailableThemes(): { id: number; label: string }[] {
    return [
      { id: 1, label: "Blå" },
      { id: 2, label: "Dark Mode" },
    ];
  }
}
