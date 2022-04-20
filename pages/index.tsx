import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [inputString, setInputString] = useState<string>('')
  const [palindrom, setPalindrom] = useState<string>('')
  const [maxLength, setMaxLength] = useState<number>(1000)

  const longestPalindrome = (s: string) => {
    let currentLongest = [0, 1];
    for (let i = 1; i < s.length; i++) {
      const odd = expandAroundCenter(s, i - 1, i + 1); // treating the given letter as a center and checking its surrounding letters 
      const even = expandAroundCenter(s, i - 1, i); // checking if the  center is between the given letter and the previous letter
      const longest = odd[1] - odd[0] > even[1] - even[0] ? odd : even; // choosing the longest palindrome between odd and even
      currentLongest = currentLongest[1] - currentLongest[0] > longest[1] - longest[0] ? currentLongest : longest // comparing the longest to the current longest palindrome and updating current longest accordingly
    }
    setPalindrom(s.slice(currentLongest[0], currentLongest[1]))
  };

  const expandAroundCenter = (s: string, leftIdx: number, rightIdx: number) => {
    while (leftIdx >= 0 && rightIdx < s.length) {
      if (s[leftIdx] !== s[rightIdx]) break;
      leftIdx--;
      rightIdx++;
    }
    return [leftIdx + 1, rightIdx]
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Find the Longest Palindrome</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center mt-10 text-center px-3 sm:px-20 ">
        <h1 className="text-6xl font-bold">
          Find the{' '}
          <a className="text-blue-600" href="#">
            Longest Palindrome
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Insert to find the {' '}
          <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
            Longest Palindrome
          </code>
          in a given string
        </p>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around w-full">
          <div className="mt-1 w-full p-0">
            <textarea
              id="about"
              name="about"
              rows={5}
              className="shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              placeholder="insert string to find"
              defaultValue={inputString}
              onChange={(e) => setInputString(e.target.value)}
              maxLength={maxLength}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  longestPalindrome(inputString)
                }
              }}
            />
          </div>
          <button
            type="button"
            className="inline-flex justify-center mt-3 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => longestPalindrome(inputString)}
          >
            Get Find
          </button>
        </div>

        {palindrom && (
          <div className="mt-5">
            <p className="text-blue-600 text-6xl font-extrabold">
              {palindrom}
            </p>
          </div>
        )}
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://github.com/TaoSupachai"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <p className="text-blue-600">
            TaoSupachai
          </p>
        </a>
      </footer>
    </div>
  )
}

export default Home
