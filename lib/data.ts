async function addGratitude(gratitude) {
  console.log("Adding gratitude:", gratitude);
  try {
    console.log("1");
    const response = await fetch("/api/gratitude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gratitude }),
    });

    console.log("2");
    const result = await response.json();
    if (response.ok) {
      console.log("Gratitude added:", result);
    } else {
      console.error("Error adding gratitude 2:", result);
    }
    console.log("3");
  } catch (error) {
    console.error("Error adding gratitude 3:", error.message);
  }
}

async function getGratitudes() {
  try {
    const response = await fetch("/api/gratitude");
    const result = await response.json();
    if (response.ok) {
      console.log("Gratitudes retrieved:", result);
      const gratitudes = result.message.reverse();
      return gratitudes;
    } else {
      console.error("Error retrieving gratitudes:", result);
    }
  } catch (error) {
    console.error("Error retrieving gratitudes:", error.message);
  }
}

export { addGratitude, getGratitudes };
