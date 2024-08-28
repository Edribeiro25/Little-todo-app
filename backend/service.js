const prisma = require('./prismaClient');
const bcrypt = require('bcryptjs');

// User functions

const createUser = async (userData) => {
    const { email, password, name , surname, } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
        data: {
            email : email,
            name : name,
            password: hashedPassword,
            surname : surname,
        },
    });
};

const loginUser = async (userData) => {
    const { email, password} = userData;
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    return user;
};


// List functions

const createList = async (Data) => {
    const list = await prisma.list.create({
        data: {
            title: Data.body.title,
            authorId: Data.body.userId,
        },
    });
    return list;
};

const updateList = async (data) => {
    const { name , id} = data;
    return await prisma.list.update({
        where: {
            id : Number(id),
        },
        data: {
            name : name,
        },
    });
};

const getList = async (Data) => {
    const find = await prisma.list.findMany({
        where: {
            authorId : Number(Data),
        },
    });
    return find;
};

const deleteList = async (id) => {
    console.log(id);
    return await prisma.list.delete({
        where: { id: Number(id) },
    });
};

// Task functions

const createTask = async (Data) => {
    const { title, listId } = Data;
    return await prisma.task.create({
        data: {
            title,
            listId,
        },
    });
};

const getTask = async (Data) => {
    const { id } = Data;
    return await prisma.task.findUniqueOrThrow({
        where: {
            id : id,
        },
    });
};

const deleteTask = async (taskId) => {
    return await prisma.task.delete({
        where: { id: taskId },
    });
};


module.exports = {
    createUser,
    loginUser,
    createList,
    updateList,
    getList,
    deleteList,
    createTask,
    getTask,
    deleteTask,
};
