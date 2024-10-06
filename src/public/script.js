
window.addEventListener('load', (event) => {
  console.log(event.type)
  main()
})

async function main() {
  const range = document.createRange()
  const parent = document.querySelector('#root')
  const topList = await (await fetch('/api/contributeurs')).json()
  // get list owner/repo

  renderTopList('Sylvainxiii', 'EasyUpload')

  //----------------------------------------------------------------------------

  function addHtml(stringHtml) {
    // parent.prepend(range.createContextualFragment(stringHtml))
    parent.append(range.createContextualFragment(stringHtml))
  }

  function renderTopList(owner, repo) {
    let HTML = ''
    for (const contributor of topList) {
      HTML += `<div class="contributor">
          <img src="${contributor.avatar_url}" alt="avatar" height=50></img>
          <div>
            <div>${contributor.name}</div>
            <div>commit: ${contributor.total_pulls_request}</div>
            <a href="${contributor.html_url}">GitHub repo</a>
          </div>
        </div>`
    }

    addHtml(`<div class="project">
        <h2>${owner}/${repo}</h2>
        <div class="contributors">
        ${HTML}
        </div>
      </div>`)
  }
}

