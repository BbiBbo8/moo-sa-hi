/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      layout: {
        maxContentWidth: "1200px",
        NavbarWidth: "500px",
      },
      iconSize: {
        sizeSmall: "24px",
      },
      borderWidth: {
        widthThin: "1px",
      },
      borderColor: {
        GrayBtnDefault: "#B3B3B3",
        GrayFocused: "#1A1A1A",
        GrayCommunityBtn: "#999999",
        GrayModalBtn: "#CCCCCC",
        PrimaryDefault: "#F2F2F2",
        PrimaryFocused: "#2889E4",
        RedBtn: "#EA3436",
      },
      opacity: {
        semiTransparent: "0.4",
      },
      transitionDuration: {
        durationFast: "300ms",
      },
      transitionTimingFunction: {
        "move-in": "ease-in",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "20px",
        full: "9999px",
      },
      boxShadow: {
        default: "0 4px 4px rgba(0, 0, 0, 0.25)",
      },
      fontSize: {
        numEng: [
          "14px",
          { lineHeight: "150%", letterSpacing: "-0.04em", fontWeight: "400" },
        ], // Regular
        headlineL: [
          "32px",
          { lineHeight: "135%", letterSpacing: "-0.02em", fontWeight: "600" },
        ], // SemiBold
        headlineM: [
          "24px",
          { lineHeight: "135%", letterSpacing: "-0.02em", fontWeight: "600" },
        ], // SemiBold
        titleL: [
          "20px",
          { lineHeight: "135%", letterSpacing: "-0.02em", fontWeight: "600" },
        ], // SemiBold
        titleM: [
          "16px",
          { lineHeight: "135%", letterSpacing: "-0.02em", fontWeight: "600" },
        ], // SemiBold
        titleS: [
          "14px",
          { lineHeight: "135%", letterSpacing: "-0.02em", fontWeight: "600" },
        ], // SemiBold
        bodyXL: [
          "18px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "500" },
        ], // Medium
        bodyL: [
          "16px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "400" },
        ], // Regular
        bodyM: [
          "14px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "400" },
        ], // Regular
        bodyS: [
          "12px",
          { lineHeight: "150%", letterSpacing: "-0.02em", fontWeight: "400" },
        ], // Regular
        labelL: [
          "16px",
          { lineHeight: "135%", letterSpacing: "0em", fontWeight: "500" },
        ], // Medium
        labelM: [
          "14px",
          { lineHeight: "135%", letterSpacing: "0em", fontWeight: "500" },
        ], // Medium
        labelS: [
          "12px",
          { lineHeight: "135%", letterSpacing: "0em", fontWeight: "500" },
        ], // Medium
        labelXS: [
          "11px",
          { lineHeight: "135%", letterSpacing: "0em", fontWeight: "500" },
        ], // Medium
      },
      fontWeight: {
        // Tailwind CSS 기본 fontWeight 확장은 유지 (필요하다면)
        Regular: "400",
        Medium: "500",
        SemiBold: "600",
      },
      letterSpacing: {
        // Tailwind CSS 기본 letterSpacing 확장은 유지 (필요하다면)
        numEng: "-0.04em",
        headlineL: "-0.02em",
        headlineM: "-0.02em",
        titleL: "-0.02em",
        titleM: "-0.02em",
        titleS: "-0.02em",
        bodyXL: "-0.02em",
        bodyL: "-0.02em",
        bodyM: "-0.02em",
        bodyS: "-0.02em",
        labelL: "0em",
        labelM: "0em",
        labelS: "0em",
        labelXS: "0em",
      },
      colors: {
        white: "#ffffff",
        black: "#000000",
        primary: "#2889E4",
        error: "#EA3436",
        success: "#0671FD",
        gray: {
          10: "#FAFAFA",
          20: "#F7F7F7",
          50: "#F2F2F2",
          80: "#EDEDED",
          100: "#E6E6E6",
          150: "#D9D9D9",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4D4D4D",
          750: "#404040",
          800: "#333333",
          850: "#262626",
          900: "#1A1A1A",
        },
      },
    },
  },
  plugins: [],
};
