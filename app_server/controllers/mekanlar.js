//anaSayfa controller metodu
//index.js dosyasındaki router.get('/',ctrlMekanlar.anaSayfa);
//ile metot url'ye bağlanıyor
//API'ye bağlanabilmek için request modulünü ekle
var request = require('request');
//api seçeneklerini ayarla
//Eğer üretim ortamında çalışıyorsa herokudan al
//Lokalde çalışıyorsa localhost varsayılan sunucu
var apiSecenekleri = {
  //sunucu : "http://localhost:3000",
  sunucu : "http://nafidurmusmekanbul.herokuapp.com",
  apiYolu: '/api/mekanlar/',
  adminApiYolu: '/api/tummekanlar/'
};





var adminSayfaOlustur = function(req, res,cevap, mekanListesi){
var mesaj;
//Gelen mekanListesi eğer dizi tipinde değilse hata ver.
if (!(mekanListesi instanceof Array)) {
  mesaj = "API HATASI";
  mekanListesi = [];
} else {
  //Eğer belirlenen mesafe içinde mekan bulunamadıysa bilgilendir
  if (!mekanListesi.length) {
    mesaj = "Herhangi Bir Mekan Bulunamadı!";
  }
}
res.render('admin', { baslik: 'MekanBul-Admin',
  sayfaBaslik:{
    siteAd:'MekanBul',
    aciklama:'Mekanları Yönetin'
  },
  mekanlar:mekanListesi,
  mesaj: mesaj,
  cevap:cevap
});
};


var adminSayfa = function (req, res){
  var istekSecenekleri;
    istekSecenekleri = 
    {//tam yol
    url : apiSecenekleri.sunucu + apiSecenekleri.adminApiYolu,
    //Veri çekeceğimiz için GET metodunu kullan
    method : "GET",
    //Dönen veri json formatında olacak
    json : {}
  };//istekte bulun
  request(
    istekSecenekleri,
    //geri dönüş metodu
    function(hata, cevap, mekanlar) {
      var i, gelenMekanlar;
      gelenMekanlar = mekanlar;

      //mekan ekle butonu
      adminSayfaOlustur(req, res, cevap, gelenMekanlar);
    } 
  );
};




var mekanEkleSayfasiOlustur = function(req, res) {
res.render('mekan-ekle', { 
  baslik: ' Yeni Mekan Ekle',
  sayfaBaslik: ' Yeni Mekan Ekle' ,
    hata: req.query.hata
  });

};
const mekanEkle = function (req, res){
   mekanEkleSayfasiOlustur(req, res);
}
const mekaniEkle = function (req, res){
  var istekSecenekleri, mekanOzellikleri;
  mekanOzellikleri = {
    ad: req.body.mekanAdi,
    adres: req.body.mekanAdresi,
    imkanlar: req.body.imkanlar,
    enlem: parseFloat(req.body.enlem),
    boylam: parseFloat(req.body.boylam),
    gunler1: req.body.gunler1,
    acilis1: req.body.acilis1,
    kapanis1: req.body.kapanis1,
    gunler2: req.body.gunler2,
    acilis2: req.body.acilis2,
    kapanis2: req.body.kapanis2
  };
  istekSecenekleri = {
    url : apiSecenekleri.sunucu+ apiSecenekleri.apiYolu,
    method : "POST",
    json : mekanOzellikleri
  };
  if (!mekanOzellikleri.ad || !mekanOzellikleri.adres || !mekanOzellikleri.imkanlar|| !mekanOzellikleri.enlem|| 
    !mekanOzellikleri.boylam|| !mekanOzellikleri.gunler1|| !mekanOzellikleri.acilis1|| !mekanOzellikleri.kapanis1|| 
    !mekanOzellikleri.gunler2|| !mekanOzellikleri.acilis2|| !mekanOzellikleri.kapanis2) {
    res.redirect('/admin'+ '/mekan/yeni?hata=evet'); 
  } else { 
    
    request(
      istekSecenekleri,
      function(hata, cevap, body) {
        if (cevap.statusCode === 201) {
          res.redirect('/admin');
        } 
        else if (cevap.statusCode === 400) {
          res.redirect('/admin' + '/mekan/yeni?hata=evet'); 
        }
        else {
          hataGoster(req, res, cevap.statusCode);
        } 
      }
      );
    }
};


