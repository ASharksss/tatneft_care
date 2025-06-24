import React, {useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import styles from './ObjectDetails.module.css';
import resort1 from '../../assets/images/objects/resort1.jpg';
import resort2 from '../../assets/images/objects/resort2.png';
import room_1 from '../../assets/images/rooms/img.png';
import room_2 from '../../assets/images/rooms/img_1.png';
import room_3 from '../../assets/images/rooms/img_2.png';
import room_4 from '../../assets/images/rooms/img_3.png';
import room_5 from '../../assets/images/rooms/img_4.png';

// Mock данные - в реальном приложении будут приходить с API
const mockObjects = {
  camps: [{
    id: 'camp1',
    name: 'Лагерь "Солнечный"',
    type: 'camps',
    location: 'Лесная поляна, 15 км от города',
    rating: 4.5,
    price: 15000,
    image: '/camp1.jpg',
    description: 'Детский оздоровительный лагерь с современной инфраструктурой и профессиональными вожатыми.',
    photos: ['/camp1.jpg', '/camp2.jpg', '/camp3.jpg'],
    services: [{name: 'Проживание', price: 15000}, {name: 'Питание', price: 5000}, {name: 'Экскурсии', price: 3000},],
    contacts: {
      phone: '+7 (123) 456-78-90', email: 'sunny@camp.ru', address: 'Лесная поляна, д. 15'
    }
  }], resorts: [{
    id: 'resort1',
    name: 'База отдыха "Новая Земля"',
    type: 'resorts',
    location: 'Республика Татарстан (Татарстан), Бугульминский район, муниципальное ' +
      'образование Карабаш, посёлок городского типа Карабаш',
    rating: 4.8,
    price: 2500,
    image: resort1,
    description: 'Парк-отель «Новая Земля» расположен на берегу Карабашского водохранилища. ' +
      'На территории расположены 30 домиков из массива лиственницы. В каждом доме есть все необходимое для комфортного ' +
      'круглогодичного проживания. Дома оборудованы мини-кухней (чайник, микроволновка, мини-холодильник, кондиционеры,' +
      ' посуда, столовые приборы), санузлом, спальнями и небольшими террасами. Дома делятся на категории «Комфорт» ' +
      '(вместимость 3 человека), «Сьют» (вместимость до 5 человек), «Апартаменты» (вместимость до 6 человек).',
    photos: [resort1, resort2],
    services: [{name: 'Коттедж на 4 человек', price: 5000}, {name: 'Баня', price: 2000}, {
      name: 'Аренда лодки',
      price: 1000
    },],
    contacts: {
      phone: '+7 (987) 654-32-10', email: 'newLand@,mail.ru', address: 'Республика Татарстан (Татарстан), Бугульминский район, муниципальное ' +
        'образование Карабаш, посёлок городского типа Карабаш"'
    },
    mapEmbedUrl: 'https://yandex.ru/map-widget/v1/?um=constructor%3A1a2b3c...',
    howToGet: 'На автомобиле: РТ, Бугульминский район, пгт Карабаш. Участок Трассы Р-239 Казань-Оренбург. Общественным ' +
      'транспортом: автобус №2237 от центрального автовокзала до остановки "Поворот  на Елховку".',
    rooms: [{
      id: 'room1',
      name: 'КОМФОРТ',
      description: 'Просторная кухня-гостиная с обеденной зоной, диваном-кроватью, ТВ и техникой. ' +
        'Уютная спальня с двуспальной кроватью, кондиционером и иллюминатором. Современный ' +
        'санузел с душевой кабиной, феном и косметическими принадлежностями.',
      price: 3500,
      capacity: 3,
      amenities: ['Wi-Fi', 'TV', 'Кухня', 'Терраса'],
      images: [room_1, room_2, room_3, room_4, room_5],
    }, {
      id: 'room1',
      name: 'SUITE (Cьют, улучшенный номер)',
      description: 'Просторный коттедж с камином и террасой',
      price: 4500,
      capacity: 4,
      amenities: ['Wi-Fi', 'TV', 'Кухня', 'Терраса'],
      images: [room_1, room_2, room_3, room_4, room_5],
    }, {
      id: 'room1',
      name: 'Апартаменты',
      description: 'Просторный коттедж с камином и террасой',
      price: 6000,
      capacity: 4,
      amenities: ['Wi-Fi', 'TV', 'Кухня', 'Терраса'],
      images: [room_1, room_2, room_3, room_4, room_5],
    }
      // ... другие номера ...
    ]
  }], sanatoriums: [{
    id: 'san1',
    name: 'Санаторий "Здоровье"',
    type: 'sanatoriums',
    location: 'Курортная зона, ул. Лечебная, 1',
    rating: 4.7,
    price: 3500,
    image: '/san1.jpg',
    description: 'Современный санаторий с лечебными программами и высококлассным обслуживанием.',
    photos: ['/san1.jpg', '/san2.jpg', '/san3.jpg'],
    services: [{name: 'Стандартный номер', price: 3500}, {
      name: 'Лечебная программа',
      price: 5000
    }, {name: 'SPA-процедуры', price: 3000},],
    contacts: {
      phone: '+7 (555) 123-45-67', email: 'info@zdorovie.ru', address: 'Курортная зона, ул. Лечебная, 1'
    }
  }]
};

const ObjectDetails = () => {
  const {id} = useParams();
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
    return (<div className={styles.notFound}>
        <h2>Объект не найден</h2>
        <Link to="/" className={styles.backLink}>Вернуться на главную</Link>
      </div>);
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => prev === object.photos.length - 1 ? 0 : prev + 1);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => prev === 0 ? object.photos.length - 1 : prev - 1);
  };

  return (<div className={styles.details}>
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
          {object.photos.map((photo, index) => (<img
              key={index}
              src={photo}
              alt={`${object.name} ${index + 1}`}
              className={`${styles.thumbnail} ${index === currentPhotoIndex ? styles.active : ''}`}
              onClick={() => setCurrentPhotoIndex(index)}
            />))}
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
          className={`${styles.tab} ${activeTab === 'rooms' ? styles.active : ''}`}
          onClick={() => setActiveTab('rooms')}
        >
          Комнаты
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'map' ? styles.active : ''}`}
          onClick={() => setActiveTab('map')}
        >
          Карта и как добраться
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'contacts' ? styles.active : ''}`}
          onClick={() => setActiveTab('contacts')}
        >
          Контакты
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'about' && (<div>
            <h3>Описание</h3>
            <p>{object.description}</p>
            <div className={styles.rating}>
              Рейтинг: {'⭐'.repeat(Math.round(object.rating))} ({object.rating.toFixed(1)})
            </div>
          </div>)}

        {activeTab === 'services' && (<div>
            <h3>Услуги и цены</h3>
            <table className={styles.priceTable}>
              <thead>
              <tr>
                <th>Услуга</th>
                <th>Цена</th>
              </tr>
              </thead>
              <tbody>
              {object.services.map((service, index) => (<tr key={index}>
                  <td>{service.name}</td>
                  <td>{service.price} ₽</td>
                </tr>))}
              </tbody>
            </table>
          </div>)}

        {activeTab === 'map' && (<div className={styles.mapSection}>
            <h3>Как добраться</h3>
            <p>{object.howToGet}</p>

            <div className={styles.mapContainer}>
              <iframe
                src={object.mapEmbedUrl}
                width="100%"
                height="400"
                style={{border: 0}}
                allowFullScreen=""
                loading="lazy"
                title={`Карта ${object.name}`}
              ></iframe>
            </div>
          </div>)}

        {activeTab === 'rooms' && object.rooms && (<div className={styles.roomsSection}>
            <h3>Номера и размещение</h3>
            <div className={styles.roomsList}>
              {object.rooms.map(room => (<div key={room.id} className={styles.roomCard}>
                  <div className={styles.roomGallery}>
                    {room.images.map((img, idx) => (<img
                        key={idx}
                        src={img}
                        alt={`${room.name} фото ${idx + 1}`}
                        className={styles.roomImage}
                      />))}
                  </div>
                  <div className={styles.roomInfo}>
                    <h4>{room.name}</h4>
                    <p className={styles.roomDescription}>{room.description}</p>
                    <p className={styles.roomPrice}>{room.price} ₽/ночь</p>
                    <p>Вместимость: до {room.capacity} человек</p>
                    <div className={styles.amenities}>
                      <h5>Удобства:</h5>
                      <ul>
                        {room.amenities.map((item, i) => (<li key={i}>{item}</li>))}
                      </ul>
                    </div>
                  </div>
                </div>))}
            </div>
          </div>)}

        {activeTab === 'contacts' && (<div>
            <h3>Контакты</h3>
            <div className={styles.contactInfo}>
              <p><strong>Телефон:</strong> {object.contacts.phone}</p>
              <p><strong>Email:</strong> {object.contacts.email}</p>
              <p><strong>Адрес:</strong> {object.contacts.address}</p>
            </div>
          </div>)}
      </div>
    </div>);
};

export default ObjectDetails;