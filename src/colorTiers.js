// Define the color values for each option
const colorOptions = {
  Common: "ivory",
  Honoured: '#ead5c2',
  Exalted: '#7ed321',
  Majestic: '#48baff',
  Supreme: '#b86cf8',
  Heroic: '#D0021B',
  Legendary: '#F5A623',
  Mythic: '#FC88FC',
};

// Function to change the text color based on the input value
function changeTextColor(value) {

  if (value in colorOptions) {
    return colorOptions[value];
  } else {
    return'ivory';
  }
}

export default changeTextColor;