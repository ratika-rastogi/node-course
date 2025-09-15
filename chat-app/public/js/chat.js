const socket=io()
socket.on('message',(msg)=>{
    console.log('Message from server- ' + msg)
})

const $messageForm =document.querySelector('#message-form')
const $messageFormInput =$messageForm.querySelector('input')
const $messageFormButton =$messageForm.querySelector('button')

const $sendLocationButton=document.querySelector('#sendLocation')

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