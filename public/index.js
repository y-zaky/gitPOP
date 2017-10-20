// create the url 
var date = dateLastWeek()
var url = 'https://api.github.com/search/repositories?q=created:%3E' + date + '&sort=stars&order=desc'

// set date minus 7 days, because we want passed weeks repos only
// return as YYYY-MM-DD
function dateLastWeek() {
  var date = new Date()
  date.setDate(date.getDate() - 7)
  return date.toISOString().substring(0, 10)
}

// request 
function httpRequest(url, type, callback) {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var responseObj = JSON.parse(xhr.responseText)
      callback(responseObj)
    }
  }
  xhr.open(type, url, true)
  xhr.send()
}

// dom render
function renderName(apiResponse) {
  console.log('responseObj', apiResponse.items)

  var selectRepos = document.getElementById('repos')

  var repoArr = apiResponse.items
  repoArr.map(function (repo) {
    var repoSection = document.createElement('section')
    repoSection.setAttribute('id', 'Repo-Info')

    var newList = document.createElement('ul')

    var liName = document.createElement('li')
    var liLinka = document.createElement('a')
    liLinka.href = repo.html_url
    liLinka.innerHTML = repo.name
    var liDescription = document.createElement('li')
    liDescription.innerHTML = repo.description
    var liStars = document.createElement('li')
    liStars.innerHTML = 'Stars: ' + repo.stargazers_count
    var liLink = document.createElement('a')
    liLink.target = '_blank'
    liLink.href = repo.html_url
    liLink.innerText = repo.name
    newList.appendChild(liLinka)
    newList.appendChild(liDescription)
    newList.appendChild(liStars)

    selectRepos.appendChild(newList)
  })
}

// name, desc, number of stars.
httpRequest(url, 'GET', renderName)


