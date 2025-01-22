import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Home = () => {
  const [activeSection, setActiveSection] = useState('disfraces'); 
  const [infoData, setInfoData] = useState([]); 
  const [reservedDates, setReservedDates] = useState([]); 
  const [newReservation, setNewReservation] = useState({
    fechaRetiro: null,
    fechaDevolucion: null,
  }); 
  const [showForm, setShowForm] = useState(false); 

 
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };


  useEffect(() => {
    const fetchInfoData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/disfraces');
        const data = await response.json();
        setInfoData(data); 
      } catch (error) {
        console.error('Error al obtener los datos de info:', error);
      }
    };

    const fetchReservedDates = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/reservas');
        const data = await response.json();
        setReservedDates(data.map((reserva) => new Date(reserva.fecha))); 
      } catch (error) {
        console.error('Error al obtener las fechas reservadas:', error);
      }
    };

    fetchInfoData();
    fetchReservedDates();
  }, []);


  const handleReservationChange = (field, value) => {
    setNewReservation((prev) => ({ ...prev, [field]: value }));
  };

  //envio del formulario
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReservation),
      });

      if (response.ok) {
        alert('Reserva creada con éxito');
        const newReserva = await response.json();
        setReservedDates((prev) => [...prev, new Date(newReserva.fechaRetiro)]); 
        setNewReservation({ fechaRetiro: null, fechaDevolucion: null }); 
        setShowForm(false); 
      } else {
        alert('Error al crear la reserva');
      }
    } catch (error) {
      console.error('Error al crear la reserva:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn me-2 ${activeSection === 'disfraces' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleSectionChange('disfraces')}
        >
          Información
        </button>
        <button
          className={`btn ${activeSection === 'reservas' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleSectionChange('reservas')}
        >
          Reservas
        </button>
      </div>

      {activeSection === 'disfraces' && (
        <div className="p-4 bg-light rounded shadow">
          <h2>Sección de Información</h2>
          {infoData.length > 0 ? (
            <ul>
              {infoData.map((item) => (
                <li key={item.id} className="mb-3">
                  <strong>Talle:</strong> {item.talle} <br />
                  <strong>Color:</strong> {item.color} <br />
                  <strong>Descripción:</strong> {item.descripcion}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay datos disponibles.</p>
          )}
        </div>
      )}

      {activeSection === 'reservas' && (
        <div className="p-4 bg-light rounded shadow">
          <h2>Sección de Reservas</h2>

          <div className="mb-4">
            <h4>Fechas Reservadas</h4>
            <Calendar
              tileClassName={({ date }) =>
                reservedDates.find((d) => d.toDateString() === date.toDateString()) ? 'bg-danger text-white' : ''
              }
              tileDisabled={({ date }) =>
                reservedDates.find((d) => d.toDateString() === date.toDateString())
              }
            />
          </div>

          <button
            className="btn btn-secondary mb-3"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? 'Ocultar' : 'Agregar Reserva'}
          </button>

          {showForm && (
            <div className="bg-white p-4 rounded shadow">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label className="form-label">Fecha y Hora de Retiro</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={newReservation.fechaRetiro || ''}
                    onChange={(e) => handleReservationChange('fechaRetiro', e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Fecha y Hora de Devolución</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={newReservation.fechaDevolucion || ''}
                    onChange={(e) => handleReservationChange('fechaDevolucion', e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Confirmar Reserva
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;

