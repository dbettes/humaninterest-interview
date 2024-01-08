# interview-solution

## json-comment-remover
A quick project I was asked to solve in an interview.  The goal was to remove all comments from the supplied [sample.json](https://github.com/dbettes/interview-solution/blob/master/json-comment-remover/exampleInput/sample.json) file and output the result to the console.  I added additional comments to test other scenarios that could occur for added robustness.  This was originally written in [javascript](https://github.com/dbettes/interview-solution/blob/master/json-comment-remover/app.ts) and the [python version](https://github.com/dbettes/interview-solution/blob/master/json-comment-remover/main.py) was added later.

## hash-and-sort.js
This is a newer interview question that we decided to ask candidates.  The objective is to get the list of people in space from http://open-notify.org/Open-Notify-API/People-In-Space/, determine the top 10 characters used in the astronauts' names, and print the top 10 characters and their counts.  It seems like an easy enough  problem at first but can have some interesting solutions since it involves sorting a hash.
