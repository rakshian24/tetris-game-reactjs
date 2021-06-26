export const SHAPES = {
  HORIZONTAL_LINE: "HORIZONTAL_LINE",
  VERTICAL_LINE: "VERTICAL_LINE",
}

export const getRandomElementFromArr = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const getRandomShape = () => {
  const shapes = [...Object.values(SHAPES)]
  return shapes[Math.floor(Math.random() * shapes.length)]
}
