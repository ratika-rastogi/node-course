export function calculateTip (total,tipPercent = .25){
    const tip = total * tipPercent
    return total + tip
}

export function fahrenheitToCelsius(temp){
   return (temp-32)/1.8 
}

export function celsiusToFahrenheit(temp){
   return (temp*1.8)+32
}

export function add (a,b) {
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            if(a<0 || b<0){
                return reject('Numbers must be positive')
            }
            resolve(a+b)
        },2000)
    })
}