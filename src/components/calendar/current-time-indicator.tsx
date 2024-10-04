export const CurrentTimeIndicator = ({
  currentTime,
}: {
  currentTime: string;
}) => {
  return (
    <>
      <div className="fc-now-time-label">{currentTime}</div>
      <style jsx>{`
        .fc-now-time-label {
          position: absolute;
          padding: 5px 10px;
          background-color: red;
          color: white;
          font-weight: bold;
          z-index: 9999; /* Ensure it's on top of other elements */
          transform: translateY(-50%);
          border-radius: 3px;
          font-size: 14px;
          width: 100%
          line-height: 1;
        }
        .fc-now-indicator {
          z-index: 5;
        }
        .fc-now-indicator-line {
          border-top: 2px solid red !important;
        }
      `}</style>
    </>
  );
};
