// Define the color values for each option
const colorOptions = {
    honoured: '#ead5c2',
    exalted: '#7ed321',
    majestic: '#48baff',
    supreme: '#b86cf8',
    heroic: '#d40000',
    legendary: '#f58223',
    mythic: '#ff00ff',
    none: 'ivory'
  };
    
  // Function to change the text color based on the input value
  function changeTextColor(value) {
    if (value in colorOptions) {
      return colorOptions[value];
    } else {
      return 'ivory'; // default color
    }
  }
  