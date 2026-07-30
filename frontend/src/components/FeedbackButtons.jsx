import axios from "axios";

function FeedbackButtons({ messageId }) {
  const token = localStorage.getItem("token");

  const sendFeedback = async (rating) => {
    if (!messageId) {
      alert("Message ID not found.");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/feedback",
        {
          message_id: messageId,
          rating: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Thank you for your feedback!");
    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(err.response.data.detail);
      } else {
        alert("Failed to submit feedback.");
      }
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <button onClick={() => sendFeedback("positive")}>
        👍
      </button>

      <button
        onClick={() => sendFeedback("negative")}
        style={{ marginLeft: "10px" }}
      >
        👎
      </button>
    </div>
  );
}

export default FeedbackButtons;