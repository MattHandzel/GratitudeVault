async function addGratitude(gratitude) {
  try {
    const response = await fetch("/api/gratitude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gratitude }),
    });

const result = await response.json();  
  if (response.ok) {
    console.log('Gratitude added:', result);
  } else {
    console.error('Error adding gratitude:', result);
  }
  } catch (error) {
    console.error("Error adding gratitude:", error.message);
  }
}


export { addGratitude}
