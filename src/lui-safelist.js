const patterns = [
  "bg-{colors}",
  "text-{colors}",
  "border-{colors}",
  "disabled:text-{colors}",
  "hover:bg-{colors}",
  "hover:text-{colors}",
  "hover:border-{colors}",
  // "focus-visible:ring-{colors}/40",
];
const colors = ["primary", "secondary", "success", "warning", "danger", "info"];
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const testColors = {};

const extractTokens = (pattern) => pattern.split(/(?={[^}]+})|(?<={[^}]+})/);

// colors.disabled.text-primary-500

// const colors = {
//   bg:{
//     //...
//   },
//   disabled:{
//     bg:{},
//     text
//   }
// }

// const setKey = (param) => param.replace("-", "").split(":")[0];
// const setVal = (param, color, level) => {
//   if (param.includes(":")) {
//     const key = param.replace("-", "").split(":")[1];
//     return { [key]: `${param}${color}-${level}` };
//   }
//   return `${param}${color}-${level}`;
// };

function generateColors(token) {
  // console.log({ token });
  const keys = token[0].replace("-", "").split(":");
  if (token[0].includes(":")) {
    if (testColors[keys[0]] === undefined) {
      testColors[keys[0]] = {};
    }
    if (testColors[keys[0]][keys[1]] === undefined) {
      testColors[keys[0]][keys[1]] = {};
    }
    testColors[keys[0]][keys[1]] = x(token[0]);
  } else {
    testColors[keys[0]] = x(token[0]);
  }
}

const x = (prop) => {
  const o = {};
  colors.forEach((color) => {
    levels.forEach((level) => {
      o[`${color}-${level}`] = `${prop}${color}-${level}`;
    });
  });
  return o;
};

// console.log("TEST-X: ", x("text"));

patterns
  .map((pattern) => extractTokens(pattern)) // [['bg-','']]
  .forEach((token) => generateColors(token));

// console.log("where was my test: ", testColors);
