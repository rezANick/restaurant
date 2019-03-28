var express = require('express')
var app = express()

//SHOW LIST OF MENU FR
app.get('/fr', function(req, res, next){
    req.getConnection(function(error, conn){
        conn.query('SELECT id_menu,lib_menu_fr FROM menu ORDER BY id_menu', function(err,rows, fields){
            if(err){
                req.flash('error', err)
                res.render('menu/list_fr', {
                    title : 'User List',
                    data: ''
                })   
            }else{
                //renvoyer la view list.ejs
                res.render('menu/list_fr', {
                    title: 'User List',
                    data: rows
                })
            }
        })
    })
})


app.get('/fr/(:id_menu)', function(req, res, next){
    req.getConnection(function(error, conn){
        conn.query('SELECT p.id_plat, p.image, p.id_menu, p.plat_fr, p.detail_fr, p.cout, m.id_menu, m.lib_menu_fr FROM plat p JOIN menu m ON p.id_menu=m.id_menu WHERE p.id_menu = ' + req.params.id_menu, function(err,rows, fields){
            if(err){
                req.flash('error', err)
                res.render('menu/afficheur', {
                    title : 'User Plat',
                    data1: ''
                })   
            }else{
                //renvoyer la view list.ejs
                res.render('menu/afficheur', {
                    title: 'User plat',
                    data1: rows
                })
            }
        })
    })
})

app.get('/commande', function(req, res, next){
    req.getConnection(function(error, conn){
        conn.query('SELECT * FROM commande  WHERE table_commande = 1 and etat_commande=1', function(err,rows, fields){
            if(err){
                req.flash('error', err)
                res.render('menu/commande', {
                    title : 'User Plat',
                    data1: ''
                })   
            }else{
                //renvoyer la view list.ejs
                res.render('menu/commande', {
                    title: 'User plat',
                    data: rows
                })
            }
        })
    })
})

app.get('/merci', function(req, res, next){
    req.getConnection(function(error, conn){
        conn.query('SELECT * FROM commande  WHERE table_commande = 1 and etat_commande=2', function(err,rows, fields){
            if(err){
                req.flash('error', err)
                res.render('menu/merci', {
                    title : 'User Plat',
                    data1: ''
                })   
            }else{
                //renvoyer la view list.ejs
                res.render('menu/merci', {
                    title: 'User plat',
                    data: rows
                })
            }
        })
    })
})

app.get('/fr/(:id_menu)', function(req, res, next){
    req.getConnection(function(error, conn){
        conn.query('SELECT id_menu,lib_menu_fr FROM menu ORDER BY id_menu', function(err,rows, fields){
            if(err){
                req.flash('error', err)
                res.render('menu/list_fr', {
                    data: ''
                })   
            }else{
                //renvoyer la view list.ejs
                res.render('menu/list_fr', {
                    data: rows
                })
            }
        })
    })
})


//SHOW ADD USER FORM


//ADD NEW USER POST ACTION


//SHOW EDIT USER FORM
/*app.get('/fr/(:id_menu)', function(req, res, next){
    req.getConnection(function(error, conn){
        conn.query('SELECT * FROM plat WHERE id_menu = ' + req.params.id_menu, function(err, rows, fields){
            if(err) throw err

            //si ya pas d'user
            if(rows.length <= 0){
                req.flash('error', 'Menu not found with id = ' + req.params.id_menu)
                res.redirect('/menus/fr')
            }else {
                res.render('/menu/edit', {
                    title: 'Modifier un utlilisateur',
                    id: rows[0].id,
                    name: rows[0].name,
                    age: rows[0].age,
                    email: rows[0].email
                })
            }
        })
    })
})*/

//EDIT USER POST ACTION
app.put('/commande/(:id_commande)', function(req, res, next){
    

        req.getConnection(function(error, conn){
            conn.query('UPDATE commande SET etat_commande=2 WHERE id_commande= ' + req.params.id_commande, function(err, result){

                    res.redirect('/menus/merci')
                
            })
        })
})

//DELETE USER

app.delete('/commande/(:id_commande)', function(req, res, next){
    //var commande = { id: req.params.id_commande}

    req.getConnection(function(error, conn){
        conn.query('DELETE FROM commande WHERE id_commande = ' + req.params.id_commande, function(err, result){
            if(err){
                req.flash('error', err)
                res.redirect('/users')
            }else {

                res.redirect('/menus/commande')
            }
        })
    })
})


//ADD NEW USER POST ACTION
app.post('/add', function(req, res,next){
   
        var user = {
            menu:req.sanitize('menu'),
            name: req.sanitize('nom'),
            image: req.sanitize('image'),
            table_commande: 1,
            heure:'12:50:20',
            cout: req.sanitize('cout'),
            etat: 1
        }

        req.getConnection(function(error, conn){
            conn.query("INSERT INTO commande(nom_plat,image_plat,table_commande,heure,etat_commande,cout_commande)"+
            " VALUES (user.name,user.image,user.table_commande,user.heure,user.etat,user_cout)", function(err, result){
                    req.flash('success', 'Data added successfully')

                    res.render('menu/afficheur',{
                        title: 'Nos plats'
                    })
            })
        })
})
module.exports = app