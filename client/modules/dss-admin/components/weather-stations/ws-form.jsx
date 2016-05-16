import React from 'react'
import classNames from 'classnames'
import L from 'leaflet';

class WSForm extends React.Component {
  constructor() {
    super()
    this.handleChangeId = this.handleChangeId.bind(this)
    this.handleChangeLabel = this.handleChangeLabel.bind(this)
    this.handleChangeCoords0 = this.handleChangeCoords0.bind(this)
    this.handleChangeCoords1 = this.handleChangeCoords1.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
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

  handleChangeId(e) {
    this.setState({id: e.target.value})
  }

  handleChangeLabel(e) {
    this.setState({label: e.target.value})
  }

  handleChangeCoords0(e) {
    this.setState({coords0: e.target.value})
  }

  handleChangeCoords1(e) {
    this.setState({coords1: e.target.value})
  }

  handleSave() {
    const {callback, _id} = this.props

    let db_id = _id ? _id : ''

    callback(_id, this.wsID_ref.value, this.label_ref.value, this.coords0_ref.value, this.coords1_ref.value)
    //Then bring up a toast
  }

  handleDelete() {
    const {deleteWS, _id} = this.props

    deleteWS(_id)
  }


  render() {
    const rowClassName = classNames('mdl-cell', 'mdl-cell--10-col-desktop', 'mdl-cell--1-offset-desktop', 'mdl-cell--6-col-tablet', 'mdl-cell--1-offset-tablet', 'mdl-cell--4-col-phone')

    const labelCol = classNames('mdl-cell', 'mdl-cell--4-col', 'form-label')
    const inputCol = classNames('mdl-cell', 'mdl-cell--8-col')

    const {id, label, coords0, coords1} = this.props

    const wsID_ref = (c) => {
      this.wsID_ref = c
    }

    const label_ref = (c) => {
      this.label_ref = c
    }

    const coords0_ref = (c) => {
      this.coords0_ref = c
    }

    const coords1_ref = (c) => {
      this.coords1_ref = c
    }

    return (
      <div className="mdl-grid">
        <div className={rowClassName}>
          <div className="mdl-grid">
            <div className={labelCol}>
              Weather Station ID
            </div>

            <div className={inputCol}>
              <input
                type="text"
                defaultValue={id}
                ref={wsID_ref}
                onChange={this.handleChangeId} />
            </div>

            <div className={labelCol}>
              Station Label
            </div>

            <div className={inputCol}>
              <textarea
                defaultValue={label}
                ref={label_ref}
                onChange={this.handleChangeLabel}>
              </textarea>
            </div>

            <div className={labelCol}>
              Geographical Coordinates
            </div>

            <div className={inputCol}>
              <input
                type="number"
                defaultValue={coords0}
                ref={coords0_ref}
                onChange={this.handleChangeCoords0} />

              <input
                type="number"
                defaultValue={coords1}
                ref={coords1_ref}
                onChange={this.handleChangeCoords1} />
            </div>

            <div className={labelCol}>
              Geographical Coordinates
            </div>

            <div className={inputCol}>
              <button onClick={this.handleSave} type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
                Save
              </button>

              <button onClick={this.handleDelete} type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
                Delete
              </button>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default WSForm;