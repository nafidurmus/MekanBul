
var express=require('express');
var router=express.Router();

//mekanlar.js yolu
var ctrlMekanlar=require('../controllers/mekanlar');
//digerleri.js yolu
var ctrlDigerleri=require('../controllers/digerleri');

//Anasayfa rotası
router.get('/',ctrlMekanlar.anaSayfa);
//Mekan bilgisi rotası
router.get('/mekan', ctrlMekanlar.mekanBilgisi);
//Yeni yorum rotası
router.get('/mekan/yorum/yeni', ctrlMekanlar.yorumEkle);
//Hakkında rotası
router.get('/hakkinda', ctrlDigerleri.hakkinda)
module.exports=router;

