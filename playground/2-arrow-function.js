// const square = function(x){
//     return x*x
// }

// const square = (a) => {
//     return a*a
// }

// const square = (r) => r*r

// console.log(square(11))

const event ={
    name:'Birthday Party',
    guestList:['Virat','Rohit','Shubhman'],
    printGuestList(){
       this.guestList.forEach((guest) => {
         console.log('Guest '+ guest + ' is attending '+this.name)
       })
    }
    }

event.printGuestList()