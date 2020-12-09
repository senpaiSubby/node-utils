<h1 align="center"> Utils </h1>

<h2 align="center"> Collection of my utility functions to make life easier. </h2>

<br>


<!-- -------------------------------------------------------------------------------- -->
<h3 align="center"> execAsync - Asynchronous wrapper for ShellJS</h3>

```js
const {code, stdout, stderr} = await execAsync('date')

print(stdout) // prints Fri 27 Mar 2020 06:47:24 PM PDT

```

<!-- -------------------------------------------------------------------------------- -->

<h3 align="center"> ordinalSuffix - Adds ordinal suffix to numbers </h3>

```js
ordinalSuffix(2) // add ordinal suffix to number 2
```

Returns

```
2nd
```

<!-- -------------------------------------------------------------------------------- -->

<h3 align="center"> filterByKeywords - Filters an array based on list of keywords</h3>

```js

const someList = ["I'm a blue dog", "I'm a red dog", "I'm a green dog"]
const searchTerms = ["dog", "red"]

filterByKeywords(someList, searchTerms)
```

Returns

```
["I'm a red dog"]
```

<!-- -------------------------------------------------------------------------------- -->

<h3 align="center"> asyncForEach - ForEach method made asynchronous </h3>

```js

await asyncForEach(array, (item) => {
  // callback
})

```

<!-- -------------------------------------------------------------------------------- -->

<h3 align="center"> differenceInHours - Calulates time in hours between 2 dates </h3>

```js
const date = new Date('2020-03-08 05:44:22.185 +00:00') // Random date from a while ago

differenceInHours(date) // Check how many hours ago the date was
```

Returns

```
476.69
```

<!-- -------------------------------------------------------------------------------- -->

<h3 align="center"> chunkArray - Split array into multiple equally sized arrays</h3>

```js
const sampleArray = ["one", "two", "three", "four", "five", "six"]

chunkArray(sampleArray, 3) // Split array into 3 equal chunks
```

Returns

```
[
  ["one", "two"],
  ["three", "four"],
  ["five", "six"]
]
```

<!-- -------------------------------------------------------------------------------- -->

<h3 align="center"> splitArrayToCharLimit - Splits an array into multiple based on max character limit </h3>


<!-- -------------------------------------------------------------------------------- -->

<h3 align="center"> findFilesByType - Finds nested files in a directory matching the pattern specified </h3>

```js
// Find all mp4 files in a directory
findFilesByType("path/to/dir", ".mp4")
```

<!-- -------------------------------------------------------------------------------- -->

<h3 align="center"> addSpace - Adds a set ammount of spaces </h3>

```js
// Print Hello World with 5 spaces
console.log(`Hello${addSpace(5)}World`)

```

Returns

```
"Hello     World"
```

<!-- -------------------------------------------------------------------------------- -->

<h3 align="center"> capitalize - Capitalize the first letter of a string </h3>

```js
capitalize("hello")
```

Returns

```
"Hello"
```

<!-- -------------------------------------------------------------------------------- -->

<h3 align="center"> sortByKey - Sorts an array by key </h3>

```js
sortByKey(array, "key")

```

<!-- -------------------------------------------------------------------------------- -->

<h3 align="center"> groupByProperty - Splits an array based off of a property</h3>

```js
const originalArray = [
  {
    animal: "dog",
    color: "brown"
  },
  {
    animal: "dog",
    color: "white"
  },
  {
    animal: "cat",
    color: "white"
  },
]

// Split array based off of the anime type
groupByProperty(originalArray, "animal")
```

Returns

```
[
  dog: [
    { animal: 'dog', color: 'brown' },
    { animal: 'dog', color: 'white' }
  ],
  cat: [ { animal: 'cat', color: 'white' } ]
]
```

<!-- -------------------------------------------------------------------------------- -->

<h3 align="center"> bytesToSize - Converts bytes into human readable form</h3>

```js
const bytes = 1000000 // 1 megabytes in bytes

const converted = bytesToSize(bytes)
```

Returns

```
"1 MB"
```

<!-- -------------------------------------------------------------------------------- -->

<h3 align="center"> millisecondsToTime - Converts milliseconds to HH:MM format </h3>

```js
// convert 2 minutes in milliseconds to time string
const time = millisecondsToTime(120000) 

```

Returns

```
2:00
```

<!-- -------------------------------------------------------------------------------- -->

<h3 align="center"> Sleep - Async sleep wrapper</h3>

```js
await sleep(1000) // asynchronously sleeps for 1 second

```
