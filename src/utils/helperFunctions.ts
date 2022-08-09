import isMatch from 'lodash/isMatch'
import pick from 'lodash/pick'

/**
 * @description Функция сравнивает два объекта по ключам
 * @param {Record<string, any>} objA - объект.
 * @param {Record<string, any>} objB - объекта.
 * @param {string[]} keys - массив с ключами по которому сравниваем объект.
 * @returns {boolean} результат сравнения объектов
 */
const checkObjectKeysAreEqual = ({ objA, objB, keys }: {
  objA: Record<string, any>,
  objB: Record<string, any>,
  keys: string[]
}) => !isMatch(pick(objA, keys), pick(objB, keys))

export { checkObjectKeysAreEqual }

