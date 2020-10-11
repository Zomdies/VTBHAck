export default function(state, action){
    switch(action.type){
        case 'setLogin':
            return action.payload
        default:
            return state
    }
}