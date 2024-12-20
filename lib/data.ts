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

async function getUserInfo(publicUrl: string) {
  try {
    const response = await fetch(
      process.env.NEXTAUTH_URL + `/api/user-info/${publicUrl}`,
    );
    const result = await response.json();
    if (response.ok) {
      return result.user;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);

    return null;
  }
}

async function getPublicGratitudes(publicUrl: string) {
  try {
    const response = await fetch(
      process.env.NEXTAUTH_URL + `/api/public-gratitude/${publicUrl}`,
    );
    const result = await response.json();
    console.log("getPublicGratitudes", result);

    if (response.ok) {
      const gratitudes = result.gratitudes.reverse();
      return gratitudes;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);

    return [];
  }
}

export {
  addGratitude,
  getGratitudes,
  updateGratitude,
  archiveGratitude,
  getUserInfo,
  getPublicGratitudes,
};
