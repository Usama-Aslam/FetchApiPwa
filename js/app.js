/* service worker registraion */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../serviceworker.js')
        .then(function () {
            console.log('Service Worker Registered');
        });
}

/* app script */
const main = document.querySelector("#div");
window.addEventListener('load', async e => {
    Followers();
})

$(document).ready(function(){
    $("#search").on("keyup", function() {
        var search = document.getElementById('search');
        var filter = search.value.toLocaleUpperCase(); 
        var card_body = document.getElementsByClassName('card');//li

        for (i = 0; i < card_body.length; i++) {
            var h5 = card_body[i].getElementsByTagName('h6')[0];
            if (h5.innerHTML.toLocaleUpperCase().indexOf(filter) > -1) {
            
                card_body[i].style.display = 'inline-block'; 
            }
            else { 
                card_body[i].style.display = 'none'; 
            }
        }
    });
});

async function Followers() {
    const res = await fetch(`https://api.github.com/users/Usama-Aslam/followers`)
    const json = await res.json();
    console.log(json);
    main.innerHTML = json.map((v, i) => {
        return `
        <div class="card" style="width: 18rem; margin:10px;">
            <img class="card-img-top" src="${v.avatar_url}" alt="Card image cap">
            <div class="card-body" style="padding:10px;">
                <h6 class="card-title">${v.login}</h6>
                <p class="card-text">UserID: ${v.id}</p>
                <a href="${v.html_url}" target="_blank" class="btn btn-info btn-block">View Profile</a>
            </div>
        </div>`
    });
}