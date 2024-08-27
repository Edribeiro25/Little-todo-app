const prisma = require('./prismaClient');
const bcrypt = require('bcryptjs');

// User functions

const createUser = async (userData) => {
    const { email, password, name , surname, } = userData;
    console.log("Create", userData);
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

const createList = async (listData) => {
    const { name, userId } = listData;
    return await prisma.list.create({
        data: {
            title: name,
            authorId: userId,
        },
    });
};

const updateList = async (data) => {
    const { name , id} = data;
    return await prisma.list.update({
        where: {
            id : id,
        },
        data: {
            name : name,
        },
    });
};

const getList = async (Data) => {
    const { id } = Data;
    const find = await prisma.list.findMany({
        where: {
            authorID : id,
        },
    });
    return find;
};

const deleteList = async (ListId) => {
    return await prisma.list.delete({
        where: { id: ListId },
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
