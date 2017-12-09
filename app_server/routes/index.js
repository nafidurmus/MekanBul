
var express=require('express');
var router=express.Router();

//mekanlar.js yolu
var ctrlMekanlar=require('../controllers/mekanlar');
//digerleri.js yolu
var ctrlDigerleri=require('../controllers/digerleri');

//Anasayfa rotası
router.get('/',ctrlMekanlar.anaSayfa);
router.get('/mekan/:mekanid', ctrlMekanlar.mekanBilgisi); 
router.get('/mekan/:mekanid/yorum/yeni', ctrlMekanlar.yorumEkle);
router.post('/mekan:/mekanid/yorum/yeni', ctrlMekanlar.yorumumuEkle);


//Yeni yorum rotası
router.get('/mekan/yorum/yeni', ctrlMekanlar.yorumEkle);
//Hakkında rotası
router.get('/hakkinda', ctrlDigerleri.hakkinda)
module.exports=router;

