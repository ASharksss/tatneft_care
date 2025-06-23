import React from 'react';
import styles from './TypeSelector.module.css';

const objectTypes = [
  { id: 'camps', name: 'Детские лагеря', icon: '🏕️' },
  { id: 'resorts', name: 'Базы отдыха', icon: '🏖️' },
  { id: 'sanatoriums', name: 'Санатории', icon: '🏥' },
];

const TypeSelector = ({ onSelect }) => {
  return (
    <div className={styles.selector}>
      <h2 className={styles.title}>Выберите тип объекта</h2>
      <div className={styles.types}>
        {objectTypes.map((type) => (
          <div
            key={type.id}
            className={styles.typeCard}
            onClick={() => onSelect(type.id)}
          >
            <span className={styles.icon}>{type.icon}</span>
            <span className={styles.name}>{type.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypeSelector;