// реализация - отрисовка поля игрока, кораблей,
// точек, ранений и последнего хода
import { FIELD_SIZE } from '../../constants/constants';

export class Draw {
  constructor(param) {
    this.offsetX = param.offsetX
    this.offsetY = param.offsetY
  }

  // рисование клеток морского боя
  drawFields(context) {
    context.strokeStyle = 'blue'
    context.lineWidth = 1.7

    // вертикальные линии
    for (let i = 1; i <= 11; i++) {
      context.beginPath();

      // начальная точка для рисования
      context.moveTo(
        this.offsetX + i * FIELD_SIZE,
        this.offsetY + FIELD_SIZE
      );
      // конечная точка для рисования
      context.lineTo(
        this.offsetX + i * FIELD_SIZE,
        this.offsetY + 11 * FIELD_SIZE
      );
      context.stroke();
    }

    // горизонтальные линии
    for (let i = 1; i <= 11; i++) {
      context.beginPath();

      // начальная точка для рисования
      context.moveTo(
        this.offsetX + FIELD_SIZE,
        this.offsetY + i * FIELD_SIZE
      );
      // конечная точка для рисования
      context.lineTo(
        this.offsetX + 11 * FIELD_SIZE,
        this.offsetY + i * FIELD_SIZE
      );
      context.stroke()
    }

    context.textAlign = 'center';
    context.font = '20px comics sans';
    context.fillStyle = 'black';

    // буквы
    const alphabet = 'АБВГДЕЖЗИК';
    for (let i = 0; i < 10; i++) {
      const letter = alphabet[i]
      context.fillText(
        letter,
        this.offsetX + i * FIELD_SIZE + FIELD_SIZE * 1.5,
        this.offsetY + FIELD_SIZE * 0.8
      )
    }

    // цифры
    for (let i = 1; i <= 10; i++) {
      context.fillText(
        i,
        this.offsetX + FIELD_SIZE * 0.5,
        this.offsetY + i * FIELD_SIZE + FIELD_SIZE * 0.8 - 2
      )
    }
    return this
  }

  // рисование корабля
  drawSheep(context, sheep) {
    context.fillStyle = 'rgba(0, 0, 0, 0.75)'

    context.beginPath()
    context.rect(
      this.offsetX + sheep.x * FIELD_SIZE + FIELD_SIZE + 2,
      this.offsetY + sheep.y * FIELD_SIZE + FIELD_SIZE + 2,
      (sheep.direct === 0 ? sheep.size : 1) * FIELD_SIZE - 4,
      (sheep.direct === 1 ? sheep.size : 1) * FIELD_SIZE - 4
    )
    context.fill()

    return this
  }

  // рисование точки (выстрела)a
  drawCheck(context, check) {
    context.fillStyle = 'black'

    context.beginPath()
    context.arc(
      this.offsetX + check.x * FIELD_SIZE + FIELD_SIZE * 1.5, // координата центра по x
      this.offsetY + check.y * FIELD_SIZE + FIELD_SIZE * 1.5, // координата центра по y
      3, // радиус
      0,
      Math.PI * 2
    )
    context.fill() // заливка

    return this
  }

  addChecks(point, checks) {
    // проверяем не был ли ранее добавлен данный выстрел,
    // если не был, то добавляем в checks
    if (!checks.includes(point)) {
      checks.push(point)
    }
    return checks
  }

  // проверяем не был ли ранее добавлен данный выстрел
  isChecked(point, checks) {
    const flag = checks.find((check) => check.x === point.x && check.y === point.y)
    if (flag) {
      return true
    }
    return false
  }

  drawCircle(pointX, pointY, checks) {
    if (pointX > -1 && pointX < 10 && pointY > -1 && pointY < 10) {
      const point = {
        x: pointX,
        y: pointY
      }
      if (!this.isChecked(point, checks)) {
        this.addChecks(point, checks)
        console.log(checks)
      }
    }
  }

  drawCheckAroundKills(context, sheep, checks) {
    if (sheep.direct === 0) {
      this.drawCircle(sheep.x - 1, sheep.y, checks)

      let i = -1
      for (let { x } = sheep; x <= sheep.x + sheep.size + 1; x++) {
        this.drawCircle(sheep.x + i, sheep.y - 1, checks)
        this.drawCircle(sheep.x + i, sheep.y + 1, checks)

        i++
      }
      this.drawCircle(sheep.x + sheep.size, sheep.y, checks)
    } else {
      this.drawCircle(sheep.x, sheep.y - 1, checks)

      let i = -1
      for (let { y } = sheep; y <= sheep.y + sheep.size + 1; y++) {
        this.drawCircle(sheep.x - 1, sheep.y + i, checks)
        this.drawCircle(sheep.x + 1, sheep.y + i, checks)

        i++
      }
      this.drawCircle(sheep.x, sheep.y + sheep.size, checks)
    }
  }

