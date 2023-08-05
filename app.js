//variables
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchbtn");

const newsQuery= document.getElementById("newsQuery");
const newsType= document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

window.onload = function(){
    newsType.innerHTML="<h4>Headlines</h4>"
    fetchHeadlines();
};
// Array
var newsdataArr = [];


//apis
const apiKey="e22e1650d3b641eca58028579c54fb29";
const headlines_news = "https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const business_news = "https://newsapi.org/v2/top-headlines?country=in&category=business&apikey="
const general_news = "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey="
const sports_news = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apikey="
const entertainment_news = "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey="
const technology_news = "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey="
const search_news = "https://newsapi.org/v2/everything?q="


generalBtn.addEventListener("click", function(){
    newsType.innerHTML="<h4>General News</h4>";
    fetchGeneralNews();
})

businessBtn.addEventListener("click", function(){
    newsType.innerHTML="<h4>Business News</h4>";
    fetchBusinessNews();
})

sportsBtn.addEventListener("click", function(){
    newsType.innerHTML="<h4>Sports News</h4>";
    fetchsportsNews();
})

entertainmentBtn.addEventListener("click", function(){
    newsType.innerHTML="<h4>Entertainment News</h4>";
    fetchentertainmentNews();
})

technologyBtn.addEventListener("click", function(){
    newsType.innerHTML="<h4>Technology News</h4>";
    fetchtechnologyNews();
})

searchBtn.addEventListener("click", function(){
    newsType.innerHTML="<h4>Search : "+newsQuery.value +"</h4>";
    fetchQueryNews();
})

const  fetchHeadline = async() => {
    const response = await fetch(headlines_news+apiKey);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsdataArr = myJson.articles;
        console.log(newsdataArr)
    }else{
        //handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}



const fetchGeneralNews = async() => {
    const response = await fetch(general_news+apiKey);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsdataArr = myJson.articles;
    }else{
        //handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

const fetchBusinessNews = async() => {
    const response = await fetch(business_news+apiKey);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsdataArr = myJson.articles;
    }else{
        //handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

const fetchsportsNews = async() => {
    const response = await fetch(sports_news+apiKey);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsdataArr = myJson.articles;
    }else{
        //handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

const fetchentertainmentNews = async() => {
    const response = await fetch(entertainment_news+apiKey);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        console.log(myJson);
        newsdataArr = myJson.articles;
    }else{
        //handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

const fetchtechnologyNews = async() => {
    const response = await fetch(technology_news+apiKey);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsdataArr = myJson.articles;
    }else{
        //handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

const fetchQueryNews = async() => {
    if(newsQuery.value == null)
    return;
    const response = await fetch(search_news+encodeURIComponent(newsQuery.value)+ "&apikey="+apiKey);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsdataArr = myJson.articles;
    }else{
        //handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

function displayNews(){
    newsdetails.innerHTML="";
    if(newsdataArr.length == 0){
        newsdetails.innerHTML = "<h5> No data found. </h5>"
        return;
    }
    
    newsdataArr.forEach(news => {

        var date = news.publishedAt.split("T");
        var col = document.createElement('div');
        col.className="col-sm12 col-md col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height","matchparent");
        image.setAttribute("width","100%");
        image.src=news.urlToImage;

        var cardBody = document.createElement('div');
        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className="text-primary";
        dateHeading.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML = news.description;

        var link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML ="Read More... ";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
       })
}