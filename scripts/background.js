chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'scrapeRMP') {
    const profName = message.professor;
    const schoolId = message.schoolId;
    const rmpSearchUrl = `https://www.ratemyprofessors.com/search/professors/`+ schoolId + "?q=" + profName;
    
    fetch(rmpSearchUrl)
      .then(response => response.text())
      .then(data => {
          console.log(data);
          sendResponse({ data: data });

      })
      .catch(error => {
        console.error(error);
        sendResponse({ data: 'Error fetching data.' });
      });

    // Keep message channel open
    return true;
  }
});
