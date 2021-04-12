/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
// API Key for OpenWeatherMap API
const apiKey = 'ae684c8809f260571a8216177ef33e56'; 

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
 document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    //get information from UI
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
        getWeatherData(baseUrl, zipCode, apiKey)
            .then(function(data) {
                // add data to POST request
                postData('/add', { temp: data.main.temp, date: newDate, content: content });
                // call updateUI to update browser content
                updateUI()
            })}

/* Function to GET Web API Data*/
const getWeatherData = async(baseUrl, zipCode, apiKey) => {
    //fetch function to get data from api
    const res = await fetch(`${baseUrl}?q=${zipCode}&appid=${apiKey}`);
    try {
        // result of function fetch and convert it to json
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
};

/* Function to POST data */
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content
        })
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
};

const updateUI = async() => {
    const request = await fetch('/all');
        const allData = await request.json();
        // update Ui with new Data
            document.getElementById('date').innerHTML = allData.date;
            document.getElementById('temp').innerHTML = allData.temp;
            document.getElementById('content').innerHTML = allData.content;
    
}