export enum RouterLinks {
  HOME = '/',
  ABOUT = '/about',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  LEADERBOARD = '/leaderboard',
  FORUM = '/forum',
  PROFILE = '/profile',
  GAME = '/game',
  ERROR = '/error',
  NOT_FOUND = '*'
}

export enum InputName {
  login = 'login',
  password = 'password',
  displayName = 'display_name',
  firstName = 'first_name',
  secondName = 'second_name',
  email = 'email',
  phone = 'phone'
}
export enum InputType {
  text = 'text',
  password = 'password',
  email = 'email',
  phone = 'phone'
}

export enum RouterLinksName {
  NOT_REGISTRATION = 'Не зарегистрированы ?',
  EXIT = 'Выход',
  GAME = 'Игра',
  PROFILE = 'Мой аккаунт',
  LEADERBOARD = 'Рейтинг',
  FORUM = 'Форум',
  ALREADY_REGISTRATION = 'Уже зарегистрированы ?'
}

export enum InputLabel {
  login = 'Логин',
  password = 'Пароль',
  firstName = 'Имя',
  secondName = 'Фамилия',
  email = 'Почта',
  phone = 'Телефон',
  file = 'Файл',
  displayName = 'Отображаемое имя',
  showPassword = 'Показать пароль'
}

export const ENDPOINTS = {
  HTTP: 'https://ya-praktikum.tech/api/v2',
  WSS: 'wss://ya-praktikum.tech/ws',

  AUTH: {
    PATH: '/auth',
    USER: '/user',
    SIGNIN: '/signin',
    SIGNUP: '/signup',
    LOGOUT: '/logout'
  },

  LEADERBOARD: {
    PATH: '/leaderboard',
    TEAM: '/moscow',
    ALL: '/all'
  }
};

export const MESSAGES_TEXT = {
  ERROR_OCCURRED: 'О нет, произошла ошибка!'
}

export const TYPES_ALERT = {
  ERROR: 'error',
  SUCCESS: ' success'
}

export const MENU_ITEMS = {
  profile: {
    title: RouterLinksName.PROFILE,
    icon: '',
    link: RouterLinks.PROFILE
  },
  list: [
    {
      title: RouterLinksName.GAME,
      icon: 'SportsEsports',
      link: RouterLinks.GAME
    },
    {
      title: RouterLinksName.LEADERBOARD,
      icon: 'Leaderboard',
      link: RouterLinks.LEADERBOARD
    },
    {
      title: RouterLinksName.FORUM,
      icon: 'Forum',
      link: RouterLinks.FORUM
    },
    {
      title: RouterLinksName.EXIT,
      icon: 'Logout',
      link: RouterLinks.LOGIN
    }
  ]
}

export const CELL_SIZE = 23 // размер тетрадной клетки в px
export const FIELD_SIZE = 30 // размер клетки морского боя
