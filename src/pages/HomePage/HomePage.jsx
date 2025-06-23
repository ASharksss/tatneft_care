import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import TypeSelector from '../../components/TypeSelector/TypeSelector';
import ObjectList from '../../components/ObjectList/ObjectList';
import styles from './HomePage.module.css';

// Mock данные - в реальном приложении будут приходить с API
const mockObjects = {
  camps: [
    {
      id: 'camp1',
      name: 'Лагерь "Солнечный"',
      type: 'camps',
      location: 'Лесная поляна, 15 км от города',
      rating: 4.5,
      price: 15000,
      image: '/camp1.jpg'
    },
    {
      id: 'camp2',
      name: 'Лагерь "Орлёнок"',
      type: 'camps',
      location: 'Речная долина',
      rating: 4.2,
      price: 12000,
      image: '/camp2.jpg'
    }
  ],
  resorts: [
    {
      id: 'resort1',
      name: 'База отдыха "Лесная гавань"',
      type: 'resorts',
      location: 'Озеро Светлое',
      rating: 4.8,
      price: 2500,
      image: '/resort1.jpg'
    },
    {
      id: 'resort2',
      name: 'База отдыха "Берёзка"',
      type: 'resorts',
      location: 'Сосновый бор',
      rating: 4.3,
      price: 1800,
      image: '/resort2.jpg'
    }
  ],
  sanatoriums: [
    {
      id: 'san1',
      name: 'Санаторий "Здоровье"',
      type: 'sanatoriums',
      location: 'Курортная зона, ул. Лечебная, 1',
      rating: 4.7,
      price: 3500,
      image: '/san1.jpg'
    },
    {
      id: 'san2',
      name: 'Санаторий "Морской бриз"',
      type: 'sanatoriums',
      location: 'Чёрное море, бухта Солнечная',
      rating: 4.9,
      price: 4200,
      image: '/san2.jpg'
    }
  ]
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
          <>
            <button
              className={styles.backButton}
              onClick={() => setSelectedType(null)}
            >
              ← Назад к выбору типа
            </button>
            <h1 className={styles.sectionTitle}>
              {selectedType === 'camps' && 'Детские лагеря'}
              {selectedType === 'resorts' && 'Базы отдыха'}
              {selectedType === 'sanatoriums' && 'Санатории'}
            </h1>
            <ObjectList objects={mockObjects[selectedType]} />
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;