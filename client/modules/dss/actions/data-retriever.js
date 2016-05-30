export default {

  getCurrentConditions(context, stationID) {
    const {dssStore} = context

    const xhr = new XMLHttpRequest()
    xhr.open('GET', `http:\/\/api.wunderground.com/api/9470644e92f975d3/conditions/q/pws:${stationID}.json`, true)

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const data = JSON.parse(xhr.responseText)

          const observation = data.current_observation
          dssStore.dispatch({
            type: 'SET-CURRENT-OBSERVATION',
            stationID,
            observation
          })

        }
      }

      xhr.send()
  },

  getRainfallData(context, stationID) {
    const {dssStore} = context
    const xhr = new XMLHttpRequest()

    xhr.open('GET', `http:\/\/api.wunderground.com/api/9470644e92f975d3/forecast10day/q/pws:${stationID}.json`, true)

    xhr.onreadystatechange = () => {
      // console.log(`readyState: ${xhr.readyState}, status: ${xhr.status}`)
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText)

        //Collate forecasted rain
        const forecastRain = []

        for (let entry of data.forecast.simpleforecast.forecastday) {
          const utcDate = Date.UTC(entry.date.year, entry.date.month - 1, entry.date.day);

          forecastRain.push({x: utcDate, y: parseInt(entry.qpf_allday.mm)})
          //forecastTemp.push([parseInt(entry.high.celsius), parseInt(entry.low.celsius)])
        }

        const {dssStore} = context

        dssStore.dispatch({
          type: 'SET-FORECAST-DATA',
          stationID: stationID,
          forecast: forecastRain
        })

      } else {
      }
    }

    xhr.send()

  },

  setStationID(context, stationID) {
    const {dssStore} = context

    dssStore.dispatch({
      type: 'SET-STATION-ID',
      stationID
    })
  }

}