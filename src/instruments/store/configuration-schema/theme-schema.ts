import { JSONSchemaType } from "ajv/dist/2019";
import { optional } from "./utils";

export interface ThemeProperties {
  [key: string]: string | undefined;

  colorPrimary?: string;
  colorBackground?: string;
  colorText?: string;
  colorDanger?: string;
  borderRadius?: string;
  labels?: "stacked" | "floating";

  // Font properties
  fontFamily?: string;
  fontSizeBase?: string;
  fontWeightBase?: string;
  fontLineHeightBase?: string;
  fontSmooth?: "auto" | "never" | "always";

  // Heading properties
  headingFontFamily?: string;
  headingFontWeight?: string;
  headingColorText?: string;

  // Button properties
  buttonColorBackground?: string;
  buttonColorText?: string;
  buttonFontFamily?: string;
  buttonFontSize?: string;
  buttonFontLineHeight?: string;
  buttonFontWeight?: string;
  buttonBorder?: string;
  buttonBorderColor?: string;
  buttonBorderWidth?: string;
  buttonBorderType?: string;
  buttonBorderRadius?: string;
  buttonBoxShadow?: string;
  buttonSecondaryColorText?: string;
  buttonSecondaryFontFamily?: string;
  buttonSecondaryFontSize?: string;
  buttonSecondaryFontLineHeight?: string;
  buttonSecondaryFontWeight?: string;
  buttonSecondaryBorder?: string;
  buttonSecondaryBorderColor?: string;
  buttonSecondaryBorderWidth?: string;
  buttonSecondaryBorderType?: string;
  buttonSecondaryBorderRadius?: string;
  buttonSecondaryBoxShadow?: string;

  // Button hover state properties
  buttonHoverColorBackground?: string;
  buttonHoverColorText?: string;
  buttonHoverFontFamily?: string;
  buttonHoverFontSize?: string;
  buttonHoverFontLineHeight?: string;
  buttonHoverFontWeight?: string;
  buttonHoverBorder?: string;
  buttonHoverBorderColor?: string;
  buttonHoverBorderWidth?: string;
  buttonHoverBorderType?: string;
  buttonHoverBorderRadius?: string;
  buttonHoverBoxShadow?: string;
  buttonSecondaryHoverColorBackground?: string;
  buttonSecondaryHoverColorText?: string;
  buttonSecondaryHoverFontFamily?: string;
  buttonSecondaryHoverFontSize?: string;
  buttonSecondaryHoverFontLineHeight?: string;
  buttonSecondaryHoverFontWeight?: string;
  buttonSecondaryHoverBorder?: string;
  buttonSecondaryHoverBorderColor?: string;
  buttonSecondaryHoverBorderWidth?: string;
  buttonSecondaryHoverBorderType?: string;
  buttonSecondaryHoverBorderRadius?: string;
  buttonSecondaryHoverBoxShadow?: string;

  // Button active state properties
  buttonActiveColorBackground?: string;
  buttonActiveColorText?: string;
  buttonActiveFontFamily?: string;
  buttonActiveFontSize?: string;
  buttonActiveFontLineHeight?: string;
  buttonActiveFontWeight?: string;
  buttonActiveBorder?: string;
  buttonActiveBorderColor?: string;
  buttonActiveBorderWidth?: string;
  buttonActiveBorderType?: string;
  buttonActiveBorderRadius?: string;
  buttonActiveBoxShadow?: string;
  buttonSecondaryActiveColorBackground?: string;
  buttonSecondaryActiveColorText?: string;
  buttonSecondaryActiveFontFamily?: string;
  buttonSecondaryActiveFontSize?: string;
  buttonSecondaryActiveFontLineHeight?: string;
  buttonSecondaryActiveFontWeight?: string;
  buttonSecondaryActiveBorder?: string;
  buttonSecondaryActiveBorderColor?: string;
  buttonSecondaryActiveBorderWidth?: string;
  buttonSecondaryActiveBorderType?: string;
  buttonSecondaryActiveBorderRadius?: string;
  buttonSecondaryActiveBoxShadow?: string;

  // Input properties
  inputColorBackground?: string;
  inputColorText?: string;
  inputFontFamily?: string;
  inputFontSize?: string;
  inputFontLineHeight?: string;
  inputFontWeight?: string;
  inputBorder?: string;
  inputBorderRadius?: string;
  inputBoxShadow?: string;

  // Input hover state properties
  inputHoverColorBackground?: string;
  inputHoverColorText?: string;
  inputHoverFontFamily?: string;
  inputHoverFontSize?: string;
  inputHoverFontLineHeight?: string;
  inputHoverFontWeight?: string;
  inputHoverBorder?: string;
  inputHoverBorderRadius?: string;
  inputHoverBoxShadow?: string;

