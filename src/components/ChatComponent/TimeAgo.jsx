import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export default function TimeAgo({ date }) {
  const [now, setNow] = useState(dayjs());

  // Compute difference in hours
  const target = dayjs(date);
  const isRecent = now.diff(target, 'hour') < 24;

  useEffect(() => {
    if (!isRecent) return;

    const timeInterval = setInterval(() => {
      setNow(dayjs());
    }, 30 * 1000); // update every 30 sec

    return () => clearInterval(timeInterval);
  }, [isRecent]);

  return (
    <span>
      {isRecent
        ? target.from(now)
        : target.format('YYYY-MM-DD HH:mm')} {/* or use LLL for localized */}
    </span>
  );
}