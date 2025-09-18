const socket=io()

//Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#locationMessage-template').innerHTML

//Options
const {username,room} = Qs.parse(location.search,{ignoreQueryPrefix:true})

socket.on('message',(message)=>{
    console.log(message)
    const html = Mustache.render(messageTemplate,{
        'message':message.text,
        'createdAt':moment(message.createdAt).format('h:mm:ss A')
    })
    $messages.insertAdjacentHTML('beforeend',html)
})

socket.on('locationMessage',(message)=>{
    console.log(message)
    const html =Mustache.render(locationMessageTemplate,{
        'url': message.url,
        'createdAt':moment(message.createdAt).format('h:mm:ss A')
    })  
    $messages.insertAdjacentHTML('beforeend',html)  
})

$messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const msg = e.target.elements.message.value
    $messageFormButton.setAttribute('disabled','disabled')
    socket.emit('sendMessage',msg,(error)=>{
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value=''
        $messageFormInput.focus()
        if(error){
            return console.log(error)
        }
        console.log('Message sent successfully from client')
    })
})

$sendLocationButton.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('Geolocation is not supported for this browser. Try using a different browser')
    }
    $sendLocationButton.setAttribute('disabled','disabled')
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position)
        socket.emit('sendLocation',
            {
                latitude:position.coords.latitude,
                longitude:position.coords .longitude
            },
            ()=>{
                $sendLocationButton.removeAttribute('disabled')
                console.log('Location shared')
            })
    })
})

socket.emit('join',{username , room})