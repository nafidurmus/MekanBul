const anaSayfa=function(req,res,id){
	res.render('mekanlar-liste',{
		'baslik':'Anasayfa',
		'sayfaBaslik': {
			'siteAd':'MekanBul',
			'aciklama':'Yakında hangi kafeler var bi keşfet bari !'
		},
		'mekanlar': [
		 {
			'ad': 'Starbucks',
			'adres': 'Centrum Garden',
			'puan': 4,
			'imkanlar': ['Kahve','Pasta','Kek','Türk Kahvesi'],
			'mesafe': '11km',
			'id': 1

		  },
		  {
			'ad': 'Gloria Jeans',
			'adres': 'Iyas',
			'puan': 3,
			'imkanlar': ['Kahve','Latte','Kek','Türk Kahvesi'],
			'mesafe': '7km',
			'id': 2


		  },
		  {
			'ad': 'Old Bear Cafe',
			'adres': 'Kafeler Caddesi',
			'puan': 2,
			'imkanlar': ['Kahve','Kek'],
			'mesafe': '14km',
			'id': 3

		  },
		  {
			'ad': 'Cafe Sessiz',
			'adres': 'Kafeler Caddesi',
			'puan': 2,
			'imkanlar': ['Cay','Duble Cay'],
			'mesafe': '14km',
			'id': 4

		  },
		  {
			'ad': 'Kahve Dünyası',
			'adres': 'Iyas',
			'puan': 1,
			'imkanlar': ['Kahve','Cay','Latte'],
			'mesafe': '7km',
			'id': 5

		  }




		]


	});

}

const mekanBilgisi=function(req,res){
	res.render('mekan-detay',{
		'baslik':'Mekan Bilgisi',
		'sayfaBaslik': 'Starbucks',
		'mekanBilgisi': 
		               { 

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
	}
	/*
	{
		'baslik':'Mekan Bilgisi',
		'sayfaBaslik': 'Gloria Jeans',
		'mekanBilgisi': { 
			'ad': 'Gloria Jeans',
			'adres': 'Iyas',
			'puan': 2,
			'imkanlar': ['Kahve','Latte','Kek','Türk Kahvesi'],
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
			    	'kapali':false
			    }

			],
			'yorumlar': [
			     {
			     	'yorumYapan': 'Nafi Durmus',
			     	'puan': 3,
			     	'tarih': '18 Ekim 2017',
			     	'yorumMetni': 'böyle bi latte görmedi'
			     }
			]

		
		}
	},
	{
		'baslik':'Mekan Bilgisi',
		'sayfaBaslik': 'Old Bear Cafe',
		'mekanBilgisi': { 
			'ad': 'Old Bear',
			'adres': 'Kafeler Caddesi',
			'puan': 4,
			'imkanlar': ['Kahve','Kek'],
			'kordinatlar': {
				'enlem': '37.781885',
				'boylam': '30.566034'
			},
			'saatler': [
			    {
			    	'günler':'Pazartesi-Cuma',
			    	'acilis':'9:00',
			    	'kapanis':'24:00',
			    	'kapali':false
			    },

			    {
			    	'günler':'Cumartesi',
			    	'acilis':'10:00',
			    	'kapanis':'24:00',
			    	'kapali':false
			    },
			    {
			    	'günler':'Pazar',
			    	'kapali':false
			    }

			],
			'yorumlar': [
			     {
			     	'yorumYapan': 'Nafi Durmus',
			     	'puan': 3,
			     	'tarih': '18 Ekim 2017',
			     	'yorumMetni': 'kenyayı denemelisin'
			     }
			]

		
		}
	},
	{
		'baslik':'Mekan Bilgisi',
		'sayfaBaslik': 'Cafe Sessiz',
		'mekanBilgisi': { 
			'ad': 'Cafe Sessiz',
			'adres': 'Kafeler Caddesi',
			'puan': 4,
			'imkanlar': ['Cay','Duble Cay'],
			'kordinatlar': {
				'enlem': '37.781885',
				'boylam': '30.566034'
			},
	
			'saatler': [
			    {
			    	'günler':'Pazartesi-Cuma',
			    	'acilis':'8:00',
			    	'kapanis':'02:00',
			    	'kapali':false
			    },

			    {
			    	'günler':'Cumartesi',
			    	'acilis':'8:00',
			    	'kapanis':'03:00',
			    	'kapali':false
			    },
			    {
			    	'günler':'Pazar',
			    	'kapali':false
			    }

			],
			'yorumlar': [
			     {
			     	'yorumYapan': 'Nafi Durmus',
			     	'puan': 3,
			     	'tarih': '18 Ekim 2017',
			     	'yorumMetni': 'cay çok güzel'
			     }
			]

		
		}
	},
	{
		'baslik':'Mekan Bilgisi',
		'sayfaBaslik': 'Kahve Dünyası',
		'mekanBilgisi': { 
			'ad': 'Kahve Dünyası',
			'adres': 'Iyas',
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
			    	'kapali':false
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
	}*/



	);
}

const yorumEkle=function(req,res){
	res.render('yorum-ekle',{'title':'Yorum Ekle'});
}

module.exports = {
anaSayfa,
mekanBilgisi,
yorumEkle
};

