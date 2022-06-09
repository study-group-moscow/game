export enum RouterLinks {
  HOME = '/',
  ABOUT = '/about',
  LOGIN = '/login',
  REGISTRATION = '/registration'
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
  displayName = 'Отображаемое имя'
}

export const ENDPOINTS = {
  HTTP: 'https://ya-praktikum.tech/api/v2/',
  WSS: 'wss://ya-praktikum.tech/ws',

  AUTH: {
    PATH: '/auth',
    USER: '/user',
    SIGNIN: '/signin',
    SIGNUP: '/signup',
    LOGOUT: '//logout'
  }
};
