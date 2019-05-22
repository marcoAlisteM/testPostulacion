const ctrl = {};
const http = require('http');
const fs = require('fs');
const request = require('request');
var datos ='';

const option={
  host: 'netzone.cl',
  port:80,
  method: 'GET',
  path:'bntf/api.users.prueba/skeleton/api/users',
  token: ' %ca7b=E]bV?t_M8C(Q]qU{qzQTPJOX/%AoKVv3S`Z`"Uxh]uwBfnooPJ%DW9)]m ',
  json:true,
 
}
/*var options = {
  url: 'http://netzone.cl/bntf/api.users.prueba/skeleton/api/users',
  method: 'GET',
  key: '%ca7b=E]bV?t_M8C(Q]qU{qzQTPJOX/%AoKVv3S`Z`"Uxh]uwBfnooPJ%DW9)]m', 
  json: true
}

request.get(options,(err,res,body)=>{
  console.log(body);
});*/
http.get('http://netzone.cl/bntf/api.users.prueba/skeleton/api/skills',
         {token: '%ca7b=E]bV?t_M8C(Q]qU{qzQTPJOX/%AoKVv3S`Z`"Uxh]uwBfnooPJ%DW9)]m'}, 
        res=>{ 
        res.on('data',data=>{
                datos += data;
                 console.log(datos);
            });
});
ctrl.index = (req,res) => {
   // console.log(body);
   //let mostrarDatos = JSON.parse(datos);
   //console.log(mostrarDatos);
    var contenido = '';
    var contenidoSkill = '';
    var mostrarSkill = '';
    fs.readFile(__dirname+'/users.json','utf-8',(err,data)=>{
            contenido = data.toString();
            //console.log(contenido);
            let mostrarDatos = JSON.parse(contenido)
            //console.log(mostrarDatos.response.data);
            
            //console.log(mostrarDatos.response.data);
            fs.readFile(__dirname+'/skill.json','utf8',(err,data)=>{
              contenidoSkill = data.toString();
              mostrarSkill = JSON.parse(contenidoSkill);
              var a = "de752804-41d0-11e9-b210-d663bd873d93";
              //console.log(mostrarSkill.response.data[0][a]);
              //////////// for //////////////////////////////////////
              for(var i = 0; i < mostrarDatos.response.data.length; i++){
                var datos = mostrarDatos.response.data[i].name_complete;
                var a = datos.toString().split(',');
                  mostrarDatos.response.data[i].nombre = a[0];
                  mostrarDatos.response.data[i].apellido = a[1];
                  mostrarDatos.response.data[i].edad = calcularEdad(mostrarDatos.response.data[i].birthdate);
                
                  for(var o = 0; o < mostrarSkill.response.data.length; o++){
                    var datosSkill = mostrarSkill.response.data[o][mostrarDatos.response.data[i].id];
                    if (datosSkill !== undefined){
                      mostrarDatos.response.data[i].skill= datosSkill;
                      console.log(mostrarDatos.response.data[i].skill)
                    }
                  }
                  //console.log(mostrarDatos.response.data[i]['id']);
              }

              res.render('index',{mostrarDatos: mostrarDatos.response.data});
            });
            //console.log(mostrarSkill.response.data);
           
    });
    
};
ctrl.verPerfil = (req,res) => {
    console.log("llegate al ver");
    console.log(req.id);
}
var calcularEdad = (fecha) => {
  var hoy = new Date();
  var cumpleanos = new Date(fecha);
  var edad = hoy.getFullYear() - cumpleanos.getFullYear();
  var m = hoy.getMonth() - cumpleanos.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
  }

  return edad;
}

module.exports = ctrl;