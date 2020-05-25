function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

const now = new Date()
const epoch = Math.round(now.getTime() / 1000)
const oneDayAgo = epoch - 86400

resp = httpGet("https://api.pushshift.io/reddit/search/submission?size=10&subreddit=pics&after=" + oneDayAgo.toString())
redditResp = JSON.parse(resp)
const ids = redditResp.data.map(x => x.id)

// Put the cards for posts into the column
var column = document.currentScript.ownerDocument.querySelector("#post-column")
var card_template = document.currentScript.ownerDocument.querySelector("#post-card")

// Build and insert all the cards
redditResp.data.forEach(e => {
    console.log("Creating card for:", e.id)
    var newCard = document.createElement("div")
    newCard.className = "card bg-secondary mt-2"

    var cardCol = document.createElement("div")
    cardCol.className = "col mt-2"

    var cardBlock = document.createElement("div")
    cardBlock.className = "card-block"

    var cardTitle = document.createElement("h4")
    cardTitle.className = "card-title"
    cardTitle.textContent = e.title

    var linkButton = document.createElement("a")
    linkButton.className = "btn btn-primary mr-2 mb-2"
    linkButton.href = e.full_link
    linkButton.role = "button"
    linkButton.textContent = "Reddit Comments"

    cardBlock.appendChild(cardTitle)
    cardBlock.appendChild(linkButton)
    cardCol.appendChild(cardBlock)
    newCard.appendChild(cardCol)
    column.appendChild(newCard)
});
