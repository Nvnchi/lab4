// require the Message model
const Message = require("../../../models/Message");

const index = async (req, res) => {
    const { user } = req.query;

    try {
        // Controleer of er een gebruikersnaam is opgegeven
        if (user) {
            // Probeer berichten op te halen uit MongoDB voor de opgegeven gebruikersnaam
            let messages = await Message.find({ user });
            res.json({
                status: "success",
                message: `GET messages for username ${user}`,
                data: {
                    messages: messages,
                },
            });
        } else {
            res.status(400).json({
                status: "fail",
                message: "Gebruikersnaam is vereist voor deze query",
            });
        }
    } catch (error) {
        // Als er een fout optreedt bij het ophalen van berichten uit MongoDB
        console.error("Fout bij het ophalen van berichten:", error);
        // Stuur een aangepaste response zonder MongoDB
        res.json({
            message: `GETTING messages for username ${user}`,
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
