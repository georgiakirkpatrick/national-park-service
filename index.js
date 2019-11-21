'use strict';

let selectedStates = $('#state').val()
let requestedNumberResults = $('#numberResults').val()
let apiKey = '4VMtIA1dYHaYcs7tcmYnHcABNSez3QKNCuCnLOmz'

function displayParks(responseJson) {
    $('.js-results').empty()
    $('.js-results').append(`<h2>Results</h2>`)
    console.log('`displayParks` ran')
    console.log(responseJson)

    for (let i=0; i < responseJson.data.length; i++) {
        console.log(responseJson.data[i].addresses[0].line1)
        $('.js-results').append(`<h2>${responseJson.data[i].fullName}</h2>
        <p>${responseJson.data[i].description}</p><br>
        <p>Park page: <a href=${responseJson.data[i].url}>${responseJson.data[i].url}</a></p><br>
        <p>Address:</p>`)

        for (let j=0; j < responseJson.data[i].addresses.length; j++) {
            if (responseJson.data[i].addresses[j].type === "Physical") {
                $('.js-results').append(`<p>${responseJson.data[i].addresses[j].line1}</p>
                <p>${responseJson.data[i].addresses[j].line2}</p>
                <p>${responseJson.data[i].addresses[j].line3}</p>
                <p>${responseJson.data[i].addresses[j].city}, 
                ${responseJson.data[i].addresses[j].stateCode}, 
                ${responseJson.data[i].addresses[j].postalCode}</p>`)
            }
        }    
            
    }
}

function getNationalParks(stateCodes, requestedNumberResults) {
    console.log(`getNationalParks ran, stateCodes is ${stateCodes}, and requestedNumberResults ${requestedNumberResults}`)
    fetch (`https://developer.nps.gov/api/v1/parks?stateCode=${stateCodes}&limit=${requestedNumberResults}&api_key=${apiKey}&fields=addresses`)
        .then(response => response.json())
        .then(responseJson => 
            // console.log(responseJson))
            displayParks(responseJson))
        .catch(error => {
            console.log("There is an error.")
        })
}

function formatStates(selectedStates, requestedNumberResults) {
    console.log(`selectedStates is ${selectedStates} and selectedStates.length is ${selectedStates.length}`)

    let stateCodes = ``

    if (selectedStates.length === 1) {
        stateCodes = selectedStates
        console.log(`stateCodes is ${stateCodes}`)
    }

    else {
        console.log('formatStates `else` statement ran')
        stateCodes = selectedStates[0]
        for (let i = 1; i < selectedStates.length; i++) {
            console.log('formatStates `for` statement ran')
            stateCodes = stateCodes + `&stateCode=${selectedStates[i]}`
            console.log(`stateCodes is ${stateCodes}`)
        }
    }

    getNationalParks(stateCodes, requestedNumberResults)
}

function submitForm() {
    $('.js-submit').on('click', function() {
        console.log('form was submitted')
        event.preventDefault()
        if (!$('select[name = "state"]').val()) {
            alert('Please enter a state.')
        }

        else {
            selectedStates = $('select[name = "state"]').val()
            requestedNumberResults = $('#numberResults').val()
            formatStates(selectedStates, requestedNumberResults)
        }
    })
}

$(function() {
    console.log('JavaScript has loaded')
    submitForm()
})