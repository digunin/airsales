import React, { FC } from 'react';
import { FlightLegSummary } from '../../store/types';
import { formatDate, formatDuration } from '../../store/selectors/utils';

type FlightTimeProps = { summary: FlightLegSummary };
export const FlightTime: FC<FlightTimeProps> = ({ summary }) => {
  const depDate = formatDate(summary.departureSegment.departureDate);
  const arrDate = formatDate(summary.arrivalSegment.arrivalDate);
  return (
    <div className="flight-time">
      <p className="date-time">
        <span className="time">{depDate.time}</span>
        <span className="date">{depDate.date}</span>
      </p>
      <p className="flight-duration">🕔{formatDuration(summary.duration)}</p>
      <p className="date-time">
        <span className="date">{arrDate.date}</span>
        <span className="time">{arrDate.time}</span>
      </p>
    </div>
  );
};
