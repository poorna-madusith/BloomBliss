const jwt = require('jsonwebtoken');


module.exports = function(req, res, next){
    console.log('Auth Headers:', req.headers);
    const token = req.headers['authorization']?.split(' ')[1];
    

    if(!token){
        return res.status(401).json({message: 'Access denied. No token provided.'});
    }
     try{
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log('Decoded token:', decoded);
        req.user = decoded;
        next();
     } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({message: 'Invalid token.'});
     }
};