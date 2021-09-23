// const path = require('path')
// const express = require('express');
// const hbs = require('hbs');

// const geoCode = require('./utils/geocode')
// const weatherUpdate = require('./utils/weatherupdate')


// const app = express()
  
// //define path for express to config
// const publicDirPath = path.join(__dirname, '../public')
// const viewsPath = path.join(__dirname, '../template/views')
// const partialsPath = path.join(__dirname, '../template/partials')


// //setup handlebars engine and views location
// app.set('view engine', 'hbs');
// app.set('views', viewsPath);
// hbs.registerPartials(partialsPath)


// //setup static directory to serve
// app.use(express.static(publicDirPath))

// app.get('/' , (req, res) => {
//   res.render('index',{
//     title: 'index node course',
//     name: 'Bilal'

//   })
// })

// app.get('/about' , (req, res) => {
//   res.render('about',{
//     title: 'about node course',
//     name: 'Bilal'
// })
// })


// app.get('/help' , (req, res) => {
//   res.render('help',{
//     helperText: 'I hope this is helpful',
//     title: 'Help',
//     name: 'Bilal'
// })
// })


// app.get('/weather' , (req, res) => {

//   if(!req.query.address){
//     return res.send({
//       error: 'please must provide an address'
//     })
//   }
  
//   geoCode( req.query.address , (error , { latitude , longitude ,location} ) => {
//     if(error){
//       return res.send(error);
//     }
    
   
//    weatherUpdate( latitude , longitude , (error, weatherData) => {
//     if(error){
//       return res.send(error);
//     }
    
    
//     res.send({
//       weatherUpdate: weatherData,
//       location,
//       address: req.query.address
//     })
//    })
//   })
// })



// app.get('/help/*' , (req, res) => {
//   res.render('404',{
//     error:'help artical not found',
//     title: 'Help',
//     name: 'Bilal'
// })
// })
// app.get('*' , (req, res) => {
//   res.render('404',{
//     error:'404 error page not found',
//     title: 'Help',
//     name: 'Bilal'
// })
// })

// app.listen(3000 , () => {
//     console.log('server is up and runing on port 3000')
// })

//// 
////
////  new code

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/weatherupdate')

const app = express()
const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bilal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bilal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Bilal'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        console.log('sn dhd  km')
        console.log(latitude)
        console.log(longitude)
       
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
                
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bilal',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bilal',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})