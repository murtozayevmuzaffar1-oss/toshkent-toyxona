export default async function handler(req, res) {

    if (req.method !== "POST") {
      return res.status(405).json({
        message: "Only POST requests allowed"
      });
    }
  
    try {
  
      const {
        fullName,
        phone,
        eventDate,
        eventTime,
        eventType
      } = req.body;
  
      const BOT_TOKEN = "8603818384:AAFsCltyvMcglQZDpjREGYtJQsNv9lkCPyw";
      const CHAT_ID = "7536089106";
  
      const text = `
  🔥 Yangi bron so‘rovi
  
  👤 Ism: ${fullName}
  📞 Telefon: ${phone}
  📅 Sana: ${eventDate}
  ⏰ To‘y vaqti: ${eventTime}
  🎉 Tadbir turi: ${eventType}
  
  📍 TOSHKENT To‘yxonasi
  `;
  
      const telegramUrl =
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  
      await fetch(telegramUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text
        })
      });
  
      return res.status(200).json({
        success: true
      });
  
    } catch (error) {
  
      return res.status(500).json({
        success: false,
        error: error.message
      });
  
    }
  
  }