// SearchPage.js
import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './SearchPage.module.css';

const SearchPage = ({ searchQuery, onSearch, onBack, searchResults }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery || '');

  useEffect(() => {
    console.log(searchQuery)
    if (searchQuery && searchQuery !== '') {
      setLocalQuery(searchQuery);
    }
  }, [searchQuery]);

  const handleSearch = (query) => {
    setLocalQuery(query);
    onSearch(query);
  };

  return (
    <div className={styles.searchPage}>
      <div className={styles.searchHeader}>
        <SearchBar
          initialQuery={localQuery}
          onSearch={handleSearch}
          onClose={onBack}
          compact={true}
          showBackButton={true}
          autoFocus={true}
        />
      </div>

      <div className={styles.resultsContainer}>
        {localQuery ? (
          <>
            <h2 className={styles.resultsTitle}>
              Результаты поиска: "{localQuery}"
            </h2>

            {searchResults && searchResults.length > 0 ? (
              <div className={styles.resultsGrid}>
                {searchResults.map((item, index) => (
                  <div key={index} className={styles.resultItem}>
                    {/* ... содержимое карточки результата ... */}
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}>🔍</div>
                <h3>Ничего не найдено</h3>
                <p>Попробуйте изменить поисковый запрос</p>
              </div>
            )}
          </>
        ) : (
          <div className={styles.searchPrompt}>
            <div className={styles.searchIconLarge}>🔍</div>
            <h3>Найдите объекты для отдыха</h3>
            <p>Введите название, местоположение или тип объекта</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;