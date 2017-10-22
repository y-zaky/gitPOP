// global array
var results = [];


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
  var selectRepos = document.getElementById('repos')
  var repoArr = apiResponse.items
  results.push.apply(results,repoArr)
  console.log('results post concat', results)
  repoArr.forEach(function (repo) {
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
    liLink.href = repo.html_url
    liLink.innerText = repo.name
    newList.appendChild(liLinka)
    newList.appendChild(liDescription)
    newList.appendChild(liStars)

    selectRepos.appendChild(newList)
  })

}



// api request is made n load,
// res is stored in a JSON
// event listener on the input that gets called on every keypress. it makes an api call every key process.
// it also builds the api url by removing white space and adding /search to it. 
// search function runs a filter on the array of objects (on the json)

// built a function that creates an input form and appends it to the repos dom once api response comes. 
// next need to add an event listener to the serarch field that calls the search function on input. 
// the search function does a filter on the response array/ 

//instead of creating an input and appending it once the api response comes in, may be better to build a search function as standard, with an event listener. 
// need to first build a function that takes the response obj, and builds a new one via object .keys. 
// once this object is built, only if it exists is a search form rendered on the dom with an event listener....

// problem is that at the moment i dont know how to pass the reposArr to the event listener. can an event listener take in another object ? 
// maybe you could just have a clobal varibale that = [] . push repos arr to the global array. then have the event listener loop over that global array. 
// need to have a look at how the rresults array looks once repoArr is pushed to it.  



document.getElementById('userSearch').addEventListener('input', function (event) {
  results.filter(function (result) {
    console.log('single result.name', result.name)
  return result.name.includes(event.target.value)
   
  })
})


// var filteredEvents = events.filter(function(event){
//   return event.date == '22-02-2016';
// });

// uncomment out all below and xhr call above. 
// name, desc, number of stars.
httpRequest(url, 'GET', renderName)


// //search checks if the input characters are parts of names in database. If so, as a result we will get an array of all matching names
// function search(word) {
//   const lowerCaseWord = word.toLowerCase();
//   return lib.filter(function (colour) {
//     const lowerCaseName = colour["name"].toLowerCase();
//     return lowerCaseName.includes(lowerCaseWord);
//   });
// }
// //handleSearch returns the server response with responseObject that contains an array of all matching results
// var prepareSearch = function prepareSearch(req) {

//   const searchWord = req.url.replace('/search/', '');
//   const responseObject = {
//     results: search(searchWord)
//   }
//   return responseObject;

// }

// // appendData function creates new list elements for results and creates another event listener for clicks on each one to return background colour change
// function appendData(responseObj) {
//   colourResults.innerHTML = '';
//   responseObj.results.forEach(function(val) {
//     var colourNode = document.createElement("li");
//     colourNode.tabIndex = '0';
//     colourNode.textContent = val.name + ': ' + val.hex;
//     colourResults.appendChild(colourNode);
//     var hexCode = val.hex;
//     colourNode.addEventListener('click', function(event) {
//       var backgroundNode = document.getElementById('change-background');
//       backgroundNode.setAttribute('style', 'background-color:' + hexCode);

//     })
//   })
// };




