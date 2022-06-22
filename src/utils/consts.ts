export enum RouterLinks {
  HOME = '/',
  ABOUT = '/about',
  LOGIN = '/login',
  REGISTRATION = '/registration',
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

export enum RouterLinksName {
  NOT_REGISTRATION = 'Не зарегистрированы ?',
  EXIT = 'Выйти',
  GAME = 'Игра',
  PROFILE = 'Мой аккаунт',
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
  }
};

export const MESSAGES_TEXT = {
  ERROR_OCCURRED: 'О нет, произошла ошибка!'
}

export const TYPES_ALERT = {
  ERROR: 'error',
  SUCCESS: ' success'
}

export const MENU_ITEMS = [
  {
    title: 'Игра',
    icon: 'SportsEsports',
    addr: '/game'
  },
  {
    title: 'Рейтинг',
    icon: 'Leaderboard',
    addr: '/leaderboard'
  },
  {
    title: 'Форум',
    icon: 'Forum',
    addr: '/forum'
  },
  {
    title: 'Выход',
    icon: 'Logout',
    addr: '/login'
  }
]
