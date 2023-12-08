// require the Message model
const Message = require("../../../models/Message");

const index = async (req, res) => {
    try {
        // Probeer berichten op te halen uit MongoDB
        let messages = await Message.find({});
        res.json({
            status: "success",
            message: "GET all messages",
            data: [
                {
                    messages: messages,
                },
            ],
        });
    } catch (error) {
        // Als er een fout optreedt bij het ophalen van berichten uit MongoDB
        console.error("Fout bij het ophalen van berichten:", error);
        // Stuur een aangepaste response zonder MongoDB
        res.json({
            message: "GETTING messages",
        });
    }
};

const create = async (req, res) => {
    let message = req.body.message;
    let m = new Message();
    m.message = message;
    await m.save();

    res.json({
        status: "success",
        message: "POST a new message",
        data: [
            {
                message: m,
            },
        ],
    });
};

module.exports.index = index;
module.exports.create = create;
