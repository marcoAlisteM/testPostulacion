const ctrl = {};
const https = require('https');
var datos = '';
https.get('https://jsonplaceholder.typicode.com/posts', res=>{
         
        res.on('data',data=>{
            datos += data;
        });
});
ctrl.index = (req,res) => {
   // console.log(body);
   let mostrarDatos =JSON.parse( datos);
    res.render('index',{mostrarDatos});
};
ctrl.verPerfil = (req,res) => {
    console.log("llegate al ver");
    console.log(req.id);
}


module.exports = ctrl;