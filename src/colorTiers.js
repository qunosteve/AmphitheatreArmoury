const colorOptions = {
  "Common": "ivory",
  "Honoured": '#ead5c2',
  "Exalted": '#7ed321',
  "Majestic": '#48baff',
  "Supreme": '#b86cf8',
  "Heroic": '#D0021B',
  "Legendary": '#F5A623',
  "Mythical": '#FC88FC',
};

function changeTextColor(value) {
  switch(value) {
    case "Honoured":
      return colorOptions.Honoured;
    case "Exalted":
      return colorOptions.Exalted;
    case "Majestic":
      return colorOptions.Majestic;
    case "Supreme":
      return colorOptions.Supreme;
    case "Heroic":
      return colorOptions.Heroic;
    case "Legendary":
      return colorOptions.Legendary;
    case "Mythical":
      return colorOptions.Mythical;
    default:
      return colorOptions.Common;
  }
}

export default changeTextColor;