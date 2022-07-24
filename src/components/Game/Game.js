import { Topology } from './Topology';
import {
  Context,
  StrategyCompletion,
  StrategyPlayBot,
  StrategyPlayPlayer,
  StrategyPreparation
} from './Strategy';
import { clearCanvas, drawGrid } from './utils';
import { getMouse } from './mouse';

export class Game {
  constructor({ ctx, canvas }) {
    this.stage = 'preparation' // стадия подготовки
    this.playerOrder = true // чей ход
    this.ctx = ctx;
    this.canvas = canvas;
    this.mouse = getMouse(canvas);

    // создание игрока
    this.player = new Topology({
      offsetX: 60,
      offsetY: 85
    });

    // создание бота
    this.computer = new Topology({
      offsetX: 590,
      offsetY: 85,
      secret: true
    });

    this.context = new Context();
    this.computer.randoming();

    // регистрирует вызов функции перед обновлением экрана
    requestAnimationFrame((x) => this.tick(x));
  }

  // вводит сколько существует страница в мс
  tick(timestamp) {
    requestAnimationFrame((x) => this.tick(x));
    // 60 раз в секунду обновлять canvas и заново рисовать drawGrid
    clearCanvas(this.canvas);
    drawGrid(this.ctx, this.canvas);

    // отрисовка поля, кораблей и выстрелов игрока и бота
    this.player.draw(this.ctx);
    this.computer.draw(this.ctx);

    // если идет стадия подготовки, то вызывается функция расстановки кораблей
    if (this.stage === 'preparation') {
      const strategyPreparation = new StrategyPreparation({
        player: this.player,
        computer: this.computer,
        stage: 'preparation',
        ctx: this.ctx,
        mouse: this.mouse
      });
      this.context.setStrategy(strategyPreparation);
      this.tickPreparation();
    } else if (this.stage === 'play') {
      // если идет стадия игры, то выхывается функция игры
      const strategyPlayPlayer = new StrategyPlayPlayer({
        playerOrder: this.playerOrder,
        stage: 'play',
        topology: this.computer,
        mouse: this.mouse
      });
      const strategyPlayBot = new StrategyPlayBot({
        playerOrder: this.playerOrder,
        stage: 'play',
        topology: this.player,
        mouse: this.mouse
      });

      // Логика игрока
      if (this.playerOrder) {
        this.context.setStrategy(strategyPlayPlayer);
        this.tickPlayPlayer(timestamp);
      } else {
        // Логика бота
        this.context.setStrategy(strategyPlayBot);
        this.tickPlayBot(timestamp);
      }

      if (this.computer.isEnd()) {
        this.stage = 'completionWin'
        const strategyCompletion = new StrategyCompletion({
          stage: 'completionWin'
        });
        this.context.setStrategy(strategyCompletion);
        this.context.executeStrategy();
      } else if (this.player.isEnd()) {
        this.stage = 'completionLose';
        const strategyCompletion = new StrategyCompletion({
          stage: 'completionLose'
        });
        this.context.setStrategy(strategyCompletion);
        this.context.executeStrategy();
      }
    }

    // для отслеживания нажатия клавиши
    this.mouse.pleft = this.mouse.left;
  }

  // стадия расстановки кораблей
  tickPreparation() {
    this.context.executeStrategy({ player: this.player, computer: this.computer, game: this });
    this.player = this.context.strategy.player;
    this.computer = this.context.strategy.computer;
    this.stage = this.context.strategy.stage;
  }

  // стадия игры
  tickPlayPlayer(timestamp) {
    this.context.executeStrategy({
      playerOrder: this.playerOrder,
      topology: this.computer,
      game: this
    });
    this.computer = this.context.strategy.topology;
    this.playerOrder = this.context.strategy.playerOrder;
    this.stage = this.context.strategy.stage;
  }

  // стадия игры
  tickPlayBot(timestamp) {
    this.context.executeStrategy({
      playerOrder: this.playerOrder,
      topology: this.player,
      game: this
    });
    this.player = this.context.strategy.topology;
    this.playerOrder = this.context.strategy.playerOrder;
    this.stage = this.context.strategy.stage;
  }
}