var mekanSil = function (req, res){
  var istekSecenekleri, mekanid;
  mekanid = req.params.mekanid;
  istekSecenekleri = {
    url : apiSecenekleri.sunucu + apiSecenekleri.apiYolu + mekanid,
    method : "DELETE"
  };
  request(
      istekSecenekleri,
      function(hata, cevap, body) {
        if (cevap.statusCode === 204) {
          res.redirect('/admin');
        }
        else {
          hataGoster(req, res, cevap.statusCode);
        } 
      }
      );
};


var mekanGuncelleSayfasiOlustur = function(req, res, mekanBilgisi) {
  var imkanlarDegisken = '';
  for (var i = 0; i < mekanBilgisi.imkanlar.length;  i++) {
      imkanlarDegisken  +=  mekanBilgisi.imkanlar[i] + ',';
    }
  res.render('mekan-guncelle', { baslik: mekanBilgisi.ad+ ' Mekanını Güncelle',
    sayfaBaslik:mekanBilgisi.ad+ ' Mekanını Güncelle' ,
    mekanAdi : mekanBilgisi.ad,
    mekanAdresi: mekanBilgisi.adres,
    imkanlar: imkanlarDegisken,//.split(","),
    enlem: mekanBilgisi.koordinatlar.enlem,
    boylam: mekanBilgisi.koordinatlar.boylam,
    gunler1: mekanBilgisi.saatler[0].gunler,
    acilis1: mekanBilgisi.saatler[0].acilis,
    kapanis1: mekanBilgisi.saatler[0].kapanis,
    gunler2: mekanBilgisi.saatler[1].gunler,
    acilis2: mekanBilgisi.saatler[1].acilis,
    kapanis2: mekanBilgisi.saatler[1].kapanis,
    hata: req.query.hata
  });
};

var mekanGuncelle = function (req, res){
  mekanBilgisiGetir(req, res, function(req, res, cevap) {
   mekanGuncelleSayfasiOlustur(req, res, cevap);
 });
};
var mekaniGuncelle = function (req, res){
  var istekSecenekleri, mekanOzellikleri,mekanid;
  mekanid=req.params.mekanid;
  mekanOzellikleri = {
    ad: req.body.mekanAdi,
    adres: req.body.mekanAdresi,
    imkanlar: req.body.imkanlar,
    enlem: parseFloat(req.body.enlem),
    boylam: parseFloat(req.body.boylam),
    gunler1: req.body.gunler1,
    acilis1: req.body.acilis1,
    kapanis1: req.body.kapanis1,
    gunler2: req.body.gunler2,
    acilis2: req.body.acilis2,
    kapanis2: req.body.kapanis2
  };
  istekSecenekleri = {
    url : apiSecenekleri.sunucu+ apiSecenekleri.apiYolu+mekanid,
    method : "PUT",
    json : mekanOzellikleri
  };
  if (!mekanOzellikleri.ad || !mekanOzellikleri.adres || !mekanOzellikleri.imkanlar|| !mekanOzellikleri.enlem|| 
    !mekanOzellikleri.boylam|| !mekanOzellikleri.gunler1|| !mekanOzellikleri.acilis1|| !mekanOzellikleri.kapanis1|| 
    !mekanOzellikleri.gunler2|| !mekanOzellikleri.acilis2|| !mekanOzellikleri.kapanis2) {
    res.redirect('/admin/mekan/' + mekanid + '/guncelle?hata=evet'); 
  } else { 
    request(
      istekSecenekleri,
      function(hata, cevap, body) {
        if (cevap.statusCode === 200) {
          res.redirect('/mekan/' + mekanid);
        } 
        else if (cevap.statusCode === 400) {
          res.redirect('/admin/mekan/' + mekanid + '/guncelle?hata=evet'); 
        }
        else {
          hataGoster(req, res, cevap.statusCode);
        } 
      }
      );
    }
};












