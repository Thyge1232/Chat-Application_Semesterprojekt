import type { IColorThemeConversation } from "../../types/iColorThemes";
import { ThemeBlue } from "./Theme1";

//Factoryclass: return a colortheme for conversationpage based on a number from User.ThemeNumber (db)
//Husk: se ui komponenter igennem for hardcoded styling /
//Husk: Tilføj + ændre i Conversationpage /

export class ConversationColerThemeFactory {
  static createTheme(themeNumber: number): IColorThemeConversation {
    switch (themeNumber) {
      case 1:
        return new ThemeBlue();

      case 2:
        return new ThemeBlue();

      //case + 3

      default:
        return new ThemeBlue();
    }
  }
}
