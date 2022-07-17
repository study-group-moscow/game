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
  RESOURCES: 'https://ya-praktikum.tech/api/v2/resources',
  WSS: 'wss://ya-praktikum.tech/ws',
  OAUTH: `https://oauth.yandex.ru/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}`,

  AUTH: {
    PATH: '/auth',
    USER: '/user',
    SIGNIN: '/signin',
    SIGNUP: '/signup',
    LOGOUT: '/logout'
  },

  USER: {
    PATH: '/user',
    PROFILE: '/profile',
    AVATAR: '/avatar'
  },

  LEADERBOARD: {
    PATH: '/leaderboard',
    TEAM: '/moscow',
    ALL: '/all'
  }
};

export const MESSAGES_TEXT = {
  ERROR_OCCURRED: 'Произошла ошибка!',
  SUCCESS: 'Выполнено!'
}

export const TYPES_ALERT = {
  ERROR: 'error',
  SUCCESS: 'success'
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
