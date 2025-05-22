let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResults(result) {
    // container Element 
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");


    // title Element 

    let {
        link,
        title,
        description
    } = result;
    let resultsTitleEl = document.createElement("a");
    resultsTitleEl.href = link;
    resultsTitleEl.target = "_blank";
    resultsTitleEl.textContent = title;
    resultsTitleEl.classList.add("result-title");
    resultItemEl.appendChild(resultsTitleEl);

    // break Element 
    let breakEl = document.createElement("br");
    resultItemEl.appendChild(breakEl);

    // url Element 
    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    urlEl.classList.add("result-url");
    resultItemEl.appendChild(urlEl);

    // break Element2 

    let breakEl2 = document.createElement("br");
    resultItemEl.appendChild(breakEl2);

    // description Element 
    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("link-description");
    resultItemEl.appendChild(descriptionEl);

    searchResultsEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResults(result);
    }
}

function searchWikiPedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";
        let searchingInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchingInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }

}
searchInputEl.addEventListener('keydown', searchWikiPedia);
