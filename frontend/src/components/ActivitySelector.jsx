import React from 'react';
import { BookOpen, Dumbbell, Car, Bike, Calendar } from 'lucide-react';
import { ACTIVITIES } from '../utils/constants';

const ICON_MAP = {
  BookOpen: BookOpen,
  Dumbbell: Dumbbell,
  Car: Car,
  Bike: Bike,
  Calendar: Calendar
};

export default function ActivitySelector({ selectedActivity, onSelectActivity }) {
  return (
    <div style={{ marginTop: '0.75rem' }}>
      <div className="selector-group-title">
        <span>2. Select Target Outdoor Activity</span>
        <span style={{ color: 'var(--accent-emerald)' }}>Impacts Decision Thresholds</span>
      </div>
      <div className="activity-chips">
        {ACTIVITIES.map((activity) => {
          const IconComponent = ICON_MAP[activity.icon] || Calendar;
          const isSelected = selectedActivity === activity.id;
          return (
            <button
              key={activity.id}
              type="button"
              className={`activity-chip ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectActivity(activity.id)}
            >
              <IconComponent size={15} />
              <span>{activity.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
