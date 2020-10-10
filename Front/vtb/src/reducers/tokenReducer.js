export default function(state, action){
    switch(action.type){
        case 'setToken':
            return action.payload
        default:
            return state
    }
}