  // Input focus state properties
  inputFocusColorBackground?: string;
  inputFocusColorText?: string;
  inputFocusFontFamily?: string;
  inputFocusFontSize?: string;
  inputFocusFontLineHeight?: string;
  inputFocusFontWeight?: string;
  inputFocusBorder?: string;
  inputFocusBorderRadius?: string;
  inputFocusBoxShadow?: string;

  // Input placeholder properties
  inputPlaceholderColorText?: string;
  inputPlaceholderFontFamily?: string;
  inputPlaceholderFontSize?: string;
  inputPlaceholderFontLineHeight?: string;
  inputPlaceholderFontWeight?: string;

  // Selected input text properties
  inputSelectionColorText?: string;
  inputSelectionColorBackground?: string;

  // Invalid input properties
  inputErrorColorBackground?: string;
  inputErrorColorText?: string;
  inputErrorFontFamily?: string;
  inputErrorFontSize?: string;
  inputErrorFontLineHeight?: string;
  inputErrorFontWeight?: string;
  inputErrorBorder?: string;
  inputErrorBorderRadius?: string;
  inputErrorBoxShadow?: string;

  // Invalid input hover state properties
  inputErrorHoverColorBackground?: string;
  inputErrorHoverColorText?: string;
  inputErrorHoverFontFamily?: string;
  inputErrorHoverFontSize?: string;
  inputErrorHoverFontLineHeight?: string;
  inputErrorHoverFontWeight?: string;
  inputErrorHoverBorder?: string;
  inputErrorHoverBorderRadius?: string;
  inputErrorHoverBoxShadow?: string;

  // Invalid input focus state properties
  inputErrorFocusColorBackground?: string;
  inputErrorFocusColorText?: string;
  inputErrorFocusFontFamily?: string;
  inputErrorFocusFontSize?: string;
  inputErrorFocusFontLineHeight?: string;
  inputErrorFocusFontWeight?: string;
  inputErrorFocusBorder?: string;
  inputErrorFocusBorderRadius?: string;
  inputErrorFocusBoxShadow?: string;

  // Invalid input placeholder properties
  inputErrorPlaceholderColorText?: string;
  inputErrorPlaceholderFontFamily?: string;
  inputErrorPlaceholderFontSize?: string;
  inputErrorPlaceholderFontLineHeight?: string;
  inputErrorPlaceholderFontWeight?: string;

  // Invalid input selected text properties
  inputErrorSelectionColorText?: string;
  inputErrorSelectionColorBackground?: string;
}

