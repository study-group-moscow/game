export function getMouse(element) {
  const mouse = {
    x: 0,
    y: 0,
    s: false,
    left: false,
    pLeft: false
  }

  const myClick = (event) => {
    const rect = element.getBoundingClientRect()

    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
  }
  const myWheel = () => {
    mouse.s = !mouse.s;
  }
  const myMousedown = (event) => {
    if (event.buttons === 1) {
      mouse.left = true;
    }
  }
  const myMouseup = (event) => {
    if (event.buttons !== 1) {
      mouse.left = false;
    }
  }

  element.addEventListener('mousemove', myClick)

  element.addEventListener('wheel', myWheel);
  element.addEventListener('mousedown', myMousedown);
  element.addEventListener('mouseup', myMouseup)

  return { mouse, myClick, myWheel, myMousedown, myMouseup };
}
