import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import styles from "./styles.module.css";
import Map from "./map";
import genre from './Data/Genre';
import age from './Data/Age';
import Candidats from './Data/Candidats';
import Total from './Data/Total';

function VotingResults() {
  const [filter, setFilter] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    let filtered = Candidats;
    if (filter) {
      switch (filter) {
        case 'genre':
          filtered = genre;
          break;
        case 'ageRange':
          filtered = age;
          break;
        default:
          break;
      }
    }
    setFilteredResults(filtered);
  }, [filter]);

  const data = {
    labels: filteredResults.map(result => result.name),
    datasets: [
      {
        label: 'Votes',
        data: filteredResults.map(result => result.votes),
        backgroundColor: filter === 'genre'
          ? ['#006689', 'rgba(255, 99, 132, 0.6)']
          : [
              'rgba(75, 192, 192, 0.6)', 
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 205, 86, 0.6)'
            ],
        borderColor: filter === 'genre'
          ? ['#006689', 'rgba(255, 99, 132, 1)']
          : [
              'rgba(75, 192, 192, 1)', 
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 205, 86, 1)'
            ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.votingResults}>
      <div className={styles.kader}>
        <h1>Nombre total des Votes : {Total}</h1>
        <FilterInput filter={filter} setFilter={setFilter} />
      </div>
      <div className={styles.stats}>
        {filter === 'genre' ? (
          <Pie data={data} options={{ responsive: true }} />
        ) : filter === 'ageRange' ? (
          <Doughnut data={data} options={{ responsive: true }} />
        ) : filter === 'wilaya' ? (
          <Map />
        ) : (
          <Bar data={data} options={{ responsive: true }} />
        )}
      </div>
    </div>
  );
}

function FilterInput({ filter, setFilter }) {
  return (
    <div className={styles.custom_select}>
      <select
        name="Filtre"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
        required
        className={`${styles.input}`}
      >
        <option value="">Select Filter</option>
        <option value="genre">Par Genre</option>
        <option value="ageRange">Par Tranche d'âge</option>
        <option value="wilaya">Par Wilaya</option>
      </select>
    </div>
  );
}

export default VotingResults;
