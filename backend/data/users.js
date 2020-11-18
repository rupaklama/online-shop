import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'admin',
    email: 'admin@testing.com',
    password: bcrypt.hashSync('testing1234', 10),
    isAdmin: true,
  },
  {
    name: 'rupaklama',
    email: 'rupak@testing.com',
    password: bcrypt.hashSync('testing1234', 10),
  },
  
]

export default users;
