/*!
 * Coded by CallMeKory - https://github.com/callmekory
 * 'It’s not a bug – it’s an undocumented feature.'
 */

import { addSpace } from '../index'

describe('Add space function', () => {
  test('Should add x number of spaces', () => {
    const input = 5

    const output = '     '

    expect(addSpace(input)).toEqual(output)
  })
})
