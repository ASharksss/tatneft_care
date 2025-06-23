import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ObjectDetails.module.css';

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
      image: '/camp1.jpg',
      description: 'Детский оздоровительный лагерь с современной инфраструктурой и профессиональными вожатыми.',
      photos: ['/camp1.jpg', '/camp2.jpg', '/camp3.jpg'],
      services: [
        { name: 'Проживание', price: 15000 },
        { name: 'Питание', price: 5000 },
        { name: 'Экскурсии', price: 3000 },
      ],
      contacts: {
        phone: '+7 (123) 456-78-90',
        email: 'sunny@camp.ru',
        address: 'Лесная поляна, д. 15'
      }
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
      image: '/resort1.jpg',
      description: 'Уютная база отдыха на берегу живописного озера с собственным пляжем и рестораном.',
      photos: ['/resort1.jpg', '/resort2.jpg', '/resort3.jpg'],
      services: [
        { name: 'Коттедж на 4 человек', price: 5000 },
        { name: 'Баня', price: 2000 },
        { name: 'Аренда лодки', price: 1000 },
      ],
      contacts: {
        phone: '+7 (987) 654-32-10',
        email: 'lesnaya@gavan.ru',
        address: 'Озеро Светлое, база "Лесная гавань"'
      }
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
      image: '/san1.jpg',
      description: 'Современный санаторий с лечебными программами и высококлассным обслуживанием.',
      photos: ['/san1.jpg', '/san2.jpg', '/san3.jpg'],
      services: [
        { name: 'Стандартный номер', price: 3500 },
        { name: 'Лечебная программа', price: 5000 },
        { name: 'SPA-процедуры', price: 3000 },
      ],
      contacts: {
        phone: '+7 (555) 123-45-67',
        email: 'info@zdorovie.ru',
        address: 'Курортная зона, ул. Лечебная, 1'
      }
    }
  ]
};

const ObjectDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('about');
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Находим объект по ID (в реальном приложении - запрос к API)
  let object = null;
  for (const type in mockObjects) {
    const found = mockObjects[type].find(obj => obj.id === id);
    if (found) {
      object = found;
      break;
    }
  }

  if (!object) {
    return (
      <div className={styles.notFound}>
        <h2>Объект не найден</h2>
        <Link to="/" className={styles.backLink}>Вернуться на главную</Link>
      </div>
    );
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === object.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === 0 ? object.photos.length - 1 : prev - 1
    );
  };

  return (
    <div className={styles.details}>
      <Link to="/" className={styles.backLink}>← Назад к списку</Link>

      <h1 className={styles.title}>{object.name}</h1>
      <p className={styles.location}>{object.location}</p>

      <div className={styles.gallery}>
        <button className={styles.navButton} onClick={prevPhoto}>❮</button>
        <img
          src={object.photos[currentPhotoIndex]}
          alt={object.name}
          className={styles.mainImage}
        />
        <button className={styles.navButton} onClick={nextPhoto}>❯</button>
        <div className={styles.thumbnails}>
          {object.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`${object.name} ${index + 1}`}
              className={`${styles.thumbnail} ${index === currentPhotoIndex ? styles.active : ''}`}
              onClick={() => setCurrentPhotoIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'about' ? styles.active : ''}`}
          onClick={() => setActiveTab('about')}
        >
          О объекте
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'services' ? styles.active : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Услуги и цены
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'contacts' ? styles.active : ''}`}
          onClick={() => setActiveTab('contacts')}
        >
          Контакты
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'about' && (
          <div>
            <h3>Описание</h3>
            <p>{object.description}</p>
            <div className={styles.rating}>
              Рейтинг: {'⭐'.repeat(Math.round(object.rating))} ({object.rating.toFixed(1)})
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div>
            <h3>Услуги и цены</h3>
            <table className={styles.priceTable}>
              <thead>
              <tr>
                <th>Услуга</th>
                <th>Цена</th>
              </tr>
              </thead>
              <tbody>
              {object.services.map((service, index) => (
                <tr key={index}>
                  <td>{service.name}</td>
                  <td>{service.price} ₽</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div>
            <h3>Контакты</h3>
            <div className={styles.contactInfo}>
              <p><strong>Телефон:</strong> {object.contacts.phone}</p>
              <p><strong>Email:</strong> {object.contacts.email}</p>
              <p><strong>Адрес:</strong> {object.contacts.address}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ObjectDetails;