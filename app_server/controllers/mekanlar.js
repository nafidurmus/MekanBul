//anaSayfa controller metodu
//index.js dosyasındaki router.get('/',ctrlMekanlar.anaSayfa);
//ile metot url'ye bağlanıyor

var request = require('request');

var apiSecenekleri = {
	sunucu : "http://localhost:3000",
	apiYolu : '/api/mekanlar/'
};

var mesafeyiFormatla = function(mesafe){
	var yeniMesafe, birim;
	if(mesafe> 1){
		yeniMesafe= parseFloat(mesafe).toFixed(1);
		birim = 'km';
	}
	else{
		yeniMesafe = parseInt(mesafe * 1000,10);
		birim = 'm';
	}
	return yeniMesafe + birim;
};


var anaSayfaOlustur = function(req,res,cevap,mekanListesi){
	var mesaj;

	if(!(mekanListesi instanceof Array)){
		mesaj = "API HATASI: Birseyler ters gitti!";
		mekanListesi = [];
	}
	else{
		if(!mekanListesi.length){
			mesaj = "Civarda herhangi bir mekan bulunamadi";
		}
	}

	res.render('mekanlar-liste',
	{
		title: 'MekanBul-Yakinindaki Mekanlari Bul',
		sayfaBaslik:{
			siteAd:'MekanBul',
			aciklama:'Yakininizda kafeleri, restorantlari bulun!'
		},
		mekanlar:mekanListesi,
		mesaj:mesaj,
		cevap:cevap

	});
};

const anaSayfa=function(req,res){
	var istekSecenekleri;
	istekSecenekleri = 
	{
		url : apiSecenekleri.sunucu + apiSecenekleri.apiYolu,
		method : "GET",
		json : {},
		qs : {
			enlem : req.query.enlem,
			boylam : req.query.boylam
		}
	};
	request(
		istekSecenekleri,
		function(hata,cevap,mekanlar){
			var i, gelenMekanlar;
			gelenMekanlar = mekanlar;

			if(!hata && gelenMekanlar.length){
				for(i=0; i<gelenMekanlar.length;i++){
					gelenMekanlar[i].mesafe = mesafeyiFormatla(gelenMekanlar[i].mesafe);
				}
			}
			anaSayfaOlustur(req,res,cevap,gelenMekanlar);
		}

	);
}

var detaySayfasiOlustur = function(req,res,mekanDetaylari){
	res.render('mekan-detay',
	{
		baslik: mekanDetaylari.ad,
		sayfaBaslik: mekanDetaylari.ad,
		mekanBilgisi: mekanDetaylari
	});
}

var hataGoster = function(req,res,durum){
	var baslik,icerik;
	if(durum==404){
		baslik="404, Sayfa bulunamadi!";
		icerik="Kusura bakma! Sayfayi bulamadık.";
	}
	else{
		baslik=durum+", Birseyler ters gitti!";
		icerik="Ters giden birsey var!";
	}
	res.status(durum);
	res.render('hata',{
		baslik:baslik,
		icerik:icerik
	});
};

//mekanBilgisi controller metodu
//index.js dosyasındaki router.get('/mekan', ctrlMekanlar.mekanBilgisi);
//ile metot url'ye bağlanıyor
const mekanBilgisi=function(req,res){
	var istekSecenekleri;

	istekSecenekleri = {
		url : apiSecenekleri.sunucu + apiSecenekleri.apiYolu + req.params.mekanid,
		method: "GET",
		json: {}
	};

	request(
		istekSecenekleri,

		function(hata,cevap,mekanDetaylari){
			var gelenMekan=mekanDetaylari;
			if(cevap.statusCode!=404){
				gelenMekan.koordinatlar = {
					enlem : mekanDetaylari.koordinatlar[0],
					boylam : mekanDetaylari.koordinatlar[1]
				};
				detaySayfasiOlustur(req,res,gelenMekan);
			}
			else{
				hataGoster(req,res,cevap,statusCode);
			}
		}
		);
}


//yorumEkle controller metodu
//index.js dosyasındaki router.get('/mekan/yorum/yeni', ctrlMekanlar.yorumEkle);
//ile metot url'ye bağlanıyor
const yorumEkle=function(req,res){
	res.render('yorum-ekle',{'title':'Yorum Ekle'});
}

//metotlarımızı kullanmak üzere dış dünyaya aç
//diğer dosyalardan require ile alabilmemizi sağlayacak
module.exports = {
anaSayfa,
mekanBilgisi,
yorumEkle
};