export const themeSchema: JSONSchemaType<ThemeProperties> = {
  type: "object",
  properties: {
    colorPrimary: optional({
      type: "string",
      default: "#0044d4",
    }),
    colorBackground: optional({
      type: "string",
      default: "#FFFFFF",
    }),
    colorText: optional({
      type: "string",
      default: "#0D2B3E",
    }),
    colorDanger: optional({
      type: "string",
      default: "#CD5C5C",
    }),
    borderRadius: optional({
      type: "string",
      default: "4px",
    }),
    labels: optional({
      type: "string",
      enum: ["stacked", "floating"],
      default: "stacked",
    }),

    // Font properties
    fontFamily: optional({
      type: "string",
      default:
        "-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial sans-serif",
    }),
    fontSizeBase: optional({
      type: "string",
      default: "16px",
    }),
    fontWeightBase: optional({
      type: "string",
      default: "400",
    }),
    fontLineHeightBase: optional({
      type: "string",
      default: "24px",
    }),
    fontSmooth: optional({
      type: "string",
      enum: ["auto", "never", "always"],
      default: "auto",
    }),

    // Heading properties
    headingFontFamily: optional({
      type: "string",
    }),
    headingFontWeight: optional({
      type: "string",
      default: "500",
    }),
    headingColorText: optional({
      type: "string",
    }),

    // Button properties
    buttonColorBackground: optional({
      type: "string",
    }),
    buttonColorText: optional({
      type: "string",
      default: "#FFFFFF",
    }),
    buttonFontFamily: optional({
      type: "string",
    }),
    buttonFontSize: optional({
      type: "string",
    }),
    buttonFontLineHeight: optional({
      type: "string",
    }),
    buttonFontWeight: optional({
      type: "string",
    }),
    buttonBorder: optional({
      type: "string",
      default: "1px solid transparent",
    }),
    buttonBorderColor: optional({
      type: "string",
    }),
    buttonBorderWidth: optional({
      type: "string",
    }),
    buttonBorderType: optional({
      type: "string",
    }),
    buttonBorderRadius: optional({
      type: "string",
    }),
    buttonBoxShadow: optional({
      type: "string",
      default: "none",
    }),
    buttonSecondaryColorText: optional({
      type: "string",
    }),
    buttonSecondaryFontFamily: optional({
      type: "string",
    }),
    buttonSecondaryFontSize: optional({
      type: "string",
    }),
    buttonSecondaryFontLineHeight: optional({
      type: "string",
    }),
    buttonSecondaryFontWeight: optional({
      type: "string",
    }),
    buttonSecondaryBorder: optional({
      type: "string",
    }),
    buttonSecondaryBorderColor: optional({
      type: "string",
    }),
    buttonSecondaryBorderWidth: optional({
      type: "string",
    }),
    buttonSecondaryBorderType: optional({
      type: "string",
    }),
    buttonSecondaryBorderRadius: optional({
      type: "string",
    }),
    buttonSecondaryBoxShadow: optional({
      type: "string",
      default: "none",
    }),

    // Button hover state properties
    buttonHoverColorBackground: optional({
      type: "string",
    }),
    buttonHoverColorText: optional({
      type: "string",
    }),
    buttonHoverFontFamily: optional({
      type: "string",
    }),
    buttonHoverFontSize: optional({
      type: "string",
    }),
    buttonHoverFontLineHeight: optional({
      type: "string",
    }),
    buttonHoverFontWeight: optional({
      type: "string",
    }),
    buttonHoverBorder: optional({
      type: "string",
    }),
    buttonHoverBorderColor: optional({
      type: "string",
    }),
    buttonHoverBorderWidth: optional({
      type: "string",
    }),
    buttonHoverBorderType: optional({
      type: "string",
    }),
    buttonHoverBorderRadius: optional({
      type: "string",
    }),
    buttonHoverBoxShadow: optional({
      type: "string",
      default: "none",
    }),
    buttonSecondaryHoverColorBackground: optional({
      type: "string",
    }),
    buttonSecondaryHoverColorText: optional({
      type: "string",
    }),
    buttonSecondaryHoverFontFamily: optional({
      type: "string",
    }),
    buttonSecondaryHoverFontSize: optional({
      type: "string",
    }),
    buttonSecondaryHoverFontLineHeight: optional({
      type: "string",
    }),
    buttonSecondaryHoverFontWeight: optional({
      type: "string",
    }),
    buttonSecondaryHoverBorder: optional({
      type: "string",
    }),
    buttonSecondaryHoverBorderColor: optional({
      type: "string",
    }),
    buttonSecondaryHoverBorderWidth: optional({
      type: "string",
    }),
    buttonSecondaryHoverBorderType: optional({
      type: "string",
    }),
    buttonSecondaryHoverBorderRadius: optional({
      type: "string",
    }),
    buttonSecondaryHoverBoxShadow: optional({
      type: "string",
      default: "none",
    }),

    // Button active state properties
    buttonActiveColorBackground: optional({
      type: "string",
    }),
    buttonActiveColorText: optional({
      type: "string",
    }),
    buttonActiveFontFamily: optional({
      type: "string",
    }),
    buttonActiveFontSize: optional({
      type: "string",
    }),
    buttonActiveFontLineHeight: optional({
      type: "string",
    }),
    buttonActiveFontWeight: optional({
      type: "string",
    }),
    buttonActiveBorder: optional({
      type: "string",
    }),
    buttonActiveBorderColor: optional({
      type: "string",
    }),
    buttonActiveBorderWidth: optional({
      type: "string",
    }),
    buttonActiveBorderType: optional({
      type: "string",
    }),
    buttonActiveBorderRadius: optional({
      type: "string",
    }),
    buttonActiveBoxShadow: optional({
      type: "string",
      default: "none",
    }),
    buttonSecondaryActiveColorBackground: optional({
      type: "string",
    }),
    buttonSecondaryActiveColorText: optional({
      type: "string",
    }),
    buttonSecondaryActiveFontFamily: optional({
      type: "string",
    }),
    buttonSecondaryActiveFontSize: optional({
      type: "string",
    }),
    buttonSecondaryActiveFontLineHeight: optional({
      type: "string",
    }),
    buttonSecondaryActiveFontWeight: optional({
      type: "string",
    }),
    buttonSecondaryActiveBorder: optional({
      type: "string",
    }),
    buttonSecondaryActiveBorderColor: optional({
      type: "string",
    }),
    buttonSecondaryActiveBorderWidth: optional({
      type: "string",
    }),
    buttonSecondaryActiveBorderType: optional({
      type: "string",
    }),
    buttonSecondaryActiveBorderRadius: optional({
      type: "string",
    }),
    buttonSecondaryActiveBoxShadow: optional({
      type: "string",
      default: "none",
    }),

    // Input properties
    inputColorBackground: optional({
      type: "string",
    }),
    inputColorText: optional({
      type: "string",
    }),
    inputFontFamily: optional({
      type: "string",
    }),
    inputFontSize: optional({
      type: "string",
    }),
    inputFontLineHeight: optional({
      type: "string",
    }),
    inputFontWeight: optional({
      type: "string",
    }),
    inputBorder: optional({
      type: "string",
    }),
    inputBorderRadius: optional({
      type: "string",
    }),
    inputBoxShadow: optional({
      type: "string",
    }),

    // Input hover state properties
    inputHoverColorBackground: optional({
      type: "string",
    }),
    inputHoverColorText: optional({
      type: "string",
    }),
    inputHoverFontFamily: optional({
      type: "string",
    }),
    inputHoverFontSize: optional({
      type: "string",
    }),
    inputHoverFontLineHeight: optional({
      type: "string",
    }),
    inputHoverFontWeight: optional({
      type: "string",
    }),
    inputHoverBorder: optional({
      type: "string",
    }),
    inputHoverBorderRadius: optional({
      type: "string",
    }),
    inputHoverBoxShadow: optional({
      type: "string",
    }),

    // Input focus state properties
    inputFocusColorBackground: optional({
      type: "string",
    }),
    inputFocusColorText: optional({
      type: "string",
    }),
    inputFocusFontFamily: optional({
      type: "string",
    }),
    inputFocusFontSize: optional({
      type: "string",
    }),
    inputFocusFontLineHeight: optional({
      type: "string",
    }),
    inputFocusFontWeight: optional({
      type: "string",
    }),
    inputFocusBorder: optional({
      type: "string",
    }),
    inputFocusBorderRadius: optional({
      type: "string",
    }),
    inputFocusBoxShadow: optional({
      type: "string",
    }),

    // Input placeholder properties
    inputPlaceholderColorText: optional({
      type: "string",
    }),
    inputPlaceholderFontFamily: optional({
      type: "string",
    }),
    inputPlaceholderFontSize: optional({
      type: "string",
    }),
    inputPlaceholderFontLineHeight: optional({
      type: "string",
    }),
    inputPlaceholderFontWeight: optional({
      type: "string",
    }),

    // Selected input text properties
    inputSelectionColorText: optional({
      type: "string",
    }),
    inputSelectionColorBackground: optional({
      type: "string",
    }),

    // Invalid input properties
    inputErrorColorBackground: optional({
      type: "string",
    }),
    inputErrorColorText: optional({
      type: "string",
    }),
    inputErrorFontFamily: optional({
      type: "string",
    }),
    inputErrorFontSize: optional({
      type: "string",
    }),
    inputErrorFontLineHeight: optional({
      type: "string",
    }),
    inputErrorFontWeight: optional({
      type: "string",
    }),
    inputErrorBorder: optional({
      type: "string",
    }),
    inputErrorBorderRadius: optional({
      type: "string",
    }),
    inputErrorBoxShadow: optional({
      type: "string",
    }),

    // Invalid input hover state properties
    inputErrorHoverColorBackground: optional({
      type: "string",
    }),
    inputErrorHoverColorText: optional({
      type: "string",
    }),
    inputErrorHoverFontFamily: optional({
      type: "string",
    }),
    inputErrorHoverFontSize: optional({
      type: "string",
    }),
    inputErrorHoverFontLineHeight: optional({
      type: "string",
    }),
    inputErrorHoverFontWeight: optional({
      type: "string",
    }),
    inputErrorHoverBorder: optional({
      type: "string",
    }),
    inputErrorHoverBorderRadius: optional({
      type: "string",
    }),
    inputErrorHoverBoxShadow: optional({
      type: "string",
    }),

    // Invalid input focus state properties
    inputErrorFocusColorBackground: optional({
      type: "string",
    }),
    inputErrorFocusColorText: optional({
      type: "string",
    }),
    inputErrorFocusFontFamily: optional({
      type: "string",
    }),
    inputErrorFocusFontSize: optional({
      type: "string",
    }),
    inputErrorFocusFontLineHeight: optional({
      type: "string",
    }),
    inputErrorFocusFontWeight: optional({
      type: "string",
    }),
    inputErrorFocusBorder: optional({
      type: "string",
    }),
    inputErrorFocusBorderRadius: optional({
      type: "string",
    }),
    inputErrorFocusBoxShadow: optional({
      type: "string",
    }),

    // Invalid input placeholder properties
    inputErrorPlaceholderColorText: optional({
      type: "string",
    }),
    inputErrorPlaceholderFontFamily: optional({
      type: "string",
    }),
    inputErrorPlaceholderFontSize: optional({
      type: "string",
    }),
    inputErrorPlaceholderFontLineHeight: optional({
      type: "string",
    }),
    inputErrorPlaceholderFontWeight: optional({
      type: "string",
    }),

    // Invalid input selected text properties
    inputErrorSelectionColorText: optional({
      type: "string",
    }),
    inputErrorSelectionColorBackground: optional({
      type: "string",
    }),
  },
  default: {},
  required: [],
};
