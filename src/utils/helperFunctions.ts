import isMatch from 'lodash/isMatch'
import pick from 'lodash/pick'

import { IUserResponse } from '../models/IUserResponse'
import { IEditUserProfileForumParams } from '../models/IUser'

/**
 * @description Функция сравнивает два объекта по ключам
 */
const checkObjectKeysAreEqual = ({ objA, objB, keys }: {
  objA: IUserResponse,
  objB: IEditUserProfileForumParams,
  keys: string[]
}) => !isMatch(pick(objA, keys), pick(objB, keys))

// eslint-disable-next-line
export { checkObjectKeysAreEqual }

