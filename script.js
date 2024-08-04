document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 0;
    const pages = document.querySelectorAll('.page');
    const userChoices = [];

    function showPage(pageIndex) {
        pages.forEach((page, index) => {
            page.classList.toggle('active', index === pageIndex);
        });
        currentPage = pageIndex;
    }

    document.getElementById("sign-in-form").addEventListener("submit", function(event) {
        event.preventDefault();
        showPage(1); // Show landing page after sign-in
    });

    window.startSurvey = function() {
        showPage(2); // Show the first survey page
    };

    window.chooseOption = function(page, option) {
        userChoices[page - 1] = option;
        if (page < 3) {
            showPage(page + 2); // Show the next survey page
        } else {
            showPage(5); // Show the ending page after the last survey page
        }
    };

    window.restartSurvey = function() {
        userChoices.length = 0;
        showPage(0); // Go back to the sign-in page
    };

    window.downloadCSV = function() {
        const date = new Date();
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Date," + date.toLocaleDateString() + " " + date.toLocaleTimeString() + "\n"
            + "Page 1," + (userChoices[0] === 1 ? "Modern Style" : "Vintage Style") + "\n"
            + "Page 2," + (userChoices[1] === 1 ? "Warm Colors" : "Cool Colors") + "\n"
            + "Page 3," + (userChoices[2] === 1 ? "Centered" : "Rule of Thirds") + "\n";

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "survey_results.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert("Your survey results have been downloaded!");
    };

    showPage(0); // Initial page
});
