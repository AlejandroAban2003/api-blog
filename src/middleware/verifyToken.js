import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) return res.status(403).send({ message: " No token provided! " });

  if (token.startsWith("Bearer ")) {
    {
      token = token.slice(7, token.length);
    }
  }

  jwt.verify(token, 'process.env.SECRET_KEY', (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: " Unauthorized! " });
    }
    req.userId = decoded.id;
    next();
  });

};
