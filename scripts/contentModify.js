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
    // Add toggle button in main page
    waitForElm('[aria-label="View your timetable"]').then((elm) => {
        document.querySelector('[aria-label="View your timetable"]')
        .insertAdjacentElement('afterend', toggleExtensionButton);
        updateExtensionToggle();
    });
    // Automatically fetch and update information
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
    fullData = fullData.concat(data);
    // Update the UI in acorn;
    updateContentBoxInfo(fullData);
}

function updateContentBoxInfo(data){
    let elements = document.querySelectorAll(".courseBox");
    for(let i = 0;i < content.length;i++){
        let exists = nameCheckInData(content[i][0], data);
        elements[i].appendChild(content[i][1]);
        if(exists !== -1){
            // If it fetched the data, update the page
            updateContentDiv(i, content, data, exists);
        }else{
            // Show that it couldn't update
            content[i][1].innerText = "Unable to Fetch Data. :(";
        }
    }
}