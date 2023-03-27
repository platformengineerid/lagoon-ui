import { color } from "lib/variables";
import { LagoonTheme } from "styled-components";

export const darkTheme: LagoonTheme = {
  colorScheme: "dark",
  backgroundColor: "#121212",

  primaryTextColor: "#e5e5e5",

  modalOverlayBg:"#050503",

  labelColor: "#dee2e5",
  inputBg: "#3B3B3B",
  headerFooterGradient: "linear-gradient(to right, #24aec4 0%, #2a6dfe 25%)",
};

export const lightTheme: LagoonTheme = {
  colorScheme: "light",
  backgroundColor: color.almostWhite,

  primaryTextColor: color.black,
  modalOverlayBg: "#fafafcbf",
  labelColor: color.darkGrey,
  inputBg: color.white,
  headerFooterGradient: `linear-gradient(to right, ${color.brightBlue} 0%,${color.lightBlue} 25%)`,
};
