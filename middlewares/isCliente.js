const isCliente = (req, res, next) => {
    if (req.role === 'CLIENTE') {
      next()
    } else {
      return res.status(403).json({ message: 'You do not have the necessary permissions' }) // 403 Forbidden
    }
  }
  
  export { isCliente }