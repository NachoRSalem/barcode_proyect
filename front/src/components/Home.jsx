import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Home = () => {
  const [activeSection, setActiveSection] = useState('disfraces');
  const [codigoBarra, setCodigoBarra] = useState('');
  const [infoData, setInfoData] = useState(null);
  const [reservedDates, setReservedDates] = useState([]);
  const [newReservation, setNewReservation] = useState({
    fechaRetiro: null,
    fechaDevolucion: null,
    cliente: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null); // To store selected reservation details

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Fetch data based on the codigoBarra
  const fetchDisfrazData = async () => {
    if (codigoBarra) {
      try {
        const responseDisfraz = await fetch(`http://localhost:3001/api/disfraces/${codigoBarra}`);
        const disfrazData = await responseDisfraz.json();
        setInfoData(disfrazData);

        const responseReservas = await fetch(`http://localhost:3001/api/reservas/${disfrazData.id}`);
        const reservasData = await responseReservas.json();
        setReservedDates(reservasData.map((reserva) => ({
          id: reserva.id,
          fecha_retiro: new Date(reserva.fecha_retiro),
          fecha_devolucion: new Date(reserva.fecha_devolucion),
          cliente: reserva.cliente, // Add client name to the reservation data
        })));
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    }
  };

  useEffect(() => {
    fetchDisfrazData();
  }, [codigoBarra]);

  const handleReservationChange = (field, value) => {
    setNewReservation((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const disfrazId = infoData.id; // Assuming `infoData` contains the correct data

    try {
      const response = await fetch('http://localhost:3001/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newReservation,
          disfraz_id: disfrazId, // Add the disfraz_id for the reservation
        }),
      });

      if (response.ok) {
        alert('Reserva creada con éxito');
        const newReserva = await response.json();
        setReservedDates((prev) => [...prev, {
          id: newReserva.id,
          fecha_retiro: new Date(newReserva.fecha_retiro),
          fecha_devolucion: new Date(newReserva.fecha_devolucion),
          cliente: newReserva.cliente, // Store the client's name in the reservation
        }]);
        setNewReservation({ fechaRetiro: null, fechaDevolucion: null, cliente: '' });
        setShowForm(false);
      } else {
        alert('Error al crear la reserva');
      }
    } catch (error) {
      console.error('Error al crear la reserva:', error);
    }
  };

  const handleDateClick = (date) => {
    const selected = reservedDates.find(
      (reserva) => reserva.fecha_retiro.toDateString() === date.toDateString()
    );
    setSelectedReservation(selected || null); // Show the details of the reservation if it exists
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
          <div className="mb-3">
            <label className="form-label">Código de Barra</label>
            <input
              type="text"
              className="form-control"
              value={codigoBarra}
              onChange={(e) => setCodigoBarra(e.target.value)}
              placeholder="Ingresa el código de barra del disfraz"
            />
          </div>
          {infoData ? (
            <div>
              <h3>{infoData.nombre}</h3>
              <p><strong>Descripción:</strong> {infoData.descripcion}</p>
              <p><strong>Código de Barra:</strong> {infoData.codigo_barra}</p>
            </div>
          ) : (
            <p>No se encontró el disfraz.</p>
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
                reservedDates.some((d) => d.fecha_retiro.toDateString() === date.toDateString()) ? 'bg-danger text-white' : ''
              }
              tileDisabled={({ date }) =>
                reservedDates.some((d) => d.fecha_retiro.toDateString() === date.toDateString())
              }
              onClickDay={handleDateClick} // Trigger when a date is clicked
            />
          </div>
          {selectedReservation && (
            <div className="mt-4">
              <h5>Detalles de la Reserva</h5>
              <p><strong>Fecha de Retiro:</strong> {selectedReservation.fecha_retiro.toLocaleString()}</p>
              <p><strong>Fecha de Devolución:</strong> {selectedReservation.fecha_devolucion.toLocaleString()}</p>
              <p><strong>Cliente:</strong> {selectedReservation.cliente}</p> {/* Display client name */}
            </div>
          )}

          <h4 className="mt-4">Listado de Reservas</h4>
          <ul className="list-group">
            {reservedDates.map((reserva) => (
              <li key={reserva.id} className="list-group-item">
                <p><strong>Fecha de Retiro:</strong> {reserva.fecha_retiro.toLocaleString()}</p>
                <p><strong>Fecha de Devolución:</strong> {reserva.fecha_devolucion.toLocaleString()}</p>
                <p><strong>Cliente:</strong> {reserva.cliente}</p> {/* Display client name */}
              </li>
            ))}
          </ul>

          <button className="btn btn-secondary mb-3" onClick={() => setShowForm((prev) => !prev)}>
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
                <div className="mb-3">
                  <label className="form-label">Cliente</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newReservation.cliente || ''}
                    onChange={(e) => handleReservationChange('cliente', e.target.value)}
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















