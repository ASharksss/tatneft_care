import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ObjectCard.module.css';

const ObjectCard = ({ object }) => {
  return (
    <Link to={`/object/${object.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={object.image || '/placeholder.jpg'}
          alt={object.name}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{object.name}</h3>
        <p className={styles.location}>{object.location}</p>
        <div className={styles.rating}>
          {'⭐'.repeat(Math.round(object.rating || 0))}
        </div>
        <p className={styles.price}>От {object.price || '—'} ₽</p>
      </div>
    </Link>
  );
};

export default ObjectCard;