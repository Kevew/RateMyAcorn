// This is the case for course search

// Create button element
let enableButton = document.createElement("a");
enableButton.className = "inspectText";
enableButton.text = "Inspect Prof Information";
enableButton.style.textDecoration = "none";
enableButton.id = "button";

let watchbody = document.body;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var observer = new MutationObserver(function (event) {
    if(enabledExtension === "false"){
        return;
    }
    if(event[0].target.className == "modal-open"){
        waitForElm('td.instructor[data-ng-class] div.instructorDetails').then((elm) => {
            watchbody.querySelector("h2.modal-title").insertAdjacentElement('beforebegin', enableButton)
            .addEventListener('click', getFunc);
            updateContentValues();
        });
    }else{
        content2 = [];
    }
});

let content2 = [];

async function updateContentValues(){
    await sleep(500);
    let elements = document.querySelectorAll(["tbody.primaryActivity[data-ng-repeat]",
        "tbody.primaryActivity[data-ng-show]:not(.ng-hide)"]);
    for(let i = 0;i < elements.length;i++){
        // Create area to show statistics
        let profName = elements[i].querySelector("td.instructor div.instructorDetails").textContent.trim();
        content2.push([profName, generateContentPage(i, "190%", true)]);
    }
}

function generateContentPage(i, percent, search){

    let ratingContent = document.createElement("tbody");
    ratingContent.style.height = "18vh"
    ratingContent.style.width = percent;
    ratingContent.className = "ratingContent";
    ratingContent.style.display = "flex";
    ratingContent.style.position = "relative";
    ratingContent.style.alignItems = "stretch";
    if(search){
        ratingContent.style.marginBottom = "2vh";
        ratingContent.style.marginTop = "2vh";
    }

    let leftSide = document.createElement("div");
    leftSide.className = "LeftSideDiv";
    leftSide.style.width = "33%";
    leftSide.style.height = "100%";
    leftSide.style.flexDirection = "column";
    leftSide.style.display = "flex";
    leftSide.style.justifyContent = "center";
    leftSide.style.alignItems = "center";
    ratingContent.appendChild(leftSide);

    let ratingwrapper = document.createElement("div");
    ratingwrapper.className = "ratingcircle";
    ratingwrapper.setAttribute("data-progress", "36");
    ratingwrapper.style = "--progress: 36deg;";
    leftSide.appendChild(ratingwrapper);

    let nOfRating = document.createElement("div");
    nOfRating.className = "rateNOfRating".concat(i.toString());
    nOfRating.textContent = "Based On 30 Reviews";
    nOfRating.style.marginTop = "1vh";
    leftSide.appendChild(nOfRating);


    let rightSide = document.createElement("div");
    rightSide.style.width = "67%";
    rightSide.style.height = "15vh";
    rightSide.style.display = "flex";
    rightSide.style.flexDirection = "column";
    rightSide.style.alignItems = "flex-start";
    rightSide.className = "RightSideDiv";
    ratingContent.appendChild(rightSide);

    // Create and style child elements
    let profNameElement = document.createElement("div");
    profNameElement.className = "rateProfName".concat(i.toString());
    profNameElement.style.fontWeight = "600";
    profNameElement.style.fontSize = "1.8em";
    profNameElement.textContent = "Prof's Name";
    profNameElement.style.flex = "1";
    rightSide.appendChild(profNameElement);


    let difficultyDiv = document.createElement("div");
    difficultyDiv.style.width = "100%";
    difficultyDiv.style.flex = "1";
    difficultyDiv.style.display = "flex";
    let textC = document.createElement("div");
    textC.style.verticalAlign = "middle";
    textC.textContent = "Difficulty Level: ";
    textC.style.fontWeight = "300";
    textC.style.fontSize = "1.5em";
    textC.style.flex = "5";

    let progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    progressBar.style.float = "right";
    progressBar.style.position = "relative";
    progressBar.style.width = "200px";
    progressBar.style.height = "30px";
    progressBar.style.flex = "8";
    progressBar.style.borderRadius = "5px";
    progressBar.style.background = "#9cbab4";
    progressBar.style.overflow = "hidden";
    let progressFill = document.createElement("div");
    progressFill.className = "FillrateDifficulty".concat(i.toString());
    progressFill.style.width = "50%";
    progressFill.style.height = "100%";
    progressFill.style.background = "#009579";
    let progressText = document.createElement("div");
    progressText.className = "rateDifficulty".concat(i.toString());
    progressText.textContent = "50%";
    progressText.style.position = "absolute";
    progressText.style.top = "50%";
    progressText.style.right = "5px";
    progressText.style.transform = "translateY(-50%)";

    progressBar.appendChild(progressFill);
    progressBar.appendChild(progressText);
    difficultyDiv.appendChild(textC);
    difficultyDiv.appendChild(progressBar);
    rightSide.appendChild(difficultyDiv);

    let takeAgainDiv = document.createElement("div");
    takeAgainDiv.style.width = "100%";
    takeAgainDiv.style.flex = "1";
    takeAgainDiv.style.display = "flex";
    let textC2 = document.createElement("div");
    textC2.style.verticalAlign = "middle";
    textC2.textContent = "Re-take Again: ";
    textC2.style.fontWeight = "300";
    textC2.style.fontSize = "1.5em";
    textC2.style.flex = "5";

    let progressBar2 = document.createElement("div");
    progressBar2.className = "progress-bar";
    progressBar2.style.float = "right";
    progressBar2.style.position = "relative";
    progressBar2.style.width = "200px";
    progressBar2.style.height = "30px";
    progressBar2.style.flex = "8";
    progressBar2.style.borderRadius = "5px";
    progressBar2.style.background = "#9cbab4";
    progressBar2.style.overflow = "hidden";
    let progressFill2 = document.createElement("div");   
    progressFill2.className = "FillrateTakeAgain".concat(i.toString());
    progressFill2.style.width = "50%";
    progressFill2.style.height = "100%";
    progressFill2.style.background = "#009579";
    let progressText2 = document.createElement("div");
    progressText2.className = "rateTakeAgain".concat(i.toString());
    progressText2.textContent = "50%";
    progressText2.style.position = "absolute";
    progressText2.style.top = "50%";
    progressText2.style.right = "5px";
    progressText2.style.transform = "translateY(-50%)";

    progressBar2.appendChild(progressFill2);
    progressBar2.appendChild(progressText2);
    takeAgainDiv.appendChild(textC2);
    takeAgainDiv.appendChild(progressBar2);
    rightSide.appendChild(takeAgainDiv);

    let linkToWebDiv = document.createElement("a");
    linkToWebDiv.className = "rateLinkToUser".concat(i.toString());
    linkToWebDiv.style.textAlign = "center";
    linkToWebDiv.textContent = "Visit Page to See More Reviews";
    linkToWebDiv.style.fontSize = "13px";
    linkToWebDiv.href = "https://www.ratemyprofessors.com";
    linkToWebDiv.style.flex = "0 0 20%";
    linkToWebDiv.target = "_blank";
    rightSide.appendChild(linkToWebDiv);

    return ratingContent;
}


