// src/components/StatusBadge.tsx
import React from 'react';

interface StatusBadgeProps {
  status: 'DESAPARECIDO' | 'LOCALIZADO';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const bgColor =
    status === 'DESAPARECIDO' ? 'bg-red-500' : 'bg-green-500';

  return (
    <span className={`text-white px-2 py-1 rounded ${bgColor}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
