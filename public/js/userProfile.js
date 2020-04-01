
function stravaConnection(){

    let url = 'https://developers.strava.com/docs/reference/#api-Athletes-getLoggedInAthlete';
    let token = 'b98f0e8d187ea6d1d829b8735c8f45e9e326cba7 ';
    let header = 'Authorization: Bearer '+ token;

    fetch(url,{
        method: 'GET',
        headers: {
            header
        }
    }).then(res => res.json())
    .then(console.log(res));
   
}



function init(){

    document.getElementById('btn-strava').addEventListener('click',stravaConnection);

}


window.addEventListener('load',init);