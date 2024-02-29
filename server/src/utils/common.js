const jwt = require('jsonwebtoken');

 const generateUniqueCode = () => {
    let code = '';
    const characters = '0123456789';
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
};


 function getUserIdFromToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                console.log(err)
                // reject(err);
            } else {
                const userId = decoded.userId;
                resolve(userId);
            }
        });
    });
}

module.exports = {getUserIdFromToken, generateUniqueCode};
