// Toggle Extension Button
let toggleExtensionButton = document.createElement("a");
toggleExtensionButton.className = "toggleText";
toggleExtensionButton.text = "Enable Extension";
toggleExtensionButton.style.textDecoration = "none";
toggleExtensionButton.id = "ToggleTextButton";

var enabledExtension = localStorage.getItem("rateMyAcornEnabled");
if(enabledExtension === null){
    enabledExtension = "true";
    localStorage.setItem("rateMyAcornEnabled", enabledExtension);
}

toggleExtensionButton.addEventListener('click', function () {
    if(enabledExtension === "true"){
        enabledExtension = "false";
    }else{
        enabledExtension = "true";
    }
    localStorage.setItem("rateMyAcornEnabled", enabledExtension);
    updateExtensionToggle();
});


function updateExtensionToggle(){
    let temp = document.getElementById("ToggleTextButton");
    if(enabledExtension === "true"){
        temp.style.backgroundColor = "#f52525";
        temp.textContent = "Disable Extension";
    }else{
        temp.style.backgroundColor = "#32a852";
        temp.textContent = "Enable Extension";
    }
}

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
    waitForElm('[aria-label="View your timetable"]').then((elm) => {
        document.querySelector('[aria-label="View your timetable"]')
        .insertAdjacentElement('afterend', toggleExtensionButton);
        updateExtensionToggle();
    });
    waitForElm('div.instructorDetails').then((elm) => {
        if(enabledExtension === "false"){
            return;
        }
        // Add review sections
        let elements = document.querySelectorAll(".courseBox");
        for(let i = 0;i < elements.length;i++){
            // Create area to show statistics
            let profName = elements[i].querySelector("td.instructor div.instructorDetails").textContent.trim();
            content.push([profName, generateContentPage(i, "100%", false)]);
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
            updateContentDiv(i, i, content, elements, data, exists);
        }else{
            // Show that it couldn't update
            content[i][1].innerText = "Unable to Fetch Data. :(";
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