let coolDownButton = new Date().getTime() - 10000;

// Basically copied from contentModify
async function getFunc(){
    if(coolDownButton + 10000 >= new Date().getTime()){
        return;
    }
    coolDownButton = new Date().getTime();
    let elements = document.querySelectorAll([
        "td.instructor[data-ng-class] div.instructorDetails",
        "tbody.primaryActivity[data-ng-show]:not(.ng-hide) tr td.instructor div.instructorDetails"]);
    let names = new Set();

    for(let i = 0; i < elements.length; i++) {
        names.add(elements[i].textContent.trim())
    }
    names.forEach(element => {
        if(element == "TBA"){
            names.delete(element);
        }
    });

    const arrNames = Array.from(names);
    enableButton.textContent = "Loading...";

    let data = getCookieData(arrNames);
    for(let i = data.length - 1;i >= 0;i--){
        if(arrNames.includes(data[i].name)){
            arrNames.splice(arrNames.indexOf(data[i].name), 1);
        }
    }

    // Send message to background script to scrape RMP
    let [data0, retryOne] = await webscrape(arrNames, 0);
    let [data1, retryTwo] = await webscrape(retryOne, 1);
    let [data2, retryThree] = await webscrape(retryTwo, 2);
    let [data3, unAvaliable] = await webscrape(retryThree, 3);
    let fullData = data0.concat(data1, data2, data3);
    
    // Update localstorage for new data
    for(let i = 0;i < fullData.length;i++){
        fullData[i].createdAt = new Date().getTime();
        localStorage.setItem(fullData[i].name + "RateMyTrackCookie", JSON.stringify(fullData[i]));
    }
    // Read cookie data
    fullData = fullData.concat(data);

    updateContentBoxInfoCourse(fullData);
    enableButton.textContent = "Inspect Prof Information";
}


