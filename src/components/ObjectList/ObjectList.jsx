import React from 'react';
import ObjectCard from '../ObjectCard/ObjectCard';
import styles from './ObjectList.module.css';

const ObjectList = ({ objects }) => {
  if (!objects || objects.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Объекты не найдены</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {objects.map((object) => (
        <ObjectCard key={object.id} object={object} />
      ))}
    </div>
  );
};

export default ObjectList;