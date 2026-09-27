import React from 'react';

const StatusBadge = ({ status }) => {
  if (!status) return null;
  const normalized = status.toLowerCase();
  return (
    <span className={`badge badge-${normalized}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
};

export default StatusBadge;
