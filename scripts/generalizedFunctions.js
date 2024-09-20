// Update the rating content to show data
function updateContentDiv(contentPos, content, data, exists){
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



// Check if name exists in data
// Check if name without middle name exists in data
function nameCheckInData(name, data){
    let exists = -1;
    let middleCheck = "oasjdoisjoiasjdoiasdjoisajdoias";
    if(name.split(' ').length === 3){
        middleCheck = name.split(' ')[0] + " " + name.split(' ')[2];
    }
    for(let j = 0;j < data.length;j++){
        if(data[j].name == name || middleCheck == data[j].name){
            exists = j;
            break;
        }
    }
    if(name === "TBA"){
        exists = -1;
    }
    return exists;
}



// Calculate the color of the progress bars
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



// The webscraper that actually fetchs the information by profs
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