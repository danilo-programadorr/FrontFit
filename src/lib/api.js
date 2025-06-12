export const fetchData = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/data`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  return await res.json();
};