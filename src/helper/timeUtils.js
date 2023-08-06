// timeUtils.js

export async function getTimeForMorocco() {
  try {
    const response = await fetch('http://worldtimeapi.org/api/timezone/Africa/Casablanca');
    const data = await response.json();

    if (data && data.utc_datetime && data.utc_offset) {
      const utcDateTime = new Date(data.utc_datetime);

      // Parse the offset string to get hours and minutes
      const [hours, minutes] = data.utc_offset.split(':').map(Number);

      // Convert UTC datetime to local time using the Morocco timezone offset
      const localDateTime = new Date(utcDateTime.getTime() + (hours * 60 + minutes) * 60 * 1000);

      console.log('UTC DateTime:', utcDateTime.toISOString());
      console.log('Morocco Local DateTime:', localDateTime.toISOString());

      return localDateTime; // Return the local datetime for Morocco
    } else {
      console.error('Error fetching time from the   internet.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching time from the internet:', error);
    return null;
  }
}


export function convertISOToCustomFormat(isoDate) {
  const date = new Date(isoDate);

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };

  const formatter = new Intl.DateTimeFormat('en-GB', options);
  return formatter.format(date);
}