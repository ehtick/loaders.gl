import React, {PureComponent} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const FileFrame = styled.div`
  display: flex;
  width: 256px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border: 1px dashed black;
`;

const FileContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 270px;
`;

const propTypes = {

};

const defaultProps = {

};

export default class FileUploader extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null
    };

    this.handleLoadFile = this.handleLoadFile.bind(this);
    this.handleCleanFile = this.handleCleanFile.bind(this);
  }

  handleLoadFile(event) {
    const file = event.dataTransfer.files[0];
    this.setState({uploadedFile: file});
    event.preventDefault();
  }

  handleCleanFile() {
    this.setState({uploadedFile: null});
  }

  render() {
    const {uploadedFile, files} = this.state;

    return (
      <div>
        {!uploadedFile && (
          <Container>
            <FileFrame
              onDrop={this.handleLoadFile}
              onDragOver={(event) => event.preventDefault()}
            >
              Drag&Drop file
            </FileFrame>
            <input style={{display: 'none'}} type="file" id="fileInput" files={files} />
          </Container>
        )}
        <FileContainer>
          {uploadedFile}
          {uploadedFile && <button onClick={this.handleCleanFile}>Clean</button>}
        </FileContainer>
      </div>
    );
  }
}

FileUploader.propTypes = propTypes;
FileUploader.defaultProps = defaultProps;
