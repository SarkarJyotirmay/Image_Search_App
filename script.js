let page = 1;

let API = `https://api.unsplash.com/search/photos?page=${page}&query=`; //inout goes at the last
let example_API = `https://api.unsplash.com/search/photos?page=${page}&query=avengers`
const ACESS_KEY = "pPf0b6TnHCt3ROnc3nzNo1RpP42QQl_Cqbt68X7Hq9c";
const API_KEY = "rP1L4YhBiRq2peZCymz1NCi4CnZc7V-MkV-sXJ0z8KY";

const form = document.querySelector("form");
const input = document.querySelector("input");
const resultsContainer = document.querySelector(".results-containainer");
const loader = document.querySelector(".loader")

let images = []; // to store the fetched data

showDefault(); // display dummy data fteched from api by default
// showDefault Function show some dummy data here in this case avengers 
// this function is an extension of the project read this function later if got confused
async function showDefault(){
 let data =  await getData(example_API);
 data = data.results
//  console.log(data);
 displayData(data);
 // loadmore increases the page number calls getData with updated API then calls displayData again with updated images array
 const loadMore = document.createElement("button");
 loadMore.innerText = "Load Mmore..."
 loadMore.classList.add("load-more");
//  event on load more
 loadMore.addEventListener("click", async(e)=>{
   page += 1;
  example_API = `https://api.unsplash.com/search/photos?page=${page}&query=avengers`;
  let data =  await getData(example_API);
 data = data.results
 console.log(data);
 displayData(data);
 })

 loader.append(loadMore) // append loadeMore to loader div 
}

// on submit the form fetches data by using getData then calls display data function with fetched data 
// > display searched images and add a loadmore bbutton 
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value;
  const data = await getData(API + query);
  images = data.results;
  // console.log(images);
  displayData(images); //display images

// on submit of form there will be a load more button arival
// loadmore increases the page number calls getData with updated API then calls displayData again with updated images array
  const loadMore = document.createElement("button");
  loadMore.innerText = "Load Mmore..."
  loadMore.classList.add("load-more");
  loadMore.addEventListener("click", async(e)=>{
    page += 1;
    API = `https://api.unsplash.com/search/photos?page=${page}&query=`; //inout goes at the last
    const query = input.value;
    const data = await getData(API + query);
    images = data.results;
    // console.log(images);
    displayData(images);
  })

  loader.append(loadMore) // append loadeMore to loader div 
});

//! get data function > fetches data from API 
async function getData(url) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${ACESS_KEY}`,
    },
  });
  const result = await response.json();
  return result;
}

//!  display data function > creates a div with image and anchor and show them at the end 
function displayData(arr) {
  console.log(arr);
  // resultsContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  arr.forEach((obj) => {
    const parent = document.createElement("div");
    parent.classList.add("parent");
    const image = document.createElement("img");
    image.src = obj.urls.small;
    image.alt = obj.alt_description;

    const description = document.createElement("a");
    description.href = obj.links.html;
    description.innerText = obj.alt_description;
    description.target = "blank";

    parent.append(image, description);
    fragment.append(parent);
  });
 
  resultsContainer.append(fragment);
}


/* 
Flow >>>

form submission > 
call getData(URL) : gives json (data) >
convert json to array >
dcall isplayData(arr)

Extended : showDefault(exampleURL) > to show dummy data
*/
 