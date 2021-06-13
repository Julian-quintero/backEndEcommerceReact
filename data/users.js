import bcrypt from 'bcryptjs'

const users = [
    {// estos usuarios deben tener lo mismo que en el schema

        name:'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true

    },
        {// estos usuarios deben tener lo mismo que en el schema

            name:'John doe',
            email: 'john@example.com',
            password: bcrypt.hashSync('123456',10),
    
        },
            {// estos usuarios deben tener lo mismo que en el schema

                name:'Jehn doe',
                email: 'jehn@example.com',
                password: bcrypt.hashSync('123456',10),
        
            }
]

export default users