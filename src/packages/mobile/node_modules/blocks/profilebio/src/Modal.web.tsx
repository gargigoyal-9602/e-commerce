import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ModalController, {
  Props
} from "./ModalController.web";

// @ts-ignore
import content from "../../../components/src/content";

class CustomModal extends ModalController {
  // Customizable Area Start
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.state = {
      modal: true,
      deleteorder: false
    }
  }

  render() {
    const { modal } = this.state;
    
    return (
      <div>
        <Modal
          isOpen={modal}
          toggle={this.toggle}
          className="cm-small-modal-4"
          centered={true}
        >
          <ModalHeader toggle={this.toggle} className="co-title-bar  border-0">
            <span>
              {this.props.headerMessage}
            </span>
          </ModalHeader>
          <ModalBody className="py-5">
            <div className="text-center co-body-text">
              {this.props.bodyMessage}
            </div>
          </ModalBody>

          <ModalFooter className="co-bottom-bar  p-1 d-flex">
            <React.Fragment>
              <Button
                color="secondary pp-co-btn-modal p-3 pp-co-btn-light-grey"
                onClick={this.toggle}
                block
              >
                {content.cancel}
                  </Button>
              <span className="yt-form-spacer"></span>
              <Button
                color="secondary pp-co-btn-modal p-3 pp-co-btn-dark-grey"
                onClick={this.ConfirmDelete}
                block
              >
                {content.yesConfirm}
                </Button>
            </React.Fragment>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
// @ts-ignore
export default withRouter(CustomModal)
// Customizable Area Start

// Customizable Area End