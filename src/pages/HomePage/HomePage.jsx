import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import TypeSelector from '../../components/TypeSelector/TypeSelector';
import ObjectList from '../../components/ObjectList/ObjectList';
import styles from './HomePage.module.css';
import resort1 from '../../assets/images/objects/resort1.jpg';
import resort2 from '../../assets/images/objects/img.png';

// Mock данные - в реальном приложении будут приходить с API
const mockObjects = {
  resorts: [
    {
      id: 'resort1',
      name: 'База отдыха "Новая Земля"',
      type: 'resorts',
      location: 'Республика Татарстан (Татарстан), Бугульминский район, муниципальное ' +
        'образование Карабаш, посёлок городского типа Карабаш',
      rating: 4.8,
      price: 2500,
      image: resort1,
    }
  ],

};

const HomePage = () => {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <div className={styles.homePage}>
      <Header />
      <main className={styles.main}>
        {!selectedType ? (
          <TypeSelector onSelect={setSelectedType} />
        ) : (
          <div className={styles.contentSection}>
            <button
              className={styles.backButton}
              onClick={() => setSelectedType(null)}
            >
              ← Назад к выбору
            </button>
            <h1 className={styles.sectionTitle}>
              {selectedType === 'camps' && 'Детские лагеря'}
              {selectedType === 'resorts' && 'Базы отдыха'}
              {selectedType === 'sanatoriums' && 'Санатории'}
            </h1>
            <ObjectList objects={mockObjects[selectedType]} />
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;