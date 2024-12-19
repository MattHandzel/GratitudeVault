async function addGratitude(gratitude) {
  try {
    await fetch("/api/gratitude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gratitude }),
    });
  } catch (error) {
    console.error(error);
  }
}

async function getGratitudes() {
  try {
    const response = await fetch("/api/gratitude");
    const result = await response.json();
    if (response.ok) {
      const gratitudes = result.message.reverse();
      return gratitudes;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function updateGratitude(gratitudeTitle, gratitudeContent, updates) {
  try {
    const response = await fetch("/api/gratitude", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gratitudeTitle, gratitudeContent, updates }),
    });
    console.log("Updated gratitude", response);
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function archiveGratitude(gratitudeTitle, gratitudeContent) {
  return updateGratitude(gratitudeTitle, gratitudeContent, { archived: true });
}

export { addGratitude, getGratitudes, updateGratitude, archiveGratitude };

