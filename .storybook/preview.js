import "../src/index.css"
import 'remixicon/fonts/remixicon.css'
import colors from "tailwindcss/colors";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'white',
        value: '#FFFFFF',
      },
      {
        name: 'black',
        value: '#000000'
      },
      {
        name: 'dark',
        value: colors.gray[800],
      },
      {
        name: 'light',
        value: colors.gray[100],
      },
      {
        name: 'warning',
        value: colors.yellow[500],
      },
      {
        name: 'danger',
        value: colors.red[500],
      },
      {
        name: 'primary',
        value: colors.blue[500],
      },
      {
        name: 'success',
        value: colors.green[500],
      },
      {
        name: 'info',
        value: colors.cyan[500],
      },
      {
        name: 'secondary',
        value: colors.gray[500],
      },
    ],
  },
  // controls: {
  //   matchers: {
  //     color: /(background|color)$/i,
  //     date: /Date$/,
  //   },
  // },
};
export const argTypes = {
  variant: { control: "select", options: ["solid", "outline", "text", "link"] },
  color: {
    control: "select",
    options: ["primary", "secondary", "success", "danger", "warning", "info"],
  },
  filter: {
    control: "select",
    options: ["lighten", "darken", "none",],
  },
  block: {
    control: "boolean",
  },
  rounded: {
    control: "select",
    options: [true, false,"full"],
  },
};
