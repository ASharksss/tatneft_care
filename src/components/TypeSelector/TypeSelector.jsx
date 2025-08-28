import React, {useState} from 'react';
import styles from './TypeSelector.module.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchPage from "../../pages/SearchPage/SearchPage";

const objectTypes = [
  {
    id: 'camps',
    name: 'Детские лагеря',
    icon: '🏕️',
    description: 'Активный отдых и развитие для детей',
    color: '#48bb78'
  },
  {
    id: 'resorts',
    name: 'Базы отдыха',
    icon: '🏖️',
    description: 'Комфортный отдых на природе',
    color: '#4299e1'
  },
  {
    id: 'sanatoriums',
    name: 'Санатории',
    icon: '🏥',
    description: 'Оздоровление и восстановление',
    color: '#9f7aea'
  },
  {
    id: 'sports',
    name: 'Спорткомплексы',
    icon: '🏟️', // или '⚽', '🏀', '🏊‍♂️'
    description: 'Активный отдых и профессиональные тренировки',
    color: '#f56565' // энергичный красный
  },
  {
    id: 'culture',
    name: 'Культура',
    icon: '🎭', // или '🏛️', '🎨', '📚'
    description: 'Искусство, выставки и культурные мероприятия',
    color: '#9f7aea' // благородный фиолетовый
  }
];

const TypeSelector = ({ onSelect, onSearch }) => {
  const [currentView, setCurrentView] = useState('categories');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchFocus = () => {
    setCurrentView('search');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (onSearch) onSearch(query);
  };

  const handleBackToCategories = () => {
    setCurrentView('categories');
    setSearchQuery('');
  };

  if (currentView === 'search') {
    return (
      <SearchPage
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onBack={handleBackToCategories}
        searchResults={[]}
      />
    );
  }

  return (
    <div className={styles.selector}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Забота о вашем отдыхе начинается здесь</h1>
        <p className={styles.heroSubtitle}>Выберите тип объекта для просмотра доступных вариантов</p>
      </div>

      <SearchBar
        onSearch={handleSearch}
        onFocus={handleSearchFocus}
        compact={false}
      />

      <div className={styles.typesGrid}>
        {objectTypes.map((type) => (
          <div
            key={type.id}
            className={styles.typeCard}
            onClick={() => onSelect(type.id)}
            style={{ '--card-color': type.color }}
          >
            <div className={styles.cardContent}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{type.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{type.name}</h3>
              <p className={styles.cardDescription}>{type.description}</p>
              <div className={styles.cardHover}>
                <span className={styles.hoverText}>Выбрать</span>
                <span className={styles.arrow}>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypeSelector;