const fetchAPI = async (API) => {
  const data = await fetch(API).then((res) => res.json());
  return data;
};

export default fetchAPI;