//if (process.env.NODE_ENV === 'production') {
//  apiSecenekleri.sunucu = "asimsinanyuksel.herokuapp.com";
//Virgülden sonraki uzun değerleri göstermemek için veriyi formatla
var mesafeyiFormatla = function (mesafe) {
  var yeniMesafe, birim;
  if (mesafe> 1) {
    yeniMesafe= parseFloat(mesafe).toFixed(1);
    birim = 'km';
  } else {
    yeniMesafe = parseInt(mesafe * 1000,10);
    birim = 'm'; 
  }
    return yeniMesafe + birim;
  };

var anaSayfaOlustur = function(req, res,cevap, mekanListesi){
  var mesaj;
//Gelen mekanListesi eğer dizi tipinde değilse hata ver.
if (!(mekanListesi instanceof Array)) {
  mesaj = "API HATASI: Birşeyler ters gitti";
  mekanListesi = [];
} else {//Eğer belirlenen mesafe içinde mekan bulunamadıysa bilgilendir
  if (!mekanListesi.length) {
    mesaj = "Civarda Herhangi Bir Mekan Bulunamadı!";
  }
}
res.render('mekanlar-liste', 
  { 
  baslik: 'MekanBul',
  sayfaBaslik:{
    siteAd:'MekanBul',
    aciklama:'Yakınınızda Kafeleri, Restorantları Bulun!'
  },
  mekanlar:mekanListesi,
  mesaj: mesaj,
  cevap:cevap
});
};
const anaSayfa=function(req,res){
  var istekSecenekleri;
    istekSecenekleri = 
    {//tam yol
    url : apiSecenekleri.sunucu + apiSecenekleri.apiYolu,
    //Veri çekeceğimiz için GET metodunu kullan
    method : "GET",
    //Dönen veri json formatında olacak
    json : {},
    //Sorgu parametreleri.URL'de yazılan enlem boylamı al
    //localhost:3000/?enlem=37&boylam=30 gibi
    qs : {
      enlem :  req.query.enlem,
      boylam : req.query.boylam
    }
  };//istekte bulun
  request(
    istekSecenekleri,
    //geri dönüş metodu
    function(hata, cevap, mekanlar) {
      var i, gelenMekanlar;
      gelenMekanlar = mekanlar;
      //Sadece 200 durum kodunda ve mekanlar doluyken işlem yap
      if (!hata && gelenMekanlar.length) {
        for (i=0; i<gelenMekanlar.length; i++) {
          gelenMekanlar[i].mesafe = 
          mesafeyiFormatla(gelenMekanlar[i].mesafe);
        }
      }
      anaSayfaOlustur(req, res, cevap,gelenMekanlar);
    } 
  );
}

var detaySayfasiOlustur = function(req, res,mekanDetaylari){
 res.render('mekan-detay', 
 { 
  baslik: mekanDetaylari.ad,
  sayfaBaslik: mekanDetaylari.ad,
  mekanBilgisi:mekanDetaylari
});
}
var hataGoster = function(req, res,durum){
  var baslik,icerik;
  if(durum==404){
    baslik="404, Sayfa Bulunamadı!";
    icerik="Kusura bakma sayfayı bulamadık!";
  }
  else{
     baslik=durum+", Birşeyler ters gitti!";
     icerik="Ters giden birşey var!";
  }
 res.status(durum);
 res.render('hata',{
    baslik:baslik,
    icerik:icerik
 });
};

