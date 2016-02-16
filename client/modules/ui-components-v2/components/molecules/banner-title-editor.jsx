import React from 'react';
import MdlDialog from './../molecules/mdl-dialog.jsx';
import MdlInputText from './../atoms/mdl-input-text.jsx';
import MarkdownEditor from './../molecules/markdown-editor.jsx';
import MediaLibBox from './../molecules/media-lib-box.jsx';
import {mediaLibPropTypes} from './../molecules/media-lib.jsx';

class BannerTitleEditor extends React.Component {
  constructor() {
    super()
    this.afterSave = this.afterSave.bind(this);
  }
  componentDidMount() {
    if (componentHandler) {
      componentHandler.upgradeDom();
    }
  }
  componentDidUpdate() {
    if (componentHandler) {
      componentHandler.upgradeDom();
    }
  }
  openDialog() {
    this.dialog.openDialog();
    this.background.loadMediaLib();
  }
  closeDialog() {
    this.dialog.closeDialog();
    this.background.resetMediaLib();
  }
  afterSave(err, res) {
    console.log(err);
    console.log(res);
    if (err) {
      // handle error
    } else {
      this.closeDialog();
    }
  }
  actionButtons() {
    const {handleCallback, path} = this.props;
    return [
      {
        handleCallback: () => {
          const title = this.title && this.title.getValue ? this.title.getValue() : null;
          const background = this.background && this.background.getValue ? this.background.getValue() : null;
          const text = this.text && this.text.getValue ? this.text.getValue() : null;
          if (title && background && text) {
            handleCallback(path, this.title.getValue(), this.background.getValue(), this.text.getValue(), this.afterSave);  
          } 
          // handle no values
        },
        label: 'Save'
      },
      {
        handleCallback: () => {
          const {title, background, text} = this.props;
          if (this.title && this.title.setValue) this.title.setValue(title);
          if (this.background && this.background.setValue) this.background.setValue(background);
          if (this.text && this.text.setValue) this.text.setValue(text);
          this.closeDialog();
        },
        label: 'Cancel'
      }  
    ];
  }
  renderDialog() {
    const {title, background, text, id, mediaLib} = this.props;
    const titleRef = (c) => {
      this.title = c;
    };
    const textRef = (c) => {
      this.text = c;
    };
    const backgroundRef = (c) => {
      this.background = c;
    };
    return (
      <div className='mdl-grid'>
        <div className='mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet
          mdl-cell--4-phone'>
          <div className='mdl-grid mdl-grid--no-spacing'>
            <div className='mdl-cell mdl-cell--12-col'>
              <MdlInputText
                id={`${id}-banner-title`}
                label='Banner Title'
                ref={titleRef}
                value={title}
              />
            </div>
            <div className='mdl-cell mdl-cell--12-col'>
              <MarkdownEditor
                id={`${id}-banner-text`}
                label='Banner Text'
                ref={textRef}
                rows = {5}
                value={text}
              />
            </div>
          </div>
        </div>
        <div className='mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet
          mdl-cell-4-phone'>
          <MediaLibBox
            id = {`${id}-banner-background`}
            label = 'Banner Background'
            mediaLib = {mediaLib}
            ref = {backgroundRef}
            value = {background}
          />
        </div>
      </div>
    );
  }
  render() {
    const dialog = (c) => {
      this.dialog = c;
    };
    return (
      <MdlDialog
        actions = {this.actionButtons()}
        classList = {['banner-title-editor-v2']}
        content = {this.renderDialog()}
        title = "Edit Banner"
        ref = {dialog}
      />
    );
  }
}

BannerTitleEditor.propTypes = {
  background: React.PropTypes.string,
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  handleCallback: React.PropTypes.func,
  mediaLib: React.PropTypes.shape(mediaLibPropTypes),
  path: React.PropTypes.string,
  id: React.PropTypes.string,
  text: React.PropTypes.string,
  title: React.PropTypes.string
};

BannerTitleEditor.defaultProps = {
  classList: [],
  handleCallback: () => null,
  path: '',
  id: 'banner-title-editor'
};

export default BannerTitleEditor;