 const request = require('request')
const geoCode = (address , callback) => {
 
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYmlsYWxrYXlhbmkyMCIsImEiOiJja3Ria2MzMG8wNjh2MnFyd3RzMHAzbWc3In0.cnULPQon93JmGIZ3_-7MxQ&limit=1'
    
    request({url: url2 , json: true},(error , {body} ) => {
      if(error){
        callback('unable to connect to internet' , undefined)
      }
      else if(body.features.length===0){
        callback('unable to find location try another location' , undefined)
      }
        
    else{
      callback(undefined,{
      latitude: body.features[0].center[1],
      longitude: body.features[0].center[0],
      location: body.features[0].place_name
      }
      )}
    })
 

}


module.exports = geoCode