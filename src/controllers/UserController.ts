import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {

    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const usersRepository = getRepository(User);

        //this is for searching if there isn't a similar email
        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        //if there is a similar email, you can't add a new user
        if(userAlreadyExists) {
            return response.status(400).json({ error: "User already exists!"});
        }

        //this you will pass the name and the email for the user input
        const user = usersRepository.create({
            name,
            email
        });

        await usersRepository.save(user);

        return response.json(user);
    }
}

export { UserController };