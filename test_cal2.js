const apiKey = 'AIzaSyAKqOh0SEu6Pq3gpYnBnuSP0hGz0F0Sl0M';
const calendarId = 'tusharkhot63@gmail.com';
const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59).toISOString();

const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${startOfMonth}&timeMax=${endOfMonth}&singleEvents=true`;

fetch(url, { headers: { 'Referer': 'http://localhost:5173/' } })
  .then(res => res.json().then(data => ({status: res.status, data})))
  .then(({status, data}) => {
    console.log("Status:", status);
    console.log("Response:", JSON.stringify(data, null, 2));
  })
  .catch(err => console.error(err));
