const request = require('request')

const weatherUpdate = (latitude ,longitude ,callback ) => {
 const url = 'http://api.weatherstack.com/current?access_key=c65b0cd0199ebaf584175f6b0eb73a23&query='+ latitude + ',' + longitude +'&units=m'
 
 request({url: url , json: true},(error , {body} ) => {

   
   
  if(error){
       callback( 'unable to connect to internet' , undefined )
       callback(error)
       
   }
   
   else if(body.error){
  callback( 'unable to find location' , undefined )
   }
   else{
     callback( undefined , body.current.weather_descriptions[0]+' the current temprature is '+ body.current.temperature+' and it feels like '+  body.current.temperature)
  //  return callback(body.current.weather_descriptions[0]+' the current temprature is '+ body.current.temperature+' and it feels like '+  body.current.temperature)
  }
    
 })
  

}
module.exports = weatherUpdate


//////
//////////////////////////////////////////new code //////////////////////////


// const request = require('request')

// const forecast = (latitude, longitude, callback) => {
//     const url = 'http:api.weatherstack.com/current?access_key=c65b0cd0199ebaf584175f6b0eb73a23&query=' + latitude + ',' + longitude

//     request({ url, json: true }, (error, { body }) => {
//         if (error) {
//             callback('Unable to connect to weather service!', undefined)
//         } else if (body.error) {
//             callback('Unable to find location', undefined)
//         } else {
//             callback(body.current.weather_descriptions[0]+' the current temprature is '+ body.current.temperature+' and it feels like '+  body.current.temperature)
//         }
//     })
// }

// module.exports = forecast