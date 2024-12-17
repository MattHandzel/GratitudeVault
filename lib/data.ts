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
    }
  } catch (error) {
    console.error(error);
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

export { addGratitude, getGratitudes, getPublicGratitudes, getUserInfo };
