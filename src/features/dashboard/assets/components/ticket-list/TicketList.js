import React, { useEffect, useState } from 'react';
import database from '../../../../../firebase/firebase';
import './TicketList.scss';

const TicketList = (props) => {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    database.ref(`tickets`).once('value').then((childSnapshot) => {
      const tickets = [];
      childSnapshot.forEach(child => {
        tickets.push({
          id: child.key,
          ...child.val()
        });
      });
      setTickets(tickets);
    });
  }, []);

  return (
    <div className="TicketList">
      {
        tickets.map(ticket => (
          <div
            className="Ticket"
            key={ticket.id}
            onClick={() => {
              props.history.push(`ticket/${ticket.id}`);
            }}
          >
            <div className="TitleContainer">
              <div className="Bookmark">
                {ticket.priority}
              </div>
              <p className="Title">{ticket.title}</p>
            </div>
            <div className="Content">
              <p className="Description">{ticket.description}</p>
              <div className="ImgContainer">
                {
                  ticket.type === 0
                    ? <i className="fas fa-lightbulb" />
                    : <i className="fas fa-spider" />
                }
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
};

export default TicketList;
