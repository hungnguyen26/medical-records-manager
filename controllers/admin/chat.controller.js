

module.exports.index = async (req, res)=>{
    // res.send("SOCKET.IO");
    res.render("admin/pages/chat/index.pug",{
        pageTitle: "Tin nhắn",
    });
}

// // [GET] /chat/:idRoomChat
// module.exports.index = async (req, res) => {
//     //lấy ra phongf chat
//     const idRoomChat = req.params.idRoomChat;

//     const user_id = res.locals.user.id;
//     const fullName = res.locals.user.fullName;
//     // SocketIO
//     _io.once('connection', (socket) => {
//         socket.join(idRoomChat);
//         socket.on("CLIENT_SEND_MESS", async (data)=>{
//           // console.log(data.imgs);
//           // khi có data thì lưu vào db
//           const chat = new Chat({
//             user_id: user_id,
//             content: data.content,
//             images: data.imgs,
//             room_chat_id:idRoomChat
//           });
//           await chat.save();

//           // trả data về client
//           _io.to(idRoomChat).emit("SERVER_RETURN_MESS",{
//             userId: user_id,
//             fullName: fullName,
//             data: data,
//             images: data.imgs,
//           });
//         });

//         socket.on("CLIENT_SEND_TYPING",(type)=>{
//           socket.broadcast.to(idRoomChat).emit("SERVER_RETURN_TYPING",{
//             userId: user_id,
//             fullName: fullName,
//             type: type
//           })
//         });
//     });
//     // END SocketIO

//     // lấy ra data chat
//     const chats = await Chat.find({
//       room_chat_id: idRoomChat,
//       deleted:false
//     });

//     for (const chat of chats) {
//       const inforUser = await User.findOne({
//         _id: chat.user_id
//       }).select("fullName");
      
//       chat.inforUser = inforUser;
//     }


//     const idRoom = req.params.idRoomChat;
//     const room = await Roomchat.findOne({
//       _id:idRoom
//     })

//     const titleRoomChat = room.title;

//     res.render("client/pages/chat/index.pug", {
//         pageTitle: "Chat",
//         chats: chats,
//         titleRoomChat:titleRoomChat
//       });
// };
