const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

const makeEm= makeTag('em')
const makeH3= makeTag('h3')

// complete this function
const makePoemHTML = ([
  {
    title,
    author,
    lines
  }
]) => {
  const authorFn = pipe(makeEm, makeH3)
  poemEl.innerHTML=`
  ${makeTag('h2')(title)}
  ${authorFn(`by ${author}`)}
  `
  const stanza = lines.map(line => {
    return line.split(', ')
  })
  console.log(stanza);
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
