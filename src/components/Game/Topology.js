// абстракция, здесь операции нужные клиентам
import { FIELD_SIZE } from '../../constants/constants';
import { Draw } from './Draw';

export class Topology {
  constructor(param) {
    this.offsetX = param.offsetX
    this.offsetY = param.offsetY
    // ссылка на объект реализации
    this.drawer = new Draw({
      offsetX: this.offsetX,
      offsetY: this.offsetY
    })
    // для того, чтобы не показывать корабли бота
    this.secret = param.secret || false // БОТ

    this.ships = []
    this.checks = []
    this.injuries = []
    this.kills = []
    this.last = {}
    this.score = {}
  }

  // добавление кораблей
  // принимает какое-то кол-во кораблей и добавляет их в массив ships
  addShips(...ships) {
    // проверяем не был ли ранее добавлен данный корабль,
    // если не был, то добавляем в ships
    for (const ship of ships) {
      if (!this.ships.includes(ship)) {
        this.ships.push(ship)
      }
    }
    return this
  }

  // добавление выстрелов
  // принимает какое-то кол-во выстрелов и добавляет их в массив checks
  addChecks(...checks) {
    // проверяем не был ли ранее добавлен данный выстрел,
    // если не был, то добавляем в checks
    for (const check of checks) {
      if (!this.checks.includes(check)) {
        this.checks.push(check)
      }
    }
    return this
  }

  // проверяем не был ли ранее добавлен данный выстрел
  isChecked(point) {
    const flag = this.checks.find((check) => check.x === point.x && check.y === point.y)
    if (flag) {
      return true
    }
    return false
  }

  // добавление последнего хода
  addThelast(last) {
    this.last = last
    return this
  }

  getScore(x, y) {
    this.score = {
      x,
      y,
      count: this.kills.length
    }
  }

  // метод абстракции, делегирует работу связанному методу реализации
  draw(context) {
    this.drawer.drawFields(context)

    // Отрисовка или не отрисовка кораблей
    // БОТ
    if (!this.secret) {
      for (const ship of this.ships) {
        this.drawer.drawShip(context, ship)
      }
    }

    for (const check of this.checks) {
      this.drawer.drawCheck(context, check)
    }

    for (const injury of this.injuries) {
      this.drawer.drawInjury(context, injury)
    }

    for (const ship of this.kills) {
      this.drawer.drawCheckAroundKills(context, ship, this.checks)
    }

    this.drawer.drawLast(context, this.last)

    this.drawer.drawScore(context, this.score)

    return this
  }

  // положение мышки. true, если в области поля морского боя
  // false, если на буквах, цифрах или вне поля
  isPointUnder(point) {
    if (
      point.x < this.offsetX + FIELD_SIZE
            || point.x > this.offsetX + 11 * FIELD_SIZE
            || point.y < this.offsetY + FIELD_SIZE
            || point.y > this.offsetY + 11 * FIELD_SIZE
    ) {
      return false
    }
    return true
  }

  // получить координаты клетки
  getCoordinates(point) {
    // если мышка не над полем, то возвращаем false
    if (!this.isPointUnder(point)) {
      return false
    }

    // иначе - её координаты
    const x = parseInt((point.x - this.offsetX - FIELD_SIZE) / FIELD_SIZE)
    const y = parseInt((point.y - this.offsetY - FIELD_SIZE) / FIELD_SIZE)

    // причем между 0 и 9
    return {
      x: Math.max(0, Math.min(9, x)),
      y: Math.max(0, Math.min(9, y))
    }
  }

  // проверяем можно ли разместить корабль в топологии
  canStay(ship) {
    // проверяем не выходит ли корабль за область поля
    if (ship.direct === 0 && ship.x + ship.size > 10) {
      return false
    }
    if (ship.direct === 1 && ship.y + ship.size > 10) {
      return false
    }

    // пока ничего нет на поле - корабль можно поставить в любое место
    const map = []
    for (let i = 0; i < 10; i++) {
      map[i] = []
      for (let j = 0; j < 10; j++) {
        map[i][j] = true
      }
    }

    // если на поле стоит корабль, то все его клетки и все клетко вокруг него становятся false
    for (const ship of this.ships) {
      if (ship.direct === 0) {
        for (let x = ship.x - 1; x < ship.x + ship.size + 1; x++) {
          for (let y = ship.y - 1; y < ship.y + 2; y++) {
            if (map[y] && map[y][x]) {
              map[y][x] = false
            }
          }
        }
      } else {
        for (let x = ship.x - 1; x < ship.x + 2; x++) {
          for (let y = ship.y - 1; y < ship.y + ship.size + 1; y++) {
            if (map[y] && map[y][x]) {
              map[y][x] = false
            }
          }
        }
      }
    }

    if (ship.direct === 0) {
      for (let i = 0; i < ship.size; i++) {
        if (!map[ship.y][ship.x + i]) {
          return false
        }
      }
    } else {
      for (let i = 0; i < ship.size; i++) {
        if (!map[ship.y + i][ship.x]) {
          return false
        }
      }
    }
    return true
  }

