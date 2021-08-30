(function($) {
 var searchForm = $('#searchForm')
 var searchTerm = $('#search_term')
 var ul = $('#showList')
 var err = $('#error')
 var err1 = $('#error1')
 err.hide()
 err1.hide()
 $('#homeLink').hide()

//  console.log('eachli '+JSON.stringify(eachLi))

function searchTvMaze(term) {
    $('#homeLink').show()
    var html = ''
    // console.log("term  " + term)
    let url = `http://api.tvmaze.com/search/shows?q=${term}`

    $.getJSON(url).done(function(response){
        // console.log(response)
        response.forEach(res => {
            // console.log(res.show.name)
            html += `<li id="${res.show.id}"><a href="${res.show._links.self.href}">${res.show.name}</a></li>`
            // ul.append(html)
        })
        if (html.length == 0){
            err1.show()
        }else{
            err1.hide()
        }
        $('#showList').html(html)
        let eachLi = $('#showList li')
        for ( i = 0; i<eachLi.length;i++) {
            console.log(eachLi[i].id)
            id = eachLi[i].id
            eachLi[i].addEventListener('click', function (event){
                event.preventDefault()
                // console.log(this.id)
                showInfo(this.id)
            } )
        }
    })
}

function populateShows(){
    var html = ''
    let url = `http://api.tvmaze.com/shows`
    $.getJSON(url).done(function (response){
        response.forEach(res => {
            // console.log(res._links.self.href + " Href")
            html += `<li id="${res.id}"><a href="${res._links.self.href}">${res.name}</a></li>`
        })
        console.log(html)
        $('#showList').html(html)
        let eachLi = $('#showList li')
        for ( i = 0; i<eachLi.length;i++) {
            console.log(eachLi[i].id)
            id = eachLi[i].id
            eachLi[i].addEventListener('click', function (event){
                event.preventDefault()
                // console.log(this.id)
                showInfo(this.id)
            } )
        }

    })
}
// console.log(populateShows)
populateShows()
function showInfo(id) {
    $('#homeLink').show()
    err.hide()
    err1.hide()
    if (!id) window.alert("error")

    let url = `http://api.tvmaze.com/shows/${id}`

    $.getJSON(url).then(function (show) {
        var genres = ''
        var network = ''
        var image = ''
        if(show.image == null || show.image.medium == null){
            image = '/public/img/no_image.jpeg'
        }else {
            image = show.image.medium
        }

        if(show.name == null){
            show.name = 'N/A'
        }
        if(show.language == null){
            show.language = 'N/A'
        }
        if(show.rating.average == null){
            show.rating.average = 'N/A'
        }

        if(show.network == null || show.network.name == null){
            network = 'N/A'
        }else{
            network = show.network.name
        }

        if(show.summary == null){
            show.summary = 'N/A'
        }
        // console.log(show.genres)
        if( show.genres == null){
            genres = `N/A`
        } else {
            for ( i = 0 ; i < show.genres.length ; i++){
                // console.log(show.genres[i])
                genres += `<li>${show.genres[i]}</li>`
            }
        }
        // console.log(html)
        

        let showInfo = 

        `<h1>${show.name}</h1>'
        <img src="${image}" alt="${show.name}">
        <dl> 
        <dt>Language</dt>
        <dd>${show.language}</dd>
        <dt>Genres</dt>
        <dd>${genres}</dd>
        <dt>Rating average</dt>
        <dd>${show.rating.average}</dd>
        <dt>Network name</dt>
        <dd>${network}</dd>
        <dt>Summary</dt>
        <dd>${show.summary}</dd>
        </dl>
        `
        // console.log(showInfo)
        $('#show').html(showInfo).show()
        $('#showList').hide()
    })
}
 searchForm.submit(function(event){
     event.preventDefault();
     $('#showList').show()
     $('#show').hide()
    //  console.log(searchTerm.val())
     let $searchItem = searchTerm
     let term = $searchItem.val()
     
     if (($searchItem.val().replaceAll(' ', '')).length == 0){
        err.show()
    }else{
        err.hide()
        $searchItem.val('')
        searchTvMaze(term)
    }
     
 })

 console.log("ready")

})(window.jQuery);