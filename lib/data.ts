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
async function getPublicGratitudes(publicUrl: string) {
  try {
    const response = await fetch(
      process.env.NEXTAUTH_URL + `/api/public-gratitude/${publicUrl}`,
    );
    const result = await response.json();
    console.log("the result we got is", result);
    if (response.ok) {
      console.log("Public gratitudes retrieved:", result);
      return result.gratitudes;
    } else {
      console.error("Error retrieving public gratitudes:", result);
      console.log("result", result);
      return [];
    }
  } catch (error) {
    console.error("Error retrieving public gratitudes:", error.message);
    console.error("Error retrieving public gratitudes:", error);
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
      console.log("User information retrieved:", result);
      return result.user;
    } else {
      console.error("Error retrieving user information:", result);
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user information:", error.message);
    return null;
  }
}

export { addGratitude, getGratitudes, getPublicGratitudes, getUserInfo };