// var response = {
//   total_count: 5514160,
//   incomplete_results: true,
//   items: [
//     {
//       id: 82436691,
//       name: "avbook",
//       full_name: "guyueyingmu/avbook",
//       owner: {
//         login: "guyueyingmu",
//         id: 25521728,
//         avatar_url: "https://avatars1.githubusercontent.com/u/25521728?v=4",
//         gravatar_id: "",
//         url: "https://api.github.com/users/guyueyingmu",
//         html_url: "https://github.com/guyueyingmu",
//         followers_url: "https://api.github.com/users/guyueyingmu/followers",
//         following_url: "https://api.github.com/users/guyueyingmu/following{/other_user}",
//         gists_url: "https://api.github.com/users/guyueyingmu/gists{/gist_id}",
//         starred_url: "https://api.github.com/users/guyueyingmu/starred{/owner}{/repo}",
//         subscriptions_url: "https://api.github.com/users/guyueyingmu/subscriptions",
//         organizations_url: "https://api.github.com/users/guyueyingmu/orgs",
//         repos_url: "https://api.github.com/users/guyueyingmu/repos",
//         events_url: "https://api.github.com/users/guyueyingmu/events{/privacy}",
//         received_events_url: "https://api.github.com/users/guyueyingmu/received_events",
//         type: "User",
//         site_admin: false
//       },
//       private: false,
//       html_url: "https://github.com/guyueyingmu/avbook",
//       description: "Illegal vehicle from Red Castle",
//       fork: false,
//       url: "https://api.github.com/repos/guyueyingmu/avbook",
//       forks_url: "https://api.github.com/repos/guyueyingmu/avbook/forks",
//       keys_url: "https://api.github.com/repos/guyueyingmu/avbook/keys{/key_id}",
//       collaborators_url: "https://api.github.com/repos/guyueyingmu/avbook/collaborators{/collaborator}",
//       teams_url: "https://api.github.com/repos/guyueyingmu/avbook/teams",
//       hooks_url: "https://api.github.com/repos/guyueyingmu/avbook/hooks",
//       issue_events_url: "https://api.github.com/repos/guyueyingmu/avbook/issues/events{/number}",
//       events_url: "https://api.github.com/repos/guyueyingmu/avbook/events",
//       assignees_url: "https://api.github.com/repos/guyueyingmu/avbook/assignees{/user}",
//       branches_url: "https://api.github.com/repos/guyueyingmu/avbook/branches{/branch}",
//       tags_url: "https://api.github.com/repos/guyueyingmu/avbook/tags",
//       blobs_url: "https://api.github.com/repos/guyueyingmu/avbook/git/blobs{/sha}",
//       git_tags_url: "https://api.github.com/repos/guyueyingmu/avbook/git/tags{/sha}",
//       git_refs_url: "https://api.github.com/repos/guyueyingmu/avbook/git/refs{/sha}",
//       trees_url: "https://api.github.com/repos/guyueyingmu/avbook/git/trees{/sha}",
//       statuses_url: "https://api.github.com/repos/guyueyingmu/avbook/statuses/{sha}",
//       languages_url: "https://api.github.com/repos/guyueyingmu/avbook/languages",
//       stargazers_url: "https://api.github.com/repos/guyueyingmu/avbook/stargazers",
//       contributors_url: "https://api.github.com/repos/guyueyingmu/avbook/contributors",
//       subscribers_url: "https://api.github.com/repos/guyueyingmu/avbook/subscribers",
//       subscription_url: "https://api.github.com/repos/guyueyingmu/avbook/subscription",
//       commits_url: "https://api.github.com/repos/guyueyingmu/avbook/commits{/sha}",
//       git_commits_url: "https://api.github.com/repos/guyueyingmu/avbook/git/commits{/sha}",
//       comments_url: "https://api.github.com/repos/guyueyingmu/avbook/comments{/number}",
//       issue_comment_url: "https://api.github.com/repos/guyueyingmu/avbook/issues/comments{/number}",
//       contents_url: "https://api.github.com/repos/guyueyingmu/avbook/contents/{+path}",
//       compare_url: "https://api.github.com/repos/guyueyingmu/avbook/compare/{base}...{head}",
//       merges_url: "https://api.github.com/repos/guyueyingmu/avbook/merges",
//       archive_url: "https://api.github.com/repos/guyueyingmu/avbook/{archive_format}{/ref}",
//       downloads_url: "https://api.github.com/repos/guyueyingmu/avbook/downloads",
//       issues_url: "https://api.github.com/repos/guyueyingmu/avbook/issues{/number}",
//       pulls_url: "https://api.github.com/repos/guyueyingmu/avbook/pulls{/number}",
//       milestones_url: "https://api.github.com/repos/guyueyingmu/avbook/milestones{/number}",
//       notifications_url: "https://api.github.com/repos/guyueyingmu/avbook/notifications{?since,all,participating}",
//       labels_url: "https://api.github.com/repos/guyueyingmu/avbook/labels{/name}",
//       releases_url: "https://api.github.com/repos/guyueyingmu/avbook/releases{/id}",
//       deployments_url: "https://api.github.com/repos/guyueyingmu/avbook/deployments",
//       created_at: "2017-02-19T05:09:55Z",
//       updated_at: "2017-06-17T07:55:47Z",
//       pushed_at: "2017-02-20T16:22:16Z",
//       git_url: "git://github.com/guyueyingmu/avbook.git",
//       ssh_url: "git@github.com:guyueyingmu/avbook.git",
//       clone_url: "https://github.com/guyueyingmu/avbook.git",
//       svn_url: "https://github.com/guyueyingmu/avbook",
//       homepage: null,
//       size: 4042,
//       stargazers_count: 134,
//       watchers_count: 134,
//       language: "PHP",
//       has_issues: true,
//       has_projects: true,
//       has_downloads: true,
//       has_wiki: true,
//       has_pages: false,
//       forks_count: 25,
//       mirror_url: null,
//       open_issues_count: 0,
//       forks: 25,
//       open_issues: 0,
//       watchers: 134,
//       default_branch: "master",
//       score: 1
//     },
//     {
//       id: 84106527,
//       name: "BrowserGather",
//       full_name: "sekirkity/BrowserGather",
//       owner: {
//         login: "sekirkity",
//         id: 16615319,
//         avatar_url: "https://avatars1.githubusercontent.com/u/16615319?v=4",
//         gravatar_id: "",
//         url: "https://api.github.com/users/sekirkity",
//         html_url: "https://github.com/sekirkity",
//         followers_url: "https://api.github.com/users/sekirkity/followers",
//         following_url: "https://api.github.com/users/sekirkity/following{/other_user}",
//         gists_url: "https://api.github.com/users/sekirkity/gists{/gist_id}",
//         starred_url: "https://api.github.com/users/sekirkity/starred{/owner}{/repo}",
//         subscriptions_url: "https://api.github.com/users/sekirkity/subscriptions",
//         organizations_url: "https://api.github.com/users/sekirkity/orgs",
//         repos_url: "https://api.github.com/users/sekirkity/repos",
//         events_url: "https://api.github.com/users/sekirkity/events{/privacy}",
//         received_events_url: "https://api.github.com/users/sekirkity/received_events",
//         type: "User",
//         site_admin: false
//       },
//       private: false,
//       html_url: "https://github.com/sekirkity/BrowserGather",
//       description: "Fileless web browser information extraction",
//       fork: false,
//       url: "https://api.github.com/repos/sekirkity/BrowserGather",
//       forks_url: "https://api.github.com/repos/sekirkity/BrowserGather/forks",
//       keys_url: "https://api.github.com/repos/sekirkity/BrowserGather/keys{/key_id}",
//       collaborators_url: "https://api.github.com/repos/sekirkity/BrowserGather/collaborators{/collaborator}",
//       teams_url: "https://api.github.com/repos/sekirkity/BrowserGather/teams",
//       hooks_url: "https://api.github.com/repos/sekirkity/BrowserGather/hooks",
//       issue_events_url: "https://api.github.com/repos/sekirkity/BrowserGather/issues/events{/number}",
//       events_url: "https://api.github.com/repos/sekirkity/BrowserGather/events",
//       assignees_url: "https://api.github.com/repos/sekirkity/BrowserGather/assignees{/user}",
//       branches_url: "https://api.github.com/repos/sekirkity/BrowserGather/branches{/branch}",
//       tags_url: "https://api.github.com/repos/sekirkity/BrowserGather/tags",
//       blobs_url: "https://api.github.com/repos/sekirkity/BrowserGather/git/blobs{/sha}",
//       git_tags_url: "https://api.github.com/repos/sekirkity/BrowserGather/git/tags{/sha}",
//       git_refs_url: "https://api.github.com/repos/sekirkity/BrowserGather/git/refs{/sha}",
//       trees_url: "https://api.github.com/repos/sekirkity/BrowserGather/git/trees{/sha}",
//       statuses_url: "https://api.github.com/repos/sekirkity/BrowserGather/statuses/{sha}",
//       languages_url: "https://api.github.com/repos/sekirkity/BrowserGather/languages",
//       stargazers_url: "https://api.github.com/repos/sekirkity/BrowserGather/stargazers",
//       contributors_url: "https://api.github.com/repos/sekirkity/BrowserGather/contributors",
//       subscribers_url: "https://api.github.com/repos/sekirkity/BrowserGather/subscribers",
//       subscription_url: "https://api.github.com/repos/sekirkity/BrowserGather/subscription",
//       commits_url: "https://api.github.com/repos/sekirkity/BrowserGather/commits{/sha}",
//       git_commits_url: "https://api.github.com/repos/sekirkity/BrowserGather/git/commits{/sha}",
//       comments_url: "https://api.github.com/repos/sekirkity/BrowserGather/comments{/number}",
//       issue_comment_url: "https://api.github.com/repos/sekirkity/BrowserGather/issues/comments{/number}",
//       contents_url: "https://api.github.com/repos/sekirkity/BrowserGather/contents/{+path}",
//       compare_url: "https://api.github.com/repos/sekirkity/BrowserGather/compare/{base}...{head}",
//       merges_url: "https://api.github.com/repos/sekirkity/BrowserGather/merges",
//       archive_url: "https://api.github.com/repos/sekirkity/BrowserGather/{archive_format}{/ref}",
//       downloads_url: "https://api.github.com/repos/sekirkity/BrowserGather/downloads",
//       issues_url: "https://api.github.com/repos/sekirkity/BrowserGather/issues{/number}",
//       pulls_url: "https://api.github.com/repos/sekirkity/BrowserGather/pulls{/number}",
//       milestones_url: "https://api.github.com/repos/sekirkity/BrowserGather/milestones{/number}",
//       notifications_url: "https://api.github.com/repos/sekirkity/BrowserGather/notifications{?since,all,participating}",
//       labels_url: "https://api.github.com/repos/sekirkity/BrowserGather/labels{/name}",
//       releases_url: "https://api.github.com/repos/sekirkity/BrowserGather/releases{/id}",
//       deployments_url: "https://api.github.com/repos/sekirkity/BrowserGather/deployments",
//       created_at: "2017-03-06T18:25:51Z",
//       updated_at: "2017-08-18T11:04:49Z",
//       pushed_at: "2017-04-30T05:07:11Z",
//       git_url: "git://github.com/sekirkity/BrowserGather.git",
//       ssh_url: "git@github.com:sekirkity/BrowserGather.git",
//       clone_url: "https://github.com/sekirkity/BrowserGather.git",
//       svn_url: "https://github.com/sekirkity/BrowserGather",
//       homepage: "",
//       size: 13,
//       stargazers_count: 126,
//       watchers_count: 126,
//       language: "PowerShell",
//       has_issues: true,
//       has_projects: true,
//       has_downloads: true,
//       has_wiki: true,
//       has_pages: false,
//       forks_count: 27,
//       mirror_url: null,
//       open_issues_count: 2,
//       forks: 27,
//       open_issues: 2,
//       watchers: 126,
//       default_branch: "master",
//       score: 1
//     },

