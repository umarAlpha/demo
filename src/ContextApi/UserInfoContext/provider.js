import React from 'react';
import UserInformationsContext from './context';

class UserInformationsProvider extends React.Component {
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
  }

  render() {
    return (
      <UserInformationsContext.Provider value={{user: this.state.userInformation, getUserInfomation: this.getUserInfomation}}>
        {this.props.children}
      </UserInformationsContext.Provider>
    );
  }
}
export default UserInformationsProvider;
