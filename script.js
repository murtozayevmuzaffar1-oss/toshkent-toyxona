pannellum.viewer("panorama", {
  type: "equirectangular",
  panorama: "https://pannellum.org/images/alma.jpg",
  autoLoad: true,
  autoRotate: -1,
  showZoomCtrl: true,
  compass: false
});

const bookingForm = document.getElementById("bookingForm");
const bookingResult = document.getElementById("bookingResult");

bookingForm.addEventListener("submit", async function(e){
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const eventDate = document.getElementById("eventDate").value;
  const eventTime = document.getElementById("eventTime").value;
  const eventType = document.getElementById("eventType").value;

  bookingResult.style.display = "block";
  bookingResult.innerHTML = "⏳ Bron so‘rovi yuborilmoqda...";

  try{
    const response = await fetch("/api/send-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName,
        phone,
        eventDate,
        eventTime,
        eventType
      })
    });

    const data = await response.json();

    if(data.success){
      bookingResult.innerHTML = "✅ Bron so‘rovingiz yuborildi. Tez orada siz bilan bog‘lanamiz.";
      bookingForm.reset();
    }else{
      bookingResult.innerHTML = "❌ Xatolik yuz berdi. Keyinroq urinib ko‘ring.";
    }

  }catch(error){
    bookingResult.innerHTML = "❌ Server bilan bog‘lanishda xatolik.";
  }
});