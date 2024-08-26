const prisma = require('./prismaClient');
const bcrypt = require('bcryptjs');

const createUser = async (userData) => {
    const { email, password, name } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });
};

const loginUser = async (userData) => {
    const { email, password} = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.findUnique({
        data: {
            email,
            password: hashedPassword,
        },
    });
};

const createList = async (Data) => {
    const { name } = Data;
    return await prisma.list.create({
        data: {
            
        },
    });
};

const createTask = async (Data) => {
    const { email, password, name } = Data;
    return await prisma.list.create({
        data: {
        },
    });
};

const deleteList = async (userId) => {
    return await prisma.list.delete({
        where: { id: userId },
    });
};


const deleteTask = async (userId) => {
    return await prisma.task.delete({
        where: { id: userId },
    });
};

module.exports = {
    createUser,
    createList,
    createTask,
    deleteList,
    deleteTask,
    loginUser,
};
