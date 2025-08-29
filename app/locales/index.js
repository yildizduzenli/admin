import tr from "./tr";

export const t = (val, params) => {
  let value = val;
  const locale = "tr";
  const localeData = locale === "tr" ? tr : tr;
  let getValue = localeData[value];

  const checkValue = () => {
    if (value.includes(".")) {
      const splitValue = value.split(".");
      for (let a = 0; a < splitValue.length; a++) {
        if (a === 0) {
          getValue = localeData[splitValue[0]];
        } else {
          getValue = getValue && getValue[splitValue[a]];
        }
      }
    }

    if (params) {
      const paramKeys = Object.keys(params);
      for (let i = 0; i < paramKeys.length; i++) {
        const key = paramKeys[i];
        getValue = getValue.replace(`{{${key}}}`, params[key]);
      }
    }
  };

  checkValue();

  if (!getValue) {
    const getLastTwoCharacter = value.slice(-2);
    if (getLastTwoCharacter === "Tr") {
      value = val.substring(0, value.length - 2);
      checkValue();
      return `${getValue} - İngilizce`;
    }
  }

  return getValue;
};
