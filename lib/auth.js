module.exports = {
    isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        
        return res.redirect('/login');
        
    },

    IsNotLoggedin(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/inicio');
    }


}