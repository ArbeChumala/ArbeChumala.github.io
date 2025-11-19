let followersJSON;
let followersArray = [];
let followingJSON;
let followingArray = [];
let traitorsArray = [];
let index = 0;
const INDEX_CHANGE = 5;

function preload(){
  followersJSON = loadJSON("followers_1.json");
  followingJSON = loadJSON("following.json");
}

function clean(url) {
  return url.replace("/_u/", "/");
}

function setup(){
  //makes array of all that follow me
  for(let index in followersJSON){
    followersArray.push(clean(followersJSON[index].string_list_data[0].href));
  }
  //iterates through the people I follow
  for(let index in followingJSON){
    followingArray.push(clean(followingJSON[index].string_list_data[0].href));
  }

  for(let person of followingArray){
    //checks if they follow me back    
    if (!followersArray.includes(person)){
      //the person I follow does not follow me back
      traitorsArray.push(person);
    }
  }
  for (let person of traitorsArray){
    console.log(person);
  }
  
  saveStrings(traitorsArray, "traitors.txt");
}
