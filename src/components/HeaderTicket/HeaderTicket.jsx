import React, { Component } from 'react';
import './header.css';
import TickerItem from '../TickerItem/TickerItem';
import NavbarButton from '../NavbarButton/NavbarButton';
import HeaderDropdown from '../HeaderDropdown/HeaderDropdown';
// import LanguageDropdown from '../ProDropdown/ProDropdown';

// import { languageLists } from '../../assets/Data';

class HeaderTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInformation: {},
    };
  }

  componentDidMount() {
    this.getUserInfomation();
  }

  getUserInfomation = () => {
    let userInfoComment = localStorage.getItem('userInfoComment');
    this.setState({ userInformation: JSON.parse(userInfoComment) });
  };

  render() {
    const { systemAlerts } = this.props;
    return (
      <div className='ticker d-flex align-items-center'>
        <div className='ticker__button'>
          <NavbarButton navbarHandler={this.props.navbarShowHandlder} />
        </div>
        <div className='ticker__list'>
          <div className='ticker__item'>
            {systemAlerts && systemAlerts.map((item) => (
              <TickerItem
                key={item.publicID}
                publicID={item.publicID}
                pathname='/announcement'
                item={{ shortDescription: item.subject }}
                {...item}
              />
            ))}
          </div>
        </div>
        <div className='d-flex align-items-center'>
          {/* <LanguageDropdown
            dropdownItems={languageLists}
            defaultvalue='English'
            className='mr-3'
            globalFilterValue={(val) => console.log(val)}
            titleStyle='text-white'
          /> */}
          <HeaderDropdown
            logoutHandler={this.props.logoutHandler}
            userInformation={this.state.userInformation}
            profileRouteHandler={this.props.profileRouteHandler}
          />
        </div>
      </div>
    );
  }
}

export default HeaderTicket;
