
const authorizeRole = (...allowedRoles) => {
    return (req,res,next)=>{
        const userRole = req.user?.role || req.user?.companyUserRole;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access Denied !' });
    }
        next();
    }
}

module.exports = authorizeRole;