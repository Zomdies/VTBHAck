export default function(state, action){
    switch(action.type){
        case 'setID':
            return action.payload
        default:
            return state
    }
}