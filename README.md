# 9m in NodeJS

> My flight was delayed and I was bored. Inspired by [9m](https://github.com/ehamberg/9m)

## Requirements

- Nodejs
- Mongodb

## Install

```
npm install
```

## Running

Start Mongodb

```
node index.js
```

## Example

```bash
# Creation
$ curl --data "url=akenn.org" http://localhost:4000/create
{
  "url":"akenn.org",
  "key":"뙩ㄳ",
  "hits":0,
  "link":"http://localhost:4040/뙩ㄳ"
}

# Retrieval 
$ curl http://localhost:4040/show/뙩ㄳ
{
  "url":"akenn.org",
  "key":"뙩ㄳ",
  "hits":0,
  "link":"http://localhost:4040/뙩ㄳ"
}
```

## TODO

- Re-write checking for proxy host/port
- restructure `routes/urls.js` (really messy, lots of sloppy code)
