const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const chalk = require('chalk')
//const location = process.argv[2]

const app = express()

//Paths
const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname , '../templates/partials')

//handlebars engine and viwes location
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use (express.static(publicDirectoryPath))

app.get('' , (req , res) => {
    res.render('index' , {
        title: 'Weather!',
        name:'Taseer Baig'
    })
})

app.get('/about' , (req , res) => {
    res.render('about' , {
        title: 'About',
        name:'Taseer Baig'
    })
})

app.get('/help' , (req , res) => {
    res.render('help' , {
        helpText: 'This is a help page',
        title: 'Help',
        name:'Taseer Baig'
    })
})

app.get('/weather' , (req , res) => {
        
    const address = req.query.location

    if(!address){
        return res.send({
            error:'invalid Location!'
        })
    }

    geocode(address , (error , {lat , long ,loc} = {} ) => {
        if (error){
            return res.send({
                error:'something went wrong! Try again!'
            })
        }

        forecast(lat,long, (error, forecastdata) => {

            if (error){
                return res.send({
                    error:'something went wrong! Try again!'
                })
            }

            res.send({
                address,
                forecast: forecastdata,
                location: loc

            })

        })
    })
    console.log(req.query.location)

})

app.get('/products', (req , res) => {

    if (!req.query.search){
        return res.send({
            error:'Search Not Found!'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*' , (req , res) => {
    res.render('errorPage' , {
        title:'404!',
        name:'Taseer Baig',
        error:'Help Article not found!'
    })
})

app.get ('*' , (req , res) => {
    res.render('errorPage' , {
        tite:'404!',
        name:'Taseer Baig',
        error:'404! Page not found'
    })
})

app.listen(3000 , () => {
    console.log('server is up on port 3000!')
})

