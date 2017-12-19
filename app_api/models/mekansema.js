var mongoose = require( 'mongoose' ); 

var saatSema = new mongoose.Schema(
    { 
        gunler:{type:String,required:true},
        acilis:String,
        kapanis:String,
        kapali:{type:Boolean,required:true}
    },
    {usePushEach: true}
    ); 

var yorumSema = new mongoose.Schema(
    { 
        yorumYapan:{type:String,required:true},
        puan:{type:Number,required:true,min:0,max:5},
        yorumMetni:{type:String,required:true},
        tarih:{type:Date,default:Date.now}
    },
    {usePushEach: true}
    ); 

var mekanSema = new mongoose.Schema(
    { 
        ad:{type:String,required:true},
        adres:String,
        puan:{type:Number, default:0,min:0,max:5},
        imkanlar:[String],
        koordinatlar:{type:[Number],index:'2dsphere'},
        saatler:[saatSema],
        yorumlar:[yorumSema]
    },{usePushEach: true}
    ); 
mongoose.model('mekan',mekanSema,'mekanlar');











