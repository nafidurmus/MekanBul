var mongoose = require( 'mongoose' );
var dbURI = 'mongodb://localhost/mekanbul'; // canlıya atacağımız zaman mlab taki adresi yaz buraya
// mongodb://<dbuser>:<dbpassword>@ds241395.mlab.com:41395/mekanbul  kullanıcı adı ve şifre oluştur buraya yaz
mongoose.connect(dbURI,{'useMongoClient':true});


mongoose.connection.on('connected', function (){
	console.log('Mongoose' + dbURI + 'adresteki veri tabanına bağlandı\n');
});

mongoose.connection.on('error', function (err){
	console.log('Mongoose bağlanto hatası\n:' + err);
});

mongoose.connection.on('disconnected', function (){
	console.log('Mongoose bağlantısı kesildi\n:');
});

kapat = function(msg, callback){
	mongoose.connection.close(function(){
		console.log('Mongoose kapatıldı\n' + msg);
		callback();
	});
};
//nodemon kapatma
process.once('SIGUSR2', function(){
	kapat('nodemon kapatıldı\n', function(){
		process.kill(process.pid, 'SIGUSR2');
	});
});
//uygulama kapatma
process.once('SIGINT', function(){
	kapat('Uygulama kapatıldı\n', function(){
		process.exit(0);
	});
});
//heroku kapatma
process.once('SIGTERM', function(){
	kapat('heroku kapatıldı\n', function(){
		process.exit(0);
	});
});


require('./mekansema'); 