  // расстановка кораблей случайным образом
  randoming() {
    this.ships = []
    for (let size = 4; size > 0; size--) {
      for (let n = 0; n < 5 - size; n++) {
        let flag = false

        while (!flag) {
          const ship = {
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * 10),
            direct: Math.random() > Math.random() ? 0 : 1,
            size
          }

          if (this.canStay(ship)) {
            this.addShips(ship)
            flag = true
          }
        }
      }
    }
    return true
  }

  getShipsMap() {
    // формируем карту кораблей
    const map = []
    for (let i = 0; i < 10; i++) {
      map[i] = []
      for (let j = 0; j < 10; j++) {
        map[i][j] = false
      }
    }

    // ставим true, где стоит корабль
    for (const ship of this.ships) {
      if (ship.direct === 0) {
        for (let { x } = ship; x < ship.x + ship.size; x++) {
          if (map[ship.y] && !map[ship.y][x]) {
            map[ship.y][x] = true
          }
        }
      } else {
        for (let { y } = ship; y < ship.y + ship.size; y++) {
          if (map[y] && !map[y][ship.x]) {
            map[y][ship.x] = true
          }
        }
      }
    }

    return map
  }

  isCheckedInjury(point) {
    return this.injuries.find((injury) => injury.x === point.x && injury.y === point.y);
  }

  update() {
    // надо убрать возможность добавления в массив повторных точек
    this.checks = this.checks
    // каждый объект checks превращаем в строку
      .map((check) => JSON.stringify(check))
    // фильтруем все повторяющиеся элементы(элем, инд, лист)
    // если послед индекс элемента вернёт несовпад с инд элемент - удаляем
      .filter((e, i, l) => l.lastIndexOf(e) === i)
    // переводим обратно в объект
      .map((check) => JSON.parse(check))

    // добавляем возможность ранения

    // карта кораблей
    const map = this.getShipsMap()

    // проверяем, является ли точка, которую ранили - положением корабля
    for (const check of this.checks) {
      if (map[check.y][check.x]) {
        if (!this.isCheckedInjury(check)) {
          this.injuries.push(check)
        }

        const index = this.checks.indexOf(check)
        this.checks.splice(index, 1)
      }
    }
  }

  // возвращаем true, если в ячейке стоит корабль
  isShipUnderPoint(point) {
    // карта кораблей
    const map = this.getShipsMap()

    return map[point.y][point.x]
  }

  // проверяем был ли выстрел по клетке
  getUnknownFields() {
    const unknownFields = []

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        // неизвестная клетка
        let flag = true
        // проходим по всем клеткам c выстрелами
        for (const check of this.checks) {
          if (check.x === x && check.y === y) {
            flag = false
            break
          }
        }

        // если флаг не опущен, проходим по всем раненым клеткам
        if (flag) {
          for (const injury of this.injuries) {
            if (injury.x === x && injury.y === y) {
              flag = false
              break
            }
          }
        }

        // если фаг до сих пор не опущен, то добавляем эту клетку в неиследованные
        if (flag) {
          unknownFields.push({ x, y })
        }
      }
    }
    return unknownFields
  }

  addKills() {
    for (const ship of this.ships) {
      if (ship.direct === 0) {
        const flag = ship.size
        let i = 0
        for (let { x } = ship; x < ship.x + ship.size; x++) {
          for (const injury of this.injuries) {
            if (injury.x === x && injury.y === ship.y) {
              i++
            }
          }
        }
        if (flag === i) {
          if (!this.kills.includes(ship)) {
            this.kills.push(ship)
          }
        }
      } else {
        const flag = ship.size
        let i = 0
        for (let { y } = ship; y < ship.y + ship.size; y++) {
          for (const injury of this.injuries) {
            if (injury.y === y && injury.x === ship.x) {
              i++
            }
          }
        }
        if (flag === i) {
          if (!this.kills.includes(ship)) {
            this.kills.push(ship)
          }
        }
      }
    }
  }

  // проверяет убиты ли все корабли
  isEnd() {
    // карта кораблей
    const map = this.getShipsMap()

    // делаем false все клетки с ранениями
    for (const injury of this.injuries) {
      map[injury.y][injury.x] = false
    }

    // ищем хоть один true
    for (const status of map.flat()) {
      if (status) {
        return false
      }
    }

    return true
  }
}
