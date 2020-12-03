import React from 'react';
import './Accordion2.css';
import classnames from 'classnames';
import { AiOutlineRight } from 'react-icons/ai';

const Accordion2 = (props) => {
  return (
    <div
      className={classnames('accordion2', props.className)}
      onClick={props.modalOpenHandler}
    >
      <div className='accordion2__item'>
        <h4
          className={classnames('accordion2__title', props.titleStyle, {
            'bg-secondary text-light bor-5': props.active === true,
          })}
        >
          {props.title}
        </h4>
        {props.parentpublicid && (
          <h5 className='font-weight-bold'>{props.parentpublicid}</h5>
        )}
        {props.icon && (
          <div onClick={props.modalOpenHandler}>
            <AiOutlineRight size={20} color='#ccc' />
          </div>
        )}
      </div>
      {props.description && (
        <p className={classnames('accordion2__description', props.desStyle)}>
          { props.description.length > 50 ? props.description.substr(0, 50) + '...' : props.description}
        </p>
      )}
      {props.resolution && (
        <p className={classnames('accordion2__description', props.desStyle)}>
          {props.resolution}
        </p>
      )}
    </div>
  );
};

export default Accordion2;
