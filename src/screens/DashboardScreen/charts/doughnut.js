import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './doughnut.css';
import { NavLink } from 'react-router-dom';

const DoughnutDashboard = (props) => {
  // const { close, pending, assigned, open, inprogress, resolved } = props;
  const { close, pending, open, survey } = props;
  const data = {
    // labels: ['Assigned', 'Close', 'In Progress', 'Open', 'Pending', 'Resolved'],
    labels: ['Open', 'Close', 'Pending', 'Surveys'],
    datasets: [
      {
        // data: [assigned, close, inprogress, open, pending, resolved],
        data: [open, close, pending, survey],
        backgroundColor: [
          '#003F87',
          '#8b8989',
          '#850000',
          '#008080',
          // '#850000',
          // '#f6a606',
        ],
        hoverBackgroundColor: [
          '#003F87',
          '#8b8989',
          '#850000',
          '#008080',
          // '#fdcb1f',
          // '#f6a606',
        ],
        //   hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // align: 'left',
  // position: 'left',
  // boxShadow: '0px 0px 0px',
  // position: 'bottom',
  return (
    <div className='do-container'>
      <article className='doughnut'>
        <Doughnut
          data={data}
          width={100}
          height={100}
          borderAlign='inner'
          animation={true}
          options={{
            legend: {
              fullWidth: false,
              align: 'start',
              display: false,
            },
            maintainAspectRatio: false,
          }}
        />
      </article>
      <div className='doughnut__status'>
        <ul className='doughnut__status__list'>
          {/* <li className='doughnut__status__list__item'>
            <NavLink
              to={{ pathname: '/myticket', state: { status: 'Assigned' } }}
              style={{ color: 'var(--assigned)', }}
            >
              <span className='doughnut__status__list__item--one'>
                Assigned
              </span>
            </NavLink>
            <span className='doughnut__status__list__item--two' style={{ color: 'var(--assigned)', }}>{assigned}</span>
          </li> */}
          <li className='doughnut__status__list__item'>
            <NavLink
              to={{ pathname: '/myticket', state: { status: 'New' } }}
              style={{ color: 'var(--new)' }}
            >
              <span className='doughnut__status__list__item--one'>
                Open Tickets
              </span>
            </NavLink>
            <span
              className='doughnut__status__list__item--two'
              style={{ color: 'var(--new)' }}
            >
              {open}
            </span>
          </li>
          <li className='doughnut__status__list__item'>
            <NavLink
              to={{ pathname: '/myticket', state: { status: 'Closed' } }}
              style={{ color: 'var(--close-color)' }}
            >
              <span className='doughnut__status__list__item--one'>
                Close Tickets
              </span>
            </NavLink>
            <span className='doughnut__status__list__item--two'>{close}</span>
          </li>
          {/* <li className='doughnut__status__list__item'>
            <NavLink
              to={{ pathname: '/myticket', state: { status: 'New' } }}
              style={{ color: 'var(--progress-color)', }}
            >
              <span className='doughnut__status__list__item--one'>
                In Progress
              </span>
            </NavLink>
            <span className='doughnut__status__list__item--two' style={{ color: 'var(--progress-color)', }}>{inprogress}</span>
          </li> */}
          {/* <li className='doughnut__status__list__item'>
            <NavLink
              to={{ pathname: '/pendingApproval' }}
              style={{ color: 'var(--progress-color)' }}
            >
              <span
                className='doughnut__status__list__item--one'
                style={{ color: 'var(--progress-color)' }}
              >
               Pending Approvals
              </span>
            </NavLink>
            <span
              className='doughnut__status__list__item--two'
              style={{ color: 'var(--progress-color)' }}
            >
              {pending}
            </span>
          </li> */}
          <li className='doughnut__status__list__item'>
            <NavLink
              to={{
                pathname: '/pendingApproval',
                state: { status: 'Pending' },
              }}
              style={{ color: 'var(--pending-color)' }}
            >
              <span className='doughnut__status__list__item--one'>
                Pending Approvals
              </span>
            </NavLink>
            <span
              className='doughnut__status__list__item--two'
              style={{ color: 'var(--pending-color)' }}
            >
              {pending}
            </span>
          </li>

          <li className='doughnut__status__list__item'>
            <NavLink to={{ pathname: '/surveys' }} style={{ color: '#008080' }}>
              <span className='doughnut__status__list__item--one'>Surveys</span>
            </NavLink>
            <span
              className='doughnut__status__list__item--two'
              style={{ color: '#008080' }}
            >
              {survey}
            </span>
          </li>

          {/* <li className='doughnut__status__list__item'>
            <NavLink
              to={{ pathname: '/myticket', state: { status: 'Resolved' } }}
              style={{ color: 'var(--resloved)' }}
            >
              <span className='doughnut__status__list__item--one'>
                Resolved
              </span>
            </NavLink>
            <span
              className='doughnut__status__list__item--two'
              style={{ color: 'var(--resloved)' }}
            >
              {resolved}
            </span>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default DoughnutDashboard;
