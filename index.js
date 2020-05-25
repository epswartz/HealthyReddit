function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function updateDisplay(disp) {
    document.getElementById("display").textContent = disp;
}

const now = new Date()
const epoch = Math.round(now.getTime() / 1000)
const oneDayAgo = epoch - 86400

resp = httpGet("https://api.pushshift.io/reddit/search/submission?size=10&after=" + oneDayAgo.toString())
redditResp = JSON.parse(resp)
const ids = redditResp.data.map(x => x.id)
console.log(ids)
updateDisplay(ids.join(", "))
