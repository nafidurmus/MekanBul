
var express=require('express');
var router=express.Router();
//mekanlar.js yolu
var ctrlMekanlar=require('../controllers/mekanlar');
//yorumlar.js yolu
var ctrlYorumlar=require('../controllers/yorumlar');
//mekanlar
router
.route('/tummekanlar')
.get(ctrlMekanlar.tumMekanlariListele);

router
.route('/mekanlar')
.get(ctrlMekanlar.mekanlariListele)
.post(ctrlMekanlar.mekanEkle);
router
.route('/mekanlar/:mekanid')
.get(ctrlMekanlar.mekanGetir)
.put(ctrlMekanlar.mekanGuncelle)
.delete(ctrlMekanlar.mekanSil);
//yorumlar
router
.route('/mekanlar/:mekanid/yorumlar')
.post(ctrlYorumlar.yorumEkle);
router
.route('/mekanlar/:mekanid/yorumlar/:yorumid')
.get(ctrlYorumlar.yorumGetir)
.put(ctrlYorumlar.yorumGuncelle)
.delete(ctrlYorumlar.yorumSil);
module.exports=router;

