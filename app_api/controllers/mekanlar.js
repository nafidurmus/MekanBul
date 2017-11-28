const mongoose = require('mongoose');
const mekan = mongoose.model('mekan');
const cevapOlustur = function (res,status,content) {
  res
    .status(status)
    .json(content);
};

var cevrimler= (function(){
  var dunyaYariCap = 6371; // km
  var radyan2Kilometre = function(radyan) {
    return parseFloat(radyan * dunyaYariCap);
  };
  var kilometre2Radyan = function(mesafe) {
    return parseFloat(mesafe / dunyaYariCap);
  };
  return {
    radyan2Kilometre : radyan2Kilometre,
    kilometre2Radyan: kilometre2Radyan
  }; 
})();

const mekanlariListele= function (req, res) {
    //URL'den enlem ve boylam parametrelerini al
    var boylam= parseFloat(req.query.boylam);
    var enlem = parseFloat(req.query.enlem);
    //alınan bilgilerden nokta tanımla
    var nokta = {
        type: "Point",
        coordinates: [enlem,boylam]
    };//coğrafi seçenekleri ekle
    var geoOptions = {
        spherical: true,
        maxDistance: cevrimler.radyan2Kilometre(20)
    };
    if ((!enlem && boylam!==0) || (!enlem && boylam!==0))  {
        cevapOlustur(res, 404, {
            "mesaj": "enlem ve boylam zorunlu parametreler"
        });
        return; }
        mekan.geoNear(nokta, geoOptions, function(hata, sonuclar) {
      //dönen sonuçları tutacağımız diziyi tanımla
      var mekanlar = [];
      if (hata) {
        cevapOlustur (res, 404, hata);
      } else {//her bir sonucu dolaş ve mekanlara ekle
        sonuclar.forEach(function(sonuc) {
            mekanlar.push({
                mesafe: cevrimler.kilometre2Radyan(sonuc.dis),
                ad: sonuc.obj.ad,
                adres: sonuc.obj.adres,
                puan: sonuc.obj.puan,
                imkanlar: sonuc.obj.imkanlar,
                _id: sonuc.obj._id
            }); });
        cevapOlustur (res, 200, mekanlar);
    }
});
    };

const mekanEkle= function (req, res) {
        mekan.create({
            ad: req.body.ad,
            adres: req.body.adres,
            imkanlar: req.body.imkanlar.split(","),
            koordinatlar: [parseFloat(req.body.enlem), parseFloat(req.body.boylam)],
            saatler: [
            {
                gunler: req.body.gunler1,
                acilis: req.body.acilis1,
                kapanis: req.body.kapanis1,
                kapali: req.body.kapali1,
            }, {
                gunler: req.body.gunler2,
                acilis: req.body.acilis2,
                kapanis: req.body.kapanis2,
                kapali: req.body.kapali2,
            }]
        }, function(hata, mekan) {
            if (hata) {
                cevapOlustur (res, 400, hata);
            } else {
                cevapOlustur (res, 201, mekan);
            }
        });
    };

const mekanGetir = function (req,res) {
//1. istek parametresinde mekanid varsa
if (req.params && req.params.mekanid) {
	mekan
	.findById(req.params.mekanid)
	.exec(function(hata, mekan) {
    //2. eğer mekan bulunamadıysa 404 hatası ver
    //return yazarak çıkış yap
    if (!mekan) {
    	cevapOlustur(res, 404, {
    		"mesaj": "mekanid bulunamadı"
    	});
    	return;
    }
    //3. eğer başka bir hata oluştuysa hata mesajını yaz
    else if (hata) {
    	cevapOlustur(res, 404, hata);
    	return;
    }
    // hata yoksa mekan nesnesini döndür.
    cevapOlustur(res, 200, mekan);
});
} 
//Eğer istek parametrelerinde mekanid yoksa hata mesajı ver.
else {
	cevapOlustur(res, 404, {
		"mesaj": "istekte mekanid yok"
	});
}
};

const mekanGuncelle= function (req, res) {
	if (!req.params.mekanid) {
		cevapOlustur(res, 404, {
			"mesaj": "Bulunamadı. mekanid gerekli"});
		return; }
		mekan
		.findById(req.params.mekanid)
		//- işareti yorumlar ve puan dışında herşeyi almamızı söyler
		.select('-yorumlar -puan')
		.exec(
			function(hata, gelenMekan) {
				if (!gelenMekan) {
					cevapOlustur(res, 404, {"mesaj": "mekanid bulunamadı"});
					return;
				} else if (hata) {
					cevapOlustur(res, 400, hata);
					return; }
					gelenMekan.ad = req.body.ad;
					gelenMekan.adres = req.body.adres;
					gelenMekan.imkanlar = req.body.imkanlar.split(",");
					gelenMekan.mesafe = [parseFloat(req.body.enlem),
					parseFloat(req.body.boylam)];
					gelenMekan.saatler = [{
						gunler: req.body.gunler1,
						acilis: req.body.acilis1,
						kapanis: req.body.kapanis1,
						kapali: req.body.kapali1,
					}, {
						gunler: req.body.gunler2,
						acilis: req.body.acilis2,
						kapanis: req.body.kapanis2,
						kapali: req.body.kapali2,
					}];
					gelenMekan.save(function(hata, mekan) {
						if (hata) {
							cevapOlustur(res, 404,hata);
						} else {
							cevapOlustur(res, 200, mekan);
						}
					});
				}); }

const mekanSil= function (req, res) {

            var mekanid = req.params.mekanid;
            if (mekanid) {
                mekan
                .findByIdAndRemove(mekanid)
                .exec(
                    function(hata, gelenMekan) {
                      if (hata) {
                        cevapOlustur(res, 404, hata);
                        return; 
                    }
                        cevapOlustur(res, 204,  null);
                    }
                    );
            } else {
                cevapOlustur(res, 404, {
                  "mesaj": "mekanid bulunamadı"
              }); }
            };


module.exports={
mekanlariListele,
mekanEkle,
mekanGetir,
mekanGuncelle,
mekanSil
 }














 