// {
//   id: 79296236,
//   name: "quark",
//   full_name: "tomhodgins/quark",
//   owner: {
//   login: "tomhodgins",
//   id: 955601,
//   avatar_url: "https://avatars0.githubusercontent.com/u/955601?v=4",
//   gravatar_id: "",
//   url: "https://api.github.com/users/tomhodgins",
//   html_url: "https://github.com/tomhodgins",
//   followers_url: "https://api.github.com/users/tomhodgins/followers",
//   following_url: "https://api.github.com/users/tomhodgins/following{/other_user}",
//   gists_url: "https://api.github.com/users/tomhodgins/gists{/gist_id}",
//   starred_url: "https://api.github.com/users/tomhodgins/starred{/owner}{/repo}",
//   subscriptions_url: "https://api.github.com/users/tomhodgins/subscriptions",
//   organizations_url: "https://api.github.com/users/tomhodgins/orgs",
//   repos_url: "https://api.github.com/users/tomhodgins/repos",
//   events_url: "https://api.github.com/users/tomhodgins/events{/privacy}",
//   received_events_url: "https://api.github.com/users/tomhodgins/received_events",
//   type: "User",
//   site_admin: false
//   },
//   private: false,
//   html_url: "https://github.com/tomhodgins/quark",
//   description: "Quark.js is a microscopic atomic CSS polyfill in JS just 140 bytes",
//   fork: false,
//   url: "https://api.github.com/repos/tomhodgins/quark",
//   forks_url: "https://api.github.com/repos/tomhodgins/quark/forks",
//   keys_url: "https://api.github.com/repos/tomhodgins/quark/keys{/key_id}",
//   collaborators_url: "https://api.github.com/repos/tomhodgins/quark/collaborators{/collaborator}",
//   teams_url: "https://api.github.com/repos/tomhodgins/quark/teams",
//   hooks_url: "https://api.github.com/repos/tomhodgins/quark/hooks",
//   issue_events_url: "https://api.github.com/repos/tomhodgins/quark/issues/events{/number}",
//   events_url: "https://api.github.com/repos/tomhodgins/quark/events",
//   assignees_url: "https://api.github.com/repos/tomhodgins/quark/assignees{/user}",
//   branches_url: "https://api.github.com/repos/tomhodgins/quark/branches{/branch}",
//   tags_url: "https://api.github.com/repos/tomhodgins/quark/tags",
//   blobs_url: "https://api.github.com/repos/tomhodgins/quark/git/blobs{/sha}",
//   git_tags_url: "https://api.github.com/repos/tomhodgins/quark/git/tags{/sha}",
//   git_refs_url: "https://api.github.com/repos/tomhodgins/quark/git/refs{/sha}",
//   trees_url: "https://api.github.com/repos/tomhodgins/quark/git/trees{/sha}",
//   statuses_url: "https://api.github.com/repos/tomhodgins/quark/statuses/{sha}",
//   languages_url: "https://api.github.com/repos/tomhodgins/quark/languages",
//   stargazers_url: "https://api.github.com/repos/tomhodgins/quark/stargazers",
//   contributors_url: "https://api.github.com/repos/tomhodgins/quark/contributors",
//   subscribers_url: "https://api.github.com/repos/tomhodgins/quark/subscribers",
//   subscription_url: "https://api.github.com/repos/tomhodgins/quark/subscription",
//   commits_url: "https://api.github.com/repos/tomhodgins/quark/commits{/sha}",
//   git_commits_url: "https://api.github.com/repos/tomhodgins/quark/git/commits{/sha}",
//   comments_url: "https://api.github.com/repos/tomhodgins/quark/comments{/number}",
//   issue_comment_url: "https://api.github.com/repos/tomhodgins/quark/issues/comments{/number}",
//   contents_url: "https://api.github.com/repos/tomhodgins/quark/contents/{+path}",
//   compare_url: "https://api.github.com/repos/tomhodgins/quark/compare/{base}...{head}",
//   merges_url: "https://api.github.com/repos/tomhodgins/quark/merges",
//   archive_url: "https://api.github.com/repos/tomhodgins/quark/{archive_format}{/ref}",
//   downloads_url: "https://api.github.com/repos/tomhodgins/quark/downloads",
//   issues_url: "https://api.github.com/repos/tomhodgins/quark/issues{/number}",
//   pulls_url: "https://api.github.com/repos/tomhodgins/quark/pulls{/number}",
//   milestones_url: "https://api.github.com/repos/tomhodgins/quark/milestones{/number}",
//   notifications_url: "https://api.github.com/repos/tomhodgins/quark/notifications{?since,all,participating}",
//   labels_url: "https://api.github.com/repos/tomhodgins/quark/labels{/name}",
//   releases_url: "https://api.github.com/repos/tomhodgins/quark/releases{/id}",
//   deployments_url: "https://api.github.com/repos/tomhodgins/quark/deployments",
//   created_at: "2017-01-18T02:44:39Z",
//   updated_at: "2017-05-22T04:32:09Z",
//   pushed_at: "2017-01-26T15:00:32Z",
//   git_url: "git://github.com/tomhodgins/quark.git",
//   ssh_url: "git@github.com:tomhodgins/quark.git",
//   clone_url: "https://github.com/tomhodgins/quark.git",
//   svn_url: "https://github.com/tomhodgins/quark",
//   homepage: "https://tomhodgins.github.io/quark",
//   size: 8,
//   stargazers_count: 62,
//   watchers_count: 62,
//   language: "HTML",
//   has_issues: true,
//   has_projects: true,
//   has_downloads: true,
//   has_wiki: true,
//   has_pages: true,
//   forks_count: 6,
//   mirror_url: null,
//   open_issues_count: 1,
//   forks: 6,
//   open_issues: 1,
//   watchers: 62,
//   default_branch: "gh-pages",
//   score: 1
//   },
//   {
//   id: 81680238,
//   name: "everything-is-calm",
//   full_name: "alimony/everything-is-calm",
//   owner: {
//   login: "alimony",
//   id: 331091,
//   avatar_url: "https://avatars3.githubusercontent.com/u/331091?v=4",
//   gravatar_id: "",
//   url: "https://api.github.com/users/alimony",
//   html_url: "https://github.com/alimony",
//   followers_url: "https://api.github.com/users/alimony/followers",
//   following_url: "https://api.github.com/users/alimony/following{/other_user}",
//   gists_url: "https://api.github.com/users/alimony/gists{/gist_id}",
//   starred_url: "https://api.github.com/users/alimony/starred{/owner}{/repo}",
//   subscriptions_url: "https://api.github.com/users/alimony/subscriptions",
//   organizations_url: "https://api.github.com/users/alimony/orgs",
//   repos_url: "https://api.github.com/users/alimony/repos",
//   events_url: "https://api.github.com/users/alimony/events{/privacy}",
//   received_events_url: "https://api.github.com/users/alimony/received_events",
//   type: "User",
//   site_admin: false
//   },
//   private: false,
//   html_url: "https://github.com/alimony/everything-is-calm",
//   description: "Chrome Extension that invisibly lowers the volume of YouTube videos over time, then suddenly blasts them at max.",
//   fork: false,
//   url: "https://api.github.com/repos/alimony/everything-is-calm",
//   forks_url: "https://api.github.com/repos/alimony/everything-is-calm/forks",
//   keys_url: "https://api.github.com/repos/alimony/everything-is-calm/keys{/key_id}",
//   collaborators_url: "https://api.github.com/repos/alimony/everything-is-calm/collaborators{/collaborator}",
//   teams_url: "https://api.github.com/repos/alimony/everything-is-calm/teams",
//   hooks_url: "https://api.github.com/repos/alimony/everything-is-calm/hooks",
//   issue_events_url: "https://api.github.com/repos/alimony/everything-is-calm/issues/events{/number}",
//   events_url: "https://api.github.com/repos/alimony/everything-is-calm/events",
//   assignees_url: "https://api.github.com/repos/alimony/everything-is-calm/assignees{/user}",
//   branches_url: "https://api.github.com/repos/alimony/everything-is-calm/branches{/branch}",
//   tags_url: "https://api.github.com/repos/alimony/everything-is-calm/tags",
//   blobs_url: "https://api.github.com/repos/alimony/everything-is-calm/git/blobs{/sha}",
//   git_tags_url: "https://api.github.com/repos/alimony/everything-is-calm/git/tags{/sha}",
//   git_refs_url: "https://api.github.com/repos/alimony/everything-is-calm/git/refs{/sha}",
//   trees_url: "https://api.github.com/repos/alimony/everything-is-calm/git/trees{/sha}",
//   statuses_url: "https://api.github.com/repos/alimony/everything-is-calm/statuses/{sha}",
//   languages_url: "https://api.github.com/repos/alimony/everything-is-calm/languages",
//   stargazers_url: "https://api.github.com/repos/alimony/everything-is-calm/stargazers",
//   contributors_url: "https://api.github.com/repos/alimony/everything-is-calm/contributors",
//   subscribers_url: "https://api.github.com/repos/alimony/everything-is-calm/subscribers",
//   subscription_url: "https://api.github.com/repos/alimony/everything-is-calm/subscription",
//   commits_url: "https://api.github.com/repos/alimony/everything-is-calm/commits{/sha}",
//   git_commits_url: "https://api.github.com/repos/alimony/everything-is-calm/git/commits{/sha}",
//   comments_url: "https://api.github.com/repos/alimony/everything-is-calm/comments{/number}",
//   issue_comment_url: "https://api.github.com/repos/alimony/everything-is-calm/issues/comments{/number}",
//   contents_url: "https://api.github.com/repos/alimony/everything-is-calm/contents/{+path}",
//   compare_url: "https://api.github.com/repos/alimony/everything-is-calm/compare/{base}...{head}",
//   merges_url: "https://api.github.com/repos/alimony/everything-is-calm/merges",
//   archive_url: "https://api.github.com/repos/alimony/everything-is-calm/{archive_format}{/ref}",
//   downloads_url: "https://api.github.com/repos/alimony/everything-is-calm/downloads",
//   issues_url: "https://api.github.com/repos/alimony/everything-is-calm/issues{/number}",
//   pulls_url: "https://api.github.com/repos/alimony/everything-is-calm/pulls{/number}",
//   milestones_url: "https://api.github.com/repos/alimony/everything-is-calm/milestones{/number}",
//   notifications_url: "https://api.github.com/repos/alimony/everything-is-calm/notifications{?since,all,participating}",
//   labels_url: "https://api.github.com/repos/alimony/everything-is-calm/labels{/name}",
//   releases_url: "https://api.github.com/repos/alimony/everything-is-calm/releases{/id}",
//   deployments_url: "https://api.github.com/repos/alimony/everything-is-calm/deployments",
//   created_at: "2017-02-11T20:29:13Z",
//   updated_at: "2017-06-13T14:12:54Z",
//   pushed_at: "2017-02-11T20:47:55Z",
//   git_url: "git://github.com/alimony/everything-is-calm.git",
//   ssh_url: "git@github.com:alimony/everything-is-calm.git",
//   clone_url: "https://github.com/alimony/everything-is-calm.git",
//   svn_url: "https://github.com/alimony/everything-is-calm",
//   homepage: "",
//   size: 5,
//   stargazers_count: 61,
//   watchers_count: 61,
//   language: "JavaScript",
//   has_issues: true,
//   has_projects: true,
//   has_downloads: true,
//   has_wiki: true,
//   has_pages: false,
//   forks_count: 0,
//   mirror_url: null,
//   open_issues_count: 0,
//   forks: 0,
//   open_issues: 0,
//   watchers: 61,
//   default_branch: "master",
//   score: 1
//   },
//   {
//   id: 94205892,
//   name: "forward-thinking-pytorch",
//   full_name: "kimhc6028/forward-thinking-pytorch",
//   owner: {
//   login: "kimhc6028",
//   id: 15006217,
//   avatar_url: "https://avatars2.githubusercontent.com/u/15006217?v=4",
//   gravatar_id: "",
//   url: "https://api.github.com/users/kimhc6028",
//   html_url: "https://github.com/kimhc6028",
//   followers_url: "https://api.github.com/users/kimhc6028/followers",
//   following_url: "https://api.github.com/users/kimhc6028/following{/other_user}",
//   gists_url: "https://api.github.com/users/kimhc6028/gists{/gist_id}",
//   starred_url: "https://api.github.com/users/kimhc6028/starred{/owner}{/repo}",
//   subscriptions_url: "https://api.github.com/users/kimhc6028/subscriptions",
//   organizations_url: "https://api.github.com/users/kimhc6028/orgs",
//   repos_url: "https://api.github.com/users/kimhc6028/repos",
//   events_url: "https://api.github.com/users/kimhc6028/events{/privacy}",
//   received_events_url: "https://api.github.com/users/kimhc6028/received_events",
//   type: "User",
//   site_admin: false
//   },
//   private: false,
//   html_url: "https://github.com/kimhc6028/forward-thinking-pytorch",
//   description: "Pytorch implementation of Forward Thinking: Building and Training Neural Networks One Layer at a Time ",
//   fork: false,
//   url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch",
//   forks_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/forks",
//   keys_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/keys{/key_id}",
//   collaborators_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/collaborators{/collaborator}",
//   teams_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/teams",
//   hooks_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/hooks",
//   issue_events_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/issues/events{/number}",
//   events_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/events",
//   assignees_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/assignees{/user}",
//   branches_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/branches{/branch}",
//   tags_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/tags",
//   blobs_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/git/blobs{/sha}",
//   git_tags_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/git/tags{/sha}",
//   git_refs_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/git/refs{/sha}",
//   trees_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/git/trees{/sha}",
//   statuses_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/statuses/{sha}",
//   languages_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/languages",
//   stargazers_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/stargazers",
//   contributors_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/contributors",
//   subscribers_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/subscribers",
//   subscription_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/subscription",
//   commits_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/commits{/sha}",
//   git_commits_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/git/commits{/sha}",
//   comments_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/comments{/number}",
//   issue_comment_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/issues/comments{/number}",
//   contents_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/contents/{+path}",
//   compare_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/compare/{base}...{head}",
//   merges_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/merges",
//   archive_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/{archive_format}{/ref}",
//   downloads_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/downloads",
//   issues_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/issues{/number}",
//   pulls_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/pulls{/number}",
//   milestones_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/milestones{/number}",
//   notifications_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/notifications{?since,all,participating}",
//   labels_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/labels{/name}",
//   releases_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/releases{/id}",
//   deployments_url: "https://api.github.com/repos/kimhc6028/forward-thinking-pytorch/deployments",
//   created_at: "2017-06-13T11:31:25Z",
//   updated_at: "2017-07-18T04:20:58Z",
//   pushed_at: "2017-06-14T00:48:29Z",
//   git_url: "git://github.com/kimhc6028/forward-thinking-pytorch.git",
//   ssh_url: "git@github.com:kimhc6028/forward-thinking-pytorch.git",
//   clone_url: "https://github.com/kimhc6028/forward-thinking-pytorch.git",
//   svn_url: "https://github.com/kimhc6028/forward-thinking-pytorch",
//   homepage: "https://arxiv.org/pdf/1706.02480.pdf",
//   size: 510,
//   stargazers_count: 60,
//   watchers_count: 60,
//   language: "Python",
//   has_issues: true,
//   has_projects: true,
//   has_downloads: true,
//   has_wiki: true,
//   has_pages: false,
//   forks_count: 7,
//   mirror_url: null,
//   open_issues_count: 0,
//   forks: 7,
//   open_issues: 0,
//   watchers: 60,
//   default_branch: "master",
//   score: 1
//   },
//   {
//   id: 84712862,
//   name: "fragmenter",
//   full_name: "dilpreet96/fragmenter",
//   owner: {
//   login: "dilpreet96",
//   id: 12071739,
//   avatar_url: "https://avatars0.githubusercontent.com/u/12071739?v=4",
//   gravatar_id: "",
//   url: "https://api.github.com/users/dilpreet96",
//   html_url: "https://github.com/dilpreet96",
//   followers_url: "https://api.github.com/users/dilpreet96/followers",
//   following_url: "https://api.github.com/users/dilpreet96/following{/other_user}",
//   gists_url: "https://api.github.com/users/dilpreet96/gists{/gist_id}",
//   starred_url: "https://api.github.com/users/dilpreet96/starred{/owner}{/repo}",
//   subscriptions_url: "https://api.github.com/users/dilpreet96/subscriptions",
//   organizations_url: "https://api.github.com/users/dilpreet96/orgs",
//   repos_url: "https://api.github.com/users/dilpreet96/repos",
//   events_url: "https://api.github.com/users/dilpreet96/events{/privacy}",
//   received_events_url: "https://api.github.com/users/dilpreet96/received_events",
//   type: "User",
//   site_admin: false
//   },
//   private: false,
//   html_url: "https://github.com/dilpreet96/fragmenter",
//   description: " [Android Library] Remove Boilerplate code for initializing fragments",
//   fork: false,
//   url: "https://api.github.com/repos/dilpreet96/fragmenter",
//   forks_url: "https://api.github.com/repos/dilpreet96/fragmenter/forks",
//   keys_url: "https://api.github.com/repos/dilpreet96/fragmenter/keys{/key_id}",
//   collaborators_url: "https://api.github.com/repos/dilpreet96/fragmenter/collaborators{/collaborator}",
//   teams_url: "https://api.github.com/repos/dilpreet96/fragmenter/teams",
//   hooks_url: "https://api.github.com/repos/dilpreet96/fragmenter/hooks",
//   issue_events_url: "https://api.github.com/repos/dilpreet96/fragmenter/issues/events{/number}",
//   events_url: "https://api.github.com/repos/dilpreet96/fragmenter/events",
//   assignees_url: "https://api.github.com/repos/dilpreet96/fragmenter/assignees{/user}",
//   branches_url: "https://api.github.com/repos/dilpreet96/fragmenter/branches{/branch}",
//   tags_url: "https://api.github.com/repos/dilpreet96/fragmenter/tags",
//   blobs_url: "https://api.github.com/repos/dilpreet96/fragmenter/git/blobs{/sha}",
//   git_tags_url: "https://api.github.com/repos/dilpreet96/fragmenter/git/tags{/sha}",
//   git_refs_url: "https://api.github.com/repos/dilpreet96/fragmenter/git/refs{/sha}",
//   trees_url: "https://api.github.com/repos/dilpreet96/fragmenter/git/trees{/sha}",
//   statuses_url: "https://api.github.com/repos/dilpreet96/fragmenter/statuses/{sha}",
//   languages_url: "https://api.github.com/repos/dilpreet96/fragmenter/languages",
//   stargazers_url: "https://api.github.com/repos/dilpreet96/fragmenter/stargazers",
//   contributors_url: "https://api.github.com/repos/dilpreet96/fragmenter/contributors",
//   subscribers_url: "https://api.github.com/repos/dilpreet96/fragmenter/subscribers",
//   subscription_url: "https://api.github.com/repos/dilpreet96/fragmenter/subscription",
//   commits_url: "https://api.github.com/repos/dilpreet96/fragmenter/commits{/sha}",
//   git_commits_url: "https://api.github.com/repos/dilpreet96/fragmenter/git/commits{/sha}",
//   comments_url: "https://api.github.com/repos/dilpreet96/fragmenter/comments{/number}",
//   issue_comment_url: "https://api.github.com/repos/dilpreet96/fragmenter/issues/comments{/number}",
//   contents_url: "https://api.github.com/repos/dilpreet96/fragmenter/contents/{+path}",
//   compare_url: "https://api.github.com/repos/dilpreet96/fragmenter/compare/{base}...{head}",
//   merges_url: "https://api.github.com/repos/dilpreet96/fragmenter/merges",
//   archive_url: "https://api.github.com/repos/dilpreet96/fragmenter/{archive_format}{/ref}",
//   downloads_url: "https://api.github.com/repos/dilpreet96/fragmenter/downloads",
//   issues_url: "https://api.github.com/repos/dilpreet96/fragmenter/issues{/number}",
//   pulls_url: "https://api.github.com/repos/dilpreet96/fragmenter/pulls{/number}",
//   milestones_url: "https://api.github.com/repos/dilpreet96/fragmenter/milestones{/number}",
//   notifications_url: "https://api.github.com/repos/dilpreet96/fragmenter/notifications{?since,all,participating}",
//   labels_url: "https://api.github.com/repos/dilpreet96/fragmenter/labels{/name}",
//   releases_url: "https://api.github.com/repos/dilpreet96/fragmenter/releases{/id}",
//   deployments_url: "https://api.github.com/repos/dilpreet96/fragmenter/deployments",
//   created_at: "2017-03-12T08:58:07Z",
//   updated_at: "2017-07-27T00:24:51Z",
//   pushed_at: "2017-03-15T10:20:38Z",
//   git_url: "git://github.com/dilpreet96/fragmenter.git",
//   ssh_url: "git@github.com:dilpreet96/fragmenter.git",
//   clone_url: "https://github.com/dilpreet96/fragmenter.git",
//   svn_url: "https://github.com/dilpreet96/fragmenter",
//   homepage: "",
//   size: 112,
//   stargazers_count: 60,
//   watchers_count: 60,
//   language: "Java",
//   has_issues: true,
//   has_projects: true,
//   has_downloads: true,
//   has_wiki: true,
//   has_pages: false,
//   forks_count: 3,
//   mirror_url: null,
//   open_issues_count: 1,
//   forks: 3,
//   open_issues: 1,
//   watchers: 60,
//   default_branch: "master",
//   score: 1
//   },
//   {
//   id: 83232878,
//   name: "unpuzzled",
//   full_name: "timjchin/unpuzzled",
//   owner: {
//   login: "timjchin",
//   id: 1714798,
//   avatar_url: "https://avatars0.githubusercontent.com/u/1714798?v=4",
//   gravatar_id: "",
//   url: "https://api.github.com/users/timjchin",
//   html_url: "https://github.com/timjchin",
//   followers_url: "https://api.github.com/users/timjchin/followers",
//   following_url: "https://api.github.com/users/timjchin/following{/other_user}",
//   gists_url: "https://api.github.com/users/timjchin/gists{/gist_id}",
//   starred_url: "https://api.github.com/users/timjchin/starred{/owner}{/repo}",
//   subscriptions_url: "https://api.github.com/users/timjchin/subscriptions",
//   organizations_url: "https://api.github.com/users/timjchin/orgs",
//   repos_url: "https://api.github.com/users/timjchin/repos",
//   events_url: "https://api.github.com/users/timjchin/events{/privacy}",
//   received_events_url: "https://api.github.com/users/timjchin/received_events",
//   type: "User",
//   site_admin: false
//   },
//   private: false,
//   html_url: "https://github.com/timjchin/unpuzzled",
//   description: "A colorful CLI library with variable provenance.",
//   fork: false,
//   url: "https://api.github.com/repos/timjchin/unpuzzled",
//   forks_url: "https://api.github.com/repos/timjchin/unpuzzled/forks",
//   keys_url: "https://api.github.com/repos/timjchin/unpuzzled/keys{/key_id}",
//   collaborators_url: "https://api.github.com/repos/timjchin/unpuzzled/collaborators{/collaborator}",
//   teams_url: "https://api.github.com/repos/timjchin/unpuzzled/teams",
//   hooks_url: "https://api.github.com/repos/timjchin/unpuzzled/hooks",
//   issue_events_url: "https://api.github.com/repos/timjchin/unpuzzled/issues/events{/number}",
//   events_url: "https://api.github.com/repos/timjchin/unpuzzled/events",
//   assignees_url: "https://api.github.com/repos/timjchin/unpuzzled/assignees{/user}",
//   branches_url: "https://api.github.com/repos/timjchin/unpuzzled/branches{/branch}",
//   tags_url: "https://api.github.com/repos/timjchin/unpuzzled/tags",
//   blobs_url: "https://api.github.com/repos/timjchin/unpuzzled/git/blobs{/sha}",
//   git_tags_url: "https://api.github.com/repos/timjchin/unpuzzled/git/tags{/sha}",
//   git_refs_url: "https://api.github.com/repos/timjchin/unpuzzled/git/refs{/sha}",
//   trees_url: "https://api.github.com/repos/timjchin/unpuzzled/git/trees{/sha}",
//   statuses_url: "https://api.github.com/repos/timjchin/unpuzzled/statuses/{sha}",
//   languages_url: "https://api.github.com/repos/timjchin/unpuzzled/languages",
//   stargazers_url: "https://api.github.com/repos/timjchin/unpuzzled/stargazers",
//   contributors_url: "https://api.github.com/repos/timjchin/unpuzzled/contributors",
//   subscribers_url: "https://api.github.com/repos/timjchin/unpuzzled/subscribers",
//   subscription_url: "https://api.github.com/repos/timjchin/unpuzzled/subscription",
//   commits_url: "https://api.github.com/repos/timjchin/unpuzzled/commits{/sha}",
//   git_commits_url: "https://api.github.com/repos/timjchin/unpuzzled/git/commits{/sha}",
//   comments_url: "https://api.github.com/repos/timjchin/unpuzzled/comments{/number}",
//   issue_comment_url: "https://api.github.com/repos/timjchin/unpuzzled/issues/comments{/number}",
//   contents_url: "https://api.github.com/repos/timjchin/unpuzzled/contents/{+path}",
//   compare_url: "https://api.github.com/repos/timjchin/unpuzzled/compare/{base}...{head}",
//   merges_url: "https://api.github.com/repos/timjchin/unpuzzled/merges",
//   archive_url: "https://api.github.com/repos/timjchin/unpuzzled/{archive_format}{/ref}",
//   downloads_url: "https://api.github.com/repos/timjchin/unpuzzled/downloads",
//   issues_url: "https://api.github.com/repos/timjchin/unpuzzled/issues{/number}",
//   pulls_url: "https://api.github.com/repos/timjchin/unpuzzled/pulls{/number}",
//   milestones_url: "https://api.github.com/repos/timjchin/unpuzzled/milestones{/number}",
//   notifications_url: "https://api.github.com/repos/timjchin/unpuzzled/notifications{?since,all,participating}",
//   labels_url: "https://api.github.com/repos/timjchin/unpuzzled/labels{/name}",
//   releases_url: "https://api.github.com/repos/timjchin/unpuzzled/releases{/id}",
//   deployments_url: "https://api.github.com/repos/timjchin/unpuzzled/deployments",
//   created_at: "2017-02-26T19:01:39Z",
//   updated_at: "2017-06-26T07:54:54Z",
//   pushed_at: "2017-06-26T14:17:26Z",
//   git_url: "git://github.com/timjchin/unpuzzled.git",
//   ssh_url: "git@github.com:timjchin/unpuzzled.git",
//   clone_url: "https://github.com/timjchin/unpuzzled.git",
//   svn_url: "https://github.com/timjchin/unpuzzled",
//   homepage: "",
//   size: 373,
//   stargazers_count: 59,
//   watchers_count: 59,
//   language: "Go",
//   has_issues: true,
//   has_projects: true,
//   has_downloads: true,
//   has_wiki: true,
//   has_pages: false,
//   forks_count: 2,
//   mirror_url: null,
//   open_issues_count: 1,
//   forks: 2,
//   open_issues: 1,
//   watchers: 59,
//   default_branch: "master",
//   score: 1
//   }
//   ]
// }

// renderName(response)