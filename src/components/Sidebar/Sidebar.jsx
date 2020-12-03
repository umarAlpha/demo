import React from 'react';
import './Sidebar.css';

import { FaHome, FaTicketAlt, FaDatabase } from 'react-icons/fa';
import { BsClockFill, BsBellFill } from 'react-icons/bs';
import { RiSurveyFill } from 'react-icons/ri';
import MobileSidebar from '..//MobileSidebar/MobileSidebar';
import Backdrop from '../Backdrop/Backdrop';

// components
import NavItem from '../NavItem/NavItem';
import { Logo } from '../Logo/Logo';

const lists = [
  {
    id: 1,
    linkName: 'Home',
    icon: <FaHome size={24} />,
    to: '/home',
  },
  {
    id: 2,
    linkName: 'My Tickets',
    icon: <FaTicketAlt size={24} />,
    to: '/myticket',
  },
  {
    id: 3,
    linkName: 'Pending Approvals',
    icon: <BsClockFill size={24} />,
    to: '/pendingApproval',
  },
  {
    id: 4,
    linkName: 'Surveys',
    icon: <RiSurveyFill size={24} />,
    to: '/surveys',
  },
  {
    id: 5,
    linkName: 'System Alerts',
    icon: <BsBellFill size={24} />,
    to: '/systemalerts',
  },
  {
    id: 7,
    linkName: 'Announcements',
    icon: (
      <svg
        version='1.0'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 880.000000 815.000000'
        preserveAspectRatio='xMidYMid meet'
        stroke='currentColor'
        fill='currentColor'
        strokeWidth='0'
        size='24'
        height='26'
        width='26'
      >
        <g
          transform='translate(0.000000,815.000000) scale(0.100000,-0.100000)'
          stroke='currentColor'
          fill='currentColor'
        >
          <path
            d='M5517 7740 c-49 -13 -87 -33 -111 -59 -25 -28 -26 -23 119 -341 186
   -406 306 -711 441 -1115 342 -1029 546 -2114 594 -3170 6 -126 15 -246 20
   -266 16 -58 42 -74 119 -73 73 1 128 23 171 68 24 26 24 31 22 154 -8 483
   -107 1320 -228 1935 -142 722 -450 1655 -841 2552 -93 213 -129 282 -158 301
   -31 20 -97 26 -148 14z'
          />
          <path
            d='M6991 7291 c-45 -82 -81 -159 -81 -169 0 -14 41 -51 133 -120 442
   -333 697 -674 852 -1139 83 -246 105 -395 105 -705 0 -415 -48 -631 -220
   -1000 l-78 -168 26 -19 c35 -25 313 -163 318 -158 15 14 159 333 192 423 173
   473 207 995 97 1489 -85 381 -274 774 -521 1085 -84 106 -326 348 -419 421
   -127 99 -294 209 -317 209 -3 0 -42 -67 -87 -149z'
          />
          <path
            d='M5258 7367 c-171 -176 -510 -477 -776 -691 -753 -603 -1640 -1118
   -2542 -1475 -113 -45 -222 -89 -244 -98 l-38 -17 6 -126 c20 -352 63 -639 137
   -893 65 -225 209 -587 295 -740 l27 -49 71 7 c39 3 154 15 256 25 389 40 510
   45 1005 45 481 0 644 -7 975 -41 683 -69 1261 -185 1951 -391 14 -4 18 4 20
   40 8 89 -22 605 -51 897 -115 1140 -429 2274 -915 3302 -59 125 -113 232 -121
   239 -10 8 -23 0 -56 -34z'
          />
          <path
            d='M6684 6728 c-31 -57 -72 -129 -90 -161 -19 -32 -34 -62 -34 -67 0 -5
   21 -24 47 -42 132 -90 331 -296 424 -437 105 -160 200 -392 239 -581 16 -80
   20 -138 20 -308 0 -237 -10 -309 -66 -477 -34 -104 -45 -130 -117 -286 l-35
   -76 145 -72 c79 -40 160 -75 178 -78 33 -5 34 -4 70 68 93 184 169 423 202
   634 21 135 23 418 4 555 -77 549 -384 1055 -833 1371 -46 33 -86 59 -90 59 -4
   0 -33 -46 -64 -102z'
          />
          <path
            d='M1300 4974 c-25 -8 -109 -32 -188 -55 -260 -73 -362 -128 -490 -263
   -167 -176 -244 -399 -213 -618 29 -204 101 -444 161 -538 85 -130 201 -229
   352 -299 121 -56 203 -75 333 -75 96 0 138 7 339 52 126 28 233 55 237 59 4 5
   -30 94 -76 198 -209 482 -305 866 -345 1387 -6 76 -13 144 -16 153 -7 18 -35
   18 -94 -1z'
          />
          <path
            d='M3195 3154 c-278 -22 -611 -73 -747 -114 -76 -23 -128 -61 -128 -94
   0 -31 20 -58 145 -186 125 -130 218 -242 263 -322 35 -61 56 -134 107 -368
   123 -570 301 -970 534 -1201 151 -150 266 -189 458 -155 278 49 445 171 478
   347 9 47 -12 125 -91 337 -107 285 -109 299 -109 632 l0 285 52 180 c84 290
   97 348 97 463 0 77 -4 106 -14 116 -43 40 -371 76 -725 81 -148 1 -292 1 -320
   -1z'
          />
        </g>
      </svg>
    ),
    to: '/announcement',
  },
  {
    id: 9,
    linkName: 'Linked CI Items',
    icon: <FaDatabase size={24} />,
    to: '/linkeditems',
  },
  {
    id: 6,
    linkName: 'ComAround',
    icon: (
      <svg
        id='Layer_1'
        data-name='Layer 1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 271.78 300.21'
        stroke='currentColor'
        fill='currentColor'
        strokeWidth='0'
        size='24'
        height='24'
        width='24'
      >
        <path
          className='cls-1'
          d='M920.68,482.22l27.14-82.05a11.89,11.89,0,0,1,4.94-6.34c4.31-2.71,11.61-6,17.92-2.27,0,0,1.67,0,0,8.66L946.72,515a12.33,12.33,0,0,1-3.59,6.48,22.36,22.36,0,0,1-9,5.33,14.27,14.27,0,0,1-13.84-3.61l-37.58-36.48A11,11,0,0,1,880.32,474a6.51,6.51,0,0,1,2.36-2.76s9.34-6.33,15.67-2Z'
          transform='translate(-824.11 -389.9)'
        />
        <path
          className='cls-1'
          d='M985.13,460.68a6.84,6.84,0,0,0-3,4.11l-13.74,51.77S964.67,528.2,980.54,533a7.27,7.27,0,0,0,4.16,0l106.08-30.62a6.9,6.9,0,0,0,4.25-9.92c-.11-.18-.22-.36-.35-.54a109.16,109.16,0,0,0-6.89-8.87,4.67,4.67,0,0,0-4.22-1.45L1001,495.22l.89-23.79a8.86,8.86,0,0,0-1.79-5.72C997.34,462.07,991.76,456.69,985.13,460.68Z'
          transform='translate(-824.11 -389.9)'
        />
        <path
          className='cls-1'
          d='M857.05,585.3a6.59,6.59,0,0,0,4.88.35l49.15-15.12s9.67-2.21,5.77-17.31a7.18,7.18,0,0,0-1.67-3.66l-77.5-68.67c-3.08-2.77-6.71-3.17-8.75.51-.1.17-.19.36-.28.55a105.31,105.31,0,0,0-3.87,10c-.43,1.45-1.16,4.34-.18,5.46l52.92,57.78L857.6,566.46a8.66,8.66,0,0,0-3.81,4.31C852.18,574.83,850.52,582,857.05,585.3Z'
          transform='translate(-824.11 -389.9)'
        />
        <ellipse
          className='cls-1'
          cx='130.11'
          cy='170.66'
          rx='19.21'
          ry='19.42'
        />
        <path
          className='cls-1'
          d='M1031.94,568.89l18.74-8.33s7.67-4.34,6.34-11.34c0,0,.66-9.83-9.67-8.08l-44.29,8.94a13.35,13.35,0,0,0-8.34,5.45c-2.45,3.55-4.49,8.82-1.37,14.69l66.67,71s4.66,5,10.66-5.66c0,0,6-6.67,0-13.34Z'
          transform='translate(-824.11 -389.9)'
        />
        <path
          className='cls-1'
          d='M969.35,599.56l-23.67,82.33s-1.66,7.67,6,7.67c0,0,10.67,3.66,14.67-8l22.67-53,17.66,12s4.67,2,10-2l.34-.21a6.88,6.88,0,0,0,1.15-11l-.15-.14-29.67-31.85a9.82,9.82,0,0,0-5.81-3C978.22,591.72,971.5,592.09,969.35,599.56Z'
          transform='translate(-824.11 -389.9)'
        />
        <path
          className='cls-1'
          d='M925.05,653.45a6.92,6.92,0,0,0,2.5-3.42L942,608.56s2.05-6.46-1.55-10.29a10.52,10.52,0,0,1-1.24-1.58c-1.19-1.88-5.14-5.94-15.88-2.8l-78.67,17s-10,.64-5.26,12.06a3.39,3.39,0,0,0,.73,1.07l4.87,4.87s0,1.33,8.66.33l58.67-5-1,16.9s0,7.07,3.81,9.91c.55.41,1.1.82,1.61,1.28C918.22,653.6,921.54,655.88,925.05,653.45Z'
          transform='translate(-824.11 -389.9)'
        />
      </svg>
    ),
    to: '/comaround',
  },
];

const Sidebar = (props) => {
  return (
    <div className='sidebar' id='sidebar-wrapper'>
      {props.isopen && (
        <>
          <MobileSidebar>
            <nav className='sidebar__nav'>
              <Logo />
              <ul
                className='csnav'
                onClick={() => {
                  if (props.isopen) {
                    props.hide();
                  }
                  props.clearSearch();
                }}
              >
                {lists.map((item) => (
                  <NavItem key={item.id} to={item.to} linkName={item.linkName}>
                    {item.icon}
                  </NavItem>
                ))}
              </ul>
            </nav>
          </MobileSidebar>
          <Backdrop onClick={props.hide} />
        </>
      )}
      <nav className='sidebar__nav'>
        <Logo />
        <ul className='csnav' onClick={props.clearSearch}>
          {lists.map((item) => (
            <NavItem key={item.id} to={item.to} linkName={item.linkName}>
              {item.icon}
            </NavItem>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
