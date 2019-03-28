var express = require('express')
var app = express()

//SHOW LIST OF MENU FR
app.get('/', function(req, res, next){
             //renvoyer la view list.ejs
                res.render('admin/index', {
                    title: 'User List'
                })
})


app.get('/accueil', function(req, res, next){
req.getConnection(function(error, conn){
    conn.query('SELECT id_menu,lib_menu_fr FROM menu ORDER BY id_menu', function(err,rows, fields){
        if(err){
            req.flash('error', err)
            res.render('admin/accueil', {
                title : 'User List',
                data: ''
            })   
        }else{
            //renvoyer la view list.ejs
            res.render('admin/accueil', {
                title: 'Admin | accueil',
                data: rows
            })
        }
    })
  })
})

app.get('/accueil/commande', function(req, res, next){
    req.getConnection(function(error, conn){
        conn.query('SELECT * FROM commande  WHERE table_commande = 1 and etat_commande=2', function(err,rows, fields){
            if(err){
                req.flash('error', err)
                res.render('admin/accueil', {
                    title : 'User List',
                    data1: ''
                })   
            }else{
                //renvoyer la view list.ejs
                res.render('admin/admin_commande', {
                    title: 'Admin | accueil',
                    data1: rows
                })
            }
        })
      })
    })

    app.put('/commande/(:id_commande)', function(req, res, next){
    

        req.getConnection(function(error, conn){
            conn.query('UPDATE commande SET etat_commande=3 WHERE id_commande= ' + req.params.id_commande, function(err, result){

                    res.redirect('/admin/accueil/commande')
                
            })
        })
})

app.get('/option/(:id_menu)', function(req, res, next){
    req.getConnection(function(error, conn){
        conn.query('SELECT p.id_plat, p.image, p.etat_plat, p.id_menu, p.plat_fr, p.detail_fr, p.cout, m.id_menu, m.lib_menu_fr FROM plat p JOIN menu m ON p.id_menu=m.id_menu WHERE p.id_menu = ' + req.params.id_menu, function(err,rows, fields){
            if(err){
                req.flash('error', err)
                res.render('admin/option', {
                    title : 'User Plat',
                    data2: ''
                })   
            }else{
                //renvoyer la view list.ejs
                res.render('admin/option', {
                    title: 'User plat',
                    data2: rows
                })
            }
        })
    })
})

app.put('/option/(:id_plat)', function(req, res, next){
    var new_etat;
    if (req.params.id_plat = 0) {
         new_etat=1;
    }else{
         new_etat=0;
    }

    req.getConnection(function(error, conn){
        conn.query('UPDATE plat SET etat_plat='+new_etat+' WHERE id_plat= ' + req.params.id_plat, function(err, result){

                res.redirect('admin/option/'+req.params.id_plat)
            
        })
    })
})


module.exports = app