  // отрисовка ранений
  drawInjury(context, injury) {
    context.strokeStyle = 'red'
    context.lineWidth = 1.5

    // первая линия
    context.beginPath()
    context.moveTo(
      this.offsetX + injury.x * FIELD_SIZE + FIELD_SIZE + 1.5, // координата центра по x
      this.offsetY + injury.y * FIELD_SIZE + FIELD_SIZE + 1.5 // координата центра по y
    )
    context.lineTo(
      this.offsetX + injury.x * FIELD_SIZE + FIELD_SIZE * 2 - 1.5, // координата центра по x
      this.offsetY + injury.y * FIELD_SIZE + FIELD_SIZE * 2 - 1.5 // координата центра по y
    )
    context.stroke()

    // вторая линия
    context.beginPath()
    context.moveTo(
      this.offsetX + injury.x * FIELD_SIZE + FIELD_SIZE * 2 - 1.5, // координата центра по x
      this.offsetY + injury.y * FIELD_SIZE + FIELD_SIZE + 1.5 // координата центра по y
    )
    context.lineTo(
      this.offsetX + injury.x * FIELD_SIZE + FIELD_SIZE + 1.5, // координата центра по x
      this.offsetY + injury.y * FIELD_SIZE + FIELD_SIZE * 2 - 1.5 // координата центра по y
    )
    context.stroke()

    return this
  }

  // рисование последнего хода
  drawLast(context, last) {
    context.strokeStyle = 'green'
    context.lineWidth = 2.5

    // первая линия (лево)
    context.beginPath()
    context.moveTo(
      this.offsetX + last.x * FIELD_SIZE + FIELD_SIZE + 2, // координата центра по x
      this.offsetY + last.y * FIELD_SIZE + FIELD_SIZE + 1 // координата центра по y
    )
    context.lineTo(
      this.offsetX + last.x * FIELD_SIZE + FIELD_SIZE + 2, // координата центра по x
      this.offsetY + last.y * FIELD_SIZE + FIELD_SIZE * 2 - 1 // координата центра по y
    )
    context.stroke()

    // вторая линия (право)
    context.beginPath()
    context.moveTo(
      this.offsetX + last.x * FIELD_SIZE + FIELD_SIZE * 2 - 2, // координата центра по x
      this.offsetY + last.y * FIELD_SIZE + FIELD_SIZE + 1 // координата центра по y
    )
    context.lineTo(
      this.offsetX + last.x * FIELD_SIZE + FIELD_SIZE * 2 - 2, // координата центра по x
      this.offsetY + last.y * FIELD_SIZE + FIELD_SIZE * 2 - 1 // координата центра по y
    )
    context.stroke()

    // третья линия (верх)
    context.beginPath()
    context.moveTo(
      this.offsetX + last.x * FIELD_SIZE + FIELD_SIZE * 2 - 2, // координата центра по x
      this.offsetY + last.y * FIELD_SIZE + FIELD_SIZE + 2 // координата центра по y
    )
    context.lineTo(
      this.offsetX + last.x * FIELD_SIZE + FIELD_SIZE + 2, // координата центра по x
      this.offsetY + last.y * FIELD_SIZE + FIELD_SIZE + 2 // координата центра по y
    )
    context.stroke()

    // четвёртая линия (низ)
    context.beginPath()
    context.moveTo(
      this.offsetX + last.x * FIELD_SIZE + FIELD_SIZE + 2, // координата центра по x
      this.offsetY + last.y * FIELD_SIZE + FIELD_SIZE * 2 - 2 // координата центра по y
    )
    context.lineTo(
      this.offsetX + last.x * FIELD_SIZE + FIELD_SIZE * 2 - 2, // координата центра по x
      this.offsetY + last.y * FIELD_SIZE + FIELD_SIZE * 2 - 2 // координата центра по y
    )
    context.stroke()

    return this
  }

  drawScore(context, score) {
    context.textAlign = 'center'
    context.font = '35px comics sans'
    context.fillStyle = 'black';

    context.fillText(':', 500, 250)

    context.fillText(score.count, score.x, score.y)
  }
}

