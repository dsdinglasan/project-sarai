import React from 'react';
import classNames from 'classnames';

class Main extends React.Component {
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
  render() {
    const {appBar, appDrawer, classList, content, footer} = this.props;
    const className = classNames('landing', classList);
    return (
      <div className={className}>
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          {appBar()}
          {appDrawer()}
          <main className="mdl-layout__content">
            {content()}
            {footer()}
          </main>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  appBar: React.PropTypes.func,
  appDrawer: React.PropTypes.func,
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  content: React.PropTypes.func,
  footer: React.PropTypes.func
};

Main.defaultProps = {
  appBar: () => null,
  appDrawer: () => null,
  classList: [],
  content: () => null,
  footer: () => null
};

export default Main;
