/*!
 * Coded by CallMeKory - https://github.com/callmekory
 * 'It’s not a bug – it’s an undocumented feature.'
 */
import fs from 'fs'
import moment from 'moment'
import path from 'path'
import shelljs from 'shelljs'

interface ExecAsync {
  code: number
  stdout: string
  stderr: string
}

/**
 * ShellJS exec wrapper in Async
 * @param cmd Command to run
 * @param opts Run options
 */
export const execAsync = async (cmd: string, opts: shelljs.ExecOptions = {}): Promise<ExecAsync> =>
  new Promise((resolve) => {
    shelljs.exec(cmd, opts, (code: number, stdout: string, stderr: string) => resolve({ code, stdout, stderr }))
  })

/**
 * Picks a random item from aray
 * @param array Array to choose a random item from
 */
export const random = (array: any[]) => array[Math.floor(Math.random() * array.length)]

/**
 * Generates a random number between 1 and specified max
 * @param max max random number
 */
export const randomNumber = (max:number) => Math.floor(Math.random() * Math.floor(max));

/**
 * Adds ordinal suffix to number. Ex 17 would become 17th.
 * @param number Number to add suffix to
 */
export const ordinalSuffix = (num: number) => {
  if (num === 0) return 0

  const j = num % 10
  const k = num % 100

  if (j === 1 && k !== 11) return `${num}st`

  if (j === 2 && k !== 12) return `${num}nd`

  if (j === 3 && k !== 13) return `${num}rd`

  return `${num}th`
}

/**
 * Filters an array based on list of keywords
 * @param array Array to filter
 * @param keywords List of keywords for search
 */
export const filterByKeywords = (array: any[], keywords: any[]) =>
  array.filter((item) => {
    let matches = 0

    // Check each keyword against array item
    keywords.forEach((term) => {
      const reg = new RegExp(term, 'gmi')
      if (item.match(reg)) matches++
    })

    // If item matches all keywords return item to list
    if (matches === keywords.length) return item
  })

/**
 * ForEach method made asynchronous
 * @param array Array to iterate over
 * @param callback Callback function for data use
 */
export const asyncForEach = async (array: any[], callback: CallableFunction) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

/**
 * Calulates time in hours between 2 dates
 * @param previousDate previous Date object
 */
export const differenceInHours = (previousDate: Date) => {
  const currentDate = (new Date() as any) as number
  const oldDate = (previousDate as any) as number
  const result = ((Math.abs(oldDate - currentDate) / (60 * 60 * 1000)) as any) as string
  return Number(parseFloat(result).toFixed(2))
}

/**
 * Splits an array into multiple based on max character limit
 */
export const splitArrayToCharLimit = (array: any[], maxCharacters: number) => {
  // Initial page size
  let pageSize = 200
  // Split array into multiple even arrays
  let splitArray = chunkArray(array, pageSize)
  // Dynamically adjust page size based on length of each array
  let willFit = false

  while (!willFit) {
    let sizeInRange = true
    for (const i of splitArray) {
      if (i.join().length > maxCharacters) sizeInRange = false
    }

    if (sizeInRange) willFit = true
    else {
      pageSize--
      splitArray = chunkArray(array, pageSize)
    }
  }
  return splitArray
}

/**
 * Split array into multiple equally sized arrays
 * @param array Array to split
 * @param splitAmount Times to split array
 * @returns
 */
export const chunkArray = (array: any[], splitAmount: number) => {
  let index
  const arrayLength = array.length
  const tempArray: any[] = []
  let splitArrays: any[]

  for (index = 0; index < arrayLength; index += splitAmount) {
    splitArrays = array.slice(index, index + splitAmount)
    tempArray.push(splitArrays)
  }

  return tempArray
}

/**
 * Finds nested files in a directory matching the pattern specified
 * @param dir Path of directory
 * @param extention Extension to find
 */
export const findFilesByType = (dir: string, extention: string) => {
  let results: any[] = []

  fs.readdirSync(dir).forEach((innerDir) => {
    innerDir = path.resolve(dir, innerDir)

    const stat = fs.statSync(innerDir)

    if (stat.isDirectory()) {
      results = results.concat(findFilesByType(innerDir, extention))
    }

    if (stat.isFile() && innerDir.endsWith(extention)) results.push(innerDir)
  })
  return results
}

/**
 * Adds a set ammount of spaces
 * @param count Number of spaces to add
 */
export const addSpace = (count: number) => ' '.repeat(count)

/**
 * Capitalize the first letter of a string
 * @param text Text to capitalize the first letter of
 */
export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()

/**
 * Sorts an array by key
 * @param array Array to sort
 * @param key Key to sort by
 */
export const sortByKey = (array: any[], key: string) => {
  let sortOrder: number = 0

  if (key[0] === '-') {
    sortOrder = -1
    key = key.substr(1)
  }

  if (sortOrder === -1) {
    return array.sort((a, b) => {
      const x = a[key]
      const y = b[key]
      return x < y ? -1 : x > y ? 1 : 0
    })
  }

  return array.sort((a, b) => {
    const x = b[key]
    const y = a[key]
    return x < y ? -1 : x > y ? 1 : 0
  })
}

/**
 * Splits an array based off of a property
 * @param array Array to group
 * @param property Property to group by
 */
export const groupByProperty = (array: any[], property: string | number) => {
  const hash: any[] = []

  array.forEach((_item, index) => {
    if (!hash[array[index][property]]) hash[array[index][property]] = []
    hash[array[index][property]].push(array[index])
  })

  return hash
}

/**
 * Converts bytes into human readable form
 * @param bytes Bytes to convert
 * @param decimals How many decimal places to include
 */
export const bytesToSize = (bytes: number, decimals = 1) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  // Eslint-disable-next-line no-restricted-properties
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

/**
 * Converts milliseconds to HH:MM format
 * @param ms Milliseconds
 */
export const millisecondsToTime = (ms: number) => {
  const duration = moment.duration(ms)
  if (duration.asHours() > 1) {
    return Math.floor(duration.asHours()) + moment.utc(duration.asMilliseconds()).format(':mm:ss')
  }

  return moment.utc(duration.asMilliseconds()).format('mm:ss')
}

/**
 * Async sleep
 * @param ms Milliseconds to sleep
 */
export const sleep = async (ms: number): Promise<any> => new Promise((resolve) => setTimeout(resolve, ms))
