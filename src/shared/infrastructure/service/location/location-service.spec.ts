import LocationService from './location-service'

describe('Serviço de Localização', () => {
  it('Deve obter distância em KM a partir duas posiçoes diferentes', () => {
    const position1 = {
      lat: 10,
      lng: 20
    }
    const position2 = {
      lat: 10,
      lng: 40
    }

    const value = LocationService.distanceInKmFromLatitudeAndLongitude(
      position1,
      position2
    )

    const expectedValue = '2189773'

    expect(value).toBe(expectedValue)
  })

  it('Deve obter distância em KM a partir de posições iguais', () => {
    const position1 = {
      lat: 10,
      lng: 20
    }
    const position2 = {
      lat: 10,
      lng: 20
    }

    const value = LocationService.distanceInKmFromLatitudeAndLongitude(
      position1,
      position2
    )

    const expectedValue = '0'

    expect(value).toBe(expectedValue)
  })
})
