import React, { useState } from 'react';
import FeedbackForm from './Form';

import { sendFeedback } from 'services/Feedback';

const Feedback = (props) => {

    const [errors, setErrors] = useState({});

    const [data, setData] = useState({
        type: "bug",
        message: ""
    });

    const [modalOpen, setModalOpen] = useState(false);

    const typeOptions = [
        {
            value: "bug",
            text: "Report a bug"
        },
        {
            value: "suggestion",
            text: "Suggest new feature"
        },
        {
            value: "signal",
            text: "Signal inappropriate behavior"
        },
        {
            value: "data",
            text: "Report album / genre / artist not present on the site"
        },
        {
            value: "other",
            text: "Something else"
        }
    ];

    const onSubmit = (e) => {
        sendFeedback(data).then((response) => {
            alert("Your feedback has been submitted ! Thank you for helping us.");
            setData({
                type: "bug",
                message: ""
            });
            setModalOpen(false);
        }).catch(error => {
            if (error.response.status === 400){
                setErrors(error.response.data);
            }
        });
    };

    return (
        <>
          <a onClick={() => setModalOpen(true)}>Feedback</a>
          <div className={`modal ${modalOpen && 'is-active'}`}>
            <div
              className="modal-background"
              onClick={() => setModalOpen(false)}></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <div className="modal-card-title">
                  Send us a feedback
                </div>
                <button
                  className="modal-close is-large"
                  aria-label="close"
                  onClick={() => setModalOpen(false)}
                ></button>
              </header>
              <div className="modal-card-body">
                <FeedbackForm
                  typeOptions={typeOptions}
                  type={data.type}
                  onChangeType={(e) => {setData({...data, type: e.target.value});}}
                  message={data.message}
                  onChangeMessage={(e) => {setData({...data, message: e.target.value});}}
                  errors={errors}
                  onSubmit={onSubmit}
                />
              </div>
            </div>
          </div>
        </>
    );
};


export default Feedback;
