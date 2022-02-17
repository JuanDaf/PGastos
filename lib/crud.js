const { query } = require('express');
const { serializeUser } = require('passport');
const db = require('../db')
const obj = {}

obj.insertringreso = async(tipo, monto, detalle, id_usuario,fecha1)=>{
  if(fecha1 == ""){
    const fecha = new Date();
    const newdato = {
        tipo,
        monto,
        detalle,
        id_usuario,
        fecha 
    }
    const res = await db.query('INSERT INTO ingresos set ?',[newdato]);
    if(res.affectedRows > 0){
        return true;
    }else{
        return false;
    }
  }else{
      fecha = fecha1;
    const newdato = {
        tipo,
        monto,
        detalle,
        id_usuario,
        fecha 
    }
    const res = await db.query('INSERT INTO ingresos set ?',[newdato]);
    if(res.affectedRows > 0){
        return true;
    }else{
        return false;
    }
  }
} 

obj.selectingresos = async (id_usuario)=>{
    const res  = await db.query('SELECT * FROM ingresos WHERE id_usuario = ?', [id_usuario]);
    return res;
}

obj.deletingreso = async (id)=>{
    await db.query('DELETE FROM ingresos WHERE id_ingreso = ?', [id]);
}

obj.editingreso = async(id, tipo, monto, detalle, fecha)=>{
    const up = {
        tipo,
        monto,
        detalle,
        fecha
    };
    const res = await db.query('UPDATE ingresos set ? WHERE id_ingreso = ?',[up,id] );
    return res;
}

obj.insertgasto = async (tipo, monto, detalle, id_usuario,fecha1)=>{
    if(fecha1 == ""){
        const fecha = new Date();
        const newdato = {
            tipo,
            monto,
            detalle,
            fecha,
            id_usuario
        }
        const res = await db.query('INSERT INTO gastos set ?',[newdato]);
        if(res.affectedRows > 0){
            return true;
        }else{
            return false;
        }
      }else{
          fecha = fecha1;
        const newdato = {
            tipo,
            monto,
            detalle,
            fecha,
            id_usuario
        }
        const res = await db.query('INSERT INTO gastos set ?',[newdato]);
        if(res.affectedRows > 0){
            return true;
        }else{
            return false;
        }
      }
}

obj.deletgastos = async (id)=>{
    await db.query('DELETE FROM gastos WHERE id_gastos = ?', [id]);
}

obj.editgastos = async(id, tipo, monto, detalle, fecha)=>{
    const up = {
        tipo,
        monto,
        detalle,
        fecha
    };
    const res = await db.query('UPDATE gastos set ? WHERE id_gastos = ?',[up,id] );
    return res;
}

obj.editperfil = async(id, nombre, apellido, telefono,direccion, usuario, contrasena, email)=>{
    const up = {
        nombre,
        apellido,
        telefono,
        direccion,
        usuario,
        contrasena, 
        email
    };
    const res = await db.query('UPDATE  usuarios set ? WHERE Id = ?',[up,id] );
    return res;
}


obj.datosapiingresos = async (id)=>{
    return await db.query('SELECT Fecha, SUM(Monto) FROM ingresos WHERE id_usuario = ?  GROUP by  MONTH(Fecha)',[id]);
}
module.exports = obj;