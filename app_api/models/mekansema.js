var mongoose = require( 'mongoose' ); 
var saatSema = new mongoose.Schema({
	gunler:{type:String,required:true},
	acilis:String,
	kapanis:String,
	kapali:{type:Boolean,required:true}
});

var yorumSema = new mongoose.Schema({
	ad:String,
	puan:{type:Number,required:true,min:0,max:5},
	yorumMetni:String,
	saat:{type:Date,default:Date.now}
});

var mekanSema = new mongoose.Schema({
	ad:{type:String, required:true},
	adres:String,
	puan:{type:Number, default:0,min:0,max:5},
	imkanlar:[String],
	mesafe:{type:[Number], index:'2dsphere'},
	saatler:[saatSema],
	yorumlar:[yorumSema] // bunları çağırmak için yukarıda önceden tanımlamak gerekir.
 });

mongoose.model('mekan',mekanSema,'mekanlar');
