
//hakkinda controller metodu
//index.js dosyasındaki router.get('/',ctrlMekanlar.hakkinda);
//ile metot url'ye bağlanıyor
module.exports.hakkinda=function(req,res){
	res.render('hakkinda',{'title':'Hakkında'});
}
