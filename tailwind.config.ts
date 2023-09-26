/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      xxs: "300px",
      xs: "475px",
      sm: "640px",
      md: "768px",
      850: "850px",
      lg: "1024px",
      xl: "1160px",
    },
    fontFamily: {
      sans: ["Poppins", "Graphik", "sans-serif"],
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      margin: {
        "60px": "3.75rem",
      },
      padding: {
        30: "1.875rem",
        "60px": "3.75rem",
      },
      width: {
        180: "11.25rem",
        150: "9.375rem",
      },
      height: {
        180: "11.25rem",
        150: "9.375rem",
      },
      maxWidth: {
        maxSize: "1160px",
        670: "41.875rem",
        180: "11.25rem",
        150: "9.375rem",
      },
      colors: {
        primary: "#4A13E7",
        "bright-primary": "#9B19E6",
        secondary: "#18d9c5",
        dark: "#1E1E1E",
        gray: "#616161",
        "dark-gray": "#61616199",
        "slate-gray": "#707070",
        lightGray: "#c4c4c4",
        "medium-gray": "#acacac",
        "medium-light-gray": "#afafaf",
        "extra-light-gray": "#F9F9F9",
        "smoke-white": "#F5F5F5",
        "border-light-gray": "#D1D1D1",
        "black-transparent": "#0000001A",
        red: "#cb2c2c",
        "middle-green": "#55A46C",
        borderColor: "#BFBFBF",
        lightBlue: "#EBF3FF",
        selectBackground: "#F8FBFF",
        buttonHover: "#9B19E6",
        shadowColor: "#00000029",
        helpShadowColor: "#00000014",

        statusColor: "#AF2626",
      },
      boxShadow: (theme: any) => ({
        loginCard: `0px 0px 32px 0px rgba(0, 0, 0, 0.08)`,
        emailPopup: `0px 0px 32px 0px rgba(0, 0, 0, 0.08)`,
        shadowCard: `0px 6px 10px ${theme("colors.shadowColor")}`,
        languagesDropDown: `0px 0px 26px ${theme("colors.shadowColor")}`,
        blogsShadow: `0px 0px 16px ${theme("colors.shadowColor")}`,
        partnersSliderShadow: `0px 3px 20px ${theme(
          "colors.black-transparent"
        )}`,
        helpCenterShadow: `0px 0px 8px ${theme("colors.helpShadowColor")}`,
        notificationsDropdownShadow: `0px 0px 30px ${theme(
          "colors.shadowColor"
        )}`,
      }),
      backgroundImage: {
        "our-partner-background": "url('/assets/our-partners-bg.png')",
        "login-background": "url('/src/assets/login-bg.png')",
        "gradient-pricingCards":
          "linear-gradient(180deg, #4A13E7 12.45%, #7B18FF 63.46%)",
      },
      // background: {
      //   gradient: "linear-gradient(270deg, #4A13E7 -1.29%, #7B18FF 98.61%)",
      // },
      stroke: ["group-hover"],
      textColor: ["group-hover"],
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
