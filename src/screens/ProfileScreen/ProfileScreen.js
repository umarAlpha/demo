import React from 'react';
import './ProfileScreen.css';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import UserInformationsContext from '../../ContextApi/UserInfoContext/context';
import { getImage } from '../../Utility/CommonMethods';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '42%',
      borderRadius: '2px',
    },
    '& fieldset': {
      borderRadius: '12px',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#116eb7',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#116eb7',
      },
      '&:hover fieldset': {
        borderColor: '#116eb7',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#116eb7',
      },
    },
  },
  textField: {
    fontSize: 30,
  },
  labelStyle: {
    fontSize: 22,
    fontWeight: 500,
    color: '#116eb7',
  },
}));

const ProfileScreen = () => {
  const classes = useStyles();

  return (
    <UserInformationsContext.Consumer>
      {(context) => {
        console.log("context",context);
        return (
          <div className='profile__container h-100'>
            <div className='w-100 text-center'>
              <div className='userImage'>
                {context.user && (
                  <img
                    src={getImage(context.user && context.user.userAvatar)}
                    alt='profile'
                  />
                )}
              </div>
              <h5>
                Employee ID: <span>{context.user.emp_id}</span>
              </h5>
            </div>

            <div className='profile__card h-75'>
              <form className={classes.root} noValidate autoComplete='off'>
                <div className='mb-5 justify-content-between d-flex'>
                  <TextField
                    id='outlined-required'
                    label='Email'
                    defaultValue={context.user.email}
                    value={context.user.email}
                    variant='outlined'
                    InputLabelProps={{
                      style: {
                        fontSize: 16,
                        fontWeight: 500,
                        color: '#116eb7',
                      },
                    }}
                  />
                  <TextField
                    id='department'
                    label='Department'
                    defaultValue={context.user.department}
                    value={context.user.department}
                    variant='outlined'
                    className={classes.textField}
                    InputLabelProps={{
                      style: {
                        fontSize: 16,
                        fontWeight: 500,
                        color: '#116eb7',
                      },
                    }}
                    InputProps={{
                      readOnly: true,
                      style: { fontSize: 16 },
                    }}
                  />
                </div>

                <div className='mb-5 justify-content-between d-flex'>
                  <TextField
                    id='phone'
                    label='Phone'
                    defaultValue={context.user.phone}
                    value={context.user.phone}
                    variant='outlined'
                    className={classes.textField}
                    InputLabelProps={{
                      style: {
                        fontSize: 16,
                        fontWeight: 500,
                        color: '#116eb7',
                      },
                    }}
                    InputProps={{
                      readOnly: true,
                      style: { fontSize: 16 },
                    }}
                  />
                  <TextField
                    id='title'
                    label='Title'
                    defaultValue={context.user.title}
                    value={context.user.title}
                    variant='outlined'
                    className={classes.textField}
                    InputLabelProps={{
                      style: {
                        fontSize: 16,
                        fontWeight: 500,
                        color: '#116eb7',
                      },
                    }}
                    InputProps={{
                      readOnly: true,
                      style: { fontSize: 16 },
                    }}
                  />
                </div>

                <div className='justify-content-between d-flex'>
                  <TextField
                    id='mobile'
                    label='Mobile'
                    defaultValue={context.user.mobile}
                    value={context.user.mobile}
                    variant='outlined'
                    className={classes.textField}
                    InputLabelProps={{
                      style: {
                        fontSize: 16,
                        fontWeight: 500,
                        color: '#116eb7',
                      },
                    }}
                    InputProps={{
                      readOnly: true,
                      style: { fontSize: 16 },
                    }}
                  />
                  <TextField
                    id='manager'
                    label='Manager'
                    defaultValue={
                      !context.user.manager ? 'Not Available' : context.user.manager
                    }
                    value={!context.user.manager ? 'Not Available' : context.user.manager}
                    variant='outlined'
                    className={classes.textField}
                    InputLabelProps={{
                      style: {
                        fontSize: 16,
                        fontWeight: 500,
                        color: '#116eb7',
                      },
                    }}
                    InputProps={{
                      readOnly: true,
                      style: { fontSize: 16 },
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        );
      }}
    </UserInformationsContext.Consumer>
  );
};

export default ProfileScreen;
