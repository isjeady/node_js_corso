
const loginMe = (req,res,next) => {
    req.user.password = '**********';
    res.status(200).json({ 
        user : req.user,
    });
};

export { loginMe };
