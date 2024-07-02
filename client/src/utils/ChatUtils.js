
const getSender = (users, current)=>{
   const sender= users[0]._id == current._id ? users[1] : users[0]; 
   return sender
}

const isSameSender = async(msg, current)=>{
   try {
       return await msg?.sender?._id == current?._id
   } catch (error) {
      console.log(error)
   }
    
   }
export {getSender, isSameSender}