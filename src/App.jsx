import React, { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null); // Clear previous messages

    try {
      const response = await fetch(
        "https://apimicroservices.sell2rent.com/api/speaddeal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sheetId: inputValue }),
        }
      );
      console.log(response);
      if (response.ok) {
        setMessage(
          "Success! Your spreadsheet has been populated on sheetId tab Ispeedtodeal."
        );
      } else {
        const errorText = await response.text();

        setMessage(`Error: ${errorText}. Please try again.`);
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">
          Spead Deal SpreadSheet Mohamed
        </h2>

        <div className="mb-4">
          <label
            htmlFor="dataInput"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Paste url link of the google spreadsheet
          </label>
          <input
            type="text"
            id="dataInput"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
            placeholder="https://docs.google.com/spreadsheets/d/..."
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        {message && (
          <p
            className={`mt-4 ${
              message.startsWith("Success") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default App;
