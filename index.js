const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`
const makeBr = tag => str => `${str}<${tag}>`

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
  const linesBr=lines.map(line => {
    return makeBr('br')(line)
  });
  const joinLines=linesBr.join(' ')
  const splitLines=joinLines.split(' <br>')
  const stanza = splitLines.map(line=>{
    return makeTag('p')(line)
  })
  return `
  ${makeTag('h2')(title)}
  ${authorFn(`by ${author}`)}
  ${stanza}
  `
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML= makePoemHTML(await getJSON(poemURL))
}
