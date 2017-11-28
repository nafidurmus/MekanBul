//anaSayfa controller metodu
//index.js dosyasındaki router.get('/',ctrlMekanlar.anaSayfa);
//ile metot url'ye bağlanıyor
const anaSayfa=function(req,res){
	res.render('mekanlar-liste',{
		'baslik':'Anasayfa',
		'sayfaBaslik':{
			'siteAd':'MekanBul',
			'aciklama':'Yakınınızdaki mekanları keşfedin!'
		},
		'mekanlar':[
		{
			'ad':'Starbucks',
			'adres':'Centrum Garden',
			'puan':3,
			'imkanlar':['Kahve','Pasta','Kek'],
			'mesafe':'10km'
		},
		{
			'ad':'Gloria Jeans',
			'adres':'IYAŞ AVM',
			'puan':4,
			'imkanlar':['Türk Kahvesi','Pasta','Kek'],
			'mesafe':'5km'
		}
		]

	});
}
//mekanBilgisi controller metodu
//index.js dosyasındaki router.get('/mekan', ctrlMekanlar.mekanBilgisi);
//ile metot url'ye bağlanıyor
const mekanBilgisi=function(req,res){
	res.render('mekan-detay',{
		'baslik':'Mekan Bilgisi',
		'sayfaBaslik':'Starbucks',
		'mekanBilgisi':{
			'ad':'Starbucks',
			'adres':'Centrum Garden',
			'puan':3,
			'imkanlar':['Kahve','Pasta','Kek'],
			'koordinatlar':{
				'enlem':37.781885,
				'boylam':30.566034
			},
			'saatler':[
				{
				  'gunler':'Pazartesi-Cuma',
				  'acilis':'7:00',
				  'kapanis':'23:00',
				  'kapali':false
				},
				{
				  'gunler':'Cumartesi',
				  'acilis':'9:00',
				  'kapanis':'22:30',
				  'kapali':false
				},			
				{
				  'gunler':'Pazar',
				  'kapali':true
				}	
			],
			'yorumlar':[
			    {
			       'yorumYapan':'nafi durmuş',
			       'puan':3,
			       'tarih':'30 Şubat 2018',
			       'yorumMetni':'Kahveleri çok güzel'
			    }

			]
		}
	});
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