function updateContentBoxInfoCourse(data){
    let elements = document.querySelectorAll("tbody.primaryActivity[data-ng-repeat]");
    for(let i = 0;i < elements.length;i++){
        let exists = -1;
        let middleCheck = "oasjdoisjoiasjdoiasdjoisajdoias";
        if(content2[i][0].split(' ').length === 3){
            middleCheck = content2[i][0].split(' ')[0] + " " + content2[i][0].split(' ')[2];
        }
        for(let j = 0;j < data.length;j++){
            if(data[j].name == content2[i][0] || middleCheck == data[j].name){
                exists = j;
                break;
            }
        }
        if(content2[i][0] === "TBA"){
            exists = -1;
        }
        elements[i].insertAdjacentElement("afterend", content2[i][1]);
        if(exists !== -1){
            // If it fetched the data, update the page
            updateContentDiv(i, i, content2, elements, data, exists);
        }else{
            // Show that it couldn't update
            content2[i][1].innerText = "Unable to Fetch Data.";
            content2[i][1].style.height = "4vh";
        }
    }


    let start = elements.length;
    elements = document.querySelectorAll("tbody.primaryActivity[data-ng-show]:not(.ng-hide)");
    for(let i = 0;i < elements.length;i++){
        let exists = -1;
        let middleCheck = "oasjdoisjoiasjdoiasdjoisajdoias";
        if(content2[i + start][0].split(' ').length === 3){
            middleCheck = content2[i + start][0].split(' ')[0] + " " + content2[i + start][0].split(' ')[2];
        }
        for(let j = 0;j < data.length;j++){
            if(data[j].name == content2[i + start][0] || middleCheck == data[j].name){
                exists = j;
                break;
            }
        }
        if(content2[i + start][0] === "TBA"){
            exists = -1;
        }
        elements[i].insertAdjacentElement("afterend", content2[i + start][1]);
        if(exists !== -1){
            // If it fetched the data, update the page
            updateContentDiv(i + start, i, content2, elements, data, exists);
        }else{
            // Show that it couldn't update
            content2[i + start][1].innerText = "Unable to Fetch Data.";
            content2[i + start][1].style.height = "4vh";
        }
    }
}

function updateContentDiv(contentPos, elementPos, content, element, data, exists){
    content[contentPos][1]
    .querySelector("div." + "rateProfName".concat((contentPos).toString()))
    .textContent = data[exists].name;

    if(data[exists].rating === "N/A"){
        data[exists].rating = "0";
    }

    let temp = content[contentPos][1]
    .querySelector("div." + "ratingcircle");
    temp.setAttribute("data-progress", data[exists].rating);
    temp.style = "--progress: " + (Number(data[exists].rating) * 72).toString() + "deg;";

    let colorRatingBackground = calculateColor(Number(data[exists].rating)*20, false);

    temp.style.background = `conic-gradient(
        rgb(${colorRatingBackground[0]}, ${colorRatingBackground[1]}, ${colorRatingBackground[2]}) calc(${(Number(data[exists].rating) * 72)} * 1deg), 
        gray 0deg
    )`;

    content[contentPos][1]
    .querySelector("div.progress-bar div." + "rateDifficulty".concat((contentPos).toString()))
    .textContent = data[exists].difficulty;

    content[contentPos][1]
    .querySelector("div.progress-bar div." + "FillrateDifficulty".concat((contentPos).toString()))
    .style.width = (data[exists].difficulty === "N/A" ? "0%": (Number(data[exists].difficulty)*20).toString() + "%");

    if(data[exists].difficulty !== "N/A"){
        let colorDifficulty = calculateColor(Number(data[exists].difficulty)*20, true);

        content[contentPos][1]
        .querySelector("div.progress-bar div." + "FillrateDifficulty".concat(contentPos.toString()))
        .style.background = `rgb(${colorDifficulty[0]}, ${colorDifficulty[1]}, ${colorDifficulty[2]})`;
    }
            
    content[contentPos][1]
    .querySelector("div." + "rateNOfRating".concat(contentPos.toString()))
    .textContent = "Based On " + data[exists].nOfRatings + " Reviews";

    data[exists].link = data[exists].link.substring(26);

    content[contentPos][1]
    .querySelector("a." + "rateLinkToUser".concat((contentPos).toString()))
    .href = "https://www.ratemyprofessors.com/" + data[exists].link;

    content[contentPos][1]
    .querySelector("div.progress-bar div." + "rateTakeAgain".concat(contentPos.toString()))
    .textContent = data[exists].takeAgain;

    content[contentPos][1]
    .querySelector("div." + "FillrateTakeAgain".concat(contentPos.toString()))
    .style.width =  (data[exists].takeAgain === "N/A" ? "0%": data[exists].takeAgain);

    if(data[exists].takeAgain !== "N/A"){
        let colorTakeAgain = calculateColor(Number(data[exists].takeAgain.slice(0, -1)), false);
            
        content[contentPos][1]
        .querySelector("div." + "FillrateTakeAgain".concat((contentPos).toString()))
        .style.background = `rgb(${colorTakeAgain[0]}, ${colorTakeAgain[1]}, ${colorTakeAgain[2]})`;
    }
}


observer.observe(watchbody, {
    attributes: true, 
    attributeFilter: ['class'],
    childList: false, 
    characterData: false
});
  
