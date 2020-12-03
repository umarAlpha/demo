import React, { Component } from 'react';

import classnames from 'classnames';

import ModalList from '../../../components/ModalList/ModalList';
import AttachmentInput from '../../../components/AttachmentInput/AttachmentInput';
import AttachmentImages from '../../../components/AttachmentImages/AttachmentImages';

class WorkOrdersAttachment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  selectAttachment = (e) => {
    let file = e.target.files[0];
    if (file === undefined) {
      console.log('null selected');
      return null;
    } else {
      let name = e.target.files[0].name;
      let blob = URL.createObjectURL(e.target.files[0]);
      this.props.uploadAttachments(file, name, blob);

      // setNewAttachments(true);
      // setCounter(counter+1);

      // if(counter > 1){
      //     setAttachment([ ...attachments.concat({ id: Math.random() , name: name ,src: blob  }) ]);
      // }
      // else {
      //     setAttachment([ ...incidentAttachments.concat({ id: Math.random() , name: name ,src: blob  }) ]);
      //     getAttachment(e.target.files[0]);
      // }
    }
  };

  render() {
    return (
      <div className={classnames('', this.props.constyle)}>
        <ModalList {...this.props} />
        <AttachmentInput pickImage={this.selectAttachment} />
        <AttachmentImages
          attachments={this.props.attachments}
          attachstate={this.props.attachstate}
        />
      </div>
    );
  }
}

export default WorkOrdersAttachment;
