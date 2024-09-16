// Check what happens when you go from another part of Acorn to the courses page
window.addEventListener('popstate', function (event) {
	let a = window.location;
    if(a.toString().length >= 39 && a.toString().substring(0,39) == "https://acorn.utoronto.ca/sws/#/courses"){
        buildButton();
    }
});

// Check what happens when you directly go to the courses page
window.addEventListener('load', function () {
    let a = window.location;
    if(a.toString().length >= 39 && a.toString().substring(0,39) == "https://acorn.utoronto.ca/sws/#/courses"){
        buildButton();
    }
})

// Function to wait for a element to appear
function waitForElm(selector) {
    return new Promise(resolve => {
        if(document.querySelector(selector)){
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

let content = [];

// Create a button next to the enrollment cart
function buildButton(){
    waitForElm('div.instructorDetails').then((elm) => {
        // Add review sections
        let elements = document.querySelectorAll(".courseBox");
        for(let i = 0;i < elements.length;i++){
            // Create area to show statistics
            let profName = elements[i].querySelector("td.instructor div.instructorDetails").textContent.trim();
            let ratingContent = document.createElement("div");
            ratingContent.style.height = "18vh";
            ratingContent.className = "ratingContent";
            ratingContent.style.display = "flex";
            ratingContent.style.position = "relative";
            ratingContent.style.alignItems = "stretch";

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
        
            content.push([profName, ratingContent]);
        }
        showInfo();
    });
}

// Find the data for all cookies
function getCookieData(arrNames){
    let data = [];
    for(let i = 0;i < arrNames.length;i++){
        let temp = localStorage.getItem(arrNames[i] + "RateMyTrackCookie");
        if(temp != null){
            if(temp.createdAt + 86400000 <= Date.now()){
                localStorage.removeItem(arrNames[i] + "RateMyTrackCookie");
            }
            let dataElement = JSON.parse(temp);
            data.push(dataElement);
        }
    }
    return data;
}

// Main Function to find all instructors name
// What happens when you click the button
const showInfo = async () => {
    let elements = document.querySelectorAll(".instructor .instructorDetails");
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
    fullData = fullData.concat(data);
    // Update the UI in acorn;
    updateContentBoxInfo(fullData);
}

function updateContentBoxInfo(data){
    let elements = document.querySelectorAll(".courseBox");
    for(let i = 0;i < content.length;i++){
        let exists = -1;
        let middleCheck = "oasjdoisjoiasjdoiasdjoisajdoias";
        if(content[i][0].split(' ').length === 3){
            middleCheck = content[i][0].split(' ')[0] + " " + content[i][0].split(' ')[2];
        }
        for(let j = 0;j < data.length;j++){
            if(data[j].name == content[i][0] || middleCheck == data[j].name){
                exists = j;
                break;
            }
        }
        if(content[i][0] === "TBA"){
            exists = -1;
        }
        elements[i].appendChild(content[i][1]);
        if(exists !== -1){
            // If it fetched the data, update the page
            content[i][1]
            .querySelector("div." + "rateProfName".concat(i.toString()))
            .textContent = data[exists].name;

            if(data[exists].rating === "N/A"){
                data[exists].rating = "0";
            }

            let temp = content[i][1]
            .querySelector("div." + "ratingcircle");
            temp.setAttribute("data-progress", data[exists].rating);
            temp.style = "--progress: " + (Number(data[exists].rating) * 72).toString() + "deg;";

            let colorRatingBackground = calculateColor(Number(data[exists].rating)*20, false);

            temp.style.background = `conic-gradient(
                rgb(${colorRatingBackground[0]}, ${colorRatingBackground[1]}, ${colorRatingBackground[2]}) calc(${(Number(data[exists].rating) * 72)} * 1deg), 
                gray 0deg
            )`;

            content[i][1]
            .querySelector("div.progress-bar div." + "rateDifficulty".concat(i.toString()))
            .textContent = data[exists].difficulty;

            content[i][1]
            .querySelector("div.progress-bar div." + "FillrateDifficulty".concat(i.toString()))
            .style.width = (data[exists].difficulty === "N/A" ? "0%": (Number(data[exists].difficulty)*20).toString() + "%");

            if(data[exists].difficulty !== "N/A"){
                let colorDifficulty = calculateColor(Number(data[exists].difficulty)*20, true);

                content[i][1]
                .querySelector("div.progress-bar div." + "FillrateDifficulty".concat(i.toString()))
                .style.background = `rgb(${colorDifficulty[0]}, ${colorDifficulty[1]}, ${colorDifficulty[2]})`;
            }
            
            content[i][1]
            .querySelector("div." + "rateNOfRating".concat(i.toString()))
            .textContent = "Based On " + data[exists].nOfRatings + " Reviews";

            data[exists].link = data[exists].link.substring(26);

            content[i][1]
            .querySelector("a." + "rateLinkToUser".concat(i.toString()))
            .href = "https://www.ratemyprofessors.com/" + data[exists].link;

            content[i][1]
            .querySelector("div.progress-bar div." + "rateTakeAgain".concat(i.toString()))
            .textContent = data[exists].takeAgain;

            content[i][1]
            .querySelector("div." + "FillrateTakeAgain".concat(i.toString()))
            .style.width =  (data[exists].takeAgain === "N/A" ? "0%": data[exists].takeAgain);

            if(data[exists].takeAgain !== "N/A"){
                let colorTakeAgain = calculateColor(Number(data[exists].takeAgain.slice(0, -1)), false);
            
                content[i][1]
                .querySelector("div." + "FillrateTakeAgain".concat(i.toString()))
                .style.background = `rgb(${colorTakeAgain[0]}, ${colorTakeAgain[1]}, ${colorTakeAgain[2]})`;
            }
        }else{
            // Show that it couldn't update
            content[i][1].innerText = "Unable to Fetch Data.";
        }
    }
}

const schoolID = {
    '0': "4928",
    '1': "12184",
    '2': "4919",
    '3': "1484",
};


function calculateColor(percent, reverse){
    if(reverse){
        if(percent < 50){
            let r = 11 + (255 - 11)* (percent)/50;
            let g = 223 + (-1) * (percent)/50;
            let b = 0 + (51) * (percent)/50;
            return [r, g, b];
        }else{
            let r = 255;
            let g = 222 + (72 - 222) * (percent-50)/50;
            let b = 51;
            return [r, g, b];
        }
    }else{
        if(percent < 50){
            let r = 255;
            let g = 72 + (222 - 72) * percent/50;
            let b = 51;
            return [r, g, b];
        }else{
            let r = 255 + (11 - 255)* (percent-50)/50;
            let g = 222 + (1) * (percent-50)/50;
            let b = 51 + (-51) * (percent-50)/50;
            return [r, g, b];
        }
    }
}

async function webscrape(listOfProfs, schoolId){
    let dataArr = [];
    let retryProfs = [];
    for(let i = 0;i < listOfProfs.length;i++){
        try{
            const response = await sendMessagePromise({
                action: 'scrapeRMP',
                professor: listOfProfs[i],
                schoolId: schoolID[schoolId.toString()]
            });
            let data = response.data || 'Error fetching data.';
            if(data == 'Error fetching data.'){
                continue;
            }
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const professorResult = doc.querySelector('.TeacherCard__StyledTeacherCard-syjs0d-0');
            let returnVal = new Object();
            if (professorResult) {
                const Name = professorResult.querySelector('.CardName__StyledCardName-sc-1gyrgim-0').innerText;
                let middleCheck = "oasjdoisjoiasjdoiasdjoisajdoias";
                if(listOfProfs[i].split(' ').length === 3){
                    middleCheck = listOfProfs[i].split(' ')[0] + " " + listOfProfs[i].split(' ')[2];
                }
                if(Name != listOfProfs[i] && middleCheck != Name){
                    retryProfs.push(listOfProfs[i]);
                    continue;
                }
            
                const Rating = professorResult.querySelector('.CardNumRating__CardNumRatingNumber-sc-17t4b9u-2').innerText;
            
                const numberRatings = professorResult.querySelector('.CardNumRating__CardNumRatingCount-sc-17t4b9u-3')
                    .innerText.substring(0, professorResult.querySelector('.CardNumRating__CardNumRatingCount-sc-17t4b9u-3').innerText.indexOf(' '));
            
                const takeAgain = professorResult.querySelector('.CardFeedback__CardFeedbackNumber-lq6nix-2').innerText;
            
                const difficulty = Array.from(professorResult.querySelectorAll('.CardFeedback__CardFeedbackNumber-lq6nix-2'),
                    element => element.innerText)[1];

                const link = professorResult.href;

                returnVal.name = Name;
                returnVal.rating = Rating;
                returnVal.nOfRatings = numberRatings;
                returnVal.takeAgain = takeAgain;
                returnVal.difficulty = difficulty;
                returnVal.link = link;
                dataArr.push(returnVal);
            }else{
                retryProfs.push(listOfProfs[i]);
                continue;
            }
            
        }catch (error){
            console.error(`Failed to fetch data for ${listOfProfs[i]}:`, error);
        }
    }
    return [dataArr, retryProfs];
}


function sendMessagePromise(message) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(message, (response) => {
            if(chrome.runtime.lastError || !response){
                reject(chrome.runtime.lastError || 'No response');
            }else{
                resolve(response);
            }
        });
    });
}