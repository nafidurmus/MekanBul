var mongoose = require( 'mongoose' );
var dbURI = 'mongodb://localhost/mekanbul'; // canlıya atacağımız zaman mlab taki adresi yaz buraya
//var dbURI = 'mongodb://admin:admin@ds115166.mlab.com:15166/mekanbul'
// mongodb://admin:admin@ds115166.mlab.com:15166/mekanbul  //mlab ile bağlamak içiçn
mongoose.connect(dbURI, { 'useMongoClient': true });
//if (process.env.NODE_ENV === 'production') {  dbURI = process.env.MONGOLAB_URI;} //mlab ile bağlamak içiçn


mongoose.connection.on('connected', function (){
	console.log('\nMongoose\n' + dbURI + '\nadresteki veri tabanına bağlandı\n');
});

mongoose.connection.on('error', function (err){
	console.log('\nMongoose bağlanto hatası\n:' + err);
});

mongoose.connection.on('disconnected', function (){
	console.log('\nMongoose bağlantısı kesildi\n:');
});

kapat = function(msg, callback){
	mongoose.connection.close(function(){
		console.log('\nMongoose kapatıldı\n' + msg);
		callback();
	});
};
//nodemon kapatma
process.once('SIGUSR2', function(){
	kapat('\nnodemon kapatıldı\n', function(){
		process.kill(process.pid, 'SIGUSR2');
	});
});
//uygulama kapatma
process.once('SIGINT', function(){
	kapat('\nUygulama kapatıldı\n', function(){
		process.exit(0);
	});
});
//heroku kapatma
process.once('SIGTERM', function(){
	kapat('\nheroku kapatıldı\n', function(){
		process.exit(0);
	});
});


require('./mekansema'); 





