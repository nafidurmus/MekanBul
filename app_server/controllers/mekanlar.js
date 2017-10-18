const anaSayfa=function(req,res){
	res.render('mekanlar-liste',{
		'baslik':'Anasayfa',
		'sayfaBaslik': {
			'siteAd':'MekanBul',
			'aciklama':'Yakınınınzdaki meknaları görün !'
		},
		'mekanlar': [
		 {
			'ad': 'Starbucks',
			'adres': 'Centrum Garden',
			'puan': 4,
			'imkanlar': ['Kahve','Pasta','Kek','Türk Kahvesi'],
			'mesafe': '11km'

		  },
		  {
			'ad': 'Gloria Jeans',
			'adres': 'Iyas',
			'puan': 3,
			'imkanlar': ['Kahve','Latte','Kek','Türk Kahvesi'],
			'mesafe': '7km'

		  },
		  {
			'ad': 'Old Bear Cafe',
			'adres': 'Kafeler Caddesi',
			'puan': 2,
			'imkanlar': ['Kahve','Kek'],
			'mesafe': '14km'

		  },
		  {
			'ad': 'Cafe Sessiz',
			'adres': 'Kafeler Caddesi',
			'puan': 2,
			'imkanlar': ['Cay','Duble Cay'],
			'mesafe': '14km'

		  }



		]


	});

}

const mekanBilgisi=function(req,res){
	res.render('mekan-detay',{
		'baslik':'Mekan Bilgisi',
		'sayfaBaslik': 'Starbucks',
		'mekanBilgisi': {
			'ad': 'Starbucks komşum',
			'adres': 'Centrum Garden',
			'puan': 4,
			'imkanlar': ['Kahve','Pasta','Kek','Türk Kahvesi'],
			'kordinatlar': {
				'enlem': '37.781885',
				'boylam': '30.566034'
			},
			'saatler': [
			    {
			    	'günler':'Pazartesi-Cuma',
			    	'acilis':'7:00',
			    	'kapanis':'24:00',
			    	'kapali':false
			    },

			    {
			    	'günler':'Cumartesi',
			    	'acilis':'7:00',
			    	'kapanis':'24:00',
			    	'kapali':false
			    },
			    {
			    	'günler':'Pazar',
			    	'kapali':true
			    }

			],
			'yorumlar': [
			     {
			     	'yorumYapan': 'Nafi Durmus',
			     	'puan': 3,
			     	'tarih': '18 Ekim 2017',
			     	'yorumMetni': 'kahvesi çok iyi yaa :)'
			     }
			]
		}

	});
}

const yorumEkle=function(req,res){
	res.render('yorum-ekle',{'title':'Yorum Ekle'});
}

module.exports = {
anaSayfa,
mekanBilgisi,
yorumEkle
};

