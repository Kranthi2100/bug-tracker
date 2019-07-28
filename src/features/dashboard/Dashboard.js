import React from 'react';
import { TicketList } from './assets';


const Dashboard = (props) => (
  <>
    <p
      onClick={() => {
        props.history.push('/ticket/new');
      }}
    >new ticket</p>
    <TicketList {...props} />
  </>
);

export default Dashboard;