var mekanBilgisiGetir = function (req, res, callback) {
  var istekSecenekleri;
  //istek seçeneklerini ayarla.
  istekSecenekleri = {
    //tam yol
    url : apiSecenekleri.sunucu + apiSecenekleri.apiYolu + req.params.mekanid,
    //Veri çekeceğimiz için GET metodunu kullan
    method : "GET",
    //Dönen veri json formatında olacak
    json : {}
  };//istekte bulun
  request(
    istekSecenekleri,
    //geri dönüş metodu
    function(hata, cevap, mekanDetaylari) {
      var gelenMekan = mekanDetaylari;
      if (!hata) {
        //enlem ve boylam bir dizi şeklinde bunu ayır. 
        //0'da enlem 1 de boylam var
        gelenMekan.koordinatlar = {
          enlem : mekanDetaylari.koordinatlar[0],
          boylam : mekanDetaylari.koordinatlar[1]
        };
        callback(req, res,gelenMekan);

      } else {
        hataGoster(req, res, cevap.statusCode);
      }
    }
    ); 
};
//mekanBilgisi controller metodu
//index.js dosyasındaki router.get('/mekan', ctrlMekanlar.mekanBilgisi);
//ile metot url'ye bağlanıyor
const mekanBilgisi = function (req, res, callback) {
  mekanBilgisiGetir(req, res, function(req, res, cevap) {
   detaySayfasiOlustur(req, res, cevap);
 });
};
var yorumSayfasiOlustur = function (req, res, mekanBilgisi) {
  res.render('yorum-ekle', { baslik: mekanBilgisi.ad+ ' Mekanına Yorum Ekle',
    sayfaBaslik:mekanBilgisi.ad+ ' Mekanına Yorum Ekle' ,
    hata: req.query.hata
  });
};
//yorumEkle controller metodu
//index.js dosyasındaki router.get('/mekan/:mekanid/yorum/yeni', ctrlMekanlar.yorumEkle);
//ile metot url'ye bağlanıyor
const yorumEkle=function(req,res){
  mekanBilgisiGetir(req, res, function(req, res, cevap) {
   yorumSayfasiOlustur(req, res, cevap);
 });
}
//yorumumuEkle controller metodu
//index.js dosyasındaki router.get('/mekan/:mekanid/yorum/yeni', ctrlMekanlar.yorumumuEkle);
//ile metot url'ye bağlanıyor
const yorumumuEkle = function(req, res){
  var istekSecenekleri, gonderilenYorum,mekanid;
  mekanid=req.params.mekanid;
  gonderilenYorum = {
    yorumYapan: req.body.name,
    puan: parseInt(req.body.rating, 10),
    yorumMetni: req.body.review
  };
  istekSecenekleri = {
    url : apiSecenekleri.sunucu+ apiSecenekleri.apiYolu+mekanid+'/yorumlar',
    method : "POST",
    json : gonderilenYorum
  };
  if (!gonderilenYorum.yorumYapan || !gonderilenYorum.puan || !gonderilenYorum.yorumMetni) {
    res.redirect('/mekan/' + mekanid + '/yorum/yeni?hata=evet'); 
  } else { 
    request(
      istekSecenekleri,
      function(hata, cevap, body) {
        if (cevap.statusCode === 201) {
          res.redirect('/mekan/' + mekanid);
        } 
        else if (cevap.statusCode === 400 && body.name && body.name ==="ValidationError" ) {
          res.redirect('/mekan/' + mekanid + '/yorum/yeni?hata=evet'); 
        }
        else {
          hataGoster(req, res, cevap.statusCode);
        } 
      }
      );
    }
  };
//metotlarımızı kullanmak üzere dış dünyaya aç
//diğer dosyalardan require ile alabilmemizi sağlayacak
module.exports = {
anaSayfa,
mekanBilgisi,
yorumEkle,
yorumumuEkle,
adminSayfa,
mekanEkle,
mekaniEkle,
mekanSil,
mekanGuncelle,
mekaniGuncelle
};















