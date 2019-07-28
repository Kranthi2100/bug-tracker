import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import database from '../../firebase/firebase';
import './IssueView.scss';

const IssueView = (props) => {
  const ticketId = props.match.params.ticketId;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [type, setType] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (ticketId !== undefined) {
      database.ref(`tickets/${ticketId}`).once('value').then(snapshot => {
        const ticket = snapshot.val();
        setTitle(ticket.title);
        setDescription(ticket.description);
        setPriority(ticket.priority);
        setType(ticket.type);
      });
    }
  }, [ticketId]);

  const handleSubmit = () => {
    const ticket = {
      title,
      description,
      priority,
      type
    }
    setCanSubmit(false);
    if (ticketId !== undefined) {
      database.ref(`tickets/${ticketId}`).update(ticket).then(() => {
      })
    } else {
      database.ref(`tickets`).push(ticket).then(ref => {
        props.history.push(`/ticket/${ref.key}`);
      });
    }
  }

  return (
    <div className="IssueViewContainer">
      <div className="FormContainer">
        <div className="Header">
          <p
            onClick={() => {
              props.history.push('/');
            }}
          >&larr; back</p>
          <div className="TypeSelector">
            {[
              "fas fa-lightbulb",
              "fas fa-spider"
            ].map((cn, index) => (
              <i
                key={cn}
                className={classnames(cn, {
                  "Icon--Active": index === type
                })}
                onClick={() => {
                  setType(index);
                  setCanSubmit(true);
                }}
              />
            ))}
          </div>
        </div>
        <input
          tabIndex="1"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value)
            setCanSubmit(true);
          }}
          value={title}
        />
        <textarea
          tabIndex="1"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
            setCanSubmit(true);
          }}
        />
        <div className="PrioritySettingContainer">
          {[1, 2, 3, 4, 5].map(data => (
            <span
              key={data}
              className={classnames('PriorityButton', {
                'PriorityButton--Active': priority === data
              })}
              onClick={() => {
                setPriority(data);
                setCanSubmit(true);
              }}
            >{data}</span>
          ))}
        </div>
        <button
          tabIndex="1"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={classnames("Button", {
            "Button--Disabled": !canSubmit
          })}
        >
          {ticketId
            ? "Update"
            : "Raise A Ticket"
          }
        </button>
      </div>
    </div>
  )
};

export default IssueView;
