export function getMouse(element) {
  const mouse = {
    x: 0,
    y: 0,
    s: false,
    left: false,
    pLeft: false
  }

  element.addEventListener('mousemove', (event) => {
    const rect = element.getBoundingClientRect()

    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
  })

  element.addEventListener('wheel', () => {
    mouse.s = !mouse.s
  });
  element.addEventListener('mousedown', (event) => {
    if (event.buttons === 1) {
      mouse.left = true;
    }
  });
  element.addEventListener('mouseup', (event) => {
    if (event.buttons !== 1) {
      mouse.left = false;
    }
  })

  return mouse
}
