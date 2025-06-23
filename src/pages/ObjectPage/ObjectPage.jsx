import React from 'react';
import Header from '../../components/Header/Header';
import ObjectDetails from '../../components/ObjectDetails/ObjectDetails';
import styles from './ObjectPage.module.css';

const ObjectPage = () => {
  return (
    <div className={styles.objectPage}>
      <Header />
      <main className={styles.main}>
        <ObjectDetails />
      </main>
    </div>
  );
};

export default ObjectPage;