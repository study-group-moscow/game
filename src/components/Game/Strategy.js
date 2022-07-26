// Типо интерфейс
import { drawRules, getRandomItem } from './utils';

class Strategy {
  constructor() {
    this.stage = 'completion';
  }

  execute(param) { }
}

// Конкретная стратегия (1)
export class StrategyPreparation extends Strategy {
  constructor(param) {
    super();
    this.player = param.player;
    this.computer = param.computer;
    this.stage = param.stage;
    this.ctx = param.ctx;
    this.mouse = param.mouse;
  }

  execute(param) {
    this.player = param.player;
    this.computer = param.computer;
    this.game = param.game;

    // Правила
    drawRules(this.ctx);

    // Счёт
    this.computer.getScore(520, 250);
    this.player.getScore(480, 250);

    // Кнопка
    const a = document.getElementById('Button');
    function func(event) {
      param.game.stage = 'play';
    }

    a?.addEventListener('mousedown', () => {
      param.player.randoming();
      func();
    });

    // если мышь не над полем - выход
    if (!this.player.isPointUnder(this.mouse)) {
      return;
    }

    // массив размеров кораблей
    const shipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    // текущий размер корабля
    const shipSize = shipSizes[this.player.ships.length];
    // получаем координаты клетки
    const coordinats = this.player.getCoordinates(this.mouse);

    const ship = {
      x: coordinats.x,
      y: coordinats.y,
      direct: this.mouse.s ? 0 : 1,
      size: shipSize
    }

    // если корабль вылезает за поле выход
    if (!this.player.canStay(ship)) {
      return;
    }

    this.player.drawer.drawShip(this.ctx, ship);

    // добавление корабля, если в текущей итерации прожата левая кнопка мыши
    if (this.mouse.left && !this.mouse.pleft) {
      this.player.addShips(ship);

      // проверяем, что выставили все корабли
      if (this.player.ships.length === 10) {
        this.stage = 'play';
      }
    }
  }
}

// Конкретная стратегия (2)
export class StrategyPlay extends Strategy {
  constructor(param) {
    super();
    this.playerOrder = param.playerOrder;
    this.stage = param.stage;
    this.topology = param.topology;
    this.mouse = param.mouse;
  }

  execute(param) {
    this.opening(param);
    this.addPoint(this.getPoint());
  }

  opening(param) {
    this.playerOrder = param.playerOrder;
    this.topology = param.topology;

    const a = document.getElementById('Button');
    a.style.visibility = 'hidden';
  }

  getPoint() {
    // получам координаты клетки
    return this.topology.getCoordinates(this.mouse);
  }

  addPoint(point) {}
}

export class StrategyPlayPlayer extends StrategyPlay {
  constructor(param) {
    super(param);
    this.playerOrder = param.playerOrder;
    this.stage = param.stage;
    this.topology = param.topology;
    this.mouse = param.mouse;
  }

  addPoint() {
    // если мышь над полем бота
    if (!this.topology.isPointUnder(this.mouse)) {
      return;
    }
    // получам координаты клетки
    const point = this.topology.getCoordinates(this.mouse);

    // добавить выстрел, если нажали левую кнопку мыши
    if (this.mouse.left && !this.mouse.pleft) {
      // нельзя стрелять в одну и ту же клетку
      if (!this.topology.isChecked(point)) {
        this.topology.addChecks(point);
        // добавляем последний ход
        this.topology.addThelast(point);
        // логика добавления точки
        this.topology.update();
        this.topology.addKills();
        this.topology.getScore(520, 250);

        // проверяем был ли выстрел в корабль или нет
        if (!this.topology.isShipUnderPoint(point)) {
          // передаём ход
          this.playerOrder = false;
        }
      }
    }
  }
}

export class StrategyPlayBot extends StrategyPlay {
  constructor(param) {
    super(param);
    this.playerOrder = param.playerOrder;
    this.stage = param.stage;
    this.topology = param.topology;
  }

  getPoint() {
    // получаем рандомную точку среди доступным непроверенных
    return getRandomItem(this.topology.getUnknownFields());
  }

  addPoint(point) {
    this.topology.addChecks(point);
    // добавляем последний ход
    this.topology.addThelast(point);

    // логика добавления точки
    this.topology.update();
    this.topology.addKills();
    this.topology.getScore(480, 250);

    // проверяем был ли выстрел в корабль или нет
    if (!this.topology.isShipUnderPoint(point)) {
      // передаём ход
      this.playerOrder = true;
    }
  }
}

// Конкретная стратегия (3)
export class StrategyCompletion extends Strategy {
  constructor(params) {
    super();
    this.stage = params.stage;
  }

  execute(param) {
    if (this.stage === 'completionWin') {
      const div = document.getElementById('Winner');
      div.style.visibility = 'visible';
      setTimeout("alert('Вы выиграли! Начать заново?')", 500);
      setTimeout('window.location.reload()', 1000);
    } else if (this.stage === 'completionLose') {
      const div = document.getElementById('Loser');
      div.style.visibility = 'visible';
      setTimeout("alert('Вы проиграли! Начать заново?')", 500);
      setTimeout('window.location.reload()', 1000);
    }
  }
}

// Контекст всегда работает со стратегиями через общий
// интерфейс. Он не знает, какая именно стратегия ему подана.
export class Context {
  constructor() {
    this.strategy = new Strategy();
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  executeStrategy(param) {
    this.strategy.execute(param);
  }
}
