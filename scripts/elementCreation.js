const schoolID = {
    '0': "4928",
    '1': "12184",
    '2': "4919",
    '3': "1484",
};


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
