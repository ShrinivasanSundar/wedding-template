import Arrow from '../Arrow.jsx';
import { useInView } from '../../hooks/useInView.js';
import './Celebrations.scss';

const VENUE =
  'Brahmana Kalyana Mandapam, Pillaiyar Kovil Street, Old Post Office Road, S.S. Colony, Madurai, Tamil Nadu';

// Times in UTC for the calendar entries (IST is UTC+5:30). The reception has
// no stated end time, so its entry starts and ends at 6:30 PM.
const EVENTS = [
  {
    title: 'The reception',
    tamil: 'வரவேற்பு',
    datetime: '2026-11-28T18:30:00+05:30',
    date: 'Saturday, 28 November 2026',
    time: '6:30 PM onwards',
    start: '20261128T130000Z',
    end: '20261128T130000Z',
    details: '6:30 PM onwards IST.',
  },
  {
    title: 'The wedding',
    tamil: 'சுபமுஹூர்த்தம்',
    datetime: '2026-11-29T07:30:00+05:30',
    date: 'Sunday, 29 November 2026',
    time: '7:30–9:30 AM',
    note: 'Muhurtham at 8:00 AM',
    start: '20261129T020000Z',
    end: '20261129T040000Z',
    details: '7:30–9:30 AM IST. Muhurtham at 8:00 AM.',
  },
];

const calendarTitle = (event) => `Shrinivasan & Sri Dharshini — ${event.title}`;

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
    'PRODID:-//Shrinivasan & Sri Dharshini//Wedding//EN',
    ...EVENTS.flatMap((event) => [
      'BEGIN:VEVENT',
      `UID:${event.start}@shrinivasan-sri-dharshini`,
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
    download: 'shrinivasan-sri-dharshini-wedding.ics',
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
