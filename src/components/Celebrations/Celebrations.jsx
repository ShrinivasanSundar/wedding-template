import Arrow from '../Arrow.jsx';
import { useInView } from '../../hooks/useInView.js';
import './Celebrations.scss';

const VENUE =
  'VRAN Annamalai Chettiyar Marriage Mahal, Reddiarchatram, Tamil Nadu';

// Times in UTC for the calendar entries (IST is UTC+5:30).
const EVENTS = [
  {
    title: 'The engagement',
    tamil: 'நிச்சயதார்த்தம்',
    datetime: '2026-11-14T19:20:00+05:30',
    date: 'Saturday, 14 November 2026',
    time: '7:20–7:50 PM',
    start: '20261114T135000Z',
    end: '20261114T142000Z',
    details: 'Nitchayathartham, 7:20–7:50 PM IST.',
  },
  {
    title: 'The wedding',
    tamil: 'சுபமுஹூர்த்தம்',
    datetime: '2026-11-15T06:00:00+05:30',
    date: 'Sunday, 15 November 2026',
    time: '6:00–7:30 AM',
    start: '20261115T003000Z',
    end: '20261115T020000Z',
    details: 'Muhurtham, 6:00–7:30 AM IST.',
  },
];

const calendarTitle = (event) => `Ajithkumar & Deepa — ${event.title}`;

const googleCalendarUrl = (event) =>
  'https://calendar.google.com/calendar/render?' +
  new URLSearchParams({
    action: 'TEMPLATE',
    text: calendarTitle(event),
    dates: `${event.start}/${event.end}`,
    ctz: 'Asia/Kolkata',
    details: event.details,
    location: VENUE,
  });

// Both events in one .ics file, for Apple Calendar and Outlook.
function downloadIcs() {
  const escape = (text) => text.replace(/[\\;,]/g, (c) => `\\${c}`);
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ajithkumar & Deepa//Wedding//EN',
    ...EVENTS.flatMap((event) => [
      'BEGIN:VEVENT',
      `UID:${event.start}@ajith-weds-deepa`,
      `DTSTAMP:${event.start}`,
      `DTSTART:${event.start}`,
      `DTEND:${event.end}`,
      `SUMMARY:${escape(calendarTitle(event))}`,
      `DESCRIPTION:${escape(event.details)}`,
      `LOCATION:${escape(VENUE)}`,
      'END:VEVENT',
    ]),
    'END:VCALENDAR',
  ];
  const url = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar' }));
  const link = Object.assign(document.createElement('a'), {
    href: url,
    download: 'ajithkumar-deepa-wedding.ics',
  });
  link.click();
  URL.revokeObjectURL(url);
}

export default function Celebrations() {
  const [sectionRef, visible] = useInView();

  return (
    <section
      id="celebrations"
      ref={sectionRef}
      className="celebrations reveal"
      data-visible={visible}
      aria-labelledby="celebrations-title"
    >
      <p className="section-marker">
        <span>02</span>
        <span>The celebrations</span>
      </p>

      <div className="celebrations__layout reveal" data-visible={visible}>
        <div className="celebrations__intro" data-parallax="0.05">
          <p className="eyebrow">Save the dates</p>
          <h2 id="celebrations-title">
            A day written
            <br />
            in the <em>stars.</em>
          </h2>
          <p className="celebrations__lines">
            Two hearts.
            <br />
            The blessings of family.
            <br />A beginning to share with you.
          </p>

          <details className="celebrations__calendar">
            <summary className="arrow-link">
              Save the dates <span className="celebrations__plus">+</span>
            </summary>
            <div className="celebrations__options">
              <p>Add to your calendar</p>
              {EVENTS.map((event) => (
                <a key={event.title} href={googleCalendarUrl(event)} target="_blank" rel="noreferrer">
                  Google · {event.title}
                  <Arrow />
                </a>
              ))}
              <button type="button" onClick={downloadIcs}>
                Apple / Outlook (.ics)
                <Arrow />
              </button>
            </div>
          </details>
        </div>

        <div className="celebrations__events reveal" data-visible={visible}>
          {EVENTS.map((event, i) => (
            <article key={event.title} className="celebrations__event">
              <span className="celebrations__number" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="celebrations__event-top">
                <h3>{event.title}</h3>
                <span lang="ta">{event.tamil}</span>
              </div>
              <p className="celebrations__date">
                <time dateTime={event.datetime}>{event.date}</time>
              </p>
              <p className="celebrations__time">
                {event.time}
                <span>IST</span>
              </p>
              {event.note && <p className="celebrations__note">{event.note}</p>}
            </article>
          ))}
          <p className="celebrations__timezone">All celebrations follow Indian Standard Time.</p>
        </div>
      </div>
    </section>
  );
}
