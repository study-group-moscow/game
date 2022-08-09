import isMatch from 'lodash/isMatch'
import pick from 'lodash/pick'

/**
 * @description Функция сравнивает два объекта по ключам
 */
const checkObjectKeysAreEqual = ({ objA, objB, keys }: {
  objA: Record<string, any>,
  objB: Record<string, any>,
  keys: string[]
}) => !isMatch(pick(objA, keys), pick(objB, keys))

export { checkObjectKeysAreEqual }

