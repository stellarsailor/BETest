const db = require('../config/database');
const escape = require('sql-template-strings');
const authService = require('../services/auth.service')
const bcryptService = require('../services/bcrypt.service');

const UserController = () => {

  // route: /public/register
  const register = async (req, res) => {
    const { body } = req;
    if (body.password === body.password2) {
      let hash = bcryptService().hashPassword(body.password)

      db.promise().query(escape`
        INSERT INTO users (email, password) VALUES (${body.email}, ${hash});
      `)
      .then( ([rows, fields]) => {
        return res.status(200).json({ rows });
      })
      .catch( err => {
        if(err.code === 'ER_DUP_ENTRY') return res.status(500).json({ msg: 'Use Another Email!' });
        return res.status(500).json({ msg: 'Internal server error' });
      })
    } else {
      return res.status(400).json({ msg: 'Passwords don\'t match' });
    }
  };

  // route: /public/login
  const login = async (req, res) => {
    const { email, password } = req.body;
    
    if (email && password) {
      db.promise().query(escape`
        SELECT * FROM users WHERE email = ${email};
      `)
      .then( ([rows, fields]) => {
        if(rows.length === 0) return res.status(400).json({ msg: 'User not found' });

        let user = rows[0]
        let passwordMatching = bcryptService().comparePassword(password, user.password)
        if(passwordMatching){ 
          //if password is matched, issue jwt token
          const token = authService().issue({ id: user.id });
          res.status(200).json({ token, user });
        } else {
          res.status(401).json({ msg: 'Wrong Password!' });
        }
      })
      .catch( err => {
        if(err.code === 'ER_DUP_ENTRY') return res.status(500).json({ msg: 'Use Another Email!' });
        return res.status(500).json({ msg: 'Internal server error' });
      })
    } else {
      res.status(400).json({ msg: 'Email or password is wrong' });
    }
  };

  return {
    register,
    login,
  };
};

module.exports = UserController;
