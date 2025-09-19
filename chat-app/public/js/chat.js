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
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

//Options
const {username,room} = Qs.parse(location.search,{ignoreQueryPrefix:true})

const autoscroll = () =>{
    //new message element
    const $newMessage = $messages.lastElementChild
    
    //height of new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    //visible height 
    const visibleHeight = $messages.offsetHeight

    //height of message container
    const containerHeight = $messages.scrollHeight

    //how far I have scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight

    if(containerHeight - newMessageHeight  <= scrollOffset){
        $messages.scrollTop = $messages.scrollHeight
    }
}

socket.on('message',(message)=>{
    console.log(message)
    const html = Mustache.render(messageTemplate,{
        'username':message.username,
        'message':message.text,
        'createdAt':moment(message.createdAt).format('h:mm:ss A')
    })
    $messages.insertAdjacentHTML('beforeend',html)
    autoscroll()
})

socket.on('locationMessage',(message)=>{
    console.log(message)
    const html =Mustache.render(locationMessageTemplate,{
        'username':message.username,
        'url': message.url,
        'createdAt':moment(message.createdAt).format('h:mm:ss A')
    })  
    $messages.insertAdjacentHTML('beforeend',html)  
    autoscroll()
})

socket.on('roomData',({room,users})=>{
    const html =Mustache.render(sidebarTemplate,{
        room,
        users
    })  
    document.querySelector('#sidebar-div').innerHTML=html
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

socket.emit('join',{username , room} ,(error)=>{
    if(error){
        alert(error)
        location.href='/'
    }    
})