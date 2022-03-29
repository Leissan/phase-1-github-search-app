document.addEventListener("DOMContentLoaded", () => {



    const form = document.getElementById('github-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
       // if we  console.log(e) we can see that 0: input#search is under index 0
       //so if we do e.target[0].value we will get whatever the user types in there
      // e.target[0].value - we will need it for next steps

      getUsers(e.target[0].value)
      form.reset()
      const userList = document.querySelector('#user-list')
      userList.textContent = ''
      const repoList = document.querySelector('#repos-list')
      repoList.textContent=''

    })

})

function getUsers (username) {
    fetch(`https://api.github.com/search/users?q=${username}`, {
        method: "GET",
        headers: {
            Accept: "application/vnd.github.v3+json"

        }
    })
    .then (response => response.json())
    .then (response => response.items.map(item=>displayUser(item)))
}

function displayUser(user) {
    // we need login and avatar_url
    const userList = document.querySelector('#user-list')
    const li = document.createElement ('li')
    const image = document.createElement('img')
    image.src = user.avatar_url
    image.alt = user.login
    image.id = user.login
    image.dataset.login = user.login //another way od accessing inromation if you need
    //to be able to pass it to an element to be able to retrieve at a later time
    image.addEventListener('click', getRepositories)
    const h3 = document.createElement('h3')
    h3.textContent = user.login //we can see that from consoled response)
    li.append (image, h3)
    userList.append(li)

}

function getRepositories (event) {
    //console.log("event from getRepos", event.target.id)
    const repoList = document.querySelector('#repos-list')
    repoList.textContent=''
    fetch(`https://api.github.com/users/${event.target.id}/repos`, {
        method: "GET",
        headers: {
            Accept: "application/vnd.github.v3+json"

        }
    })
    .then (response => response.json())
    .then (response => response.map (r => displayRepository(r)))
}


function displayRepository(repo) {
    // we need to display a name of each repo
    const repoList = document.querySelector('#repos-list')
    const li = document.createElement ('li')
    li.textContent = repo.name
    repoList.append(li)

}
    /*fetch(`https://api.github.com/search/user/${event.target.id}/repos`, {
        method: "GET",
        headers: {
            Accept: "application/vnd.github.v3+json"

        }
    })
    .then( response => response.json)
    .tehn (response => console.log("list of repos => ", response))
}*/
