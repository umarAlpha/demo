import React, { useState } from 'react';
import './ModalList.css';


import classnames from 'classnames';

const ModalList = (props) => {
  console.log('TYPEEEE : ' + props.busobj)
  

  return (

    <ul className={classnames('modal__list', props.className)}>
      {props.busobj && (
        <li className='modal__item'>
          {props.busobj === 'Incident'
            ? 'Incident Information'
            : props.busobj === 'Knowledge'
              ? 'Article Information'
              : props.busobj === 'ChangeRequest'
                ? 'Request Information'
                : null}
        </li>
      )}

      {props.busobj === 'Incident' ?
        <>
          <li className='modal__item'>
            Ticket No: <span className='modal__item--text'>{props.ticketNo}</span>
          </li>
          <li className='modal__item'>
            Type: <span className='modal__item--text'>{props.IncidentType}</span>
          </li>
          <li className='modal__item'>
            Short Description: <span className='modal__item--text'>{props.shortDescription}</span>
          </li>
          <li className='modal__item'>
            Classification:{' '}
            <span className='modal__item--text'>
              {props.info.service ? props.info.service : null}
              {props.info.category ? `/${props.info.category}` : null}
              {props.info.subcat ? `/${props.info.subcat}` : null}
            </span>
          </li>
          <li className='modal__item'>
            Status:
             <span
              className={classnames('modal__item--status', {
                'bg-primary': props.status === 'Approval',
                'bg-secondary': props.status === 'Approving',
                'pending-color': props.status === 'Pending',
                'progress-color':
                  props.status === 'In Progress' ||
                  props.status === 'Work in Progress',
                'close-color': props.status === 'Closed',
                'new-color': props.status === 'New',
                'waiting-color': props.status === 'Waiting',
                'assigned-color': props.status === 'Assigned',
                'resolved-color': props.status === 'Resolved',
                'bg-primary': props.status === 'Current',
                'bg-color-reopened': props.status === 'Reopened',
              })}
            >
              {props.status}
            </span>
          </li>
          <li className='modal__item'>
            Created Date & Time: <span className='modal__item--text'>{props.createdDateAndTime}</span>
          </li>
          <li className='modal__item'>
            Assigned To: <span className='modal__item--text'>{props.ownedby}</span>
          </li>
          
          {/* <li>
            <span className='modal__item'>Attachments</span>
            {props.attachments.length <= 0 ? (
              props.attachState === true ?
                <div>
                  <Spinner size='md' animation='border' variant='primary' />
                </div>
                :
                <div className='text-text-color'>No Attachments Found!</div>
            )
              :
              (
                <>
                  <div className='position-relative main-attach-div2 m-2 w-90'>
                    <Gallery
                      photos={props.attachments}
                      renderImage={ImageComponent}
                    />
                  </div>
                  <ModalGateway>
                    {viewerIsOpen ? (
                      <ImageModal onClose={closeLightbox}>
                        <Carousel
                          currentIndex={currentImage}
                          views={
                            props.attachments &&
                            props.attachments.map((x) => ({
                              ...x,
                              srcset: x.srcSet,
                              caption: x.title,
                            }))
                          }
                        />
                      </ImageModal>
                    ) : null}
                  </ModalGateway>
                </>
              )
            }
          </li> */}

          <li className='modal__item'>
            Description:{' '}
            <span className='modal__item--description'>{props.description}</span>
          </li>
        </>
        :
        props.busobj === 'ChangeRequest' ?
          <>
            <li className='modal__item'>
              Change Request ID: <span className='modal__item--text'>{props.changeid}</span>
            </li>
            <li className='modal__item'>
              Type: <span className='modal__item--text'>{props.changeRequestType}</span>
            </li>
            <li className='modal__item'>
              Classification:{' '}
              <span className='modal__item--description'>
                {props.info.service ? props.info.service : null}
                {props.info.category ? `/${props.info.category}` : null}
                {props.info.subcat ? `/${props.info.subcat}` : null}
              </span>
            </li>
            <li className='modal__item'>
              Status:
             <span
                className={classnames('modal__item--status', {
                  'bg-primary': props.status === 'Approval',
                  'bg-secondary': props.status === 'Approving',
                  'pending-color': props.status === 'Pending',
                  'progress-color':
                    props.status === 'In Progress' ||
                    props.status === 'Work in Progress',
                  'close-color': props.status === 'Closed',
                  'new-color': props.status === 'New',
                  'waiting-color': props.status === 'Waiting',
                  'assigned-color': props.status === 'Assigned',
                  'resolved-color': props.status === 'Resolved',
                  'bg-primary': props.status === 'Current',
                  'bg-color-reopened': props.status === 'Reopened',
                })}
              >
                {props.status}
              </span>
            </li>
            <li className='modal__item'>
              Assigned To: <span className='modal__item--text'>{props.ownedby}</span>
            </li>
            <li className='modal__item'>
              Requestor Name:{' '}
              <span className='modal__item--text'>{props.requestor}</span>
            </li>
            <li className='modal__item'>
              Created Date & Time: <span className='modal__item--text'>{props.createdDateAndTime}</span>
            </li>
            <li className='modal__item'>
              Prosposed Start Date & Time: <span className='modal__item--text'>{props.startDate}</span>
            </li>
            <li className='modal__item'>
              Prosposed End Date & Time: <span className='modal__item--text'>{props.endDate}</span>
            </li>
            <li className='modal__item'>
              Description:{' '}
              <span className='modal__item--description'>{props.description}</span>
            </li>
          </>
          :
          props.busobj === 'Knowledge' ?
            <>
              <li className='modal__item'>
                Article ID: <span className='modal__item--text'>{props.articleID}</span>
              </li>
              <li className='modal__item'>
                Title: <span className='modal__item--text'>{props.title}</span>
              </li>
              <li className='modal__item'>
                Created By: <span className='modal__item--text'>{props.createdBy}</span>
              </li>
              <li className='modal__item'>
                Description: <span className='modal__item--text'>{props.description}</span>
              </li>
            </>
            :
            ""
      }

      {props.approvalid && (
        <li className='modal__item'>
          Approval ID:{' '}
          <span className='modal__item--text'>{props.approvalid}</span>
        </li>
      )}
      {props.deadline && (
        <li className='modal__item'>
          Deadline: <span className='modal__item--text'>{props.deadline}</span>
        </li>
      )}

      {props.details && (
        <li className='modal__item'>
          Details:
          <span className='modal__item--description'>{props.details}</span>
        </li>
      )}


      {props.subject && (
        <li className='modal__item'>
          Subject: <span className='modal__item--text'>{props.subject}</span>
        </li>
      )}


      {props.status1 && (
        <li className='modal__item'>
          Status:
          <span
            className={classnames('modal__item--status', {
              'bg-primary': props.status1 === 'Approval',
              'bg-secondary': props.status1 === 'Approving',
              'pending-color': props.status1 === 'Pending',
              'progress-color':
                props.status1 === 'In Progress' ||
                props.status1 === 'Work in Progress',
              'close-color': props.status1 === 'Closed',
              'new-color': props.status1 === 'New',
              'waiting-color': props.status1 === 'Waiting',
              'assigned-color': props.status1 === 'Assigned',
              'resolved-color': props.status1 === 'Resolved',
              'bg-primary': props.status1 === 'Current',
              'bg-color-reopened': props.status1 === 'Reopened',
            })}
          >
            {props.status1}
          </span>
        </li>
      )}


      {props.classification && (
        <li className='modal__item'>
          Classification:{' '}
          <span className='modal__item--description'>
            {props.classification.service ? props.classification.service : null}
            {props.classification.category ? ` / ${props.classification.category}` : null}
            {props.classification.subcat ? ` / ${props.classification.subcat}` : null}
          </span>
        </li>
      )}


      {props.comment && (
        <li className='modal__item'>
          Comments:
          <span className='pt-1 d-block modal__item--text'>{props.comment}</span>
        </li>
      )}

      {
        props.shortdescription1 && (
          <li className='modal__item'>
            Short Description: <span className='modal__item--description'>{props.shortdescription1}</span>
          </li>
        )
      }


      {props.description1 && (
        <li className='modal__item'>
          Description:{' '}
          <span className='modal__item--description'>{props.description1}</span>
        </li>
      )}

    </ul>

  );
};

export default ModalList;
