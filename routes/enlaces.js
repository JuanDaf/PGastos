const express = require('express');
const router = express.Router();


const db =  require('../db');
const helpers = require('../lib/helpers');

const {isLoggedIn, IsNotLoggedin} =require('../lib/auth');

const {insertringreso, selectingresos,deletingreso,editingreso, insertgasto,deletgastos, editgastos, editperfil,datosapiingresos} =  require('../lib/crud');



router.get('/ringreso',isLoggedIn, (req,res)=>{
    res.render('enlaces/ringresos',{success: req.user.Nombre});
}); 

router.post('/ringreso',isLoggedIn,(req,res)=>{
    const {Tipo,Monto, Detalle} = req.body;
    var Fec = "";
    if(req.body.Fecha === undefined){
        Fec = "";
    }else{
        Fec = req.body.Fecha;
    }
    if(Tipo == "" && Monto == "" && Detalle == ""){
        res.render('enlaces/ringresos',{success: req.user.Nombre,success2: 'Debes llenar todos los campos'});
    }else{
        const resp = insertringreso(req.body.Tipo, req.body.Monto, req.body.Detalle,req.user.Id,Fec);
        if(resp){
            res.render('enlaces/ringresos',{success: req.user.Nombre,success2: 'Infromación registrada'});
        }else{
            res.render('enlaces/ringresos',{success: req.user.Nombre,success2: 'Infromación no registrada'});
        }
    }
});


router.get('/datosingresos', isLoggedIn, async (req,res)=>{
    //const resp = selectingresos(req.user.Id);
    const resp = await db.query('SELECT * FROM ingresos WHERE id_usuario = ?', [req.user.Id]);
    res.render('enlaces/datosingresos',{success: req.user.Nombre, datos: resp});
});

router.post('/datosingresos',(req,res)=>{
    console.log(req.body);
});

router.get('/borrar/:id_ingreso', isLoggedIn, async (req,res)=>{
    const {id_ingreso} = req.params;
    const resp = deletingreso(id_ingreso);
    if(resp){
        const resp = await db.query('SELECT * FROM ingresos WHERE id_usuario = ?', [req.user.Id]);
        res.render('enlaces/datosingresos',{success: req.user.Nombre, datos: resp, success2:'Datos eliminados' });
    }else{  
        const resp = await db.query('SELECT * FROM ingresos WHERE id_usuario = ?', [req.user.Id]);
        res.render('enlaces/datosingresos',{success: req.user.Nombre, datos: resp, success2:'Datos no eliminados'});
    }
});

router.post('/editar',isLoggedIn,  async (req, res)=>{
    const {Numero, Tipo, Monto, Detalle, Fecha}= req.body;
    const resp = editingreso(Numero,Tipo,Monto,Detalle,Fecha);
    if(resp){
        const resp = await db.query('SELECT * FROM ingresos WHERE id_usuario = ?', [req.user.Id]);
        res.render('enlaces/datosingresos',{success: req.user.Nombre, datos: resp, success2:'Datos actualizados' });
    }else{
        const resp = await db.query('SELECT * FROM ingresos WHERE id_usuario = ?', [req.user.Id]);
        res.render('enlaces/datosingresos',{success: req.user.Nombre, datos: resp, success2:'Datos no actualizados' });
    }
});

router.get('/rgastos',isLoggedIn, (req,res)=>{
    res.render('enlaces/rgastos',{success: req.user.Nombre});
});

router.post('/rgastos',isLoggedIn, (req,res)=>{
    const {Tipo,Monto, Detalle} = req.body;
    var Fec = "";
    if(req.body.Fecha === undefined){
        Fec = "";
    }else{
        Fec = req.body.Fecha;
    }
    if(Tipo == "" && Monto == "" && Detalle == ""){
        res.render('enlaces/rgastos',{success: req.user.Nombre,success2: 'Debes llenar todos los campos'});
    }else{
        const resp = insertgasto(req.body.Tipo, req.body.Monto, req.body.Detalle,req.user.Id,Fec);
        if(resp){
            res.render('enlaces/rgastos',{success: req.user.Nombre,success2: 'Infromación registrada'});
        }else{
            res.render('enlaces/rgastos',{success: req.user.Nombre,success2: 'Infromación no registrada'});
        }
    }
});

router.get('/datosgastos',isLoggedIn,async (req,res)=>{
    const resp = await db.query('SELECT * FROM gastos WHERE id_usuario = ?', [req.user.Id]);
    res.render('enlaces/datosgastos',{success: req.user.Nombre, datos: resp});
});

router.get('/borrarg/:id_ingreso', isLoggedIn,async (req,res)=>{
    const {id_ingreso} = req.params;
    const resp = deletgastos(id_ingreso);
    if(resp){
        const resp = await db.query('SELECT * FROM gastos WHERE id_usuario = ?', [req.user.Id]);
        res.render('enlaces/datosgastos',{success: req.user.Nombre, datos: resp, success2:'Datos eliminados' });
    }else{  
        const resp = await db.query('SELECT * FROM gastos WHERE id_usuario = ?', [req.user.Id]);
        res.render('enlaces/datosgastos',{success: req.user.Nombre, datos: resp, success2:'Datos no eliminados'});
    }
});

