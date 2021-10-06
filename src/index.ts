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
 * Generates a random number between 1 and specified max
 * @param min OPTIONAL: lowest possible number, defaults to 0
 * @param max highest possible number
 */
export const randomNumber = (min?:number, max: number) => {
  !min ? min = 0 : null
  return Math.floor(Math.random() * (max - min + 1) + min)
}

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
 * Generate a random ID.
 */
export const randomId = () => Math.random().toString(36).substr(2, 6)

/**
 * Async sleep
 * @param ms Milliseconds to sleep
 */
export const sleep = async (ms: number): Promise<any> => new Promise((resolve) => setTimeout(resolve, ms))

// *************************************************
// DATE FUNCTIONS                                  *
// *************************************************

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
 * Calculates time in hours since a previous date
 * @param previousDate previous Date object
 */
export const hoursSince = (previousDate: Date) => {
  const currentDate = (new Date() as any) as number
  const oldDate = (previousDate as any) as number
  const result = ((Math.abs(oldDate - currentDate) / (60 * 60 * 1000)) as any) as string
  return Number(parseFloat(result).toFixed(2))
}

/**
 * Return the difference in hours between the 2 dates.
 * @param date1
 * @param date2
 * @param round Whether to round the return difference. Defaults to false.
 */
export const diffInHours = (date1: Date, date2: Date, round = false) => {
  let diff = (date1.getTime() - date2.getTime()) / 1000
  diff /= 60 * 60
  if (round) return Math.abs(Math.round(diff))
  return Math.abs(diff)
}

/**
 * Return the difference in minutes between the 2 dates.
 * @param date1
 * @param date2
 * @param round Whether to round the return difference. Defaults to false.
 */
export const diffInMinutes = (date1: Date, date2: Date, round = false) => {
  let diff = (date1.getTime() - date2.getTime()) / 1000
  diff /= 60
  if (round) return Math.abs(Math.round(diff))
  return Math.abs(diff)
}

/**
 * Return the difference in seconds between the 2 dates.
 * @param date1
 * @param date2
 * @param round Whether to round the return difference. Defaults to false.
 */
export const diffInSeconds = (date1: Date, date2: Date, round = false) => {
  let diff = (date1.getTime() - date2.getTime()) / 1000
  if (round) return Math.abs(Math.round(diff))
  return Math.abs(diff)
}

/**
 * Return the difference in milliseconds between the 2 dates.
 * @param date1
 * @param date2
 * @param round Whether to round the return difference. Defaults to false.
 */
export const diffInMilliseconds = (date1: Date, date2: Date, round = false) => {
  let diff = date1.getTime() - date2.getTime()
  if (round) return Math.abs(Math.round(diff))
  return Math.abs(diff)
}

/**
 * Checks if a date is today or not.
 * @param someDate Date to check if it is today or not.
 */
export const isToday = (someDate: Date) => {
  const today = new Date()
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  )
}

/**
 * Gets the numbers of seconds till tomorrow midnight tomorrow.
 */
export const getSecondsTillTomorrow = () => {
  const now = new Date()
  const hour = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  const totalSecondsToday = (hour * 60 + minutes) * 60 + seconds
  const totalSecondsInADay = 86400

  return totalSecondsInADay - totalSecondsToday
}

// *************************************************
// FILE, PATH and SIZE FUNCTIONS                   *
// *************************************************

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
 * Walks a directory recursively and returns paths to all files
 * @param dir Directory to walk
 */
export const walk = (dir: string) => {
  let results: any[] = []

  fs.readdirSync(dir).forEach(function (innerDir) {
    innerDir = path.resolve(dir, innerDir)
    const stat = fs.statSync(innerDir)

    if (stat.isDirectory()) {
      results = results.concat(walk(innerDir))
    }

    if (stat.isFile()) results.push(innerDir)
  })

  return results
}

// *************************************************
// ARRAY & OBJECT FUNCTIONS                        *
// *************************************************

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
 * Checks if a object is empty.
 * @param obj
 */
export const isObjectEmpty = (obj) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

/**
 * Filters an array based on keywords. Results MUST match each of the filter terms
 * @param array array to filter
 * @param searchTerms terms to filter by
 */
export const filterByKeyboards = (array: string[], searchTerms: string[]) =>
  // Filter out non matching results
  array.filter((item) => {
    let match = 0

    for (const term of searchTerms) {
      const reg = new RegExp(term.toLowerCase(), 'gmi')
      // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
      if (item.toLowerCase().match(reg)) match++
    }

    // If it does then return result
    if (match === searchTerms.length) return item
  })

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
 * Picks a random item from array
 * @param array Array to choose a random item from
 */
export const random = (array: any[]) => array[Math.floor(Math.random() * array.length)]

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
 * @param arraySize Length of each array
 * @returns
 */
export const chunkArray = (array: any[], arraySize: number) => {
  let index
  const arrayLength = array.length
  const tempArray: any[] = []
  let splitArrays: any[]

  for (index = 0; index < arrayLength; index += arraySize) {
    splitArrays = array.slice(index, index + arraySize)
    tempArray.push(splitArrays)
  }

  return tempArray
}

// *************************************************
// STRING MANIPULATION FUNCTIONS                   *
// *************************************************

/**
 * Adds a set amount of spaces
 * @param count Number of spaces to add
 */
export const addSpace = (count: number) => ' '.repeat(count)

/**
 * Capitalize the first letter of a string
 * @param text Text to capitalize the first letter of
 */
export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()

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
