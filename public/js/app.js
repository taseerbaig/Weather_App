
const weatherform = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherform.addEventListener('submit' , (e) => {
    e.preventDefault()

    const location = searchElement.value

    const url = '/weather?location='+location

    messageOne.textContent = 'loading....'
    messageTwo.textContent = ''

    fetch(url).then ((response) => {
        response.json().then((data) => {
            if (data.error){
                messageTwo.textContent = 'location not found!'
            }
            messageOne.textContent = data.forecast
            messageTwo.textContent = data.location
        })
    })
})