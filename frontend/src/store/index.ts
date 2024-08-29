import { createStore} from 'vuex';

const store = createStore(
    {   
        state: {
            user : {
                id: 0,
                firstname: '',
                lastname: '',
                list: [],
            },
            list: {
                id : 0,
                title : '',
                task : [],
            },
            task :{
                id : 0,
                title : '',
                description : '',
                done : false,
                dateLimit : '',
                datecreated : '',
            },
            taskVisible : false,
            listVisible : false, 
        },
        getters:{
            getUser(state){return state.user},
            getUserId(state){return state.user.id},
        },
        mutations:{
            setUser(state , User){ state.user = User},
            setUserId(state , id :number){ state.user.id = id },
            setFirstname(state , firstname : string){state.user.firstname = firstname},
            setLastname(state , lastname : string){state.user.lastname = lastname},
        },
        actions :{
            reset(){}
        }
    }
)
export default store;