router.post('/editarg', isLoggedIn,async (req, res)=>{
    const {Numero, Tipo, Monto, Detalle, Fecha}= req.body;
    const resp = editgastos(Numero,Tipo,Monto,Detalle,Fecha);
    if(resp){
        const resp = await db.query('SELECT * FROM gastos WHERE id_usuario = ?', [req.user.Id]);
        res.render('enlaces/datosgastos',{success: req.user.Nombre, datos: resp, success2:'Datos actualizados' });
    }else{
        const resp = await db.query('SELECT * FROM gastos WHERE id_usuario = ?', [req.user.Id]);
        res.render('enlaces/datosgastos',{success: req.user.Nombre, datos: resp, success2:'Datos no actualizados' });
    }
});


router.get('/perfil',isLoggedIn, async (req,res)=>{
    const resp = await db.query('SELECT * FROM usuarios WHERE id = ?', [req.user.Id]);
    res.render('enlaces/perfil',{success: req.user.Nombre, datos: resp});
});


router.post('/editarp', isLoggedIn,async(req,res,next)=>{
    const pass =  req.body.Password;
    const validar = await helpers.matchPassword(pass, req.user.Contrasena);
    if(req.body.Contrasena == "" || req.body.Contrasena2 == ""){
        if(validar){
            const {Nombre, Apellido, Telefono, Direccion, Email, Usuario} =  req.body;
            const cont = await helpers.encryptPassword(req.body.Password); 
            const resp = editperfil(req.user.Id, Nombre, Apellido,Telefono,Direccion,Usuario,cont,Email);
            if(resp){
                const resp = await db.query('SELECT * FROM usuarios WHERE id = ?', [req.user.Id]);
                res.render('enlaces/perfil',{success: req.user.Nombre, datos: resp, success2: 'Datos Actalizados'});
            }else{
                const resp = await db.query('SELECT * FROM usuarios WHERE id = ?', [req.user.Id]);
                res.render('enlaces/perfil',{success: req.user.Nombre, datos: resp, success2: 'Datos no Actalizados'});
            }
        }else{
            const resp = await db.query('SELECT * FROM usuarios WHERE id = ?', [req.user.Id]);
            res.render('enlaces/perfil',{success: req.user.Nombre, datos: resp, success2: 'Verifique su Contraseña'});
        }
    }else{
        if(req.body.Contrasena == req.body.Contrasena2){
            if(validar){
                const {Nombre, Apellido, Telefono, Direccion, Email, Usuario} =  req.body;
                const cont = await helpers.encryptPassword(req.body.Contrasena2); 
                const resp = editperfil(req.user.Id, Nombre, Apellido,Telefono,Direccion,Usuario,cont,Email);
                if(resp){
                    const resp = await db.query('SELECT * FROM usuarios WHERE id = ?', [req.user.Id]);
                    res.render('enlaces/perfil',{success: req.user.Nombre, datos: resp, success2: 'Datos Actalizados'});
                }else{
                    const resp = await db.query('SELECT * FROM usuarios WHERE id = ?', [req.user.Id]);
                    res.render('enlaces/perfil',{success: req.user.Nombre, datos: resp, success2: 'Datos no Actalizados'});
                }
            }else{
                const resp = await db.query('SELECT * FROM usuarios WHERE id = ?', [req.user.Id]);
                res.render('enlaces/perfil',{success: req.user.Nombre, datos: resp, success2: 'Verifique su Contraseña'});
            }
        }else{
            const resp = await db.query('SELECT * FROM usuarios WHERE id = ?', [req.user.Id]);
                res.render('enlaces/perfil',{success: req.user.Nombre, datos: resp, success2: 'Verifique Contraseñas, No Coinciden'});
        }
    }
});

router.get('/grafica',isLoggedIn, async (req,res)=>{
    const resp = await db.query('SELECT CONCAT(YEAR(Fecha), " / " ,MONTH(Fecha))as Fecha, SUM(Monto) as sumain FROM ingresos WHERE id_usuario = ?  GROUP by  MONTH(Fecha)',[req.user.Id]);
    var ingresos = [];
    var i=0;
    for (let j = (resp.length-1); j > ((resp.length-1) -3); j--) {
        ingresos[i] = resp[j];
        i++;
    }
    var gastos = [];
    var j=0;
    const resp2 = await db.query('SELECT CONCAT(YEAR(Fecha)," / ",MONTH(Fecha))as Fecha, SUM(Monto) as sumagas FROM gastos WHERE id_usuario = ? GROUP by MONTH(Fecha)',[req.user.Id]);
    for (let i = (resp2.length-1); i > ((resp2.length-1) -3); i--) {
        gastos[j] = resp2[i];
        j++;
    }
    res.render('enlaces/grafica',{success: req.user.Nombre, ingresos: ingresos,gastos: gastos});
});


router.get('/api/datos', isLoggedIn,async (req,res)=>{
    const resp2 = await db.query('SELECT CONCAT(YEAR(Fecha), " / " ,MONTH(Fecha))as Fecha, SUM(Monto) as sumain FROM ingresos WHERE id_usuario = ?  GROUP by  MONTH(Fecha)',[req.user.Id]);
    res.send(resp2);
   
})

router.get('/api/datos2',isLoggedIn,async (req,res)=>{
    const resp = await db.query('SELECT CONCAT(YEAR(Fecha)," / ",MONTH(Fecha))as Fecha, SUM(Monto) as sumagas FROM gastos WHERE id_usuario = ? GROUP by MONTH(Fecha)',[req.user.Id]);
    res.send(resp);
   
})
module.exports = router ;