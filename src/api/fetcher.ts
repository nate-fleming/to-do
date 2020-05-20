const fetcher = async (url: string, options?: object) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      ...options,
    });
    if (response.ok) {
      return await response.json();
    }

    return { error: true, message: `Error ${response.status}` };
  } catch (error) {
    return { error: true, message: `Error ${error}` };
  }
};

export default fetcher;
