const mongoose = require('mongoose');
const mekan = mongoose.model('mekan');
const cevapOlustur = function (res,status,content) {
	res
		.status(status)
		.json(content);
};



const yorumEkle = function (req,res) {
	cevapOlustur(res,200,{"durum":"başarılı"})
};

const yorumGetir = function (req,res) {
	cevapOlustur(res,200,{"durum":"başarılı"})
};

const yorumGuncelle = function (req,res) {
	cevapOlustur(res,200,{"durum":"başarılı"})
};

const yorumSil = function (req,res) {
	cevapOlustur(res,200,{"durum":"başarılı"})
};



module.exports = {
yorumEkle,
yorumGetir,
yorumGuncelle,
yorumSil
};

