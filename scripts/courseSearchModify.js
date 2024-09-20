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

    // Get localstoraged data first before webscraping
    // Don't wanna spam their website if possible
    let data = getCookieData(arrNames);
    for(let i = data.length - 1;i >= 0;i--){
        if(arrNames.includes(data[i].name)){
            arrNames.splice(arrNames.indexOf(data[i].name), 1);
        }
    }

    // Send message to background script to scrape RMP
    // Search each place by school id
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
        let exists = nameCheckInData(content2[i][0], data);
        elements[i].insertAdjacentElement("afterend", content2[i][1]);
        if(exists !== -1){
            // If it fetched the data, update the page
            updateContentDiv(i, content2, data, exists);
        }else{
            // Show that it couldn't update
            content2[i][1].innerText = "Unable to Fetch Data.";
            content2[i][1].style.height = "4vh";
        }
    }


    // This is for waitlist area
    let start = elements.length;
    elements = document.querySelectorAll("tbody.primaryActivity[data-ng-show]:not(.ng-hide)");
    for(let i = 0;i < elements.length;i++){
        let exists = nameCheckInData(content2[i + start][0], data);
        elements[i].insertAdjacentElement("afterend", content2[i + start][1]);
        if(exists !== -1){
            // If it fetched the data, update the page
            updateContentDiv(i + start, content2, data, exists);
        }else{
            // Show that it couldn't update
            content2[i + start][1].innerText = "Unable to Fetch Data.";
            content2[i + start][1].style.height = "4vh";
        }
    }
}

observer.observe(watchbody, {
    attributes: true, 
    attributeFilter: ['class'],
    childList: false, 
    characterData: false
});
  
