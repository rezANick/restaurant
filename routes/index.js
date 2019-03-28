var express = require('express')
var app = express()

app.get('/', function(req, res, next){
    req.getConnection(function(error, conn){
        conn.query('SELECT * FROM plat WHERE id_menu=7 ORDER BY id_plat', function(err,rows, fields){
            if(err){
                req.flash('error', err)
                res.render('index', {
                    title : 'Bienvenue',
                    data: ''
                })   
            }else{
                //renvoyer la view list.ejs
                res.render('index', {
                    title: 'Bienvenue',
                    data: rows
                })
            }
        })
    })
})

module.exports = app;