import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Gianmarco',
        email: 'master@hotmail.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true
    },
    {
        name: 'Drakkon',
        email: 'drakkon@hotmail.com',
        password: bcrypt.hashSync('12345', 10),
    },
    {
        name: 'Gianni',
        email: 'gianni@hotmail.com',
        password: bcrypt.hashSync('12345', 10),
    }
];

export default users;