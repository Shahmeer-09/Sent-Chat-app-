
const getSender = (users, current)=>{
   const sender= users[0]._id == current._id ? users[1] : users[0]; 
   return sender
}

const isSameSender = (msg, current)=>{
    if(msg.sender._id == current._id){
       return true
    }
    else{
       return false
    }
   }
export {getSender, isSameSender}