export const getAllTests = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_GET_TESTS}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };
  
  export const saveTest = async (testData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SAVE_TEST}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      });
      return await response.json();
    } catch (error) {
      console.error("Error saving test:", error);
    }
  };
  