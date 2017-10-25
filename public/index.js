// global array
var results = [];
var selectRepos = document.getElementById('repos')
var lowerCaseResults = [];

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
  var repoArr = apiResponse.items
  results.push.apply(results, repoArr)
  
  lowerCase(results)

  // render 10 elements only 
  for (var i = 0; i < 10; i++) {

    var newList = document.createElement('ul')
    newList.id = "repo-info"
    var liName = document.createElement('li')
    var liLinka = document.createElement('a')
    liLinka.href = repoArr[i].html_url
    liLinka.innerHTML = repoArr[i].name.replace(/[^a-zA-Z]/g, " ")
    var liDescription = document.createElement('li')
    liDescription.innerHTML = repoArr[i].description || 'Sorry, no description'
    var liStars = document.createElement('li')
    liStars.innerHTML = 'Stars: ' + repoArr[i].stargazers_count
    var liLink = document.createElement('a')
    liLink.href = repoArr.html_url
    liLink.innerText = repoArr[i].name
    newList.appendChild(liLinka)
    newList.appendChild(liDescription)
    newList.appendChild(liStars)

    selectRepos.appendChild(newList)
   

  }

}


// thinkg that maybe i dont even need a search functionality having now built it lol. thinking how to loop through using forEach with an iterator instead of the for loops. Need to refactor the functions and make code alot more readable. also need to do styling, and tests .
// at the moment after you search, it loops through 30, so need to change that.  
document.getElementById('userSearch').addEventListener('input', function (event) {

  var filteredResults = lowerCaseResults.filter(function (result) {
    return result.name.includes(event.target.value.toLowerCase().replace(/[^a-z]/g, " "))
  })
  renderFilteredRepos(filteredResults)

})


function lowerCase(wordsArray) {
  for (var i = 0; i < wordsArray.length; i++) {
    lowerCaseResults.push({ name: wordsArray[i].name.toLowerCase().replace(/[^a-z]/g, " "), html_url: wordsArray[i].html_url, description: wordsArray[i].description, stargazers_count: wordsArray[i].stargazers_count });
  }
}

function renderFilteredRepos(filteredResults) {
  
  selectRepos.innerHTML = "";

 filteredResults.forEach(function (repo) {

    var newList = document.createElement('ul')
    var liName = document.createElement('li')
    var liLinka = document.createElement('a')
    liLinka.href = repo.html_url
    liLinka.innerHTML = repo.name
    var liDescription = document.createElement('li')
    liDescription.innerHTML = repo.description || 'Sorry, no description'
    var liStars = document.createElement('li')
    liStars.innerHTML = 'Stars: ' + repo.stargazers_count
    var liLink = document.createElement('a')
    liLink.href = repo.html_url
    liLink.innerText = repo.name
    newList.appendChild(liLinka)
    newList.appendChild(liDescription)
    newList.appendChild(liStars)

    selectRepos.appendChild(newList)
  })

}

httpRequest(url, 'GET', renderName)
