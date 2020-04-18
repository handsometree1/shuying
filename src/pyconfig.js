
const url = 'http://localhost:8007';
let ROOT;
//这里很重要，必须是production，其实此时的process.env.NODE_ENV是undefined
if(process.env.NODE_ENV === 'production'){
   ROOT = url;
}else{
   ROOT = "/api/";
}
exports.PROXYROOT = url;
exports.ROOT = ROOT;
