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

const getList = async (Data) => {
    const find = await prisma.list.findMany({
        where: {
            authorId : Number(Data),
        },
    });
    return find;
};

const getListid = async (Data) => {
    const find = await prisma.list.findUniqueOrThrow({
        where: {
            id : Number(Data),
        },
        include: {
            task: true,
        },
    });
    return find;
};


const deleteList = async (id) => {
    return await prisma.list.delete({
        where: { id: Number(id) },
    });
};

// Task functions

const createTask = async (Data) => {
    const date = new Date(Data.dateLimit);
    return await prisma.task.create({
    data: {
        title: Data.title,
        description: Data.description,
        dateLimit : date,
        done : Data.done,
        listId : Data.listId,
    },
    });
};

const getTask = async (Data) => {
    return await prisma.task.findUniqueOrThrow({
        where: {
            id : Number(Data),
        },
    });
};

const updateTask = async (Data) => {
    const update = await prisma.task.update({
     where: {
            id : Number(Data.body.id),
    },
    data: {
        done : Data.body.done,
    },
    });
    return update;
};

const deleteTask = async (taskId) => {
    return await prisma.task.delete({
        where: { id: Number(taskId) },
    });
};


module.exports = {
    createUser,
    loginUser,
    createList,
    getList,
    deleteList,
    createTask,
    getTask,
    deleteTask,
    getListid,
    updateTask,
};
